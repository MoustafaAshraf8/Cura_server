"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const ValidateError_1 = require("./ValidateError");
const joi_1 = __importDefault(require("joi"));
exports.PaymentSchema = joi_1.default.object({
    clinic_id: joi_1.default.number().required().error(ValidateError_1.validateError),
});
