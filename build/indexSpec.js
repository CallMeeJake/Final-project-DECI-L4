"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_ts_1 = __importDefault(require("..src/index.ts"));
it("myFunc(7, 2) to equal 14", function () {
    index_ts_1.default.myFunc(7, 2).toEqual(14);
});
