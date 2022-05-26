import UserServices from '../user/user-services';
import { JwtHandler } from '../../core/handlers/jwt-handler';
import * as bcrypt from 'bcrypt';
import ResponseHandlers from '../../core/handlers/response-handlers';

class AuthServices {

    async getAuthToken(user) {
        return await user.generateAuthToken();
    }

    public async authVerify(token){
        if(!token || token == null) return false;
         const _token = new JwtHandler().jwtVerify(token);
         if(_token && _token != null) {
             const user = await UserServices.getByIdAndToken(_token._id, token);
             if(!user) return false
             return true;
         }
         return false;
     }

     async getIdByToken(token) {
        if(!token || token == null) return false;
        const _token = new JwtHandler().jwtVerify(token);
        if(_token && _token != null) {
            return _token._id;
        }
        return null;
    }

    async passwordMatch(p1,p2){
        return bcrypt.compareSync(p1,p2);
    }

    public async authenticate(req, res, next) {
        try {
            const token = req.session.token;
            if(!token || token == null) 
                return ResponseHandlers.authFail(req, res);
            const _token = new JwtHandler().jwtVerify(token);
            if(_token && _token != null) {
                const user = await UserServices.getByIdAndToken(_token._id, token);
                if(!user) return ResponseHandlers.authFail(req, res);
            }
        } catch (error) {
            console.log(error);
            return ResponseHandlers.authFail(req, res);
        }
        next();
    }
}

export default new AuthServices();