"use strict";
//import { Patient_Interface } from "../type/patient/Patient_Interface";
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
exports.PatientRepositoryImplementation = void 0;
//import { LoginCredential_Interface } from "../type/generic/LoginCredential_Interface";
const sequelize_1 = require("sequelize");
const UserNotFoundException_1 = require("../error/UserNotFoundException");
const Repository_1 = require("./Repository");
const index_1 = __importDefault(require("../model/index"));
const Patient_1 = require("../class/Patient");
const UnothorizedUserException_1 = require("../error/UnothorizedUserException");
class PatientRepositoryImplementation extends Repository_1.Repository {
    constructor() {
        super(index_1.default.Patient);
        this.signin = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patientData = yield index_1.default.Patient.findOne({
                    where: {
                        [sequelize_1.Op.and]: [{ Email: user.Email }],
                    },
                    // attributes: ["patient_id", "Password"],
                });
                const patient = new Patient_1.Patient(patientData.dataValues);
                return patient;
            }
            catch (err) {
                throw UserNotFoundException_1.UserNotFoundException;
            }
        });
        this.signup = (patient) => __awaiter(this, void 0, void 0, function* () {
            const patientData = yield index_1.default.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const patientData = yield this.model.create(patient, {
                    include: [{ model: index_1.default.PatientPhoneNumber, as: "patientphonenumber" }],
                });
                const emr = yield index_1.default.EMR.create({
                    patient_id: patientData.dataValues.patient_id,
                });
                const patientId = patientData.dataValues.patient_id;
                // create mongo data entry
                // const emrMongo = await EMR.create({
                //   patient_id: patientId,
                // });
                return patientData;
            }));
            return new Patient_1.Patient(patientData.dataValues);
        });
        this.authorize = (patient_id) => __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.model.findOne({
                where: {
                    patient_id: patient_id,
                },
            });
            if (patient.dataValues.length == 0)
                throw new UnothorizedUserException_1.UnothorizedUserException();
            return patient;
        });
    }
}
exports.PatientRepositoryImplementation = PatientRepositoryImplementation;
