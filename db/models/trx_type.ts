import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Transaction } from './transaction';
import { TrxTypesGroup } from './trx_type_group';

export interface TrxTypeInstance extends Model {
	id: number;
	name: string;
	trxTypesGroupId: number;
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
	trxTypesGroupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'trx_types_group_id',
    },
}, {
	tableName: 'trx_types',
    timestamps: false,
});

export const trxTypeAssociations = (): void => {
	TrxType.hasMany(Transaction, { foreignKey: 'trxTypeId' });
	TrxType.belongsTo(TrxTypesGroup, { foreignKey: 'trxTypesGroupId' });
}
