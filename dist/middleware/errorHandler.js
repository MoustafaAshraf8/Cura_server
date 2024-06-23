"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const StatusCode_1 = require("../constant/StatusCode");
function errorHandler(exception, req, res, next) {
    console.log(`global error handler: ${exception}`);
    res.statusCode =
        exception.statusCode || StatusCode_1.statusCode.serverError.internalServerError;
    res.json({
        name: exception.name,
        msg: exception.message,
        stack: exception.stack,
    });
}
exports.errorHandler = errorHandler;
