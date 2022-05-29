"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyAssociations = exports.Currency = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const account_by_currency_1 = require("./account_by_currency");
exports.Currency = connections_1.default.define('Currency', {
    code: {
        primaryKey: true,
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(8),
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subdivision: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'currencies',
    timestamps: false,
});
const currencyAssociations = () => {
    exports.Currency.hasMany(account_by_currency_1.AccountByCurrency, { foreignKey: 'currency_code' });
};
exports.currencyAssociations = currencyAssociations;
//# sourceMappingURL=currencies.js.map