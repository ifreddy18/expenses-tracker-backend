"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const banks_routes_1 = __importDefault(require("./banks/banks.routes"));
const accounts_routes_1 = __importDefault(require("./accounts/accounts.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const categories_routes_1 = __importDefault(require("./categories/categories.routes"));
const contacts_routes_1 = __importDefault(require("./contacts/contacts.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
// API version
const apiVersion1 = '/api/v1';
const currentApiPath = apiVersion1;
exports.routes = [
    { router: banks_routes_1.default, path: currentApiPath + '/bank' },
    { router: accounts_routes_1.default, path: currentApiPath + '/account' },
    { router: auth_routes_1.default, path: currentApiPath },
    { router: categories_routes_1.default, path: currentApiPath + '/category' },
    { router: contacts_routes_1.default, path: currentApiPath + '/contacts' },
    { router: users_routes_1.default, path: currentApiPath + '/users' },
];
//# sourceMappingURL=index.js.map