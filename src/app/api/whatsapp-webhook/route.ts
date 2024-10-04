import { downloadMedia, sendWhatsAppMessage } from '@/lib/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { main as AIHelper } from '@/lib/utils/groq';
import extractText from '@/lib/utils/performOCR';  // Assuming this function handles OCR extraction from media

const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN as string;







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
  const body = await req.json();  // Parse incoming request body

  // Log the webhook event for debugging
  console.log("Webhook event received:", body);

  // Check if there's an incoming message from WhatsApp
  if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value) {
    const change = body.entry[0].changes[0].value;

    // Check if it's a message (could be text or media)
    if (change.messages && change.messages[0]) {
      const message = change.messages[0];

      try {
        // Handle text messages
        if (message.type === 'text' && message.text) {
          const userMessage = message.text.body;
          console.log('Text message received:', userMessage);

          // Generate AI Response for text
          const AIResponse = await AIHelper(userMessage);
          console.log('AI response:', AIResponse);

          // Send a response to the user
          await sendWhatsAppMessage(message.from, `Thank you for your message! AI Response: ${AIResponse}`);
        }

        // Handle media (image, document, etc.)
        if (message.type === 'image' || message.type === 'document') {
          const mediaId = message[message.type]?.id;  // Get media ID

          console.log('Media ID:', mediaId);
          
          if (mediaId) {
            try {
              // Download media from WhatsApp
              console.log('run before download media function')
              const mediaBuffer = await downloadMedia(mediaId);  
              console.log('run after download media function')

              console.log('Media buffer:', mediaBuffer);

              // Determine media type
              console.log('message.type', message.type)
              const mediaType = message.type === 'image' ? 'image' : 'document'; // Set the media type

              // Perform OCR on the downloaded media
              const ocrResult = await extractText(mediaBuffer, mediaType);
              console.log('OCR Result:', ocrResult);

              // Generate AI Response for media content
              const AIResponse = await AIHelper(ocrResult);
              console.log('AI response from OCR content:', AIResponse);

              // Send a response to the user
              await sendWhatsAppMessage(message.from, `We received your media! AI Response: ${AIResponse}`);
            } catch (err) {
              console.error('Error handling media:', err);
              await sendWhatsAppMessage(message.from, 'Failed to process the media. Please try again later.');
            }
          } else {
            // Handle missing media ID
            await sendWhatsAppMessage(message.from, 'Failed to retrieve media. Please resend.');
          }
        }
      } catch (err) {
        console.error('Error processing message:', err);
        // Send a response to the user in case of any error
        await sendWhatsAppMessage(message.from, 'An error occurred. Please try again later.');
      }
    }
  }

  // Respond with 200 OK to acknowledge receipt of the message
  return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });
}
