import { Response } from "express";
import { ResponseError } from "../../classes";
import { CommonResponseBuilder, responseHandler } from ".";

export interface ResponseErrorInstance {
    httpStatus: number;
    errorCode: number;
}

export const catchErrorResponse = (res: Response, error: Error | ResponseError | unknown, defaultValues: ResponseErrorInstance) => {
    const isResponseError = error instanceof ResponseError;

    const httpStatus = isResponseError ? error.httpStatus : defaultValues.httpStatus;
    const errorCode = isResponseError ? error.errorCode : defaultValues.errorCode;
    const errors = isResponseError ? [] : [error];

    const responseData = CommonResponseBuilder(httpStatus, errorCode, errors);
    responseHandler(res, responseData);
}