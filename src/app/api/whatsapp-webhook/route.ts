import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
const whatsappToken = process.env.WHATSAPP_TOKEN;  // WhatsApp API Token
const phoneNumberId = process.env.PHONE_NUMBER_ID; // Your WhatsApp Phone Number ID


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

// Handle POST request for receiving webhook events (messages, media, etc.)
export async function POST(req: NextRequest) {
  const body = await req.json();  // Parse incoming request body (likely JSON)
  
  // Log the webhook event for debugging
  console.log("Webhook event received:", body);

  // Check if there's an incoming message from WhatsApp
  if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value) {
    const change = body.entry[0].changes[0].value;

    // Check if it's a message (could be text or media)
    if (change.messages && change.messages[0]) {
      const message = change.messages[0];

      // Handle text messages
      if (message.type === 'text') {
        const userMessage = message.text.body;
        console.log('Text message received:', userMessage);
        
        // Send a response to the user
        await sendWhatsAppMessage(message.from, `You sent: ${userMessage}`);
      }

      // Handle media (image, document, etc.)
      if (message.type === 'image' || message.type === 'document') {
        const mediaId = message[message.type].id;  // Get media ID
        const fileUrl = await downloadMedia(mediaId);  // Download media from WhatsApp
        
        // Here, you can process the media (e.g., send it to Llama AI for extraction)
        const extractedData = await processFileWithLlamaAI(fileUrl);
        
        // Send extracted data back to the user
        await sendWhatsAppMessage(message.from, `Extracted data: ${extractedData}`);
      }
    }
  }

  // Respond with 200 OK to acknowledge receipt of the message
  return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
}

// Function to send a WhatsApp message back to the user
async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  const url = `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${whatsappToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      text: { body: message }
    })
  });

  if (!response.ok) {
    console.error('Failed to send message', await response.text());
  }
}

// Function to download media file from WhatsApp using the media ID
async function downloadMedia(mediaId: string): Promise<string> {
  const mediaUrl = `https://graph.facebook.com/v17.0/${mediaId}`;
  
  const mediaResponse = await fetch(mediaUrl, {
    headers: {
      Authorization: `Bearer ${whatsappToken}`
    }
  });
  
  if (!mediaResponse.ok) {
    throw new Error('Failed to download media');
  }

  const mediaData = await mediaResponse.json();
  return mediaData.url;  // Return the URL to download the file
}

// Function to process the file (e.g., extract data with Llama AI)
async function processFileWithLlamaAI(fileUrl: string): Promise<string> {
  // Simulating file processing using Llama AI or any other AI service
  const response = await fetch('https://llama.ai/your-api-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileUrl })
  });

  const data = await response.json();
  return data.extractedInfo;  // Return extracted information
}
