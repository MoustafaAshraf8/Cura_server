import { Patient } from "../class/Patient";
export interface PatientRepository {
  signup(patient: Patient): Promise<Patient>;

  //   login(credential: LoginCredential_Interface): Promise<Patient_Interface>;

  //   getEMR(id: number): Promise<EMR_Interface>;

  //   getAll(): Promise<Patient_Interface>;

  //   addSurgery(
  //     surgeryName: String,
  //     //  name: String,
  //     //  file: internal.Readable,
  //     //  info: busboy.FileInfo,
  //     headers: IncomingHttpHeaders
  //   ): Promise<busboy.Busboy>;
}
