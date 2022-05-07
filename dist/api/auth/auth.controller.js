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
exports.getAuthState = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../../db/models");
const generate_jwt_1 = require("../../common/helpers/generate-jwt");
// Response Manager
const responseManager_1 = require("../../common/responseManager");
// Error handler
const errorManager_1 = require("../../common/errorManager");
const classes_1 = require("../../classes");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verify if user exist by email
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user || user.status === 0) {
            throw new classes_1.ResponseError(400, errorManager_1.authErrosCodes.AUTH_NOT_VALID_CREDENTIALS);
        }
        // Verify password
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            throw new classes_1.ResponseError(400, errorManager_1.authErrosCodes.AUTH_NOT_VALID_CREDENTIALS);
        }
        // Generar el JWT
        const token = yield (0, generate_jwt_1.generateJWT)({
            uid: user.uid,
        });
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.data = { user, token };
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log(error);
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.login = login;
const getAuthState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, email, name } = req.user;
    // Response
    const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
    resData.data = { uid, email, name };
    (0, responseManager_1.responseHandler)(res, resData);
});
exports.getAuthState = getAuthState;
//# sourceMappingURL=auth.controller.js.map