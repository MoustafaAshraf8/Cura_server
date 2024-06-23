"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidTokenException extends Error {
    constructor() {
        super();
        this.message = "invalid token";
        this.statusCode = StatusCode_1.statusCode.clientError.unothorized;
    }
}
exports.InvalidTokenException = InvalidTokenException;
