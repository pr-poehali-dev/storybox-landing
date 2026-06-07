import json
import os
import psycopg2


HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}


def handler(event: dict, context) -> dict:
    """Проверка статуса заказа по order_number. GET ?order_number=ORD-..."""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    params = event.get('queryStringParameters') or {}
    order_number = params.get('order_number', '').strip()

    if not order_number:
        return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'order_number required'}), 'isBase64Encoded': False}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT status FROM orders WHERE order_number = %s", (order_number,))
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return {'statusCode': 404, 'headers': HEADERS, 'body': json.dumps({'error': 'Order not found'}), 'isBase64Encoded': False}

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps({'order_number': order_number, 'status': row[0]}),
        'isBase64Encoded': False
    }
