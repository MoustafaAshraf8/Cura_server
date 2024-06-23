"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnothorizedUserException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class UnothorizedUserException extends Error {
    constructor() {
        super();
        this.message = "unothorized user";
        this.statusCode = StatusCode_1.statusCode.clientError.unothorized;
    }
}
exports.UnothorizedUserException = UnothorizedUserException;
