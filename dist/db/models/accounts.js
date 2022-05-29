"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountByCurrencyAssociations = exports.AccountByCurrency = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const account_1 = require("./account");
const currency_1 = require("./currency");
const transaction_1 = require("./transaction");
exports.AccountByCurrency = connections_1.default.define('AccountByCurrency', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    accountId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'account_id',
    },
    currencyCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'currency_code',
    },
}, {
    tableName: 'accounts_by_currencies',
});
const accountByCurrencyAssociations = () => {
    exports.AccountByCurrency.belongsTo(currency_1.Currency, { foreignKey: 'currencyCode' });
    exports.AccountByCurrency.belongsTo(account_1.Account, { foreignKey: 'accountId' });
    exports.AccountByCurrency.hasMany(transaction_1.Transaction, { foreignKey: 'accountByCurrencyId' });
};
exports.accountByCurrencyAssociations = accountByCurrencyAssociations;
//# sourceMappingURL=accounts.js.map