"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoute = exports.serverRoute = exports.patientRoute = void 0;
const serverRoute = {
    baseUrl: "/api",
};
exports.serverRoute = serverRoute;
const patientRoute = {
    baseUrl: `${serverRoute.baseUrl}/patient`,
    root: "/",
    signin: "/signin",
    signup: "/signup",
    emr: "/emr",
    reserveTimeSlot: "/reserveTimeSlot",
    schedule: "/schedule",
    payOnline: "/payOnline",
};
exports.patientRoute = patientRoute;
const doctorRoute = {
    baseUrl: `${serverRoute.baseUrl}/doctor`,
    root: "/",
    login: "/login",
    signup: "/signup",
    mySchedule: "/schedule",
    schedule: "/schedule/:id",
    timeSlot: "/timeslot",
    profile: "/profile/:id",
};
exports.doctorRoute = doctorRoute;
