const jwt = require( 'jsonwebtoken' );
const config = require('../../config/env/index')();

export class JwtHandler {
    constructor() {
    }

    jwtSign(id: string) {
        return jwt.sign({ _id: id }, config.secret);
    }

    jwtVerify(token){
        try {
            const tokenVerified = jwt.verify(token, config.secret);
            return tokenVerified;
        } catch (error) {
            console.log(`decodedToken: ${error}`);
            return null;
        }
    }
}