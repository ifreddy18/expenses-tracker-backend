import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Bank } from './bank';
import { Category } from './category';
import { Contact } from './contact';
import { Transaction } from './transaction';

export interface UserInstance extends Model {
	uid: string;
	name: string;
	email: string;
	password: string;
	status: number;
}

export const User = db.define<UserInstance>('User', {
	uid: {
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	status: {
		allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
	tableName: 'users'
});

export const userAssociations = (): void => {
    User.hasMany(Contact, { foreignKey: 'uid' });
    User.hasMany(Category, { foreignKey: 'uid' });
    User.hasMany(Bank, { foreignKey: 'uid' });
	User.hasMany(Transaction, { foreignKey: 'uid' });
}
