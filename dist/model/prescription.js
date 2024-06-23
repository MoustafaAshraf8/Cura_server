"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Prescription extends sequelize_1.Model {
        static associate(models) {
            Prescription.belongsTo(models.Desease, {
                foreignKey: "desease_id",
                as: "desease",
                targetKey: "desease_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Prescription.init({
        prescription_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        desease_id: {
            type: DataTypes.INTEGER,
        },
        Name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        Dose: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Frequency: {
            allowNull: false,
            defaultValue: 24,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "Prescription",
        tableName: "prescription",
    });
    return Prescription;
};
