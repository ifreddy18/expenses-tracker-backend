"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyTypeAssociations = exports.CurrencyType = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const currency_1 = require("./currency");
exports.CurrencyType = connections_1.default.define('CurrencyType', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: 'currency_types',
    timestamps: false,
});
const CurrencyTypeAssociations = () => {
    exports.CurrencyType.hasMany(currency_1.Currency, { foreignKey: 'CurrencyTypeId' });
};
exports.CurrencyTypeAssociations = CurrencyTypeAssociations;
//# sourceMappingURL=currency_type.js.map