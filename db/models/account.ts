import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { AccountByCurrency } from './account_by_currency';
import { User } from './user';

export interface AccountInstance extends Model {
	id: number;
	uid: string;
	name: string;
    url?: string;
    status: number;
}

export const Account = db.define<AccountInstance>('Account', {
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
	tableName: 'accounts'
});

export const accountAssociations = (): void => {
    Account.belongsTo(User, { foreignKey: 'uid' });
    Account.hasMany(AccountByCurrency, { foreignKey: 'accountId' });
}