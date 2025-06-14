"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resize_1 = __importDefault(require("../src/utils/resize"));
var imageRoutes_1 = __importDefault(require("../src/utils/imageRoutes"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    res.send("ts on?");
});
app.use('/resize', resize_1.default.routes);
app.use('/upload', imageRoutes_1.default);
app.listen(port, function () {
    console.log("Server started on http://localhost:".concat(port));
});
exports.default = app;
