import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, METHODS } from '../config';
import { Routes } from '../interface/routes.interface';
import { ErrorMiddleware } from './middleware/error.middleware';
import Container from 'typedi';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
// import { logger, stream } from '../src/utils/logger';

export class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 5000;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        const connectDB = new PrismaClient()
        this.app.listen(this.port, () => {
            connectDB.$connect().then(() => {
                console.log("🚀 Database Connected==========🔗🔗🔗🔗🔗🔗🔗🔗=======>");
                console.info(`🚀 App listening on the port ${this.port}`);

            }).catch((error) => {
                console.log(error.message);
            });

        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        // this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS, methods: METHODS }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.disable
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/api/v1', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware);
    }
}
