import { NextFunction, Request, Response } from "express";
import { WrongPasswordException } from "../error/WrongPasswordException";
import { DoctorService } from "../service/DoctorService";
import { LoginCredential_Interface } from "../type/Generic/LoginCredential_Interface";
import { Doctor_Interface } from "../type/doctor/Doctor_Interface";
import { Schedule_Interface } from "../type/doctor/Schedule_Interface";
import { TimeSlot_Interface } from "../type/doctor/TimeSlot_Interface";
import { Hasher } from "../utility/Hasher";
import { JWT } from "../utility/JWT";
export class DoctorController {
  static async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctorData: Doctor_Interface = { ...req.body };
    // to be properly implemented in model setter using hooks
    doctorData.Password = await Hasher.hashPassword(doctorData.Password);
    const doctor: Doctor_Interface = await DoctorService.signup(doctorData);
    const jwt = await JWT.createAccessToken({ id: doctor.doctor_id });
    res.json({ accessToken: jwt });
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const credential: LoginCredential_Interface = { ...req.body };
    const doctor: Doctor_Interface = await DoctorService.login(credential);

    console.log(doctor);
    const verified: boolean = await Hasher.verifyPassword(
      credential.Password,
      doctor.Password
    );
    if (!verified) {
      throw new WrongPasswordException();
    }
    const jwt = await JWT.createAccessToken({ id: doctor.doctor_id });
    res.json(doctor);
  }

  static async addSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Object(req).doctor_id;
    console.log(`doctor_id --> ${doctor_id}`);
    const schedule: Schedule_Interface = { ...req.body };
    console.log(`schedule: ${schedule}`);
    const result: Schedule_Interface = await DoctorService.addSchedule(
      doctor_id,
      schedule
    );
    res.statusCode = 200;
    res.json(result);
  }

  static async getMySchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Object(req).doctor_id;
    const schedule: Schedule_Interface[] = await DoctorService.getMySchedule(
      doctor_id
    );
    res.statusCode = 200;
    res.json(schedule);
  }

  static async addTimeSlot(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Object(req).doctor_id;
    const timeSlot: TimeSlot_Interface = { ...req.body };

    const result = await DoctorService.addTimeSlot(doctor_id, timeSlot);
    res.statusCode = 200;
    res.json(result);
  }

  static async getScheduleById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Number(req.params.id);
    const schedule: Schedule_Interface[] = await DoctorService.getScheduleById(
      doctor_id
    );
    console.log(schedule);
    res.statusCode = 200;
    res.json(schedule);
  }

  static async getDoctorBySpeciality(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const speciality = req.query.speciality as String;
    const result = await DoctorService.getDoctorBySpeciality(speciality);
    res.json(result);
  }

  static async getDoctorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Number(req.params.id);

    const result = await DoctorService.getDoctorProfile(doctor_id);

    if (!result) {
      res.json({
        code: 404,
        message: "Doctor not found",
      });
    }

    res.json(result);
  }

  static async getDoctorProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const doctor_id: number = Number(req.params.id);
    const doctorData = await DoctorService.getDoctorProfile(doctor_id);
    res.json(doctorData);
  }
}
