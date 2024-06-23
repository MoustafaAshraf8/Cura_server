"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenAccessException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class ForbiddenAccessException extends Error {
    constructor() {
        super(...arguments);
        this.message = "forbidden access";
        this.statusCode = StatusCode_1.statusCode.clientError.forbidden;
    }
}
exports.ForbiddenAccessException = ForbiddenAccessException;
