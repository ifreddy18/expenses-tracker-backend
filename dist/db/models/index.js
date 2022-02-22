"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.User = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const contact_1 = require("./contact");
Object.defineProperty(exports, "Contact", { enumerable: true, get: function () { return contact_1.Contact; } });
// Associations
// Users | Contacts
user_1.User.hasMany(contact_1.Contact, { foreignKey: 'uid' });
contact_1.Contact.belongsTo(user_1.User, { foreignKey: 'uid' });
//# sourceMappingURL=index.js.map