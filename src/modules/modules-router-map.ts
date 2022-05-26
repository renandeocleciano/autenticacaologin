import { AuthRouterModule } from './auth/auth-router';
import { UserRouterModule } from './user/user-router';

export interface FeaturedModuleRouter {
    moduleName: any;
    parser: string;
}

export class ModulesRouterMapper {
    
    public registeredModules: Array<FeaturedModuleRouter> = [
        {
            moduleName: AuthRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: UserRouterModule,
            parser: 'getRoutesFromModules'
        }
    ];
}