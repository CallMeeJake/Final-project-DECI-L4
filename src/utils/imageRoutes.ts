import express from "express";
import upload from "./middleware/upload"
import multer from "multer";


const routes = express.Router();

routes.post('/', (req, res) => {
  upload.single('resizant')(req, res, (err) => {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    res.json({ filename: req.file.filename });
  });
})

export default routes;