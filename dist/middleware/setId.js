"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setId = void 0;
// fake middleware to add id to request object
// id will be added from jwt in real situation
function setId(req, res, next) {
    Object(req).id = 1;
    next();
}
exports.setId = setId;
