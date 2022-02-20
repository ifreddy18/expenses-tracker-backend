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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const models_1 = require("../db/models");
const { jwtSecretPrivateKey } = config_1.default;
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const jwtPayload = jsonwebtoken_1.default.verify(token, jwtSecretPrivateKey);
        if (typeof jwtPayload === 'string') {
            res.status(401).json({
                msg: jwtPayload
            });
            return;
        }
        // Se obtiene el uid
        const { uid } = jwtPayload;
        // TODO: Crear validacion de fecha de expiracion
        // console.log(new Date(exp * 1000));
        const user = yield models_1.User.findByPk(uid);
        // Verificar que user no sea undefined
        if (!user) {
            res.status(401).json({
                msg: 'Invalid token'
            });
            return;
        }
        // Verificar si el user tiene status diferente de 0
        if (user.status === 0) {
            res.status(401).json({
                msg: 'Invalid token'
            });
            return;
        }
        // Se envia el user para que este disponible en la req
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map