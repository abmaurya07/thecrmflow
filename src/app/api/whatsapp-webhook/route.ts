import { NextRequest, NextResponse } from 'next/server';

const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

// Handle GET request for webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hubToken = searchParams.get('hub.verify_token');
  const hubChallenge = searchParams.get('hub.challenge');

  if (hubToken === verifyToken) {
    return new Response(hubChallenge, { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Forbidden - Invalid Verify Token' }), { status: 403 });
  }
}

// Handle POST request for receiving webhook events
export async function POST(req: NextRequest) {
  const body = await req.json();  // Parse incoming request body (likely JSON)
  
  // Process the incoming WhatsApp message here...
  console.log("Webhook event received:", body);

  // Respond with 200 OK
  return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
}
