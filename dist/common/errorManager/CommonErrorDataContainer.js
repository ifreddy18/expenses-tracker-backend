"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonErrorDataContainer = void 0;
class CommonErrorDataContainer {
    constructor(errorNumber, errorName) {
        this._errorCode = errorNumber;
        this._errorName = errorName;
    }
    get errorCode() {
        return this._errorCode;
    }
    get errorName() {
        return this._errorName;
    }
}
exports.CommonErrorDataContainer = CommonErrorDataContainer;
//# sourceMappingURL=CommonErrorDataContainer.js.map