import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import { doctorRoute, patientRoute, serverRoute } from "./constant/route";
import { errorHandler } from "./middleware/errorHandler";
import db from "./model/index";
import { DoctorRouter } from "./route/DoctorRouter";
import { PatientRouter } from "./route/PatientRouter";
dotenv.config();
const port = process.env.PORT || 8080;
const server: Application = express();

server.use(express.json());
server.use(
  serverRoute.baseUrl,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("________________");
    next();
  }
);
server.use(patientRoute.baseUrl, PatientRouter);
server.use(doctorRoute.baseUrl, DoctorRouter);

server.get(
  serverRoute.baseUrl,
  async (req: Request, res: Response, next: NextFunction) => {
    const patient = await db.Patient.findAll({
      include: [{ model: db.EMR, as: "emr" }],
    });
    res.json(patient);
  }
);

server.use(errorHandler);

async function connectToDB(tries: number) {
  await sleep(5000);
  if (tries >= 3) {
    throw Error("Cannot Connect To DB!!!");
  }
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    await connectToDB(++tries);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  try {
    await connectToDB(1);
    server.listen(port, async () => {
      console.log(`server listening on port: 8080`);
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
