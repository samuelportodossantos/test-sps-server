import { DBInterface } from "../../core/interfaces/db.interface";
import environment from "../config/environment";
import { passwordToHash } from "../security/crypto";

export class MemoryDatabase implements DBInterface {

    private dataList: Map<number, any> = new Map()

    constructor() {
        if (process.env.NODE_ENV === "development" && !this.findByField('email', environment.defaultUser.email)) {
            passwordToHash(environment.defaultUser.password).then((password) => {
                this.insert({
                    name: `Admin`,
                    email: environment.defaultUser.email,
                    password: password,
                    type: 'admin'
                })
            })
        }
    }

    list(
        page: number = 1,
        perPage: number = 10,
        fields?: string[]
    ): { items: any[]; total: number; page: number; perPage: number } {
        const allItems = Array.from(this.dataList.entries()).map(([id, obj]) => {
            const item = { id, ...obj };
            if (fields && fields.length > 0) {
                const filtered: any = { id };
                for (const field of fields) {
                    if (field in item) filtered[field] = item[field];
                }
                return filtered;
            }
            return item;
        });
        const total = allItems.length;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const items = allItems.slice(start, end);
        return { items, total, page, perPage };
    }

    insert(data: any) {
        const key = this.dataList.size
        this.dataList.set(key, data)
        return this.dataList.get(key)
    }

    update(id: number, data: any) {
        if (!this.dataList.has(id)) {
            throw new Error(`The registry for id ${id} does not exists.`)
        }
        this.dataList.set(id, data)
        return this.dataList.get(id)
    }
    delete(id: number): void {
        if (!this.dataList.has(id)) {
            throw new Error(`The registry for id ${id} does not exists.`)
        }
        this.dataList.delete(id)
    }

    findByField(field: string, value: string) {
        for (const [id, item] of Array.from(this.dataList.entries())) {
            if (item[field] === value) {
                return { ...item, id };
            }
        }
        return null;
    }

    clear() {
        this.dataList.clear()
    }

}