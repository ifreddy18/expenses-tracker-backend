"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = exports.Server = void 0;
const server_1 = __importDefault(require("./server"));
exports.Server = server_1.default;
const responseError_1 = require("./responseError");
Object.defineProperty(exports, "ResponseError", { enumerable: true, get: function () { return responseError_1.ResponseError; } });
//# sourceMappingURL=index.js.map