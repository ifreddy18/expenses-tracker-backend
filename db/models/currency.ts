import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { AccountByCurrency } from './account_by_currency';
import { CurrencyType } from './currency_type';

export interface CurrencyInstance extends Model {
	code: string;
	name: string;
	subdivision: number;
	currencyTypeId: number;
	status: number;
}

export const Currency = db.define<CurrencyInstance>('Currency', {
	code: {
		primaryKey: true,
		allowNull: false,
		type: DataTypes.STRING(8),
	},
	name: {
        type: DataTypes.STRING,
		allowNull: false,
	},
    subdivision: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
	currencyTypeId: {
		type: DataTypes.INTEGER,
        allowNull: false,
		field: 'currency_type_id',
	},
	status: {
		allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
	tableName: 'currencies',
	timestamps: false,
});

export const currencyAssociations = (): void => {
    Currency.hasMany(AccountByCurrency, { foreignKey: 'currencyCode' });
    Currency.belongsTo(CurrencyType, { foreignKey: 'currencyTypeId' });
}
