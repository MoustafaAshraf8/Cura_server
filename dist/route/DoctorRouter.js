"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRouter = void 0;
const express_1 = __importDefault(require("express"));
const route_1 = require("../constant/route");
const DoctorController_1 = require("../controller/DoctorController");
const tryCatch_1 = require("../utility/tryCatch");
const doctorClinicSetId_1 = require("../middleware/doctorClinicSetId");
const DoctorRouter = express_1.default.Router();
exports.DoctorRouter = DoctorRouter;
DoctorRouter.route(route_1.doctorRoute.root).get((0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.getDoctorBySpeciality));
DoctorRouter.route(route_1.doctorRoute.signup).post((0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.signup));
DoctorRouter.route(route_1.doctorRoute.login).post((0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.login));
DoctorRouter.route(route_1.doctorRoute.mySchedule)
    .post(doctorClinicSetId_1.doctorSetVirtualId, (0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.addSchedule))
    .get(doctorClinicSetId_1.doctorSetVirtualId, (0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.getMySchedule));
DoctorRouter.route(route_1.doctorRoute.schedule).get((0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.getScheduleById));
DoctorRouter.route(route_1.doctorRoute.timeSlot).post(doctorClinicSetId_1.doctorSetVirtualId, (0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.addTimeSlot));
DoctorRouter.route(route_1.doctorRoute.profile).get((0, tryCatch_1.tryCatch)(DoctorController_1.DoctorController.getDoctorProfile));
