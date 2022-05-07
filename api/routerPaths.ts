const apiVersion1 = '/api/v1';

const currentApiPath = apiVersion1;

const paths = {
    auth: currentApiPath,
    contacts: currentApiPath + '/contacts',
    users: currentApiPath + '/users',
};

export {
    currentApiPath,
    paths,
};
