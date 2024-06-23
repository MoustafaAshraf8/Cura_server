"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = void 0;
const express_1 = __importDefault(require("express"));
const route_1 = require("../constant/route");
// import { PatientController } from "../controller/PatientController";
const PatientController_1 = require("../controller/PatientController");
const tryCatch_1 = require("../utility/tryCatch");
const JWT_1 = require("../utility/JWT");
const PatientRouter = express_1.default.Router();
exports.PatientRouter = PatientRouter;
const patientController = new PatientController_1.PatientController();
// PatientRouter.route(patientRoute.root).get(tryCatch(patientController.getAll));
PatientRouter.route(route_1.patientRoute.signup).post((0, tryCatch_1.tryCatch)(patientController.signup));
PatientRouter.route(route_1.patientRoute.signin).post((0, tryCatch_1.tryCatch)(patientController.signin));
PatientRouter.route(route_1.patientRoute.payOnline).post(
//JWT.verifyAccessToken,
(0, tryCatch_1.tryCatch)(patientController.payOnline));
// PatientRouter.route(patientRoute.emr).get(
//   setId,
//   tryCatch(patientController.getEMR)
// );
PatientRouter.route(route_1.patientRoute.reserveTimeSlot).post(JWT_1.JWT.verifyAccessToken, (0, tryCatch_1.tryCatch)(patientController.reserveTimeSlot));
PatientRouter.route(route_1.patientRoute.schedule).get(patientController.getSchedule);
