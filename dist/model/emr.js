"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EMR extends sequelize_1.Model {
        static associate(models) {
            EMR.belongsTo(models.Patient, {
                foreignKey: "patient_id",
                as: "patient",
                targetKey: "patient_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            EMR.hasMany(models.Desease, {
                foreignKey: "emr_id",
                as: "desease",
            });
            EMR.hasMany(models.Surgery, {
                foreignKey: "emr_id",
                as: "surgery",
            });
        }
    }
    EMR.init({
        emr_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        patient_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        tableName: "emr",
        modelName: "EMR",
    });
    return EMR;
};
