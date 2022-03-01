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
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.user;
    try {
        const contacts = yield models_1.Contact.findAll({ where: { uid } });
        res.json(contacts);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.getContacts = getContacts;
const getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield models_1.Contact.findByPk(id);
        res.json(contact);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.getContactById = getContactById;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { uid } = req.user;
    try {
        // Create and save
        const contact = yield models_1.Contact.create({ name, uid });
        res.json({ msg: 'Contact created successfully', contact });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.createContact = createContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const contact = yield models_1.Contact.findByPk(id);
        // Update contact
        if (contact)
            yield contact.update({ name });
        res.json(contact);
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield models_1.Contact.findByPk(id);
        // Borrado fisico
        if (contact)
            yield contact.destroy();
        res.json({ msg: `Contact delete successfully` });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({ msg: 'Talk with the admin' });
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contacts.controller.js.map