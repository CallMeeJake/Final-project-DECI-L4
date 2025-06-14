import resize from '../../utils/resize';
import sharp from "sharp";
import path from "path";

describe('Testing image processing', () => {
  it('dimensions of image should be 300 x 200', async () => {
    const inputPath = path.resolve("./images/fjord.jpg");
    const outputPath = path.resolve("./images/resized/fjord-resized.jpg");

    await resize.resize(inputPath, 300, 200);

    const metadata = await sharp(outputPath).metadata();

    expect(`${metadata.width} x ${metadata.height}`).toEqual("300 x 200");
  });
});