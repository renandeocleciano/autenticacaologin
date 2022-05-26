import * as http from 'http';
import { CoreModule } from '../core/core';
const { serverPort } = require('../config/env/index')

export class Server {

    private db: any;
    private express: any;

    constructor(databaseConnector) {
        if(databaseConnector){
            this.db = databaseConnector;
            this.express = new CoreModule().express;
            this.syncDataBase();
        }
    }

    private async syncDataBase() {
        try {
            const syncData  = await this.db.sync();
            this.databaseSyncHandler(syncData);

        } catch (error) {
            this.databaseSyncErrorHandler(error);
        }
    }

    private databaseSyncHandler(dbInfo: any){
        this.upServer();
    }

    private databaseSyncErrorHandler(error: any) {
        console.log(`Erro ao conector no database: ${ error }`);
        this.upServer();
    }

    private upServer() {
        http
        .createServer(this.express)
        .listen(serverPort)
        .on('listening', this.onServerUp.bind(this, serverPort))
        .on('error', this.onServerStartUpError.bind(this));
        
    }

    private onServerUp(port: Number) {
        console.log(`Servidor rodando na porta: ${ port } `)
    }

    private onServerStartUpError(error: any) {
        console.log(`Error: ${ error }`);
    }
}