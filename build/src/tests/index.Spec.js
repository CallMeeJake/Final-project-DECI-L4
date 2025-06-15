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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const sharp_1 = __importDefault(require("sharp"));
describe('Testing placeholder Generator endpoints', () => {
    it('should get a status of 200 OK for the placehodler endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/generate?width=300&height=200');
        expect(response.status).toEqual(200);
    }));
    it('should return an image with dimensions 300 x 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = 300;
        const height = 200;
        const response = yield (0, supertest_1.default)(index_1.default)
            .get('/generate')
            .query({ width, height })
            .expect('Content-Type', /png/)
            .expect(200);
        const imageBuffer = response.body;
        const metadata = yield (0, sharp_1.default)(imageBuffer).metadata();
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    }));
});
describe("Testing resize endpoints", () => {
    it('should get a status of 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/resize?filename=fjord&width=300&height=200");
        expect(res.status).toEqual(200);
    }));
});
