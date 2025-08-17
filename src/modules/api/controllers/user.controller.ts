import { Request, Response } from "express";
import { Controller } from "./controller";
import { userCreateValidation } from "../validations/user-create.validation";
import { userUpdateValidation } from "../validations/user-update.validation";
import { userDeleteValidation } from "../validations/user-delete.validation";
import { userListValidation } from "../validations/user-list.validation";
import httpStatus from "http-status";

export class UserController extends Controller {

    public async list(request: Request, response: Response) {
        try {
            const page = parseInt(String(request.query.page)) || 1
            const content = await this.service.listPaginated(page, ['name', 'email', 'type']) 
            response.status(httpStatus.OK).json({
                ...content,
                _links: this.links
            })
        } catch (error: any) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                _links: this.links
            })
        }
    }
    
    protected async validateList(request: Request, response: Response): Promise<any> {
        return await userListValidation(request.params)
    }

    protected async validateCreate(request: Request, response: Response): Promise<any> {
        return await userCreateValidation(request.body)
    }
    
    protected async validateUpdate(request: Request, response: Response): Promise<any> {
        return userUpdateValidation(request.body)
    }

    protected async validateDelete(request: Request, response: Response): Promise<any> {
        return userDeleteValidation(request.params)
    }

}