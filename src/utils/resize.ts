import sharp from "sharp";
import express from "express";
import path from "path";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('resize');
});

function resize(imgPath: string, width: number, height: number): Promise<string> {
    const imgName = path.basename(imgPath, path.extname(imgPath));
    const outputPath = `images/resized/${imgName}-resized.jpg`;

    return sharp(imgPath)
        .resize(width, height)
        .toFile(outputPath)
        .then(() => outputPath)
        .catch(err => {
            console.error(`Error resizing image: ${err}`);
            throw err;
        });
}

export = {
    resize,
    routes
};
