"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxCategoryAssociations = exports.TrxCategory = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const transaction_1 = require("./transaction");
exports.TrxCategory = connections_1.default.define('TrxCategory', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
    },
    subcategoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'subcategory_id',
    },
    trxId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_id',
    },
}, {
    tableName: 'trx_category',
});
const trxCategoryAssociations = () => {
    exports.TrxCategory.belongsTo(transaction_1.Transaction, { foreignKey: 'trxId' });
    // TrxCategory.belongsTo(Transaction, { foreignKey: 'categoryId'});
    // TrxCategory.belongsTo(Transaction, { foreignKey: 'subcategoryId'});
};
exports.trxCategoryAssociations = trxCategoryAssociations;
//# sourceMappingURL=trx_category.js.map