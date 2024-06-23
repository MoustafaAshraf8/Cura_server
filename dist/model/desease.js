"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Desease extends sequelize_1.Model {
        static associate(models) {
            Desease.hasMany(models.Prescription, {
                foreignKey: "desease_id",
                as: "prescription",
            });
            Desease.belongsTo(models.EMR, {
                foreignKey: "desease_id",
                as: "emr",
                targetKey: "emr_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Desease.init({
        desease_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        emr_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Diagnose: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        Note: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Desease",
        tableName: "desease",
    });
    return Desease;
};
