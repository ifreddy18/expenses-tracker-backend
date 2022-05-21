import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { TrxCategory } from './trx_category';
import { User } from './user';

export interface CategoryInstance extends Model {
	id: number;
	uid: string;
	name: string;
	level: number;
    parentId?: number;
    status: number;
}

export const Category = db.define<CategoryInstance>('Category', {
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
	level: {
		type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
	},
    parentId: {
		type: DataTypes.INTEGER,
        allowNull: true,
		field: 'parent_id',
	},
    status: {
        allowNull: false,
		type: DataTypes.TINYINT,
		defaultValue: 1
    }
}, {
	tableName: 'categories'
});

export const categoryAssociations = (): void => {
	Category.hasOne(Category, { foreignKey: 'parentId', onDelete: 'cascade' });
    Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent', onDelete: 'cascade' });
    Category.belongsTo(User, { foreignKey: 'uid' });
	Category.hasMany(TrxCategory, { foreignKey: 'categoryId' });
	Category.hasMany(TrxCategory, { foreignKey: 'subcategoryId' });
}