import { Application } from 'express';
import { RouterModuleFactory } from './router-map';
import { HttpVerbMap, FeatureModuleRouterInfo } from './base-router-module';

export class RouterModule {
    
    private routerFactory: RouterModuleFactory;
    private express: Application;

    constructor(app: Application){
        this.express = app;
        this.routerFactory = new RouterModuleFactory();
    }

    public exposeRoutes(authenticate?: any): void {
        const registeredModules = this.routerFactory.getRegisteredModules();
        if(registeredModules && Array.isArray(registeredModules)){
            registeredModules
                .forEach(this.extractRouterInfoFromModule.bind(this, authenticate));
        }
    }

    private extractRouterInfoFromModule(authenticate: Function, routerfeatModule: HttpVerbMap) {
        if(routerfeatModule) {
            const registeredVerbs = Object.keys(routerfeatModule);
            registeredVerbs.forEach(this.extractInfoByVerb.bind(this, authenticate, routerfeatModule));
        }
    }

    private extractInfoByVerb(authenticate: Function, routerfeatModule: HttpVerbMap, registeredVerb: string){
        routerfeatModule[registeredVerb].forEach(this.mountRoutes.bind(this, authenticate, registeredVerb));
    }

    private mountRoutes(authenticate: Function, registeredVerb: string, routerInfo: FeatureModuleRouterInfo){
        if(routerInfo){
            const { isProtected, callback, endPoint } = routerInfo;
            isProtected 
            ? this.express.route(endPoint).all(authenticate())[registeredVerb](callback)
            : this.express.route(endPoint)[registeredVerb](callback)
        }
    }
}