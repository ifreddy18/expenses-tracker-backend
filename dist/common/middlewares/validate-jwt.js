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
const config_1 = __importDefault(require("../../config/config"));
const models_1 = require("../../db/models");
// Error handler
const errorManager_1 = require("../errorManager");
const responseManager_1 = require("../responseManager");
const classes_1 = require("../../classes");
const { jwtSecretPrivateKey } = config_1.default;
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('x-token');
        if (!token) {
            throw new classes_1.ResponseError(401, errorManager_1.authErrosCodes.AUTH_MISSING_TOKEN);
        }
        const jwtPayload = jsonwebtoken_1.default.verify(token, jwtSecretPrivateKey);
        if (typeof jwtPayload === 'string') {
            throw new classes_1.ResponseError(401, errorManager_1.authErrosCodes.AUTH_NOT_VALID_TOKEN);
        }
        // Se obtiene el uid
        const { uid } = jwtPayload;
        // TODO: Crear validacion de fecha de expiracion
        const user = yield models_1.User.findByPk(uid);
        // Verificar que user no sea undefined
        if (!user || user.status === 0) {
            throw new classes_1.ResponseError(401, errorManager_1.authErrosCodes.AUTH_NOT_VALID_TOKEN);
        }
        // Se envia el user para que este disponible en la req
        req.user = user;
        next();
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 401,
            errorCode: errorManager_1.authErrosCodes.AUTH_NOT_VALID_TOKEN,
        });
        return;
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map