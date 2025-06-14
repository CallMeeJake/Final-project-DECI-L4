import express from "express";
import multer from "multer";
import upload from "./middleware/upload"

const routes = express.Router();

routes.post('/', upload.single("resizant"), (req, res) => {
    if(!req.file){
       res.status(400).send("Please upload a file or upload a file with the correct extension (.jpg)");
       return;
    }
    res.status(200).send('File uploaded successfully');
})

export default routes;