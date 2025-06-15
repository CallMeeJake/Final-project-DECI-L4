import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs";

const uploadPath = path.resolve(__dirname, "../../images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === '.jpg') {
      cb(null, true);
    } else {
      cb(new Error("Please use the correct extension (.jpg)"));
    }
  }
});

export default upload;
