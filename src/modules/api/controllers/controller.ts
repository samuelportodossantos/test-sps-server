import { Request, Response } from "express";
import httpStatus from "http-status";
import { Service } from "../../../core/services/service";

export abstract class Controller {

    protected links = {}

    public setLinks(resource: string, links?: any): void {
        if (links) {
            this.links = links
        }
        this.links = {
            create: { "href": `/${resource}`, method: "POST" },
            update: { "href": `/${resource}/:id`, method: "PUT" },
            delete: { "href": `/${resource}/:id`, method: "DELETE"},
            list: { "href": `/${resource}`, method: "GET"}        
        }
    }

    constructor(protected readonly service: Service) {}

    protected async validateList(_request: Request, _response: Response): Promise<any> {}
    protected async validateCreate(_request: Request, _response: Response): Promise<any> {}
    protected async validateUpdate(_request: Request, _response: Response): Promise<any> {}
    protected async validateDelete(_request: Request, _response: Response): Promise<any> {}

    public async list(request: Request, response: Response) {
        try {
            const page = parseInt(String(request.query.page)) || 1
            response.status(httpStatus.OK).json({
                items: await this.service.listPaginated(page),
                _links: this.links
            })
        } catch (error: any) {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                _links: this.links
            })
        }
    }
    
    public async create(request: Request, response: Response) {
        try {
            const validated = await this.validateCreate(request, response)
            await this.service.createIfNotExists(validated)
            response.status(httpStatus.CREATED).json({
                items: [validated],
                _links: this.links
            })
        } catch (error: any) {
            response.status(httpStatus.BAD_REQUEST).json({
                message: error.message,
                _links: this.links
            })
        }
    }
    
    public async update(request: Request, response: Response) {
        try {
            const validated = await this.validateUpdate(request, response)
            await this.service.updateIfNotExists(validated)
            response.status(httpStatus.CREATED).json({
                items: [validated],
                _links: this.links
            })
        } catch (error: any) {
            response.status(httpStatus.BAD_REQUEST).json({
                message: error.message,
                _links: this.links
            })
        }
    }
    
    public async delete(request: Request, response: Response) {
        try {
            const validated = await this.validateDelete(request, response)
            await this.service.delete(validated.id)
            response.status(httpStatus.NO_CONTENT).json({
                _links: this.links
            })
        } catch (error: any) {
            response.status(httpStatus.BAD_REQUEST).json({
                message: error.message,
                _links: this.links
            })
        }
    }

}