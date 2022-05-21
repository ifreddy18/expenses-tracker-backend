import { Response } from "express";
import { ResponseError } from "../../classes";
import { CommonResponseBuilder, responseHandler } from ".";

export interface ResponseErrorInstance {
    httpStatus: number;
    errorCode: number;
    message?: string;
}

export const catchErrorResponse = (res: Response, error: Error | ResponseError | unknown, defaultValues: ResponseErrorInstance) => {
    const isResponseError = error instanceof ResponseError;

    const httpStatus = isResponseError ? error.httpStatus : defaultValues.httpStatus;
    const errorCode = isResponseError ? error.errorCode : defaultValues.errorCode;
    const message = (isResponseError ? error.message : defaultValues?.message) || null;
    const errors = isResponseError ? [] : [error];

    const responseData = CommonResponseBuilder(httpStatus, errorCode, errors, message);
    responseHandler(res, responseData);
}