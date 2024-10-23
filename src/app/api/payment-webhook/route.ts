import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const timestamp = req.headers.get('x-webhook-timestamp') || '';

    // Generate signature exactly as per docs
    const computedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_SECRET_KEY || '')
      .update(timestamp + body)
      .digest('base64');

    // Handle your webhook logic here
    const webhookData = JSON.parse(body);

    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS':
        // Update your database, send confirmation email, etc.
        break;
      case 'PAYMENT_FAILURE':
        // Handle failed payment
        break;
      // Add other webhook events as needed
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}