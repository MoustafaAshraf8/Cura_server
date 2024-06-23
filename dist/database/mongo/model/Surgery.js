"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Surgery = exports.surgerySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.surgerySchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        auto: true,
    },
    scan: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
    },
    name: {
        type: String,
        required: true,
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
exports.Surgery = mongoose_1.default.model("Surgery", exports.surgerySchema, "Surgery");
console.log("Surgery model");
