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
const db_1 = __importDefault(require("../db"));
// Routes
const api_1 = require("../api");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8010';
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
                yield db_1.default.authenticate();
                console.log('Database online');
                // await db.sync();
                yield db_1.default.sync({ alter: true });
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
        for (const { path, router } of api_1.routes)
            this.app.use(path, router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map