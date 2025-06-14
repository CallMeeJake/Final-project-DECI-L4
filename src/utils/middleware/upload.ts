import express from "express";
import path from "path";
import multer from "multer";

const app = express()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../images/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ 
  storage,
  fileFilter : function (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt.toLowerCase() === '.jpg') {
      cb(null, true);
    } else {
      cb(new Error("Please use the correct extensions (.jpg)"));
    }
  }
});

export default upload;