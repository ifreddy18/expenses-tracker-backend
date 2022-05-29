export class ResponseError extends Error {

    public httpStatus: number;
    public errorCode: number;
    public message: string;

    constructor(httpStatus: number, errorCode: number, message?: string){
        super();
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.message = message || '';
    }

}