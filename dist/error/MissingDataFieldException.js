"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingDataFieldException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class MissingDataFieldException extends Error {
    constructor() {
        super();
        this.message = "missing data field";
        this.statusCode = StatusCode_1.statusCode.clientError.badRequest;
    }
}
exports.MissingDataFieldException = MissingDataFieldException;
