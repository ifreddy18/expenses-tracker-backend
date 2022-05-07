"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionAssociations = exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const account_by_currency_1 = require("./account_by_currency");
const trx_category_1 = require("./trx_category");
const trx_status_1 = require("./trx_status");
const trx_type_1 = require("./trx_type");
const user_1 = require("./user");
exports.Transaction = connections_1.default.define('Transaction', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    uid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    datePayment: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'date_payment',
    },
    trxStatusId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_status_id',
    },
    trxTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_type_id',
    },
    accountByCurrencyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'account_by_currency_id',
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    fee: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'transactions',
});
const transactionAssociations = () => {
    exports.Transaction.belongsTo(user_1.User, { foreignKey: 'uid' });
    exports.Transaction.hasOne(trx_category_1.TrxCategory, { foreignKey: 'trxId' });
    exports.Transaction.belongsTo(trx_status_1.TrxStatus, { foreignKey: 'trxStatusId' });
    exports.Transaction.belongsTo(trx_type_1.TrxType, { foreignKey: 'trxTypeId' });
    exports.Transaction.belongsTo(account_by_currency_1.AccountByCurrency, { foreignKey: 'accountByCurrencyId' });
};
exports.transactionAssociations = transactionAssociations;
//# sourceMappingURL=transaction.js.map