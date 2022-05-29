import { User, UserInstance, userAssociations } from './user';
import { Contact, ContactInstance, contactAssociations } from './contact';
import { ContactType, ContactTypeInstance, contactTypeAssociations } from './contact_type';
import { Category, CategoryInstance, categoryAssociations } from './category';
import { Currency, CurrencyInstance, currencyAssociations } from './currency';
import { Bank, BankInstance, bankAssociations } from './bank';
import { Account, AccountInstance, accountAssociations } from './account';
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
    bankAssociations,
    accountAssociations,
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
    Bank, BankInstance,
    Account, AccountInstance,
    Transaction, TransactionInstance,
    TrxStatus, TrxStatusInstance,
    TrxType, TrxTypeInstance,
    TrxCategory, TrxCategoryInstance,
    TrxContact, TrxContactInstance,
};
