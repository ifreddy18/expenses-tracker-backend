"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAssociations = exports.Category = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const trx_category_1 = require("./trx_category");
const user_1 = require("./user");
exports.Category = connections_1.default.define('Category', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    uid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    parentId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        field: 'parent_id',
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    tableName: 'categories'
});
const categoryAssociations = () => {
    exports.Category.hasOne(exports.Category, { foreignKey: 'parentId', onDelete: 'cascade' });
    exports.Category.belongsTo(exports.Category, { foreignKey: 'parentId', as: 'parent', onDelete: 'cascade' });
    exports.Category.belongsTo(user_1.User, { foreignKey: 'uid' });
    exports.Category.hasMany(trx_category_1.TrxCategory, { foreignKey: 'categoryId' });
    exports.Category.hasMany(trx_category_1.TrxCategory, { foreignKey: 'subcategoryId' });
};
exports.categoryAssociations = categoryAssociations;
//# sourceMappingURL=category.js.map