import { downloadMedia, sendWhatsAppMessage, extractTextFromPDF, extractTextFromPPT, addItemToMonday, extractAndParseJson } from '@/lib/utils/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { main as AIHelper } from '@/lib/utils/groq';

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
          const AIResponse = await AIHelper(userMessage);
          console.log('AI response:', AIResponse);
          const parsedJson = extractAndParseJson(AIResponse)

          await sendWhatsAppMessage(message.from, `AI Response: ${AIResponse}`);

          console.log('parsedJSON', parsedJson)


         parsedJson.forEach(async (data, idx) => {
             
          const {contact:itemName, business:company, phone, email } = data;

          await addItemToMonday({
            itemName,
            company,
            phone,
            email
          })

         })

          // if(parsedJson){
          //   const {contact:itemName, business:company, phone, email } = parsedJson[0];

          //   await addItemToMonday({
          //     itemName,
          //     company,
          //     phone,
          //     email
          //   })
          // }

        }

        // Handle media (PDF, PPT, etc.)
        if (message.type === 'document') {
          const mediaId = message.document?.id;
          console.log('Media ID:', mediaId);
          
          if (mediaId) {
            try {
              const mimeType = message.document?.mime_type;
              let extractedText: string;

              const mediaBuffer = await downloadMedia(mediaId, mimeType);

              if (mimeType === 'application/pdf') {
                extractedText = await extractTextFromPDF(mediaBuffer);
              } else if (mimeType === 'application/vnd.ms-powerpoint' || mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                extractedText = await extractTextFromPPT(mediaBuffer);
              } else {
                throw new Error('Unsupported file type');
              }

              if (extractedText.startsWith('The provided PDF file appears to be invalid') || 
                  extractedText.startsWith('An error occurred while processing the PDF')) {
                await sendWhatsAppMessage(message.from, extractedText);

              } else {
                const AIResponse = await AIHelper(extractedText);
                console.log('AI response from document content:', AIResponse);
                await sendWhatsAppMessage(message.from, `AI Response based on your document: ${AIResponse}`);
                const parsedJson = extractAndParseJson(AIResponse)
                console.log('parsedJSON', parsedJson)

                if(parsedJson){
                  const {contact:itemName, business:company, phone, email } = parsedJson[0];
      
                  await addItemToMonday({
                    itemName,
                    company,
                    phone,
                    email
                  })
                }

              }
            } catch (err) {
              console.error('Error handling media:', err);
              if (err.message === 'Received HTML instead of PDF') {
                await sendWhatsAppMessage(message.from, 'There was an issue downloading your document. Please try uploading it again.');
              } else {
                await sendWhatsAppMessage(message.from, 'Failed to process the document. Please try again later.');
              }
            }
          } else {
            await sendWhatsAppMessage(message.from, 'Failed to retrieve document. Please resend.');
          }
        }
      } catch (err) {
        console.error('Error processing message:', err);
        await sendWhatsAppMessage(message.from, 'An error occurred. Please try again later.');
      }
    }
  }

  // Respond with 200 OK to acknowledge receipt of the message
  return new NextResponse(JSON.stringify({ status: 'success' }), { status: 200 });
}
