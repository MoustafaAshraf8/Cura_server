"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const PatientService_1 = require("../service/PatientService");
const Controller_1 = require("./Controller");
const PatientSignUpSchema_1 = require("../validation/PatientSignUpSchema");
const Patient_1 = require("../class/Patient");
const StatusCode_1 = require("../constant/StatusCode");
const UserValidationSchema_1 = require("../validation/UserValidationSchema");
const User_1 = require("../class/User");
const TimeSlotReservationSchema_1 = require("../validation/TimeSlotReservationSchema");
const TimeSlot_1 = require("../class/TimeSlot");
const PaymentSchema_1 = require("../validation/PaymentSchema");
const ClinicDTO_1 = require("../class/ClinicDTO");
class PatientController extends Controller_1.Controller {
    // implements PatientControllerInterface
    constructor() {
        super(new PatientService_1.PatientService());
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("new PatientController");
            const validation = yield PatientSignUpSchema_1.PatientSignUpSchema.validateAsync(req.body);
            const patient = new Patient_1.Patient(validation);
            console.log(patient);
            const newPatient = yield this.service.signup(patient);
            console.log(newPatient);
            res.statusCode = StatusCode_1.statusCode.success.ok;
            res.json(newPatient);
        });
        this.signin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = yield UserValidationSchema_1.UserValidationSchema.validateAsync(req.body);
            const user = new User_1.User(validation);
            const patient = yield this.service.signin(user);
            res.statusCode = StatusCode_1.statusCode.success.ok;
            res.json(patient);
        });
        this.reserveTimeSlot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = yield TimeSlotReservationSchema_1.TimeSlotReservationSchema.validateAsync(req.body);
            const timeslot_id = validation.timeslot_id;
            const patient_id = Number(Object(req).user_id);
            const timeSlot = new TimeSlot_1.TimeSlot({
                timeslot_id: timeslot_id,
                patient_id: patient_id,
            });
            const updatedTimeSlot = yield this.service.reserveTimeSlot(timeSlot);
            res.statusCode = StatusCode_1.statusCode.success.ok;
            res.json(updatedTimeSlot);
        });
        this.payOnline = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const validation = yield PaymentSchema_1.PaymentSchema.validateAsync(req.body);
            const clinicDTO = new ClinicDTO_1.ClinicDTO(validation);
            //const patient = new Patient(Number(Object(req).user_id));
            const URL = yield this.service.payOnline(clinicDTO, Number(Object(req).user_id));
            res.statusCode = StatusCode_1.statusCode.redirect.seeOther;
            res.redirect(URL);
        });
        this.getSchedule = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const patient_id = Number(req.body.patient_id);
            const result = yield this.service.getSchedule(patient_id);
            res.json(result);
        });
    }
}
exports.PatientController = PatientController;
