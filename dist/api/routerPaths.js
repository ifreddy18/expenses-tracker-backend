"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = exports.currentApiPath = void 0;
const apiVersion1 = '/api/v1';
const currentApiPath = apiVersion1;
exports.currentApiPath = currentApiPath;
const paths = {
    auth: currentApiPath,
    contacts: currentApiPath + '/contacts',
    users: currentApiPath + '/users',
};
exports.paths = paths;
//# sourceMappingURL=routerPaths.js.map