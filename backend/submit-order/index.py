import json
import os
import urllib.request
import urllib.parse
import datetime
import gspread
from google.oauth2.service_account import Credentials

def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта, отправляет в Telegram и записывает в Google Sheets."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    tariff = body.get("tariff", "").strip()
    promo = body.get("promo", "").strip()
    source = body.get("source", "Сайт")

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Имя и телефон обязательны"})}

    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=3)))
    date_str = now.strftime("%d.%m.%Y %H:%M")

    # Telegram
    tg_token = os.environ["TELEGRAM_BOT_TOKEN"]
    tg_chat = os.environ["TELEGRAM_CHAT_ID"]

    promo_line = f"\n🎟 Промокод: <b>{promo}</b>" if promo else ""
    tg_text = (
        f"📥 <b>Новая заявка — {source}</b>\n\n"
        f"👤 Имя: <b>{name}</b>\n"
        f"📞 Телефон: <b>{phone}</b>\n"
        f"📦 Тариф: <b>{tariff or 'не указан'}</b>"
        f"{promo_line}\n\n"
        f"🕐 {date_str}"
    )

    tg_payload = json.dumps({
        "chat_id": tg_chat,
        "text": tg_text,
        "parse_mode": "HTML"
    }).encode("utf-8")

    tg_req = urllib.request.Request(
        f"https://api.telegram.org/bot{tg_token}/sendMessage",
        data=tg_payload,
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    urllib.request.urlopen(tg_req, timeout=10)

    # Google Sheets
    sa_json = json.loads(os.environ["GOOGLE_SERVICE_ACCOUNT_JSON"])
    creds = Credentials.from_service_account_info(sa_json, scopes=[
        "https://www.googleapis.com/auth/spreadsheets"
    ])
    gc = gspread.authorize(creds)

    sheet_id = "1BmzOi5inb9G7mWW5B5-kABWPHBXvGq2JDezCMA1o_gA"
    sh = gc.open_by_key(sheet_id)
    ws = sh.sheet1

    # Добавляем заголовки если таблица пустая
    if ws.row_count == 0 or not ws.row_values(1):
        ws.append_row(["Дата", "Имя", "Телефон", "Тариф", "Промокод", "Источник"])

    ws.append_row([date_str, name, phone, tariff, promo, source])

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True})
    }
