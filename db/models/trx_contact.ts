import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Contact } from './contact';

export interface TrxContactInstance extends Model {
	id: number;
	contactId: number;
	trxId: number;
}

export const TrxContact = db.define<TrxContactInstance>('TrxContact', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
        allowNull: false,
	},
	contactId: {
        type: DataTypes.INTEGER,
		allowNull: false,
		field: 'contact_id',
	},
	trxId: {
        type: DataTypes.INTEGER,
		allowNull: false,
		field: 'trx_id',
	},
}, {
	tableName: 'trx_contact',
});

export const trxContactAssociations = (): void => {
    TrxContact.belongsTo(Contact, { foreignKey: 'contactId' });
}
