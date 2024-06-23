"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlot = void 0;
class TimeSlot {
    constructor(json) {
        this.timeslot_id = json.timeslot_id;
        this.schedule_id = json.schedule_id || null;
        this.patient_id = json.patient_id || null;
        this.Start = json.Start || null;
        this.End = json.End || null;
    }
    toJson() {
        return {
            timeslot_id: this.timeslot_id,
            schedule_id: this.schedule_id,
            patient_id: this.patient_id,
            Start: this.Start,
            End: this.End,
        };
    }
}
exports.TimeSlot = TimeSlot;
