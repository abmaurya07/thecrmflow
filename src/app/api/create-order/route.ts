// app/api/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CASHFREE_API_KEY = process.env.CASHFREE_API_KEY
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY
const CASHFREE_BASE_URL = 'https://api.cashfree.com/pg'
  //  'https://sandbox.cashfree.com/pg'



export async function POST(req: NextRequest) {
  try {
    const { amount, customerDetails } = await req.json();

    const orderId = 'order_' + Date.now();

    const orderPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerDetails.id || 'guest_' + Date.now(),
        customer_email: customerDetails.customerEmail,
        customer_phone: customerDetails.customerPhone
      },
    };

    const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_API_KEY,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order');
    }

    // Return both order details and payment session id
    return NextResponse.json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }

}

