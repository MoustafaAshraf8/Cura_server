"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Surgery extends sequelize_1.Model {
        static associate(models) {
            Surgery.belongsTo(models.EMR, {
                foreignKey: "surgery_id",
                as: "emr",
                targetKey: "emr_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Surgery.init({
        surgery_id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.STRING,
        },
        emr_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        Name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: "Surgery",
        tableName: "surgery",
    });
    return Surgery;
};
