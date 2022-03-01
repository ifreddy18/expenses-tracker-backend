"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = exports.contactsRoutes = exports.authRoutes = void 0;
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
exports.authRoutes = auth_routes_1.default;
const contacts_routes_1 = __importDefault(require("./contacts/contacts.routes"));
exports.contactsRoutes = contacts_routes_1.default;
const users_routes_1 = __importDefault(require("./users/users.routes"));
exports.usersRoutes = users_routes_1.default;
//# sourceMappingURL=index.js.map