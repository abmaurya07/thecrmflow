import { PDFDocument } from 'pdf-lib';
import Tesseract from 'tesseract.js';
const pdf = require('pdf-parse');

async function extractTextFromPDF(buffer) {
    try {
      const data = await pdf(buffer);
      return data.text; // Extracted text from the PDF
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

async function extractTextFromPPT(pptBuffer) {
    // Convert PPT to images (using a library)
    // Example: Extract images from PPT slides (you'll need to implement this part)
    const images = []; // Assume you have a way to get images from the PPT
    const textResults = [];

    for (const image of images) {
        const text = await Tesseract.recognize(image, 'eng');
        textResults.push(text.data.text);
    }

    return textResults.join('\n');
}

async function extractTextFromImage(imageBuffer) {
    const text = await Tesseract.recognize(imageBuffer, 'eng');
    return text.data.text;
}

async function extractText(mediaBuffer, mediaType) {
    console.log('mediaType', mediaType)
    switch (mediaType) {
        case 'pdf':
            return await extractTextFromPDF(mediaBuffer);
        case 'ppt':
            return await extractTextFromPPT(mediaBuffer);
        case 'image':
            return await extractTextFromImage(mediaBuffer);
        default:
            throw new Error('Unsupported media type');
    }
}

export default extractText