import { Request, Response } from "express";

interface ICustomRequest extends Request {
    session: any;
}

export { ICustomRequest, Response }