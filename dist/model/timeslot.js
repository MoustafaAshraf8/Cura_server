"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TimeSlot extends sequelize_1.Model {
        static associate(models) {
            // TimeSlot.belongsTo(models.Clinic, {
            //   foreignKey: "clinic_id",
            //   as: "clinic",
            //   targetKey: "clinic_id",
            // });
            TimeSlot.belongsTo(models.Schedule, {
                foreignKey: "schedule_id",
                as: "schedule",
                targetKey: "schedule_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            TimeSlot.belongsTo(models.Patient, {
                foreignKey: "patient_id",
                as: "patient",
                targetKey: "patient_id",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            });
        }
    }
    TimeSlot.init({
        timeslot_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        schedule_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        patient_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        // Date: {
        //   allowNull: false,
        //   type: DataTypes.DATEONLY,
        // },
        Start: {
            allowNull: false,
            type: DataTypes.TIME,
        },
        End: {
            allowNull: false,
            type: DataTypes.TIME,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "TimeSlot",
        tableName: "timeslot",
    });
    return TimeSlot;
};
