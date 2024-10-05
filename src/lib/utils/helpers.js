// place helper utility functions here.

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import pptxExtract from 'pptx-extract'; // You'll need to install this package

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;  // WhatsApp API Token
const phoneNumberId = process.env.PHONE_NUMBER_ID; // Your WhatsApp Phone Number ID
// const appId = process.env.WHATSAPP_APP_ID;
// const appSecret = process.env.WHATSAPP_APP_SECRET; // This should be different from WHATSAPP_VERIFY_TOKEN

// Function to refresh the WhatsApp access token
// async function refreshAccessToken() {
//   const url = `https://graph.facebook.com/oauth/access_token`;
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     query: {
//       grant_type: 'fb_exchange_token',
//       client_id: appId,
//       client_secret: appSecret,
//       fb_exchange_token: whatsappToken,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to refresh access token');
//   }

//   const data = await response.json();
//   return data.access_token;
// }

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
    if (response.status === 401) {
      // Token might be expired, try to refresh
      const newToken = await refreshAccessToken();
      // Update the token in the environment (this might require server restart)
      process.env.WHATSAPP_ACCESS_TOKEN = newToken;
      // Retry the message send with the new token
      return sendWhatsAppMessage(to, message);
    }
    console.error('Failed to send message', await response.text());
  }
}

// Function to download media file from WhatsApp using the media ID
async function downloadMedia(mediaId, mimeType) {
  // Step 1: Retrieve the media URL
  const mediaUrlEndpoint = `https://graph.facebook.com/v21.0/${mediaId}`;
  const mediaUrlResponse = await fetch(mediaUrlEndpoint, {
    headers: {
      'Authorization': `Bearer ${whatsappToken}`
    }
  });

  console.log('Media URL Response:', mediaUrlResponse);

  if (!mediaUrlResponse.ok) {
    if (mediaUrlResponse.status === 401) {
      // const newToken = await refreshAccessToken();
      // process.env.WHATSAPP_ACCESS_TOKEN = newToken;
      return downloadMedia(mediaId, mimeType);
    }
    throw new Error(`Failed to get media URL: ${mediaUrlResponse.statusText}`);
  }

  const mediaUrlData = await mediaUrlResponse.json();
  console.log('Media URL Data:', mediaUrlData);

  // Step 2: Download the media using the retrieved URL
  const mediaDownloadResponse = await fetch(mediaUrlData.url, {
    headers: {
      'Authorization': `Bearer ${whatsappToken}`
    },
    method: 'GET'
  });

  console.log('Media Download Response:', mediaDownloadResponse);

  if (!mediaDownloadResponse.ok) {
    throw new Error(`Failed to download media: ${mediaDownloadResponse.statusText}`);
  }

  const arrayBuffer = await mediaDownloadResponse.arrayBuffer();
  console.log('Downloaded media size:', arrayBuffer.byteLength);

  // Check file size
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (arrayBuffer.byteLength > maxSize) {
    throw new Error('Media file size too big. Max file size supported: 100MB.');
  }

  return Buffer.from(arrayBuffer);
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

// Function to extract text from PDF
async function extractTextFromPDF(pdfBuffer) {
  console.log('PDF buffer size:', pdfBuffer.length);
  if (typeof window === 'undefined') {
    // Server-side code
    const pdf = await import('pdf-parse');
    try {
      const data = await pdf.default(pdfBuffer);
      console.log('PDF parsing successful. Text length:', data.text.length);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      if (error.message === 'Invalid PDF structure') {
        console.error('PDF buffer (first 100 bytes):', pdfBuffer.slice(0, 100).toString('hex'));
        return 'The provided PDF file appears to be invalid or corrupted. Please try uploading a different PDF file.';
      } else {
        return 'An error occurred while processing the PDF. Please try again later.';
      }
    }
  } else {
    // Client-side code
    console.error('PDF extraction is not supported in the browser');
    return 'PDF extraction is not supported in the browser';
  }
}

// Function to extract text from PPT
async function extractTextFromPPT(pptBuffer) {
  try {
    const text = 'PPT File'
    return text.join('\n');
  } catch (error) {
    console.error('Error extracting text from PPT:', error);
    throw error;
  }
}

export {
  downloadMedia,
  sendWhatsAppMessage,
  processFileWithLlamaAI,
  extractTextFromPDF,
  extractTextFromPPT
}