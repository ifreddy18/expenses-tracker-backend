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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByUid = exports.getUsers = void 0;
const models_1 = require("../db/models");
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
    const { body } = req;
    try {
        // Create and save
        const user = yield models_1.User.create(body);
        res.json({ msg: 'User created successfully', user });
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