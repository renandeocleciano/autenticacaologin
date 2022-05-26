import express from 'express';
import { Application } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import { RouterModule } from './router/router';
import ResponseHandlers from './handlers/response-handlers';
import AuthServices from '../modules/auth/auth-services';

const { corsOrigin } = require('../config/env/index');

export class CoreModule {
    private _express: Application;
    private routerModule: RouterModule;

    constructor() {
        this._express = express();
        this.configExpress();
        this.routerModule = new RouterModule(this.express);
        this.router();
    }

    public get express(): Application {
        return this._express;
    }

    private getCorsOptions() : cors.CorsOptions {
        return {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: corsOrigin,
            preflightContinue: false
        }
    }

    private configExpress(): void {
        this.express.use(morgan('dev'));
        this.express.use(cors(this.getCorsOptions()));
        this.express.use(bodyParser.urlencoded({ extended : true }));
        this.express.use(bodyParser.json());
        this.express.use(ResponseHandlers.errorHandlerApi);
    }

    private router() : void{
         this.routerModule.exposeRoutes(AuthServices.authenticate);
    }

}