import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Transaction } from './transaction';

export interface TrxTypeInstance extends Model {
	id: number;
	name: string;
}

export const TrxType = db.define<TrxTypeInstance>('TrxType', {
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
	tableName: 'trx_types',
    timestamps: false,
});

export const trxTypeAssociations = (): void => {
	TrxType.hasMany(Transaction, { foreignKey: 'trxTypeId' });
}
