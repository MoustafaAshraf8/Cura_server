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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const index_1 = __importDefault(require("../model/index"));
const sequelize_1 = require("sequelize");
const UserNotFoundException_1 = require("../error/UserNotFoundException");
const ScheduleNotFoundException_1 = require("../error/doctorException/ScheduleNotFoundException");
const ForbiddenAccessException_1 = require("../error/ForbiddenAccessException");
const TimeSlot_1 = require("../class/TimeSlot");
const ClinicDTO_1 = require("../class/ClinicDTO");
const ClinicNotFoundException_1 = require("../error/doctorException/ClinicNotFoundException");
class DoctorService {
    static login(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorData = yield index_1.default.Doctor.findOne({
                where: {
                    [sequelize_1.Op.and]: [{ Email: credential.Email }],
                },
                // attributes: ["patient_id", "Password"],
                include: { model: index_1.default.Speciality, as: "speciality" },
            });
            if (!doctorData) {
                throw new UserNotFoundException_1.UserNotFoundException();
            }
            const doctor = doctorData.dataValues;
            return doctor;
        });
    }
    static signup(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor signup service");
            const doctorData = yield index_1.default.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const doctorData = yield index_1.default.Doctor.create(doctor);
                const clinic = yield index_1.default.Clinic.create({
                    doctor_id: doctorData.dataValues.doctor_id,
                    Name: doctorData.dataValues.FirstName + "'s " + "clinic",
                });
                return doctorData.dataValues;
            }));
            return doctorData;
        });
    }
    static addSchedule(doctor_id, schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor addSchedule service");
            const clinic_id = yield index_1.default.Clinic.findOne({
                where: {
                    doctor_id: doctor_id,
                },
                attributes: ["clinic_id"],
            });
            if (clinic_id == null) {
                throw new UserNotFoundException_1.UserNotFoundException();
            }
            const scheduleObj = Object.assign({ clinic_id: clinic_id.dataValues.clinic_id }, schedule);
            const scheduleData = yield index_1.default.Schedule.create(scheduleObj);
            if (scheduleData == null) {
                throw new Error();
            }
            return scheduleData.dataValues;
        });
    }
    static getMySchedule(doctor_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor getSchedule service");
            const clinic_id = yield index_1.default.Clinic.findOne({
                where: {
                    doctor_id: doctor_id,
                },
                attributes: ["clinic_id"],
            });
            if (clinic_id == null) {
                throw UserNotFoundException_1.UserNotFoundException;
            }
            const scheduleData = yield index_1.default.Schedule.findAll({
                where: {
                    clinic_id: clinic_id.dataValues.clinic_id,
                },
                attributes: {
                    exclude: ["clinic_id"],
                },
            });
            if (scheduleData == null) {
                throw new ScheduleNotFoundException_1.ScheduleNotFoundException();
            }
            return scheduleData;
        });
    }
    static getScheduleById(doctor_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor getSchedule service");
            const clinic_id = yield index_1.default.Clinic.findOne({
                where: {
                    doctor_id: doctor_id,
                },
                attributes: ["clinic_id"],
            });
            if (clinic_id == null) {
                throw UserNotFoundException_1.UserNotFoundException;
            }
            const scheduleData = yield index_1.default.Schedule.findAll({
                include: {
                    association: "timeslot",
                    attributes: ["timeslot_id", "Start", "End"],
                },
                where: {
                    clinic_id: clinic_id.dataValues.clinic_id,
                },
                attributes: {
                    exclude: ["clinic_id"],
                },
            });
            if (scheduleData == null) {
                throw ScheduleNotFoundException_1.ScheduleNotFoundException;
            }
            return scheduleData;
        });
    }
    static getDoctorBySpeciality(speciality) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorList = yield index_1.default.Doctor.findAll({
                include: {
                    association: "speciality",
                    attributes: [],
                    where: { Name: speciality },
                },
                attributes: [
                    "doctor_id",
                    "FirstName",
                    "LastName",
                    "Gender",
                    "Rating",
                    "Experience",
                ],
            });
            return doctorList;
        });
    }
    static addTimeSlot(doctor_id, timeSlot) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor addTimeSlot service");
            const timeSlotData = yield index_1.default.TimeSlot.create(timeSlot);
            return timeSlotData.dataValues;
        });
    }
    static getDoctorProfile(doctor_id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("doctor getProfile service");
            const doctorData = yield index_1.default.Doctor.findOne({
                where: {
                    doctor_id: doctor_id,
                },
                include: [
                    {
                        association: "speciality",
                    },
                    {
                        association: "clinic",
                        attributes: {
                            exclude: ["doctor_id"],
                        },
                        include: [
                            { association: "schedule", include: [{ association: "timeslot" }] },
                        ],
                    },
                ],
                attributes: {
                    exclude: ["Password", "speciality_id", "DOB"],
                },
            });
            if (doctorData == null) {
                throw UserNotFoundException_1.UserNotFoundException;
            }
            return doctorData;
        });
    }
    static reserveTimeSlot(targetTimeSlot) {
        return __awaiter(this, void 0, void 0, function* () {
            // const timeSlot = db.TimeSlot.findOne({
            //    where:{
            //       timeslot_id:timeslot_id
            //    }
            // });
            // await timeSlot.update({patient_id:patient_id});
            // timeSlot.save();
            //  const timeSlot = await db.TimeSlot.update(
            //    { patient_id: patient_id },
            //    {
            //      where: {
            //        timeslot_id: timeslot_id,
            //        patient_id: null,
            //      },
            //    }
            //  );
            //  console.log("-------------------------");
            //  console.log(timeSlot);
            //  if (timeSlot[0] == 0) throw new ForbiddenAccessException();
            const timeSlotObj = yield index_1.default.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const timeslot = yield index_1.default.TimeSlot.findOne({
                    where: {
                        timeslot_id: targetTimeSlot.timeslot_id,
                    },
                });
                if (timeslot.patient_id != null) {
                    throw new ForbiddenAccessException_1.ForbiddenAccessException();
                }
                yield timeslot.update({ patient_id: targetTimeSlot.patient_id });
                yield timeslot.save();
                return timeslot.dataValues;
            }));
            return new TimeSlot_1.TimeSlot(timeSlotObj);
        });
    }
    static getClinicData(clinicDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const clinic = yield index_1.default.Clinic.findOne({
                where: {
                    clinic_id: clinicDTO.clinic_id,
                },
            });
            if (clinic == null) {
                throw new ClinicNotFoundException_1.ClinicNotFoundException();
            }
            return new ClinicDTO_1.ClinicDTO(clinic);
        });
    }
    static getPatientSchedule(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeSlot = yield index_1.default.TimeSlot.findAll({
                // raw: true,
                // include: [
                //   {
                //     association: "schedule",
                //     as: "schedule",
                //     include: [
                //       {
                //         association: "clinic",
                //         as: "clinic",
                //         include: [
                //           {
                //             association: "doctor",
                //             as: "doctor",
                //           },
                //         ],
                //       },
                //     ],
                //   },
                // ],
                where: {
                    patient_id: patient_id,
                },
                include: [
                    {
                        association: "schedule",
                        include: [
                            { association: "clinic", include: [{ association: "doctor" }] },
                        ],
                    },
                ],
            });
            console.log(timeSlot);
            return timeSlot;
        });
    }
}
exports.DoctorService = DoctorService;
