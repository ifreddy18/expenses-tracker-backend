"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const { db_name, db_username, db_password, db_host, db_port } = config_1.default;
const db = new sequelize_1.Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
    port: db_port
});
exports.default = db;
//# sourceMappingURL=connections.js.map