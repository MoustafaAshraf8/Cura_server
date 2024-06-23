"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorSetVirtualId = void 0;
// fake middleware to add id to request object
// id will be added from jwt in real situation
function doctorSetVirtualId(req, res, next) {
    Object(req).doctor_id = 2;
    next();
}
exports.doctorSetVirtualId = doctorSetVirtualId;
