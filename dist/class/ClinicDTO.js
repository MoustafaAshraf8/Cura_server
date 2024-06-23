"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicDTO = void 0;
class ClinicDTO {
    constructor(json) {
        this.clinic_id = json.clinic_id || null;
        this.Fee = json.Fee || null;
    }
}
exports.ClinicDTO = ClinicDTO;
