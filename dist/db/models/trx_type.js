"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxTypeAssociations = exports.TrxType = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const transaction_1 = require("./transaction");
const trx_type_group_1 = require("./trx_type_group");
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
    trxTypesGroupId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'trx_types_group_id',
    },
}, {
    tableName: 'trx_types',
    timestamps: false,
});
const trxTypeAssociations = () => {
    exports.TrxType.hasMany(transaction_1.Transaction, { foreignKey: 'trxTypeId' });
    exports.TrxType.belongsTo(trx_type_group_1.TrxTypesGroup, { foreignKey: 'trxTypesGroupId' });
};
exports.trxTypeAssociations = trxTypeAssociations;
//# sourceMappingURL=trx_type.js.map