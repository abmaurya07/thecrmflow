import Tesseract from 'tesseract.js';

export async function performOCR(mediaUrl: string): Promise<string> {
    console.log('mediaUrl', mediaUrl);
  const { data: { text } } = await Tesseract.recognize(mediaUrl, 'eng', {
    logger: (m) => console.log(m),  // Optionally log OCR progress
  });
  return text;
}
