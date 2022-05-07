import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Currency } from './currency';

export interface CurrencyTypeInstance extends Model {
	id: number;
	name: string;
}

export const CurrencyType = db.define<CurrencyTypeInstance>('CurrencyType', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
        allowNull: false,
	},
	name: {
		allowNull: false,
        type: DataTypes.STRING,
	},
}, {
	tableName: 'currency_types',
    timestamps: false,
});

export const CurrencyTypeAssociations = (): void => {
    CurrencyType.hasMany(Currency, { foreignKey: 'CurrencyTypeId' });
}