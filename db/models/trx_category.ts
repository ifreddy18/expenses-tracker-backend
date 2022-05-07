import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { Transaction } from './transaction';

export interface TrxCategoryInstance extends Model {
	id: number;
	categoryId: number;
	subcategory: number;
	trxId: number;
}

export const TrxCategory = db.define<TrxCategoryInstance>('TrxCategory', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
        allowNull: false,
	},
	categoryId: {
		type: DataTypes.INTEGER,
        allowNull: false,
		field: 'category_id',
	},
	subcategoryId: {
		type: DataTypes.INTEGER,
        allowNull: false,
		field: 'subcategory_id',
	},
	trxId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'trx_id',
	},
}, {
	tableName: 'trx_category',
});

export const trxCategoryAssociations = (): void => {
	TrxCategory.belongsTo(Transaction, { foreignKey: 'trxId'});
	// TrxCategory.belongsTo(Transaction, { foreignKey: 'categoryId'});
	// TrxCategory.belongsTo(Transaction, { foreignKey: 'subcategoryId'});
}
