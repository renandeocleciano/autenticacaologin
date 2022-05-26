import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';

const config = require('../../config/env/index');

class ResponseHandlers { 

    authFail(req: Request, res: Response) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }

    authSuccess(res: Response, credentials: any, data: any){
        const isMatch = bcrypt.compareSync(credentials,data.password);
        if(isMatch){
            const payload = { id: data._id };
            res.json({
                token: jwt.encode(payload, config.secret),
                id: data._id
            });
        }else{
            res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    }

    onError(res: Response, message: string, err: any) {
        console.log(`Error: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    }

    onSuccess(res: Response, data: any) {
        return res.status(HTTPStatus.OK).json({ payload: data });
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
        console.error('Api Error foi executada: ${err}');
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'Erro interno do servidor'
        });
    }

    //Handlers de Db
    dbErrorHandler(res: Response, err: any){
        console.log(`Um erro aconteceu: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-002',
            message: 'Erro interno do servidor'
        })
    }

}

export default new ResponseHandlers();