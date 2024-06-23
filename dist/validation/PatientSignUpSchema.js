"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientSignUpSchema = void 0;
const InvalidPasswordException_1 = require("../error/InvalidPasswordException");
const InvalidEmailException_1 = require("../error/InvalidEmailException");
const InvalidDataTypeException_1 = require("../error/InvalidDataTypeException");
const ValidateError_1 = require("./ValidateError");
const Joi = require("joi").extend(require("@joi/date"));
exports.PatientSignUpSchema = Joi.object({
    FirstName: Joi.string().required().error(ValidateError_1.validateError),
    LastName: Joi.string().required().error(new InvalidDataTypeException_1.InvalidDataTypeException()),
    Email: Joi.string().email().required().error(new InvalidEmailException_1.InvalidEmailException()),
    Password: Joi.string()
        .min(3)
        // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .error(new InvalidPasswordException_1.InvalidPasswordException()),
    Gender: Joi.string().required().error(new InvalidDataTypeException_1.InvalidDataTypeException()),
    DOB: Joi.date().iso().greater("now").required().error(ValidateError_1.validateError),
});
