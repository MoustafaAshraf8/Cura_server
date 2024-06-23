"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDateException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidDateException extends Error {
    constructor() {
        super();
        this.message = "invalid date";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.InvalidDateException = InvalidDateException;
