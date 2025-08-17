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
                _links: {
                    login: {
                        method: 'POST',
                        path: '/auth/login'
                    },
                    check: {
                        method: 'GET',
                        path: '/auth/check'
                    }
                }
            })
        }
        response.status(httpStatus.UNAUTHORIZED).json({
            message: "Authentication failed!",
            _links: {
                login: {
                    method: 'POST',
                    path: '/auth/login'
                },
                check: {
                    method: 'GET',
                    path: '/auth/check'
                }
            }
        })
    }

    public async isValidToken(request: Request, response: Response): Promise<any> {
        response.status(httpStatus.OK).json({
            message: "Authenticated!",
            _links: {
                login: {
                    method: 'POST',
                    path: '/auth/login'
                },
                check: {
                    method: 'GET',
                    path: '/auth/check'
                }
            }
        })
    }

}