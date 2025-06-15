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
const resizeRoute_1 = __importDefault(require("./utils/resizeRoute"));
const imageRoutes_1 = __importDefault(require("./utils/imageRoutes"));
const cors_1 = __importDefault(require("cors"));
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("ts on?");
});
app.get('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width, 10);
    const height = parseInt(req.query.height, 10);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        res.status(400).send('Invalid width or height parameters.');
        return;
    }
    const imageBuffer = yield (0, sharp_1.default)({
        create: {
            width: width,
            height: height,
            channels: 3,
            background: { r: 200, g: 200, b: 200 },
        },
    })
        .png()
        .toBuffer();
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);
}));
app.use('/resize', resizeRoute_1.default);
app.use('/upload', imageRoutes_1.default);
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
exports.default = app;
