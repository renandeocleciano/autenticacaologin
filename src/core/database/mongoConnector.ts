const mongoose = require('mongoose');
const { dbHost, dbPort, dbName, dbUser, dbPass } = require('../../config/env/index')

export class MongoConnector {
    
    constructor() {
        this.loadSchemas();
    }

    sync() {
        try {
            mongoose.set('debug', true);
            return mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,
            { user: dbUser, pass: dbPass, useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            console.log(error);
        }
    }

    private loadSchemas() : void{
        console.log('Loading Schemas...');
        require('../../entities/user');
        console.log('Schemas loaded...');
    }
}