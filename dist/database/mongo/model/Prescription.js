"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prescription = exports.prescriptionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.prescriptionSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        require: true,
    },
    dose: {
        type: Number,
        require: true,
    },
    frequency: {
        type: Number,
        require: true,
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
exports.Prescription = mongoose_1.default.model("Prescription", exports.prescriptionSchema, "Prescription");
console.log("Prescription model");
