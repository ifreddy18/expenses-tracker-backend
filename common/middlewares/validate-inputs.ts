import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { commonErrorsCodes, authErrosCodes } from '../errorManager';
import { CommonResponseBuilder, responseHandler } from '../responseManager';

export const validateInputs = (req: Request, res: Response, next: NextFunction):
    Response<any, Record<string, any>> | undefined | void => {

    // Retener errores - express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const { msg } = (errors.array({ onlyFirstError: true }))[0];

        try {
            const responseData = CommonResponseBuilder(
                builtHttpCode(commonErrorsCodes.ERROR_IN_MIDDLEWARE),
                commonErrorsCodes.ERROR_IN_MIDDLEWARE,
                errors.array(),
                msg,
            );
            responseHandler(res, responseData);
        }
        catch (error) {
            console.log({error});
            const responseData = CommonResponseBuilder(
                500,
                commonErrorsCodes.UNKNOWN_ERROR,
                errors.array()
            );
            responseHandler(res, responseData);
        }
        return;
    }

    next();
};

const builtHttpCode = (appStatus: number): number => {
    return (
        appStatus === Number(authErrosCodes.AUTH_MISSING_TOKEN)
        || appStatus === Number(authErrosCodes.AUTH_NOT_VALID_TOKEN)
    ) ? 401 : 400;
}
