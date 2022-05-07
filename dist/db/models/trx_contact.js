"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxContactAssociations = exports.TrxContact = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const contact_1 = require("./contact");
exports.TrxContact = connections_1.default.define('TrxContact', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    contactId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'contact_id',
    },
    trxId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_id',
    },
}, {
    tableName: 'trx_contact',
});
const trxContactAssociations = () => {
    exports.TrxContact.belongsTo(contact_1.Contact, { foreignKey: 'contactId' });
};
exports.trxContactAssociations = trxContactAssociations;
//# sourceMappingURL=trx_contact.js.map