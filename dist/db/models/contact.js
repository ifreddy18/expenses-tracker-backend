"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactAssociations = exports.Contact = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const contact_type_1 = require("./contact_type");
const trx_contact_1 = require("./trx_contact");
const user_1 = require("./user");
exports.Contact = connections_1.default.define('Contact', {
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
    contactTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'contact_type_id',
    },
    status: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1
    },
}, {
    tableName: 'contacts'
});
const contactAssociations = () => {
    exports.Contact.belongsTo(user_1.User, { foreignKey: 'uid' });
    exports.Contact.belongsTo(contact_type_1.ContactType, { foreignKey: 'contactTypeId' });
    exports.Contact.hasMany(trx_contact_1.TrxContact, { foreignKey: 'contactId' });
};
exports.contactAssociations = contactAssociations;
//# sourceMappingURL=contact.js.map