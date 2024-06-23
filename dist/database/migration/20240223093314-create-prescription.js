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
            yield queryInterface.createTable("prescription", {
                prescription_id: {
                    primaryKey: true,
                    autoIncrement: true,
                    type: Sequelize.INTEGER,
                },
                desease_id: {
                    references: {
                        model: {
                            tableName: "desease",
                        },
                        key: "desease_id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                    type: Sequelize.INTEGER,
                },
                Name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                Dose: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                Frequency: {
                    allowNull: false,
                    defaultValue: 24,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("NOW()"),
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    defaultValue: Sequelize.literal("NOW()"),
                    type: Sequelize.DATE,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("prescription");
        });
    },
};
