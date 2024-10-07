// place helper utility functions here.

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
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
  
  try {
    const response = await axios.post(url, {
      messaging_product: 'whatsapp',
      to,
      text: { body: message }
    }, {
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to send message', error.response?.data || error.message);
    throw error;
  }
}

// Function to download media file from WhatsApp using the media ID
async function downloadMedia(mediaId, mimeType) {
  const mediaUrlEndpoint = `https://graph.facebook.com/v21.0/${mediaId}`;
  
  try {
    const mediaUrlResponse = await axios.get(mediaUrlEndpoint, {
      headers: {
        'Authorization': `Bearer ${whatsappToken}`
      }
    });

    console.log('Media URL Response:', mediaUrlResponse.data);

    const mediaDownloadResponse = await axios.get(mediaUrlResponse.data.url, {
      headers: {
        'Authorization': `Bearer ${whatsappToken}`
      },
      responseType: 'arraybuffer'
    });

    console.log('Media Download Response:', mediaDownloadResponse.status);

    const arrayBuffer = mediaDownloadResponse.data;
    console.log('Downloaded media size:', arrayBuffer.byteLength);

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (arrayBuffer.byteLength > maxSize) {
      throw new Error('Media file size too big. Max file size supported: 100MB.');
    }

    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('Error downloading media:', error.response?.data || error.message);
    throw error;
  }
}

// Function to process the file (e.g., extract data with Llama AI)  
async function processFileWithLlamaAI(fileUrl) {
  try {
    const response = await axios.post('https://llama.ai/your-api-endpoint', { fileUrl });
    return response.data.extractedInfo;
  } catch (error) {
    console.error('Error processing file with Llama AI:', error.response?.data || error.message);
    throw error;
  }
}

// Function to extract text from PDF using pdf parse
async function extractTextFromPDF(pdfBuffer) {
  console.log('PDF buffer size:', pdfBuffer.length);
  if (typeof window === 'undefined') {
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
    console.error('PDF extraction is not supported in the browser');
    return 'PDF extraction is not supported in the browser';
  }
}

// Function to extract text from PPT
async function extractTextFromPPT(pptBuffer) {
  try {
    const text = 'PPT File';
    return text;
  } catch (error) {
    console.error('Error extracting text from PPT:', error);
    throw error;
  }
}



//


async function addItemToMonday(boardId = '1922012467', itemName = 'Abbk') {
  // Monday.com API configuration
  const API_KEY = process.env.MONDAY_API_KEY;
  const API_URL = 'https://api.monday.com/v2';
  
  // Headers for the request
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  };
  
  // Prepare column values
  const columnValues = JSON.stringify({
    company: 'test company',
    email: 'testemail@hjk.com',
    phone: 545231894
  });
  
  // GraphQL mutation query
  const query = `mutation create_item($boardId: Int!, $itemName: String!, $columnValues: JSON!) {
    create_item (
      board_id: $boardId,
      item_name: $itemName,
      column_values: $columnValues
    ) {
      id
    }
  }`;

  const variables = {
    boardId: parseInt(boardId),
    itemName: itemName,
    columnValues: columnValues
  };

  try {
    const response = await axios.post(API_URL, {
      query: query,
      variables: variables
    }, {
      headers: headers
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.create_item;
  } catch (error) {
    console.error('Error adding item to Monday.com:', error.message);
    throw error;
  }
}



function extractAndParseJson(text) {
  // Find JSON-like pattern in the text
  const jsonPattern = /\[(?:[^[\]]*|\[(?:[^[\]]*|\[[^[\]]*\])*\])*\]|\{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*\}/;
  const match = text.match(jsonPattern);
  
  if (match) {
      try {
          // Extract and parse the JSON
          const jsonStr = match[0];
          const parsedJson = JSON.parse(jsonStr);
          return parsedJson;
      } catch (error) {
          console.error("Error parsing JSON:", error.message);
          return null;
      }
  } else {
      console.log("No JSON found in the text");
      return null;
  }
}


export {
  downloadMedia,
  sendWhatsAppMessage,
  processFileWithLlamaAI,
  extractTextFromPDF,
  extractTextFromPPT,
  addItemToMonday,
  extractAndParseJson
}