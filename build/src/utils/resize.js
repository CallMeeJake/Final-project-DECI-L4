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
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fullImagePath = path_1.default.resolve(__dirname, "../../src/images");
const resizedPath = path_1.default.resolve(__dirname, "../../src/images/resized");
const resizeImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const inputPath = path_1.default.join(fullImagePath, `${filename}.jpg`);
    const outputFilename = `${filename}-${width}x${height}.jpg`;
    const outputPath = path_1.default.join(resizedPath, outputFilename);
    if (!fs_1.default.existsSync(resizedPath)) {
        fs_1.default.mkdirSync(resizedPath, { recursive: true });
    }
    if (fs_1.default.existsSync(outputPath)) {
        console.log(`already processed, Using cached image: ${outputPath}`);
        return outputPath;
    }
    try {
        yield (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .toFile(outputPath);
        return outputPath;
    }
    catch (err) {
        console.error("Error resizing image:", err);
        throw err;
    }
});
exports.resizeImage = resizeImage;
