
export interface AppResponseModel {
    httpStatus:number;
    appStatusCode:number;
    appStatusName:string;
    appStatusMessage?:string;
    data?:any;
    errors?: any[];
}

