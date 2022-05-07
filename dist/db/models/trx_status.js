"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxStatusAssociations = exports.TrxStatus = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const transaction_1 = require("./transaction");
exports.TrxStatus = connections_1.default.define('TrxStatus', {
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
    tableName: 'trx_status',
    timestamps: false,
});
const trxStatusAssociations = () => {
    exports.TrxStatus.hasMany(transaction_1.Transaction, { foreignKey: 'trxStatusId' });
};
exports.trxStatusAssociations = trxStatusAssociations;
//# sourceMappingURL=trx_status.js.map