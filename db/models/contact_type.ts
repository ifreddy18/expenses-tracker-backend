import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Contact } from './contact';

export interface ContactTypeInstance extends Model {
	id: number;
	name: string;
}

export const ContactType = db.define<ContactTypeInstance>('ContactType', {
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
	tableName: 'contact_types',
    timestamps: false,
});

export const contactTypeAssociations = (): void => {
    ContactType.hasMany(Contact, { foreignKey: 'contactTypeId' });
}