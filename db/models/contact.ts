import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { ContactType } from './contact_type';
import { TrxContact } from './trx_contact';
import { User } from './user';

export interface ContactInstance extends Model {
	id: number;
	name: string;
	contactTypeId: number;
	uid: string;
	status: number;
}

export const Contact = db.define<ContactInstance>('Contact', {
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
	contactTypeId: {
		type: DataTypes.INTEGER,
        allowNull: false,
		field: 'contact_type_id',
	},
	status: {
		allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
}, {
	tableName: 'contacts'
});

export const contactAssociations = (): void => {
    Contact.belongsTo(User, { foreignKey: 'uid' });
    Contact.belongsTo(ContactType, { foreignKey: 'contactTypeId' });
	Contact.hasMany(TrxContact, { foreignKey: 'contactId' });
};
