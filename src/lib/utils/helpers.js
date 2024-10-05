// place helper utility functions here.

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import pptxExtract from 'pptx-extract'; // You'll need to install this package

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
async function downloadMedia(mediaId, mimeType) {
  const mediaUrlEndpoint = `https://graph.facebook.com/v17.0/${mediaId}`;
  const mediaUrlResponse = await fetch(mediaUrlEndpoint, {
    headers: {
      'Authorization': `Bearer ${whatsappToken}`
    }
  });

  console.log('mediaUrlResponse', mediaUrlResponse);
  
  if (!mediaUrlResponse.ok) {
    throw new Error(`Failed to get media URL: ${mediaUrlResponse.statusText}`);
  }
  
  const mediaUrlData = await mediaUrlResponse.json();
  console.log('mediaUrlData', mediaUrlData);

  // Set the correct Content-Type based on the mimeType
  const headers = {
    'Authorization': `Bearer ${whatsappToken}`,
    'Content-Type': mimeType || 'application/octet-stream'
  };

  // Function to attempt download with redirect handling
  async function attemptDownload(url, attempts = 3) {
    while (attempts > 0) {
      const response = await fetch(url, {
        headers: headers,
        method: 'GET',
        redirect: 'follow', // Allow redirects
      });

      console.log(`Download attempt response:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/pdf')) {
          return await response.arrayBuffer();
        } else {
          console.error(`Unexpected content type: ${contentType}`);
          const text = await response.text();
          console.error(`Response body (first 500 chars):`, text.substring(0, 500));
          throw new Error(`Unexpected content type: ${contentType}`);
        }
      } else if (response.status === 302 || response.status === 301) {
        url = response.headers.get('location');
        console.log(`Following redirect to: ${url}`);
      } else {
        attempts--;
        if (attempts === 0) {
          throw new Error(`Failed to download media after multiple attempts: ${response.statusText}`);
        }
      }
    }
  }

  try {
    const arrayBuffer = await attemptDownload(mediaUrlData.url);
    console.log('Downloaded media size:', arrayBuffer.byteLength);
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error downloading media:', error);
    throw error;
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