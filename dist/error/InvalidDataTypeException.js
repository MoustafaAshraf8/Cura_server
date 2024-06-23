"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDataTypeException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class InvalidDataTypeException extends Error {
    constructor() {
        super();
        this.message = "invalid data type";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.InvalidDataTypeException = InvalidDataTypeException;
