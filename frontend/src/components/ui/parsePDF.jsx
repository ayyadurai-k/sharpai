import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import Tesseract from "tesseract.js";

// ✅ Fix worker import and set it correctly
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
GlobalWorkerOptions.workerSrc = workerSrc;
export async function parsePDF(file) {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target.result);
          const pdf = await getDocument({ data: typedArray }).promise;
          let fullText = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const extractedText = textContent.items.map((item) => item.str).join(" ");
            fullText += extractedText + "\n";
          }
          console.log("Final Extracted PDF text:", fullText);
          // ✅ If no text is extracted, apply OCR (convert to image first)
          if (!fullText.trim()) {
            const ocrText = await extractTextWithOCR(pdf);
            return resolve(ocrText);
          }
          resolve(fullText.trim());
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          reject("Failed to extract text from PDF.");
        }
      };
      reader.onerror = () => {
        console.error("Error reading file.");
        reject("Error reading file.");
      };
      reader.readAsArrayBuffer(file);
    });
  } catch (error) {

    throw new Error("Failed to parse PDF file.");
  }
}

async function extractTextWithOCR(pdf) {
  try {
    let fullOcrText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const scale = 2; // Higher scale = better OCR accuracy
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;


      // Convert Canvas to Image Data URL
      const imageUrl = canvas.toDataURL("image/png");

      // Run OCR
      const result = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => console.log(m),
      });
    
      fullOcrText += result.data.text + "\n";
    }

    return fullOcrText.trim();
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text using OCR.");
  }
}
