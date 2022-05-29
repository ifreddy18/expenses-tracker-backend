import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Account } from './account';
import { User } from './user';

export interface BankInstance extends Model {
	id: number;
	uid: string;
	name: string;
    url?: string;
    status: number;
}

export const Bank = db.define<BankInstance>('Bank', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
	name: {
        type: DataTypes.STRING,
		allowNull: false,
	},
    url: {
        type: DataTypes.STRING,
		allowNull: true,
	},
    status: {
		allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
	tableName: 'banks'
});

export const bankAssociations = (): void => {
    Bank.belongsTo(User, { foreignKey: 'uid' });
    Bank.hasMany(Account, { foreignKey: 'bankId' });
}