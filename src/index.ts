import express from "express";
import resize from "./utils/resizeRoute"
import imageRoutes from "./utils/imageRoutes"
import cors from "cors";
import sharp from "sharp";

const app = express();
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
    res.send("ts on?")
})

app.get('/generate', async (req, res) => {
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);
  
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      res.status(400).send('Invalid width or height parameters.');
      return;
    }

    const imageBuffer = await sharp({
      create: {
        width: width,
        height: height,
        channels: 3,
        background: { r: 200, g: 200, b: 200 },
      },
    })
      .png()
      .toBuffer();

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);
});

app.use('/resize', resize)
app.use('/upload', imageRoutes)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})

export default app;