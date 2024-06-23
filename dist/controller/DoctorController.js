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
exports.DoctorController = void 0;
const WrongPasswordException_1 = require("../error/WrongPasswordException");
const DoctorService_1 = require("../service/DoctorService");
const Hasher_1 = require("../utility/Hasher");
const JWT_1 = require("../utility/JWT");
class DoctorController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorData = Object.assign({}, req.body);
            // to be properly implemented in model setter using hooks
            doctorData.Password = yield Hasher_1.Hasher.hashPassword(doctorData.Password);
            const doctor = yield DoctorService_1.DoctorService.signup(doctorData);
            const jwt = yield JWT_1.JWT.createAccessToken({ id: doctor.doctor_id });
            res.json({ accessToken: jwt });
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const credential = Object.assign({}, req.body);
            const doctor = yield DoctorService_1.DoctorService.login(credential);
            console.log(doctor);
            const verified = yield Hasher_1.Hasher.verifyPassword(credential.Password, doctor.Password);
            if (!verified) {
                throw new WrongPasswordException_1.WrongPasswordException();
            }
            const jwt = yield JWT_1.JWT.createAccessToken({ id: doctor.doctor_id });
            res.json(doctor);
        });
    }
    static addSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Object(req).doctor_id;
            console.log(`doctor_id --> ${doctor_id}`);
            const schedule = Object.assign({}, req.body);
            console.log(`schedule: ${schedule}`);
            const result = yield DoctorService_1.DoctorService.addSchedule(doctor_id, schedule);
            res.statusCode = 200;
            res.json(result);
        });
    }
    static getMySchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Object(req).doctor_id;
            const schedule = yield DoctorService_1.DoctorService.getMySchedule(doctor_id);
            res.statusCode = 200;
            res.json(schedule);
        });
    }
    static addTimeSlot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Object(req).doctor_id;
            const timeSlot = Object.assign({}, req.body);
            const result = yield DoctorService_1.DoctorService.addTimeSlot(doctor_id, timeSlot);
            res.statusCode = 200;
            res.json(result);
        });
    }
    static getScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Number(req.params.id);
            const schedule = yield DoctorService_1.DoctorService.getScheduleById(doctor_id);
            console.log(schedule);
            res.statusCode = 200;
            res.json(schedule);
        });
    }
    static getDoctorBySpeciality(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const speciality = req.query.speciality;
            const result = yield DoctorService_1.DoctorService.getDoctorBySpeciality(speciality);
            res.json(result);
        });
    }
    static getDoctorById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Number(req.params.id);
            const result = yield DoctorService_1.DoctorService.getDoctorProfile(doctor_id);
            if (!result) {
                res.json({
                    code: 404,
                    message: "Doctor not found",
                });
            }
            res.json(result);
        });
    }
    static getDoctorProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor_id = Number(req.params.id);
            const doctorData = yield DoctorService_1.DoctorService.getDoctorProfile(doctor_id);
            res.json(doctorData);
        });
    }
}
exports.DoctorController = DoctorController;
