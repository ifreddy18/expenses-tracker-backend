import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { TrxType } from './trx_type';

export interface TrxTypesGroupInstance extends Model {
	id: number;
	name: string;
}

export const TrxTypesGroup = db.define<TrxTypesGroupInstance>('TrxTypeGroup', {
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
	tableName: 'trx_types_group',
    timestamps: false,
});

export const trxTypesGroupAssociations = (): void => {
	TrxTypesGroup.hasMany(TrxType, { foreignKey: 'trxTypesGroupId' });
}