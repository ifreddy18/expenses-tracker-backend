"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxTypeAssociations = exports.TrxType = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
exports.TrxType = connections_1.default.define('TrxType', {
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
    tableName: 'trx_types',
    timestamps: false,
});
const trxTypeAssociations = () => {
};
exports.trxTypeAssociations = trxTypeAssociations;
//# sourceMappingURL=trx_type%20copy.js.map