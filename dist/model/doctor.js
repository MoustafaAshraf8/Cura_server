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
module.exports = (sequelize, DataTypes) => {
    class Doctor extends sequelize_1.Model {
        static associate(models) {
            Doctor.hasOne(models.Clinic, {
                foreignKey: "doctor_id",
                as: "clinic",
            });
            Doctor.belongsTo(models.Speciality, {
                foreignKey: "speciality_id",
                as: "speciality",
                targetKey: "speciality_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Doctor.init({
        doctor_id: {
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
            type: DataTypes.STRING,
        },
        Rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        Experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        speciality_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Approved: {
            defaultValue: false,
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Doctor",
        tableName: "doctor",
    });
    return Doctor;
};
