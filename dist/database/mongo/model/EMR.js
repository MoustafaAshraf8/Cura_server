"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMR = exports.emrSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.emrSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId,
        auto: true,
    },
    patient_id: {
        type: Number,
        required: true,
    },
    desease: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Desease" }],
    },
    surgery: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Surgery" }],
    },
});
exports.EMR = mongoose_1.default.model("EMR", exports.emrSchema, "EMR");
console.log("EMR model");
