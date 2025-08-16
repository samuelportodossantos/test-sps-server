import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import environment from "../../config/environment";

declare module 'express-serve-static-core' {
    interface Request {
        user?: any
    }
}

export function mustBeAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.status(httpStatus.UNAUTHORIZED).json({
            error: 'Authentication token must be provided.'
        })
    }

    const token = authHeader.replace('Bearer ', '')
    try {
        const decoded = jwt.verify(token, environment.api.token.secretKey);
        request.user = decoded
        next()
    } catch (error: any) {
        return response.status(httpStatus.UNAUTHORIZED).json({
            error: 'Invalid token!'
        })
    }

}