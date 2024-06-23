"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Hasher_1 = require("../utility/Hasher");
module.exports = (sequelize, DataTypes) => {
    class Patient extends sequelize_1.Model {
        static associate(models) {
            Patient.hasOne(models.EMR, {
                foreignKey: "patient_id",
                as: "emr",
            });
            Patient.hasMany(models.PatientPhoneNumber, {
                foreignKey: "patient_id",
                as: "patientphonenumber",
            });
            Patient.hasMany(models.TimeSlot, {
                foreignKey: "patient_id",
                as: "timeslot",
            });
        }
    }
    Patient.init({
        patient_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        FirstName: {
            type: DataTypes.STRING,
        },
        LastName: {
            type: DataTypes.STRING,
        },
        Email: {
            allowNull: false,
            unique: true,
            //   validate: {
            //     isEmail: true,
            //   },
            type: DataTypes.STRING,
        },
        Password: {
            allowNull: false,
            set(value) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Storing passwords in plaintext in the database is terrible.
                    // Hashing the value with an appropriate cryptographic hash function is better.
                    //  const hashed = await Hasher.hashPassword(value);
                    //  console.log(hashed);
                    this.setDataValue("Password", value);
                });
            },
            type: DataTypes.STRING,
        },
        Gender: {
            defaultValue: "male",
            type: DataTypes.STRING,
        },
        DOB: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.DATE,
        },
    }, {
        // hooks: {
        //   afterCreate: async (record, options) => {
        //     delete record.dataValues.Password;
        //   },
        // },
        sequelize,
        timestamps: false,
        modelName: "Patient",
        tableName: "patient",
    });
    Patient.beforeCreate((patient) => __awaiter(void 0, void 0, void 0, function* () {
        patient.Password = yield Hasher_1.Hasher.hashPassword(patient.Password);
    }));
    return Patient;
};
