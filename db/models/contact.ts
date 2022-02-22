import { DataTypes, Model } from 'sequelize';
import db from '../connections';

export interface ContactInstance extends Model {
	id: number;
	uid: string;
	name: string;
}

export const Contact = db.define<ContactInstance>('Contact', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	name: {
        type: DataTypes.STRING,
		allowNull: false,
	},
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
	tableName: 'contacts'
});
