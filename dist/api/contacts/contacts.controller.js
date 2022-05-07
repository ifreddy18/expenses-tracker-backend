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
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getContacts = void 0;
const models_1 = require("../../db/models");
// Response Manager
const responseManager_1 = require("../../common/responseManager");
// Error handler
const errorManager_1 = require("../../common/errorManager");
const classes_1 = require("../../classes");
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.user;
    try {
        const contacts = yield models_1.Contact.findAll({ where: { uid } });
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.data = contacts;
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.getContacts = getContacts;
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req.user;
    try {
        const contact = yield models_1.Contact.findOne({ where: { id, uid } });
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.data = contact;
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.getContactById = getContactById;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contactType } = req.body;
    const { uid } = req.user;
    try {
        // Create and save
        const contact = yield models_1.Contact.create({
            name,
            uid,
            contact_type_id: contactType
        });
        if (!contact)
            throw new classes_1.ResponseError(500, errorManager_1.commonErrorsCodes.FAIL_TO_INSERT_RECORD);
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.data = contact;
        resData.appStatusMessage = 'Contact created successfully';
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.createContact = createContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const contact = yield models_1.Contact.findByPk(id);
        // Update contact
        if (!contact)
            throw new classes_1.ResponseError(500, errorManager_1.commonErrorsCodes.FAIL_TO_UPDATE_RECORD);
        yield contact.update({ name });
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.appStatusMessage = 'Contact updated successfully';
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield models_1.Contact.findByPk(id);
        // Borrado fisico
        if (!contact)
            throw new classes_1.ResponseError(500, errorManager_1.commonErrorsCodes.FAIL_TO_DELETE_RECORD);
        yield contact.update({ status: 0 });
        // Response
        const resData = (0, responseManager_1.CommonResponseBuilder)(200, errorManager_1.WITHOUT_ERRORS);
        resData.appStatusMessage = 'Contact deleted successfully';
        (0, responseManager_1.responseHandler)(res, resData);
    }
    catch (error) {
        console.log({ error });
        (0, responseManager_1.catchErrorResponse)(res, error, {
            httpStatus: 500,
            errorCode: errorManager_1.commonErrorsCodes.UNKNOWN_ERROR,
        });
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contacts.controller.js.map