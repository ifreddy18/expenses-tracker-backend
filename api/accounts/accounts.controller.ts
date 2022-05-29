import { Request, Response } from 'express';
import { Account, Bank } from '../../db/models';
// Response Manager
import {
	catchErrorResponse,
	CommonResponseBuilder,
	responseHandler
} from '../../common/responseManager';
// Error handler
import {
	WITHOUT_ERRORS,
	commonErrorsCodes,
} from '../../common/errorManager';
import { ResponseError } from '../../classes';
// Services
import { CurrencyService } from '../../common/services/currencyService';

const currencyService = new CurrencyService();

export const getAccounts = async (req: Request, res: Response): Promise<void> => {

    const { uid } = req.user;
	let accounts: any = []

	try {

		const banks = (await Bank.findAll({
			where: { uid, status: 1 }
		})).map(b => b.id);

		if (banks.length > 0) {
			const accountsRaw = await Account.findAll({ where: { status: 1 }});
			accounts = accountsRaw.filter( a => banks.includes(a.bankId) )
				.map(account => ({
					id: account.id,
					name: account.name,
					bankId: account.bankId,
					currencyCode: account.currencyCode,
				}));
		}

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = accounts;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const getAccountById = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const account = await Account.findOne({ where: { id, status: 1 }});

		if (!account) {
			throw new ResponseError(400, commonErrorsCodes.FAIL_TO_GET_RECORD,
				`Doesn\'t exist a account with id: ${id}`);
		}

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = account;
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const createAccount = async (req: Request, res: Response): Promise<void> => {

	const { name, currencyCode, bankId } = req.body;
    const { uid } = req.user;

	try {
		const isValidCurrency = await currencyService.isValidCurrencyCode(currencyCode);
		// Validate currencyCode
		if(!isValidCurrency){
			throw new ResponseError(
				400,
				commonErrorsCodes.FAIL_TO_INSERT_RECORD,
				`Invalid currency code: ${currencyCode}`
			);
		}

		// Validate currencyCode
		const bank = await Bank.findOne({ where: { id: bankId, uid }});
		if(!bank){
			throw new ResponseError(
				400,
				commonErrorsCodes.FAIL_TO_INSERT_RECORD,
				`Does not exist an bank for this user with id: ${bankId}`
			);
		}

		const account = await Account.create({ name, bankId, currencyCode });

		if ( !account ) throw new ResponseError(500, commonErrorsCodes.FAIL_TO_INSERT_RECORD);

		// // Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.data = account;
		resData.appStatusMessage = 'Account created successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const updateAccount = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const { uid } = req.user;
	const { name } = req.body;

	try {
		const account = await Account.findOne({ where: { id, status: 1 }});

		// Validate if category exist
		if (!account) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid account id: ${id}`
		);

		await account.update({ name });

		// Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Account updated successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;

	try {
		const account = await Account.findOne({ where: { id, status: 1 }});

		// Validate if category exist
		if (!account) throw new ResponseError(
			500,
			commonErrorsCodes.FAIL_TO_UPDATE_RECORD,
			`Invalid account id: ${id}`
		);

		await account.update({ status: 0 });

		// // Response
		const resData = CommonResponseBuilder(200, WITHOUT_ERRORS);
		resData.appStatusMessage = 'Account deleted successfully';
		responseHandler(res, resData);

	} catch (error) {
		console.log({ error });
		catchErrorResponse(res, error, {
			httpStatus: 500,
			errorCode: commonErrorsCodes.UNKNOWN_ERROR,
		});
	}

}
