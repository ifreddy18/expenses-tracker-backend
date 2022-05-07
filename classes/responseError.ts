export class ResponseError extends Error {

    public httpStatus: number;
    public errorCode: number;

    constructor(httpStatus: number, errorCode: number){
        super();
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
    }

}