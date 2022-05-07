"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const contacts_routes_1 = __importDefault(require("./contacts/contacts.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
const routes = [
    auth_routes_1.default,
    contacts_routes_1.default,
    users_routes_1.default
];
exports.routes = routes;
//# sourceMappingURL=index.js.map