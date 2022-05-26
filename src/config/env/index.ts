require('custom-env').env();

const {
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
    AUTH_SECRET,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    CORS_ORIGIN
} = process.env;

module.exports = {
    environment : NODE_ENV,
    host : SERVER_HOST,
    serverPort : SERVER_PORT,
    secret : AUTH_SECRET,
    dbName : DB_NAME,
    dbUser: DB_USERNAME,
    dbPass: DB_PASSWORD,
    dbHost : DB_HOST,
    dbPort : DB_PORT,
    corsOrigin : '*'
}