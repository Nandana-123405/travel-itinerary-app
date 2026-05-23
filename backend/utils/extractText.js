const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

// Extract text from PDF
const extractFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
};

// Extract text from Image using OCR
const extractFromImage = async (buffer) => {
  try {
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
    return text;
  } catch (error) {
    throw new Error('Failed to extract text from image: ' + error.message);
  }
};

// Main extraction function
const extractText = async (file) => {
  const fileType = file.mimetype;
  
  if (fileType === 'application/pdf') {
    return await extractFromPDF(file.buffer);
  } else if (fileType.startsWith('image/')) {
    return await extractFromImage(file.buffer);
  } else {
    throw new Error('Unsupported file type');
  }
};

module.exports = extractText;