import {
    Category,
    Contact,
    User
} from '../../db/models';

// Validate if the user exist by uid
export const userExistByUid = async (uid = ''): Promise<void> => {
    const userExist = await User.findOne({ where: { uid } });
    if (!userExist || userExist.status === 0) {
        throw new Error(`The user with uid '${uid}' doesn't exist`);
    }
};

// Validate if exist a User with this email
export const userExistWithEmail = async (email = ''): Promise<void> => {
    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
        throw new Error(`The email '${email}' already exist`);
    }
};

// Validate if exist a model with Id and uid
// Must be used after validateJWT
export const modelExistByIdAndUid = async(id = '', { req }: any): Promise<void> => {
    const { uid } = req.user;
    const { model, modelName = 'model' } = req.model;
    const modelExist = await model.findOne({ where: { id, uid }});
    if (!modelExist) {
        throw new Error(`The ${modelName} with id '${id}' and uid ${uid} doesn't exist`);
    }
}

// Validate if exist a model with Id
export const modelExistById = async(id = '', { req }: any): Promise<void> => {
    const { model, modelName = 'model' } = req.model;
    const modelExist = await model.findOne({ where: { id }});
    if (!modelExist) {
        throw new Error(`The ${modelName} with id '${id}' doesn't exist`);
    }
}
