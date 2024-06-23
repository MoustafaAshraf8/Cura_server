"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleNotFoundException = void 0;
const StatusCode_1 = require("../../constant/StatusCode");
class ScheduleNotFoundException extends Error {
    constructor() {
        super();
    }
}
exports.ScheduleNotFoundException = ScheduleNotFoundException;
ScheduleNotFoundException.message = "schedule not found";
ScheduleNotFoundException.statusCode = StatusCode_1.statusCode.clientError.notFound;
