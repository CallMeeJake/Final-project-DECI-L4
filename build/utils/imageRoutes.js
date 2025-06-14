"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_1 = __importDefault(require("./middleware/upload"));
var routes = express_1.default.Router();
routes.post('/', upload_1.default.single("resizant"), function (req, res) {
    if (!req.file) {
        res.status(400).send("Please upload a file or upload a file with the correct extension (.jpg)");
        return;
    }
    res.status(200).send('File uploaded successfully');
});
exports.default = routes;
