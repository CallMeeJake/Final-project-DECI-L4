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
const resize_1 = require("../../utils/resize");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
describe('Testing image processing', () => {
    it('dimensions of image should be 300 x 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = "fjord";
        const width = 300;
        const height = 200;
        const outputPath = path_1.default.resolve(`./images/resized/${filename}-${width}x${height}.jpg`);
        yield (0, resize_1.resizeImage)(filename, width, height);
        const metadata = yield (0, sharp_1.default)(outputPath).metadata();
        expect(`${metadata.width} x ${metadata.height}`).toEqual("300 x 200");
    }));
});
