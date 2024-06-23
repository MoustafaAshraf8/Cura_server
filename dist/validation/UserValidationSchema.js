"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const ValidateError_1 = require("./ValidateError");
const joi_1 = __importDefault(require("joi"));
exports.UserValidationSchema = joi_1.default.object({
    Email: joi_1.default.string().email().required().error(ValidateError_1.validateError),
    Password: joi_1.default.string()
        .min(3)
        // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .error(ValidateError_1.validateError),
});
