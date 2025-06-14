"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var app = (0, express_1.default)();
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve(__dirname, '../../images/uploads'));
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var fileExt = path_1.default.extname(file.originalname).toLowerCase();
        if (fileExt.toLowerCase() === '.jpg') {
            cb(null, true);
        }
        else {
            cb(new Error("Please use the correct extensions (.jpg)"));
        }
    }
});
exports.default = upload;
