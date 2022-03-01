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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByUid = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../../db/models");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll({ where: { status: 1 } });
        res.json(users);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.getUsers = getUsers;
const getUserByUid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        // Search in DB
        const user = yield models_1.User.findByPk(uid);
        res.json(user);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.getUserByUid = getUserByUid;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, restUser = __rest(_a, ["password"]);
    // Encrypt password
    const salt = bcryptjs_1.default.genSaltSync();
    const bcryptPassword = bcryptjs_1.default.hashSync(password, salt);
    try {
        // Create and save
        const user = yield models_1.User.create(Object.assign(Object.assign({}, restUser), { password: bcryptPassword }));
        res.json({ msg: 'User created successfully', user: Object.assign({}, restUser) });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { body } = req;
    try {
        const user = yield models_1.User.findByPk(uid);
        // Update user
        if (user)
            yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const user = yield models_1.User.findByPk(uid);
        // Logic delete
        if (user)
            yield user.update({ status: 0 });
        res.json({ msg: `User delete successfully` });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map