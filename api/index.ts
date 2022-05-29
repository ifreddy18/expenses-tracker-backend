import accountsRoutes from './banks/banks.routes';
import accountsByCurrenciesRoutes from './accounts/accounts.routes';
import authRoutes from './auth/auth.routes';
import categoriesRoutes from './categories/categories.routes';
import contactsRoutes from './contacts/contacts.routes';
import usersRoutes from './users/users.routes';

// API version
const apiVersion1 = '/api/v1';
const currentApiPath = apiVersion1;

export const routes: any[] = [
    { router: accountsRoutes,             path: currentApiPath + '/bank' },
    { router: accountsByCurrenciesRoutes, path: currentApiPath + '/account' },
    { router: authRoutes,                 path: currentApiPath },
    { router: categoriesRoutes,           path: currentApiPath + '/category' },
    { router: contactsRoutes,             path: currentApiPath + '/contacts' },
    { router: usersRoutes,                path: currentApiPath + '/users' },
];
