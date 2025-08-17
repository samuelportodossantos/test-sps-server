export interface DBInterface {
    list(page: number, petPage: number, fields?: string[]): { data: any[]; total: number; page: number; perPage: number }
    insert(data: any): any
    update(id: number, data: any): any
    delete(id: number): void
    findByField(field: string, value: string): any
}