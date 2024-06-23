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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable("clinic", {
                clinic_id: {
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER,
                },
                doctor_id: {
                    references: {
                        model: {
                            tableName: "doctor",
                        },
                        key: "doctor_id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    type: Sequelize.INTEGER,
                },
                Name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                City: {
                    allowNull: true,
                    defaultValue: null,
                    type: Sequelize.STRING,
                },
                Longtitude: {
                    allowNull: true,
                    defaultValue: null,
                    type: Sequelize.STRING,
                },
                Latitude: {
                    allowNull: true,
                    defaultValue: null,
                    type: Sequelize.STRING,
                },
                Fee: {
                    allowNull: false,
                    defaultValue: 0,
                    type: Sequelize.STRING,
                },
                PatientCount: {
                    allowNull: false,
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                },
                // Rating: {
                //   allowNull: false,
                //   defaultValue: 0,
                //   type: Sequelize.INTEGER,
                // },
                // createdAt: {
                //   allowNull: false,
                //   type: Sequelize.DATE,
                // },
                // updatedAt: {
                //   allowNull: false,
                //   type: Sequelize.DATE,
                // },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("clinic");
        });
    },
};
