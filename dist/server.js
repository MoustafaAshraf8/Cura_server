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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const route_1 = require("./constant/route");
const errorHandler_1 = require("./middleware/errorHandler");
const index_1 = __importDefault(require("./model/index"));
const DoctorRouter_1 = require("./route/DoctorRouter");
const PatientRouter_1 = require("./route/PatientRouter");
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(route_1.serverRoute.baseUrl, (req, res, next) => {
    console.log("________________");
    next();
});
server.use(route_1.patientRoute.baseUrl, PatientRouter_1.PatientRouter);
server.use(route_1.doctorRoute.baseUrl, DoctorRouter_1.DoctorRouter);
server.get(route_1.serverRoute.baseUrl, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield index_1.default.Patient.findAll({
        include: [{ model: index_1.default.EMR, as: "emr" }],
    });
    res.json(patient);
}));
server.use(errorHandler_1.errorHandler);
function connectToDB(tries) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tries !== 1) {
            yield sleep(5000);
        }
        if (tries >= 3) {
            throw Error("Cannot Connect To DB!!!");
        }
        try {
            yield index_1.default.sequelize.authenticate();
        }
        catch (error) {
            yield connectToDB(++tries);
        }
    });
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectToDB(1);
        server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`server listening on port: 8080`);
        }));
    }
    catch (error) {
        console.error(error);
        process.exit(0);
    }
}))();
