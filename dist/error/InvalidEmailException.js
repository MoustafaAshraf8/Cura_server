"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidEmailException extends Error {
    constructor() {
        super();
        this.message = "invalid email";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.InvalidEmailException = InvalidEmailException;
