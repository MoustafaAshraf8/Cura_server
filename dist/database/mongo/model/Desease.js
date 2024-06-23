"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Desease = exports.deseaseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Prescription_1 = require("./Prescription");
exports.deseaseSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        auto: true,
    },
    diagnose: {
        type: String,
    },
    note: {
        type: String,
    },
    prescription: {
        type: [Prescription_1.prescriptionSchema],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateddAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Desease = mongoose_1.default.model("Desease", exports.deseaseSchema, "Desease");
console.log("Desease model");
