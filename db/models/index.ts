import { User, UserInstance, userAssociations } from './user';
import { Contact, ContactInstance, contactAssociations } from './contact';
import { ContactType, ContactTypeInstance, contactTypeAssociations } from './contact_type';
import { Category, CategoryInstance, categoryAssociations } from './category';
import { Currency, CurrencyInstance, currencyAssociations } from './currency';
import { Account, AccountInstance, accountAssociations } from './account';
import { AccountByCurrency, AccountByCurrencyInstance, accountByCurrencyAssociations } from './account_by_currency';
import { Transaction, TransactionInstance, transactionAssociations } from './transaction';
import { TrxStatus, TrxStatusInstance, trxStatusAssociations } from './trx_status';
import { TrxType, TrxTypeInstance, trxTypeAssociations } from './trx_type';
import { TrxCategory, TrxCategoryInstance, trxCategoryAssociations } from './trx_category';
import { TrxContact, TrxContactInstance, trxContactAssociations } from './trx_contact';


const associations: (() => void)[] = [
    userAssociations,
    contactAssociations,
    contactTypeAssociations,
    categoryAssociations,
    currencyAssociations,
    accountAssociations,
    accountByCurrencyAssociations,
    trxStatusAssociations,
    trxTypeAssociations,
    transactionAssociations,
    trxCategoryAssociations,
    trxContactAssociations,
];

export {
    associations,
    User, UserInstance,
    Contact, ContactInstance,
    ContactType, ContactTypeInstance,
    Category, CategoryInstance,
    Currency, CurrencyInstance,
    Account, AccountInstance,
    AccountByCurrency, AccountByCurrencyInstance,
    Transaction, TransactionInstance,
    TrxStatus, TrxStatusInstance,
    TrxType, TrxTypeInstance,
    TrxCategory, TrxCategoryInstance,
    TrxContact, TrxContactInstance,
};
