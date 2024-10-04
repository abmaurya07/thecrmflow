import { downloadMedia, processFileWithLlamaAI, sendWhatsAppMessage } from '@/lib/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';

const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN as string;


// Define types for the WhatsApp webhook body
interface WhatsAppMessage {
  from: string;
  type: string;
  text?: { body: string };
  image?: { id: string };
  document?: { id: string };
}

interface WhatsAppChange {
  value: {
    messages?: WhatsAppMessage[];
  };
}

interface WhatsAppWebhookBody {
  entry: { changes: WhatsAppChange[] }[];
}



// Handle GET request for webhook verification
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const hubToken = searchParams.get('hub.verify_token');
  const hubChallenge = searchParams.get('hub.challenge');

  if (hubToken === verifyToken) {
    return new NextResponse(hubChallenge || '', { status: 200 });
  } else {
    return new NextResponse(JSON.stringify({ message: 'Forbidden - Invalid Verify Token' }), { status: 403 });
  }
}

// Handle POST request for receiving webhook events (messages, media, etc.)
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: WhatsAppWebhookBody = await req.json();  // Parse incoming request body
  
  // Log the webhook event for debugging
  console.log("Webhook event received:", body);

  // Check if there's an incoming message from WhatsApp
  if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value) {
    const change = body.entry[0].changes[0].value;

    // Check if it's a message (could be text or media)
    if (change.messages && change.messages[0]) {
      const message = change.messages[0];

      // Handle text messages
      if (message.type === 'text' && message.text) {
        const userMessage = message.text.body;
        console.log('Text message received:', userMessage);
        
        // Send a response to the user
        await sendWhatsAppMessage(message.from, `teri maki chut`);
      }

      // Handle media (image, document, etc.)
      if (message.type === 'image' || message.type === 'document') {
        const mediaId = message[message.type]?.id;  // Get media ID
        if (mediaId) {
          const fileUrl = await downloadMedia(mediaId);  // Download media from WhatsApp
          
          // Here, you can process the media (e.g., send it to Llama AI for extraction)
          const extractedData = await processFileWithLlamaAI(fileUrl);
          
          // Send extracted data back to the user
          await sendWhatsAppMessage(message.from, `Extracted data: ${extractedData}`);
        }
      }
    }
  }

  // Respond with 200 OK to acknowledge receipt of the message
  return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });
}

