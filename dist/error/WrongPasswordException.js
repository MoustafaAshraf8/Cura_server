"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongPasswordException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class WrongPasswordException extends Error {
    constructor() {
        super();
        this.message = "wrong password";
        this.statusCode = StatusCode_1.statusCode.clientError.unothorized;
    }
}
exports.WrongPasswordException = WrongPasswordException;
