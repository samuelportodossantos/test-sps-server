import { Request, Response } from "express";
import { Controller } from "./controller";
import httpStatus from "http-status";

export class AuthController extends Controller {

    public async authenticate(request: Request, response: Response): Promise<any> {
        const token = await this.service.authenticate(request.body.email, request.body.password)
        if (token) {
            return response.status(httpStatus.OK).json({
                message: "Authenticated sucessfully!",
                token: token,
                _links: []
            })
        }
        response.status(httpStatus.UNAUTHORIZED).json({
            message: "Authentication failed!",
            _links: []
        })
    }

}