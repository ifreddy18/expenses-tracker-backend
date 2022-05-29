import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Transaction } from './transaction';

export interface TrxStatusInstance extends Model {
	id: number;
	name: string;
}

export const TrxStatus = db.define<TrxStatusInstance>('TrxStatus', {
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
	tableName: 'trx_status',
    timestamps: false,
});

export const trxStatusAssociations = (): void => {
	TrxStatus.hasMany(Transaction, { foreignKey: 'trxStatusId' });
}