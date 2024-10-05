// place helper utility functions here.

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pdf from 'pdf-parse';
import pptxExtract from 'pptx-extract'; // You'll need to install this package

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
  
  // Set the correct Content-Type based on the mimeType
  const headers = {
    'Authorization': `Bearer ${whatsappToken}`,
    'Content-Type': mimeType || 'application/octet-stream'
  };

  // Then, download the actual media using the URL
  const mediaDownloadResponse = await fetch(mediaUrlData.url, {
    headers: headers,
    method: 'GET'
  });  

  console.log('mediaDownloadResponse', mediaDownloadResponse)

  if (!mediaDownloadResponse.ok) {
    throw new Error(`Failed to download media: ${mediaDownloadResponse.statusText}`);
  }

  const buffer = await mediaDownloadResponse.arrayBuffer();
  return Buffer.from(buffer);
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
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

// Function to extract text from PPT
async function extractTextFromPPT(pptBuffer) {
  try {
    const text = await pptxExtract(pptBuffer);
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