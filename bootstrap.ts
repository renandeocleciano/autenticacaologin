import { Server } from './src/server/server';
import { MongoConnector } from './src/core/database/mongoConnector';

(function() {
    new Server(new MongoConnector());
})()