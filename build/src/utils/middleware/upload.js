"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const uploadPath = path_1.default.resolve(__dirname, "../../images");
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const fileExt = path_1.default.extname(file.originalname).toLowerCase();
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        const fileExt = path_1.default.extname(file.originalname).toLowerCase();
        if (fileExt === '.jpg') {
            cb(null, true);
        }
        else {
            cb(new Error("Please use the correct extension (.jpg)"));
        }
    }
});
exports.default = upload;
