"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicNotFoundException = void 0;
const StatusCode_1 = require("../../constant/StatusCode");
class ClinicNotFoundException extends Error {
    constructor() {
        super();
        this.message = "clinic not found";
        this.statusCode = StatusCode_1.statusCode.clientError.notFound;
    }
}
exports.ClinicNotFoundException = ClinicNotFoundException;
