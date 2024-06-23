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
exports.PatientService = void 0;
const MailService_1 = require("./MailService");
const Service_1 = require("./Service");
const PatientRepositoryImplementation_1 = require("../repository/PatientRepositoryImplementation");
const Patient_1 = require("../class/Patient");
const JWT_1 = require("../utility/JWT");
const DoctorService_1 = require("./DoctorService");
const ClinicDTO_1 = require("../class/ClinicDTO");
const Payment_1 = require("../utility/Payment");
class PatientService extends Service_1.Service {
    constructor() {
        super(new PatientRepositoryImplementation_1.PatientRepositoryImplementation());
        this.signin = (user) => __awaiter(this, void 0, void 0, function* () {
            const patient = yield this.repositoryImplementaion.signin(user);
            patient.accessToken = JWT_1.JWT.createAccessToken({
                id: patient.patient_id,
            });
            return patient;
        });
        this.signup = (patient) => __awaiter(this, void 0, void 0, function* () {
            const newPatient = yield this.repositoryImplementaion.signup(patient);
            newPatient.accessToken = JWT_1.JWT.createAccessToken({
                id: newPatient.patient_id,
            });
            yield MailService_1.MailService.sendMail(newPatient.Email);
            return newPatient;
        });
        this.reserveTimeSlot = (timeSlot) => __awaiter(this, void 0, void 0, function* () {
            // 1- authorize
            yield this.repositoryImplementaion.authorize(timeSlot.patient_id);
            // 2- reserve
            const updatedTimeSlot = yield DoctorService_1.DoctorService.reserveTimeSlot(timeSlot);
            return updatedTimeSlot;
        });
        this.payOnline = (clinicDTO, patient_id) => __awaiter(this, void 0, void 0, function* () {
            const patient = new Patient_1.Patient({});
            const clinic = new ClinicDTO_1.ClinicDTO({});
            // const patient: Patient = await (
            //   this.repositoryImplementaion as PatientRepositoryImplementation
            // ).authorize(patient_id as number);
            // const clinic: ClinicDTO = await DoctorService.getClinicData(clinicDTO);
            const payment = new Payment_1.Payment(clinic, patient);
            const URL = yield payment.getPaymentKey();
            return URL;
        });
        this.getSchedule = (patient_id) => __awaiter(this, void 0, void 0, function* () {
            const result = yield DoctorService_1.DoctorService.getPatientSchedule(patient_id);
            return result;
        });
    }
}
exports.PatientService = PatientService;
