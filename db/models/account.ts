import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../connections';
import { Bank } from './bank';
import { Currency } from './currency';
import { Transaction } from './transaction';

export interface AccountInstance extends Model {
	id: number;
	name: string;
	bankId: number;
    currencyCode: string;
	status: number;
}

export const Account = db.define<AccountInstance>('Account', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    bankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
		field: 'bank_id',
    },
	currencyCode: {
        type: DataTypes.STRING,
		allowNull: false,
		field: 'currency_code',
	},
	status: {
		allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
	tableName: 'accounts',
});

export const accountAssociations = (): void => {
    Account.belongsTo(Currency, { foreignKey: 'currencyCode' });
    Account.belongsTo(Bank, { foreignKey: 'bankId' });
    Account.hasMany(Transaction, { foreignKey: 'accountId' });

}
