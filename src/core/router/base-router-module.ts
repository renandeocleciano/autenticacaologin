import { Request, Response } from 'express';

export interface ModuleEndPointMap {
    [key: string]: HttpVerbMap;
}

export interface HttpVerbMap {
    get?: Array<FeatureModuleRouterInfo>,
    post?: Array<FeatureModuleRouterInfo>,
}

export interface FeatureModuleRouterInfo {
    endPoint: string;
    callback: Function;
    isProtected: Boolean;
}

export class BaseRouterModule {

    protected readonly context: string = '/api';
    protected version: string = 'v1';
    protected moduleName: string = 'rest-api';
    
    constructor(moduleName: string) {
        if(typeof moduleName === 'string'){
            this.moduleName = moduleName;
        }
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName] : {
            get: [
                {
                    endPoint: this.getUrlBase(),
                    callback: (req: Request, res: Response) => {
                        res.sendStatus(200).send({ status: 200, msg: 'OK'});
                    },
                    isProtected: false
                }
            ]
        }
    }

    public getRoutesFromModules() : ModuleEndPointMap {
        return this.MODULES_ENDPOINT_MAP;
    }

    public getUrlBase(): string {
        return `${this.context}/${this.version}/${this.moduleName}`;
    }
}