"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PatientPhoneNumber extends sequelize_1.Model {
        static associate(models) {
            PatientPhoneNumber.belongsTo(models.Patient, {
                foreignKey: "patient_id",
                as: "patient",
                targetKey: "patient_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    PatientPhoneNumber.init({
        // patientPhoneNumber_id: {
        //   primaryKey: true,
        //   autoIncrement: true,
        //   type: DataTypes.INTEGER,
        // },
        patient_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        PhoneNumber: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "PatientPhoneNumber",
        tableName: "patientphonenumber",
    });
    return PatientPhoneNumber;
};
