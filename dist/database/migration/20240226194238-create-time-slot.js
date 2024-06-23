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
            yield queryInterface.createTable("timeslot", {
                timeslot_id: {
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER,
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
                //   allowNull: false,
                //   type: Sequelize.INTEGER,
                // },
                schedule_id: {
                    references: {
                        model: {
                            tableName: "schedule",
                        },
                        key: "schedule_id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                patient_id: {
                    references: {
                        model: {
                            tableName: "patient",
                        },
                        key: "patient_id",
                    },
                    allowNull: true,
                    defaultValue: null,
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    type: Sequelize.INTEGER,
                },
                // Date: {
                //   allowNull: false,
                //   type: Sequelize.DATEONLY,
                // },
                Start: {
                    allowNull: false,
                    type: Sequelize.TIME,
                },
                End: {
                    allowNull: false,
                    type: Sequelize.TIME,
                },
                // available: {
                //   allowNull: true,
                //   defaultValue: true,
                //   type: Sequelize.BOOLEAN,
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
            yield queryInterface.dropTable("timeslot");
        });
    },
};
