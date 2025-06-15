"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = require("./resize");
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    console.log("Resize request:", { filename, width, height });
    if (!filename || !width || !height) {
        res.status(400).send("Missing required query parameters.");
        return;
    }
    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);
    try {
        const imagePath = yield (0, resize_1.resizeImage)(filename, widthNum, heightNum);
        res.sendFile(path_1.default.resolve(imagePath));
    }
    catch (error) {
        console.error("Resize error:", error);
        res.status(500).send("Error resizing image");
    }
}));
exports.default = router;
