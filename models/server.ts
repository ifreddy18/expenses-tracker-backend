import express, { Application } from 'express';
import cors from 'cors';

// Database
import db from '../db/connections';

// Routes
import { usersRoutes } from '../routes';

class Server {

    private app: Application;
    private port: string;
    private paths;
    private apiVersion = '/api/v1';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8010';

        this.paths = {
            users: this.apiVersion + '/users',
        };

        // Conectar DB
        this.dbConnection();

        // Middelwares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async dbConnection(): Promise<void> {

        try {
            // Test connection
            await db.authenticate();
            console.log('Database online');


            // await db.sync();
            await db.sync({ alter: true });

        } catch (error: any) {
            throw new Error( error );
        }


    }

    middlewares(): void {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

    }

    routes(): void {
        this.app.use( this.paths.users , usersRoutes );
        // this.app.use( '/' , () => { console.log('resp')} );
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }

}

export default Server;
