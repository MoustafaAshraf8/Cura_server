"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateError = void 0;
const InvalidDataTypeException_1 = require("../error/InvalidDataTypeException");
const InvalidDateFormatException_1 = require("../error/InvalidDateFormatException");
const InvalidPayLoadException_1 = require("../error/InvalidPayLoadException");
const MissingDataFieldException_1 = require("../error/MissingDataFieldException");
const validateError = (error) => {
    console.log(error[0].code);
    switch (error[0].code) {
        case "string.base": {
            return new InvalidDataTypeException_1.InvalidDataTypeException();
        }
        case "number.base": {
            return new InvalidDataTypeException_1.InvalidDataTypeException();
        }
        case "date.greater": {
            return new InvalidDateFormatException_1.InvalidDateException();
        }
        case "date.format": {
            return new InvalidDateFormatException_1.InvalidDateException();
        }
        // A required value wasn't present.
        case "any.required": {
            return new MissingDataFieldException_1.MissingDataFieldException();
        }
        // A value was present while it wasn't expected.
        case "any.unknown": {
            return new InvalidPayLoadException_1.InvalidPayLoadException();
        }
        default: {
            return new InvalidDataTypeException_1.InvalidDataTypeException();
        }
    }
};
exports.validateError = validateError;
