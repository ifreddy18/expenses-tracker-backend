"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrxContact = exports.TrxCategory = exports.TrxType = exports.TrxStatus = exports.Transaction = exports.AccountByCurrency = exports.Account = exports.Currency = exports.Category = exports.ContactType = exports.Contact = exports.User = exports.associations = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const contact_1 = require("./contact");
Object.defineProperty(exports, "Contact", { enumerable: true, get: function () { return contact_1.Contact; } });
const contact_type_1 = require("./contact_type");
Object.defineProperty(exports, "ContactType", { enumerable: true, get: function () { return contact_type_1.ContactType; } });
const category_1 = require("./category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return category_1.Category; } });
const currency_1 = require("./currency");
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return currency_1.Currency; } });
const account_1 = require("./account");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return account_1.Account; } });
const account_by_currency_1 = require("./account_by_currency");
Object.defineProperty(exports, "AccountByCurrency", { enumerable: true, get: function () { return account_by_currency_1.AccountByCurrency; } });
const transaction_1 = require("./transaction");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return transaction_1.Transaction; } });
const trx_status_1 = require("./trx_status");
Object.defineProperty(exports, "TrxStatus", { enumerable: true, get: function () { return trx_status_1.TrxStatus; } });
const trx_type_1 = require("./trx_type");
Object.defineProperty(exports, "TrxType", { enumerable: true, get: function () { return trx_type_1.TrxType; } });
const trx_category_1 = require("./trx_category");
Object.defineProperty(exports, "TrxCategory", { enumerable: true, get: function () { return trx_category_1.TrxCategory; } });
const trx_contact_1 = require("./trx_contact");
Object.defineProperty(exports, "TrxContact", { enumerable: true, get: function () { return trx_contact_1.TrxContact; } });
const associations = [
    user_1.userAssociations,
    contact_1.contactAssociations,
    contact_type_1.contactTypeAssociations,
    category_1.categoryAssociations,
    currency_1.currencyAssociations,
    account_1.accountAssociations,
    account_by_currency_1.accountByCurrencyAssociations,
    trx_status_1.trxStatusAssociations,
    trx_type_1.trxTypeAssociations,
    transaction_1.transactionAssociations,
    trx_category_1.trxCategoryAssociations,
    trx_contact_1.trxContactAssociations,
];
exports.associations = associations;
//# sourceMappingURL=index.js.map