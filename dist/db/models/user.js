"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAssociations = exports.User = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const bank_1 = require("./bank");
const category_1 = require("./category");
const contact_1 = require("./contact");
const transaction_1 = require("./transaction");
exports.User = connections_1.default.define('User', {
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
const userAssociations = () => {
    exports.User.hasMany(contact_1.Contact, { foreignKey: 'uid' });
    exports.User.hasMany(category_1.Category, { foreignKey: 'uid' });
    exports.User.hasMany(bank_1.Bank, { foreignKey: 'uid' });
    exports.User.hasMany(transaction_1.Transaction, { foreignKey: 'uid' });
};
exports.userAssociations = userAssociations;
//# sourceMappingURL=user.js.map