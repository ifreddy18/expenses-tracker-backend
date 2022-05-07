import authRoutes from './auth/auth.routes';
import contactsRoutes from './contacts/contacts.routes';
import usersRoutes from './users/users.routes';

const routes = [
    authRoutes,
    contactsRoutes,
    usersRoutes
];

export {
    routes,
}