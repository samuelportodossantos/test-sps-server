import { DBInterface } from "../interfaces/db.interface";

export abstract class Service {

    constructor(protected readonly repository: DBInterface) { }

    public async authenticate(_email: string, _password: string): Promise<any> {}
    public async createIfNotExists(_user: any): Promise<any> {}
    public async updateIfNotExists(_user: any): Promise<any> {}

    public async listPaginated(page: number, fields?: string[]): Promise<any> {
        return this.repository.list(page, 10, fields)
    }

    public async update(id: number, user: any): Promise<any> {
        return await this.repository.update(id, user)
    }

    public async delete(id: number): Promise<any> {
        return this.repository.delete(id)
    }

}