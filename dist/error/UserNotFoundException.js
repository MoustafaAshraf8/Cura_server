"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const StatusCode_1 = require("../constant/StatusCode");
class UserNotFoundException extends Error {
    constructor() {
        super();
        this.message = "user not found";
        this.statusCode = StatusCode_1.statusCode.clientError.notFound;
    }
}
exports.UserNotFoundException = UserNotFoundException;
