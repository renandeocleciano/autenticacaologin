import { ModuleEndPointMap } from "./base-router-module";
import { ModulesRouterMapper, FeaturedModuleRouter } from '../../modules/modules-router-map';

export class RouterModuleFactory {
    private routerModulesMap: Array<ModuleEndPointMap> = [];

    constructor(){
        this.bootstrapModules(new ModulesRouterMapper());
    }

    private bootstrapModules(routerModulesMapper: ModulesRouterMapper) {
        this.routerModulesMap = routerModulesMapper.registeredModules.map(this.createModules.bind(this));
    }

    private createModules(registeredModule: FeaturedModuleRouter) : Array<ModuleEndPointMap>{
        const { moduleName, parser } = registeredModule;
        return new moduleName()[parser]();
    }

    public getRegisteredModules() {
        return this.routerModulesMap.map((routerModule: ModuleEndPointMap) => {
            const moduleName: string = Object.keys(routerModule)[0];
            return routerModule[moduleName];
        });
    }
}