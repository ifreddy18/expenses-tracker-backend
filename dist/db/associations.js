"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAssociations = void 0;
const models_1 = require("./models");
const setAssociations = () => {
    for (const modelAssociation of models_1.associations) {
        modelAssociation();
    }
};
exports.setAssociations = setAssociations;
//# sourceMappingURL=associations.js.map