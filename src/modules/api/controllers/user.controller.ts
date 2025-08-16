import { Request, Response } from "express";
import { Controller } from "./controller";
import { userCreateValidation } from "../validations/user-create.validation";
import { userUpdateValidation } from "../validations/user-update.validation";
import { userDeleteValidation } from "../validations/user-delete.validation";
import { userListValidation } from "../validations/user-list.validation";

export class UserController extends Controller {

    
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