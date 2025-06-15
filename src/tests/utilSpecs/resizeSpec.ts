import { resizeImage } from '../../utils/resize';
import sharp from "sharp";
import path from "path";

describe('Testing image processing', () => {
    it('dimensions of image should be 300 x 200', async () => {
        const filename = "fjord";
        const width = 300;
        const height = 200;
    
        const outputPath = path.resolve(`./images/resized/${filename}-${width}x${height}.jpg`);
        await resizeImage(filename, width, height);
    
        const metadata = await sharp(outputPath).metadata();
    
        expect(`${metadata.width} x ${metadata.height}`).toEqual("300 x 200");
    });
});