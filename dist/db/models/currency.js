"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyAssociations = exports.Currency = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const account_1 = require("./account");
const currency_type_1 = require("./currency_type");
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
    currencyTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'currency_type_id',
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
}, {
    tableName: 'currencies',
    timestamps: false,
});
const currencyAssociations = () => {
    exports.Currency.hasMany(account_1.Account, { foreignKey: 'currencyCode' });
    exports.Currency.belongsTo(currency_type_1.CurrencyType, { foreignKey: 'currencyTypeId' });
};
exports.currencyAssociations = currencyAssociations;
//# sourceMappingURL=currency.js.map