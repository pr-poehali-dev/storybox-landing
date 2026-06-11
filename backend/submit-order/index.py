import json
import os
import urllib.request
import urllib.error
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
    marketing_consent = body.get("marketing_consent", "нет")

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Имя и телефон обязательны"})}

    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=3)))
    date_str = now.strftime("%d.%m.%Y %H:%M")

    errors = []

    # --- Telegram ---
    try:
        tg_token = os.environ["TELEGRAM_BOT_TOKEN"].strip()
        tg_chat = os.environ["TELEGRAM_CHAT_ID"].strip()

        promo_line = f"\n🎟 Промокод: <b>{promo}</b>" if promo else ""
        marketing_line = f"\n📬 Рассылка: <b>{marketing_consent}</b>"
        tg_text = (
            f"📥 <b>Новая заявка — {source}</b>\n\n"
            f"👤 Имя: <b>{name}</b>\n"
            f"📞 Телефон: <b>{phone}</b>\n"
            f"📦 Тариф: <b>{tariff or 'не указан'}</b>"
            f"{promo_line}"
            f"{marketing_line}\n\n"
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
        tg_resp = urllib.request.urlopen(tg_req, timeout=10)
        print(f"[TG] OK: {tg_resp.read().decode()}")
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        print(f"[TG] HTTPError {e.code}: {err_body}")
        errors.append(f"TG: {e.code} {err_body}")
    except Exception as e:
        print(f"[TG] Error: {e}")
        errors.append(f"TG: {e}")

    # --- Google Sheets ---
    try:
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

        ws.append_row([date_str, name, phone, tariff, promo, source, marketing_consent])
        print("[SHEETS] OK — строка добавлена")
    except Exception as e:
        print(f"[SHEETS] Error: {e}")
        errors.append(f"SHEETS: {e}")

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "errors": errors})
    }