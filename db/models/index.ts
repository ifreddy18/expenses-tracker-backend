import { User, UserInstance } from './user';
import { Contact, ContactInstance } from './contact';

// Associations
// Users | Contacts
User.hasMany(Contact, { foreignKey: 'uid' });
Contact.belongsTo(User, { foreignKey: 'uid' });


export {
    User, UserInstance,
    Contact, ContactInstance,
};
