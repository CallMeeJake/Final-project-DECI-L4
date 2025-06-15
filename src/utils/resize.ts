import sharp from "sharp";
import path from "path";
import fs from "fs";

const fullImagePath = path.resolve(__dirname, "../../src/images");
const resizedPath = path.resolve(__dirname, "../../src/images/resized");

export const resizeImage = async (filename: string, width: number, height: number): Promise<string> => {
  const inputPath = path.join(fullImagePath, `${filename}.jpg`);

  const outputFilename = `${filename}-${width}x${height}.jpg`;
  const outputPath = path.join(resizedPath, outputFilename);

  if (!fs.existsSync(resizedPath)) {
    fs.mkdirSync(resizedPath, { recursive: true });
  }

  if (fs.existsSync(outputPath)) {
    console.log(`already processed, Using cached image: ${outputPath}`);
    return outputPath;
  }

  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
    return outputPath;
  } catch (err) {
    console.error("Error resizing image:", err);
    throw err;
  }
};
