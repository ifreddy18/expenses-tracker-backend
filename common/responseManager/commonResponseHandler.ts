import { Response } from "express";
import { AppResponseModel } from '../interfaces';
import { getErrorName, getErrorMessage } from '../errorManager';

interface ResponseBody {
    appStatusCode: number;
    appStatusName: string;
    appStatusMessage?: string;
    data?: any;
    errors?: any[];
}

export const CommonResponseBuilder = (httpStatus:number, appStatusCode:number, errors: any[] = [], message: string | null = null) : AppResponseModel => {

    const appStatusName = getErrorName(appStatusCode);
    const appStatusMessage = message || getErrorMessage(appStatusCode) || '';
    const data : AppResponseModel = {
        httpStatus,
        appStatusCode,
        appStatusName,
        appStatusMessage,
        errors
    };

    return data;
}

export const responseHandler = (res: Response, responseData: AppResponseModel): void => {

    const {
        httpStatus,
        ...restResponseData
    } = responseData;

    const body: ResponseBody = { ...restResponseData };

    res.status(httpStatus).json(body);
}
