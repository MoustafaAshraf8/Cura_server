"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Speciality extends sequelize_1.Model {
        static associate(models) {
            Speciality.hasMany(models.Doctor, {
                foreignKey: "speciality_id",
                as: "doctor",
            });
        }
    }
    Speciality.init({
        speciality_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        Name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Speciality",
        tableName: "speciality",
    });
    return Speciality;
};
