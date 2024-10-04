import { PDFDocument } from 'pdf-lib';
import Tesseract from 'tesseract.js';

async function extractTextFromPDF(pdfBuffer) {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    const textResults = [];

    for (const page of pages) {
        const image = await page.render(); // Get image representation
        const text = await Tesseract.recognize(image, 'eng');
        textResults.push(text.data.text);
    }

    return textResults.join('\n');
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