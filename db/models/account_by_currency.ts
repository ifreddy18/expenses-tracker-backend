import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { Account } from './account';
import { Currency } from './currency';
import { Transaction } from './transaction';

export interface AccountByCurrencyInstance extends Model {
	id: number;
	accountId: number;
    currencyCode: string;
}

export const AccountByCurrency = db.define<AccountByCurrencyInstance>('AccountByCurrency', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
		field: 'account_id',
    },
	currencyCode: {
        type: DataTypes.STRING,
		allowNull: false,
		field: 'currency_code',
	},
}, {
	tableName: 'accounts_by_currencies',
});

export const accountByCurrencyAssociations = (): void => {
    AccountByCurrency.belongsTo(Currency, { foreignKey: 'currencyCode' });
    AccountByCurrency.belongsTo(Account, { foreignKey: 'accountId' });
    AccountByCurrency.hasMany(Transaction, { foreignKey: 'accountByCurrencyId' });

}
