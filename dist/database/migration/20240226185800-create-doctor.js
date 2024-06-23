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
            yield queryInterface.createTable("doctor", {
                doctor_id: {
                    field: "doctor_id",
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                FirstName: {
                    field: "FirstName",
                    type: Sequelize.STRING,
                },
                LastName: {
                    field: "LastName",
                    type: Sequelize.STRING,
                },
                Email: {
                    field: "Email",
                    type: Sequelize.STRING,
                    // unique: true,
                    allowNull: false,
                    //   validate: {
                    //     isEmail: true,
                    //   },
                },
                Password: {
                    field: "Password",
                    type: Sequelize.STRING,
                },
                Gender: {
                    field: "Gender",
                    allowNull: false,
                    defaultValue: "male",
                    type: Sequelize.ENUM({
                        values: ["male", "female"],
                    }),
                },
                DOB: {
                    field: "DOB",
                    allowNull: true,
                    default: null,
                    type: Sequelize.DATE,
                },
                Rating: {
                    field: "Rating",
                    allowNull: false,
                    defaultValue: 0,
                    type: Sequelize.INTEGER,
                },
                Experience: {
                    allowNull: false,
                    defaultValue: 0,
                    type: Sequelize.STRING,
                },
                speciality_id: {
                    references: {
                        model: {
                            tableName: "speciality",
                        },
                        key: "speciality_id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                Approved: {
                    field: "Approved",
                    defaultValue: false,
                    type: Sequelize.BOOLEAN,
                },
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
            yield queryInterface.dropTable("doctor");
        });
    },
};
