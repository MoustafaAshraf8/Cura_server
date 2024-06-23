"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidPasswordException extends Error {
    constructor() {
        super();
        this.message = "invalid password";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
