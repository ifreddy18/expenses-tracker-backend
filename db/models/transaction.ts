import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { AccountByCurrency } from './account_by_currency';
import { TrxCategory } from './trx_category';
import { TrxStatus } from './trx_status';
import { TrxType } from './trx_type';
import { User } from './user';

export interface TransactionInstance extends Model {
	id: number;
    uid: string;
	date: Date;
    datePayment: Date;
    trxStatusId: number;
    trxTypeId: number;
    accountByCurrencyId: number;
    amount: number;
    fee: number;
    description: string;
    reference: string;
    email: string;
    name: string;
}

export const Transaction = db.define<TransactionInstance>('Transaction', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    datePayment: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'date_payment',
    },
    trxStatusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_status_id',
    },
    trxTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'trx_type_id',
    },
    accountByCurrencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'account_by_currency_id',
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    fee: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
	tableName: 'transactions',
});

export const transactionAssociations = (): void => {
    Transaction.belongsTo(User, { foreignKey: 'uid' });
    Transaction.hasOne(TrxCategory, { foreignKey: 'trxId' });
    Transaction.belongsTo(TrxStatus, { foreignKey: 'trxStatusId' });
    Transaction.belongsTo(TrxType, { foreignKey: 'trxTypeId' });
    Transaction.belongsTo(AccountByCurrency, { foreignKey: 'accountByCurrencyId' });
}
