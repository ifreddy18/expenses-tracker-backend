"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountAssociations = exports.Account = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const account_by_currency_1 = require("./account_by_currency");
const user_1 = require("./user");
exports.Account = connections_1.default.define('Account', {
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
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
}, {
    tableName: 'accounts'
});
const accountAssociations = () => {
    exports.Account.belongsTo(user_1.User, { foreignKey: 'uid' });
    exports.Account.hasMany(account_by_currency_1.AccountByCurrency, { foreignKey: 'account_id' });
};
exports.accountAssociations = accountAssociations;
//# sourceMappingURL=accounts.js.map