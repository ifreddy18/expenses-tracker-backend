"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const User = connections_1.default.define('User', {
    uid: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
}, {
    tableName: 'users'
});
exports.default = User;
//# sourceMappingURL=user.js.map