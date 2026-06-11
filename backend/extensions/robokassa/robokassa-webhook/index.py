import json
import os
import hashlib
import psycopg2
import urllib.request
import urllib.error
import datetime
from urllib.parse import parse_qs


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest().upper()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/plain'
}


def send_telegram(order_number, user_name, user_email, user_phone, amount, items_names, date_str, marketing_consent="нет"):
    """Отправка уведомления в Telegram"""
    tg_token = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
    tg_chat = os.environ.get('TELEGRAM_CHAT_ID', '').strip()
    if not tg_token or not tg_chat:
        print('[TG] No credentials')
        return

    items_line = f"\n📦 Состав: <b>{items_names}</b>" if items_names else ""
    tg_text = (
        f"✅ <b>Оплата получена!</b>\n\n"
        f"🧾 Заказ: <b>{order_number}</b>\n"
        f"👤 Имя: <b>{user_name}</b>\n"
        f"📞 Телефон: <b>{user_phone}</b>\n"
        f"📧 Email: <b>{user_email}</b>"
        f"{items_line}\n"
        f"💰 Сумма: <b>{amount} ₽</b>\n"
        f"📬 Рассылка: <b>{marketing_consent}</b>\n\n"
        f"🕐 {date_str}"
    )

    payload = json.dumps({
        "chat_id": tg_chat,
        "text": tg_text,
        "parse_mode": "HTML"
    }).encode("utf-8")

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{tg_token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    for attempt in range(3):
        try:
            resp = urllib.request.urlopen(req, timeout=5)
            print(f"[TG] OK: {resp.read().decode()}")
            return
        except Exception as e:
            print(f"[TG] Attempt {attempt+1} error: {e}")
    print("[TG] All attempts failed")


def send_google_sheets(order_number, user_name, user_email, user_phone, amount, items_names, date_str, marketing_consent="нет"):
    """Запись оплаченного заказа в Google Sheets"""
    try:
        import gspread
        from google.oauth2.service_account import Credentials

        sa_json = json.loads(os.environ["GOOGLE_SERVICE_ACCOUNT_JSON"])
        creds = Credentials.from_service_account_info(sa_json, scopes=[
            "https://www.googleapis.com/auth/spreadsheets"
        ])
        gc = gspread.authorize(creds)

        sheet_id = "1BmzOi5inb9G7mWW5B5-kABWPHBXvGq2JDezCMA1o_gA"
        sh = gc.open_by_key(sheet_id)
        ws = sh.sheet1

        if not ws.row_values(1):
            ws.append_row(["Дата", "Имя", "Телефон", "Тариф", "Промокод", "Источник", "Согласие на рассылку"])

        ws.append_row([date_str, user_name, user_phone, items_names, "", "Онлайн оплата", marketing_consent, user_email, str(amount)])
        print("[SHEETS] OK — строка добавлена")
    except Exception as e:
        print(f"[SHEETS] Error: {e}")


def handler(event: dict, context) -> dict:
    '''
    Result URL вебхук от Robokassa для подтверждения оплаты.
    После оплаты отправляет уведомление в Telegram и Google Sheets.
    Robokassa отправляет: OutSum, InvId, SignatureValue
    Returns: OK{InvId} если подпись верна и заказ обновлён
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    password_2 = os.environ.get('ROBOKASSA_PASSWORD_2')
    if not password_2:
        return {'statusCode': 500, 'headers': HEADERS, 'body': 'Configuration error', 'isBase64Encoded': False}

    # Парсинг параметров из body или query string
    params = {}
    body = event.get('body', '')

    if method == 'POST' and body:
        if event.get('isBase64Encoded', False):
            import base64
            body = base64.b64decode(body).decode('utf-8')
        parsed = parse_qs(body)
        params = {k: v[0] for k, v in parsed.items()}

    if not params:
        params = event.get('queryStringParameters') or {}

    out_sum = params.get('OutSum', params.get('out_summ', ''))
    inv_id = params.get('InvId', params.get('inv_id', ''))
    signature_value = params.get('SignatureValue', params.get('crc', '')).upper()

    if not out_sum or not inv_id or not signature_value:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Missing required parameters', 'isBase64Encoded': False}

    # Проверка подписи
    expected_signature = calculate_signature(out_sum, inv_id, password_2)
    if signature_value != expected_signature:
        return {'statusCode': 400, 'headers': HEADERS, 'body': 'Invalid signature', 'isBase64Encoded': False}

    # Обновление статуса заказа
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE orders
        SET status = 'paid', paid_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE robokassa_inv_id = %s AND status = 'pending'
        RETURNING id, order_number, user_name, user_email, user_phone, amount, order_comment
    """, (int(inv_id),))

    result = cur.fetchone()

    if not result:
        cur.execute("SELECT status FROM orders WHERE robokassa_inv_id = %s", (int(inv_id),))
        existing = cur.fetchone()
        conn.close()

        if existing and existing[0] == 'paid':
            return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}
        return {'statusCode': 404, 'headers': HEADERS, 'body': 'Order not found', 'isBase64Encoded': False}

    order_id, order_number, user_name, user_email, user_phone, amount, order_comment = result

    # Извлекаем marketing_consent из order_comment
    marketing_consent = "нет"
    if order_comment and "marketing_consent:" in order_comment:
        marketing_consent = order_comment.split("marketing_consent:")[-1].strip()

    # Получаем состав заказа
    cur.execute("SELECT product_name, quantity FROM order_items WHERE order_id = %s", (order_id,))
    items = cur.fetchall()
    items_names = ", ".join(f"{row[0]}" + (f" x{row[1]}" if row[1] > 1 else "") for row in items)

    conn.commit()
    cur.close()
    conn.close()

    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=3)))
    date_str = now.strftime("%d.%m.%Y %H:%M")

    send_google_sheets(order_number, user_name, user_email, user_phone, amount, items_names, date_str, marketing_consent)
    send_telegram(order_number, user_name, user_email, user_phone, amount, items_names, date_str, marketing_consent)

    return {'statusCode': 200, 'headers': HEADERS, 'body': f'OK{inv_id}', 'isBase64Encoded': False}