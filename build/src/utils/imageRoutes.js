"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("./middleware/upload"));
const multer_1 = __importDefault(require("multer"));
const routes = express_1.default.Router();
routes.post('/', (req, res) => {
    upload_1.default.single('resizant')(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError || err) {
            return res.status(500).json({ error: err.message });
        }
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }
        res.json({ filename: req.file.filename });
    });
});
exports.default = routes;
