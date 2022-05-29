"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountAssociations = exports.Account = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const bank_1 = require("./bank");
const currency_1 = require("./currency");
const transaction_1 = require("./transaction");
exports.Account = connections_1.default.define('Account', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bankId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'bank_id',
    },
    currencyCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'currency_code',
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
}, {
    tableName: 'accounts',
});
const accountAssociations = () => {
    exports.Account.belongsTo(currency_1.Currency, { foreignKey: 'currencyCode' });
    exports.Account.belongsTo(bank_1.Bank, { foreignKey: 'bankId' });
    exports.Account.hasMany(transaction_1.Transaction, { foreignKey: 'accountId' });
};
exports.accountAssociations = accountAssociations;
//# sourceMappingURL=account.js.map