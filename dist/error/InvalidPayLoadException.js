"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPayLoadException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidPayLoadException extends Error {
    constructor() {
        super();
        this.message = "invalid payload";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.InvalidPayLoadException = InvalidPayLoadException;
