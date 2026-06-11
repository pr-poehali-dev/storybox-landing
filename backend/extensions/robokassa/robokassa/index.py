import json
import os
import hashlib
import psycopg2
import random
from urllib.parse import urlencode
from datetime import datetime


def calculate_signature(*args) -> str:
    """Создание MD5 подписи по документации Robokassa"""
    joined = ':'.join(str(arg) for arg in args)
    return hashlib.md5(joined.encode()).hexdigest()


def get_db_connection():
    """Получение подключения к БД"""
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not configured')
    return psycopg2.connect(dsn)


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Session-Id, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

ROBOKASSA_URL = 'https://auth.robokassa.ru/Merchant/Index.aspx'


def handler(event: dict, context) -> dict:
    '''
    Создание заказа и генерация ссылки на оплату Robokassa.
    POST body: amount, user_name, user_email, user_phone, user_address, cart_items
    Returns: payment_url, order_id, order_number
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    if method != 'POST':
        return {'statusCode': 405, 'headers': HEADERS, 'body': json.dumps({'error': 'Method not allowed'}), 'isBase64Encoded': False}

    try:
        merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN')
        password_1 = os.environ.get('ROBOKASSA_PASSWORD_1')

        if not merchant_login or not password_1:
            return {'statusCode': 500, 'headers': HEADERS, 'body': json.dumps({'error': 'Robokassa credentials not configured'}), 'isBase64Encoded': False}

        body_str = event.get('body', '{}')
        payload = json.loads(body_str)

        amount = float(payload.get('amount', 0))
        user_name = str(payload.get('user_name', ''))
        user_email = str(payload.get('user_email', ''))
        user_phone = str(payload.get('user_phone', ''))
        user_address = str(payload.get('user_address', ''))
        order_comment = str(payload.get('order_comment', ''))
        cart_items = payload.get('cart_items', [])
        success_url = str(payload.get('success_url', ''))
        fail_url = str(payload.get('fail_url', ''))

        if amount <= 0:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'Amount must be greater than 0'}), 'isBase64Encoded': False}
        if not user_name or not user_email:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'user_name and user_email required'}), 'isBase64Encoded': False}

        conn = get_db_connection()
        cur = conn.cursor()

        # Генерация уникального InvoiceID
        for _ in range(10):
            robokassa_inv_id = random.randint(100000, 2147483647)
            cur.execute("SELECT COUNT(*) FROM orders WHERE robokassa_inv_id = %s", (robokassa_inv_id,))
            if cur.fetchone()[0] == 0:
                break

        order_number = f"ORD-{datetime.now().strftime('%Y%m%d')}-{robokassa_inv_id}"

        cur.execute("""
            INSERT INTO orders (order_number, user_name, user_email, user_phone, amount, robokassa_inv_id, status, delivery_address, order_comment)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (order_number, user_name, user_email, user_phone, round(amount, 2), robokassa_inv_id, 'pending', user_address, order_comment))

        order_id = cur.fetchone()[0]

        for item in cart_items:
            cur.execute("""
                INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity)
                VALUES (%s, %s, %s, %s, %s)
            """, (order_id, item.get('id'), item.get('name'), item.get('price'), item.get('quantity')))

        # Формирование ссылки на оплату
        amount_str = f"{amount:.2f}"

        # Формирование чека (фискализация)
        receipt_items = []
        for item in cart_items:
            item_sum = round(float(item.get('price', 0)) * int(item.get('quantity', 1)), 2)
            receipt_items.append({
                "name": str(item.get('name', ''))[:128],
                "quantity": int(item.get('quantity', 1)),
                "sum": item_sum,
                "payment_method": "full_payment",
                "payment_object": "service",
                "tax": "none"
            })

        from urllib.parse import quote
        # Компактный JSON без лишних пробелов
        receipt_json = json.dumps({"items": receipt_items}, ensure_ascii=False, separators=(',', ':'))
        # В URL — закодированный (%20 для пробелов). В подпись — сырой JSON.
        receipt_encoded = quote(receipt_json, safe='')

        # Подпись: MerchantLogin:OutSum:InvId:Receipt:[SuccessUrl2:GET:FailUrl2:GET:]Password#1
        if success_url or fail_url:
            signature = calculate_signature(
                merchant_login, amount_str, robokassa_inv_id, receipt_encoded,
                success_url, 'GET', fail_url, 'GET', password_1
            )
        else:
            signature = calculate_signature(merchant_login, amount_str, robokassa_inv_id, receipt_encoded, password_1)

        params_list = [
            f"MerchantLogin={merchant_login}",
            f"OutSum={amount_str}",
            f"InvoiceID={robokassa_inv_id}",
            f"SignatureValue={signature}",
            f"Receipt={receipt_encoded}",
            f"Email={quote_plus(user_email)}",
            "Culture=ru",
            f"Description={quote_plus(f'Заказ {order_number}')}",
        ]
        if success_url:
            params_list.append(f"SuccessUrl2={quote_plus(success_url)}")
            params_list.append("SuccessUrl2Method=GET")
        if fail_url:
            params_list.append(f"FailUrl2={quote_plus(fail_url)}")
            params_list.append("FailUrl2Method=GET")

        payment_url = f"{ROBOKASSA_URL}?{'&'.join(params_list)}"

        cur.execute("UPDATE orders SET payment_url = %s WHERE id = %s", (payment_url, order_id))
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'payment_url': payment_url,
                'order_id': order_id,
                'order_number': order_number
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        import traceback
        print(f"Robokassa error: {e}")
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }