import authRoutes from './auth/auth.routes';
import contactsRoutes from './contacts/contacts.routes';
import usersRoutes from './users/users.routes';
import categoriesRoutes from './categories/categories.routes';

// API version
const apiVersion1 = '/api/v1';
const currentApiPath = apiVersion1;

export const routes: any[] = [
    { router: authRoutes,         path: currentApiPath },
    { router: contactsRoutes,     path: currentApiPath + '/contacts' },
    { router: usersRoutes,        path: currentApiPath + '/users' },
    { router: categoriesRoutes,   path: currentApiPath + '/category' },
];
