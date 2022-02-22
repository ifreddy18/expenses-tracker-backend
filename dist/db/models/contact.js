"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
exports.Contact = connections_1.default.define('Contact', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    uid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    }
}, {
    tableName: 'contacts'
});
//# sourceMappingURL=contact.js.map