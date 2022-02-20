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
const models_1 = require("../db/models");
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verify if user exist by email
        const user = yield models_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({
                msg: 'Wrong email or password'
            });
            return;
        }
        // Verify if user is active (status === 1)
        if (user.status !== 1) {
            res.status(400).json({
                msg: 'Wrong email or password'
            });
            return;
        }
        // Verify password
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Wrong email or password'
            });
            return;
        }
        // Generar el JWT
        const token = yield (0, generate_jwt_1.generateJWT)({
            uid: user.uid,
        });
        res.status(200).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the admin' });
    }
});
exports.login = login;
const getAuthState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, email, name } = req.user;
    res.status(200).json({ uid, email, name });
});
exports.getAuthState = getAuthState;
//# sourceMappingURL=auth.controller.js.map