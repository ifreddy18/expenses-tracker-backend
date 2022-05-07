"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactTypeAssociations = exports.ContactType = void 0;
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../connections"));
const contact_1 = require("./contact");
exports.ContactType = connections_1.default.define('ContactType', {
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
    tableName: 'contact_types',
    timestamps: false,
});
const contactTypeAssociations = () => {
    exports.ContactType.hasMany(contact_1.Contact, { foreignKey: 'contactTypeId' });
};
exports.contactTypeAssociations = contactTypeAssociations;
//# sourceMappingURL=contact_type.js.map