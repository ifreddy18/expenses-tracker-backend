import { Request, Response } from 'express';

import { Contact, User } from '../db/models';

export const getContacts = async (req: Request, res: Response): Promise<void> => {

    const { uid } = req.user;

	try {
		const contacts = await Contact.findAll({ where: { uid } });
		res.json(contacts);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const getContactById = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const contact = await Contact.findByPk(id);
		res.json(contact);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const createContact = async (req: Request, res: Response): Promise<void> => {

	const { name } = req.body;
    const { uid } = req.user;

	try {
		// Create and save
		const contact = await Contact.create({ name, uid });

		res.json({ msg: 'Contact created successfully', contact });

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const updateContact = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { name } = req.body;

	try {
		const contact = await Contact.findByPk(id);

		// Update contact
		if (contact) await contact.update({ name });

		res.json(contact);

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}

export const deleteContact = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const contact = await Contact.findByPk(id);

		// Borrado fisico
		if (contact) await contact.destroy();

		res.json({ msg: `Contact delete successfully` });

	} catch (error) {
		console.log({ error });
		res.status(500).json({ msg: 'Talk with the admin' });
	}

}
