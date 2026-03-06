const fs = require("fs");
const path = require("path");

async function extractText(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  if (extension === ".pdf") {
    let pdfParse;

    try {
      pdfParse = require("pdf-parse");
    } catch (error) {
      throw new Error("PDF support requires 'npm install'.");
    }

    const buffer = fs.readFileSync(filePath);
    const result = await pdfParse(buffer);
    return result.text || "";
  }

  throw new Error(`Unsupported file type: ${extension}`);
}

module.exports = {
  extractText
};
