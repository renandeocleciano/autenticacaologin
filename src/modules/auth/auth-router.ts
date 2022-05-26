import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module";
import ResponseHandlers from '../../core/handlers/response-handlers';
import { Request, Response } from 'express';
import UserServices from '../user/user-services';

export class AuthRouterModule extends BaseRouterModule {
    
    constructor() {
        super('auth');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            post: [
                {
                    endPoint: `${ this.getUrlBase() }/token`,
                    callback: this.auth,
                    isProtected: false
                }
            ]
        }
    };

    async auth(req: Request, res: Response) {
            const { email, password } = req.body;
            if(email && password) {
                try {
                    const user = await UserServices.getByEmail(email);
                    ResponseHandlers.authSuccess(res, password, user);    
                } catch (error) {
                    console.log(error);
                    ResponseHandlers.authFail(req, res);
                }
            }else{
                return ResponseHandlers.onError(res, 'Necessario informar login/senha', 'no-credentials');
            }
    }
}