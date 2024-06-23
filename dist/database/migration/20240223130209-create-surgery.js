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
            yield queryInterface.createTable("surgery", {
                surgery_id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                emr_id: {
                    references: {
                        model: {
                            tableName: "emr",
                        },
                        key: "emr_id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    type: Sequelize.INTEGER,
                },
                Name: {
                    allowNull: false,
                    type: Sequelize.STRING,
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
            yield queryInterface.dropTable("surgery");
        });
    },
};
