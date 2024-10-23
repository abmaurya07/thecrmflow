// app/api/payment-status/route.ts
import {NextRequest, NextResponse } from 'next/server';
const CASHFREE_API_KEY = process.env.CASHFREE_API_KEY
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY
const CASHFREE_BASE_URL = 'https://api.cashfree.com/pg'
  //  'https://sandbox.cashfree.com/pg'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  try {
    const response = await fetch(
      `${CASHFREE_BASE_URL}/orders/${orderId}`,
      {
        headers: {
          'x-api-version': '2022-09-01',
          'x-client-id': CASHFREE_API_KEY,
          'x-client-secret': CASHFREE_SECRET_KEY,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch order status');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment status' },
      { status: 500 }
    );
  }
}