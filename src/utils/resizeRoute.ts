import express from "express";
import { resizeImage } from "./resize";
import path from "path";

const router = express.Router();

router.get("/", async (req, res) => {
    const { filename, width, height } = req.query;
    console.log("Resize request:", { filename, width, height });

    if (!filename || !width || !height || isNaN((width as unknown) as number)|| isNaN((height as unknown) as number)) {
        res.status(400).send("Missing Filename or Dimensions,\n Please enter valid parameters.");
        return;
    }  
      
    const widthNum = parseInt(width as string, 10);
    const heightNum = parseInt(height as string, 10);

    try {
    const imagePath = await resizeImage(filename as string, widthNum, heightNum);
        res.sendFile(path.resolve(imagePath));
    } catch (error) {
        console.error("Resize error:", error);
        res.status(500).send("Error resizing image");
    }
});

export default router;
