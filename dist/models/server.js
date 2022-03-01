"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Database
const connections_1 = __importDefault(require("../db/connections"));
// Routes
const api_1 = require("../api");
class Server {
    constructor() {
        this.apiVersion = '/api/v1';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8010';
        this.paths = {
            auth: this.apiVersion,
            contacts: this.apiVersion + '/contacts',
            users: this.apiVersion + '/users',
        };
        // Conectar DB
        this.dbConnection();
        // Middelwares
        this.middlewares();
        // Rutas
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Test connection
                yield connections_1.default.authenticate();
                console.log('Database online');
                yield connections_1.default.sync();
                // await db.sync({ alter: true });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, api_1.authRoutes);
        this.app.use(this.paths.contacts, api_1.contactsRoutes);
        this.app.use(this.paths.users, api_1.usersRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map