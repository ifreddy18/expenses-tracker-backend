import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import { User } from '../../db/models';
// Error handler
import { authErrosCodes } from '../errorManager';
import { catchErrorResponse } from '../responseManager';
import { ResponseError } from '../../classes';

const { jwtSecretPrivateKey } = config;

export const validateJWT = async (req: Request, res: Response, next: NextFunction):
    Promise<Response<any, Record<string, any>> | undefined> => {

    try {
        const token = req.header('x-token');
        if (!token) {
            throw new ResponseError(401, authErrosCodes.AUTH_MISSING_TOKEN);
        }

        const jwtPayload = jwt.verify(token, jwtSecretPrivateKey);

        if (typeof jwtPayload === 'string') {
            throw new ResponseError(401, authErrosCodes.AUTH_NOT_VALID_TOKEN);
        }

        // Se obtiene el uid
        const { uid } = jwtPayload;

        // TODO: Crear validacion de fecha de expiracion

        const user = await User.findByPk(uid);

        // Verificar que user no sea undefined
        if (!user || user.status === 0) {
            throw new ResponseError(401, authErrosCodes.AUTH_NOT_VALID_TOKEN);
        }

        // Se envia el user para que este disponible en la req
        req.user = user;

        next();

    } catch (error) {
        console.log({ error });
        catchErrorResponse(res, error, {
            httpStatus: 401,
            errorCode: authErrosCodes.AUTH_NOT_VALID_TOKEN,
        });
        return;
    }

};
