// place helper utility functions here.

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;  // WhatsApp API Token
const phoneNumberId = process.env.PHONE_NUMBER_ID; // Your WhatsApp Phone Number ID
// Function to send a WhatsApp message back to the user
async function sendWhatsAppMessage(to, message) {
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
async function downloadMedia(mediaId, mediaType) {
  
  // First, get the media URL
  const mediaUrlEndpoint = `https://graph.facebook.com/v17.0/${mediaId}`;
  const mediaUrlResponse = await fetch(mediaUrlEndpoint, {
    headers: {
      'Authorization': `Bearer ${whatsappToken}`
    }
  });

  console.log('mediaUrlResponse', mediaUrlResponse)
  
  if (!mediaUrlResponse.ok) {
    throw new Error(`Failed to get media URL: ${mediaUrlResponse.statusText}`);
  }
  
  const mediaUrlData = await mediaUrlResponse.json();

  console.log('mediaUrlData', mediaUrlData)
  
  // Then, download the actual media using the URL
  const mediaDownloadResponse = await fetch(mediaUrlData.url, {
    headers: {
      'Authorization': `Bearer ${whatsappToken}`,
      'Content-Type': 'application/pdf'
    },
    responseType: 'arraybuffer',
  })  

  
console.log('mediaDownloadResponse', mediaDownloadResponse)

await downloadMedia(mediaDownloadResponse)

return 'Thank You!'


}


async function downloadMedia(response) {
  try {


      const buffer = await response.arrayBuffer();
      require('fs').writeFileSync('downloaded_media', Buffer.from(buffer));
      
  } catch (error) {
      console.error('Error downloading media:', error);
  }
}



// Function to process the file (e.g., extract data with Llama AI)
async function processFileWithLlamaAI(fileUrl) {
  // Simulating file processing using Llama AI or any other AI service
  const response = await fetch('https://llama.ai/your-api-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileUrl })
  });

  const data  = await response.json();
  return data.extractedInfo;  // Return extracted information
}

export {
  downloadMedia,
  sendWhatsAppMessage,
  processFileWithLlamaAI

}