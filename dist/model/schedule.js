"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedule extends sequelize_1.Model {
        static associate(models) {
            Schedule.belongsTo(models.Clinic, {
                foreignKey: "clinic_id",
                as: "clinic",
                targetKey: "clinic_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Schedule.hasMany(models.TimeSlot, {
                foreignKey: "schedule_id",
                as: "timeslot",
            });
        }
    }
    Schedule.init({
        schedule_id: {
            allowNull: true,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        // clinic_id: {
        //   references: {
        //     model: {
        //       tableName: "clinic",
        //     },
        //     key: "clinic_id",
        //   },
        //   onDelete: "CASCADE",
        //   onUpdate: "CASCADE",
        //   type: DataTypes.INTEGER,
        // },
        clinic_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Day: {
            allowNull: true,
            defaultValue: "saturday",
            type: DataTypes.ENUM({
                values: [
                    "saturday",
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                ],
            }),
        },
        Date: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: "schedule",
        modelName: "Schedule",
    });
    return Schedule;
};
