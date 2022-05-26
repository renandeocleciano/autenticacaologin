import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module";
import ResponseHandlers from '../../core/handlers/response-handlers';
import { ICustomRequest, Response } from '../../core/handlers/custom-request';
import UserServices from './user-services';
import UserValidators from '../../core/validator/user-validator';
import AuthServices from "../auth/auth-services";

export class UserRouterModule extends BaseRouterModule {
    
    constructor() {
        super('user');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            get: [
                {
                    endPoint: `${ this.getUrlBase() }/find`,
                    callback: this.find,
                    isProtected: true
                }
            ],
            post: [
                {
                    endPoint: `${ this.getUrlBase() }/add`,
                    callback: this.add,
                    isProtected: false
                }
            ]
        }
    };

    async find(req: ICustomRequest, res: Response) {
        try {
            const userId = await AuthServices.getIdByToken(req.session.token);
            const user   = UserServices.getById(userId);
            if(!user || user == null) 
                return ResponseHandlers.authFail(req, res);
            return ResponseHandlers.onSuccess(res, user);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao obter os dados do usuário', 'no-infoUser');
        }
    }

    async add(req: Request, res: Response) {
        var result = UserValidators.addUserValidate(req.body);
        if(result.success) {
            try {
                const user = await UserServices.addUser(req.body);
                ResponseHandlers.onSuccess(res, user);
            } catch (error) {
                return ResponseHandlers.onError(res, 'Erro ao cadastrar os dados do usuário', 'no-infoUser');
            }
        }else {
            return ResponseHandlers.onError(res, result.response.errorMessage, 'add-user');
        }
    }
}