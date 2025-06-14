"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var sharp_1 = __importDefault(require("sharp"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('we bouta resize in this ho');
});
function resize(imgPath, width, height) {
    var imgName = path_1.default.basename(imgPath, path_1.default.extname(imgPath));
    var outputPath = "images/resized/".concat(imgName, "-resized.jpg");
    return (0, sharp_1.default)(imgPath)
        .resize(width, height)
        .toFile(outputPath)
        .then(function () { return outputPath; })
        .catch(function (err) {
        console.error("Error resizing image: ".concat(err));
        throw err;
    });
}
module.exports = {
    resize: resize,
    routes: routes
};
