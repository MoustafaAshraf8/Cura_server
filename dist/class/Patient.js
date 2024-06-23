"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
class Patient {
    constructor(json) {
        this.patient_id = json.patient_id || null;
        this.FirstName = json.FirstName || null;
        this.LastName = json.LastName || null;
        this.Email = json.Email || null;
        this.Password = json.Password || null;
        this.Gender = json.Gender || null;
        this.DOB = json.DOB || null;
        this.accessToken = json.accessToken || null;
    }
    toJson() {
        return {
            FirstName: this.FirstName,
            LastName: this.LastName,
            Email: this.Email,
            Password: this.Password,
            Gender: this.Gender,
            DOB: this.DOB,
            accessToken: this.accessToken,
        };
    }
}
exports.Patient = Patient;
