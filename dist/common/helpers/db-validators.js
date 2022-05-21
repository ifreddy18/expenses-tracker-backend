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
exports.modelExistByIdAndUid = exports.userExistWithEmail = exports.userExistByUid = void 0;
const models_1 = require("../../db/models");
// Validate if the user exist by uid
const userExistByUid = (uid = '') => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield models_1.User.findOne({ where: { uid } });
    if (!userExist || userExist.status === 0) {
        throw new Error(`The user with uid '${uid}' doesn't exist`);
    }
});
exports.userExistByUid = userExistByUid;
// Validate if exist a User with this email
const userExistWithEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield models_1.User.findOne({ where: { email } });
    if (emailExist) {
        throw new Error(`The email '${email}' already exist`);
    }
});
exports.userExistWithEmail = userExistWithEmail;
// Validate if exist a model with Id and uid
// Must be used after validateJWT
const modelExistByIdAndUid = (id = '', { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.user;
    const { model, modelName = 'model' } = req.model;
    const modelExist = yield model.findOne({ where: { id, uid } });
    if (!modelExist) {
        throw new Error(`The ${modelName} with id '${id}' and uid ${uid} doesn't exist`);
    }
});
exports.modelExistByIdAndUid = modelExistByIdAndUid;
//# sourceMappingURL=db-validators.js.map