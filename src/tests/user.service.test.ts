import { UserService } from "../core/services/user.service";
import { MemoryDatabase } from "../modules/db/memory.db";

describe('UserService', () => {

    const db = new MemoryDatabase()
    const userService = new UserService(db)

    const user = {
        name: "Mock Name 2",
        password: "123abc@A",
        email: "admin1@email.com",
        type: "admin"
    }

    it('should create an user', async () => {
        const created = await userService.createIfNotExists(user)
        expect(created).toEqual(user)
    })

    it('should have one registry', async () => {
        const result1 = await userService.listPaginated(1)
        expect(result1.items.length).toBeGreaterThan(0)
    })

    it('should have a new name after update', async () => {
        const result = await userService.listPaginated(1)
        expect(result.items[0].name).toEqual("Mock Name 2")
        user.name = "New Mock Name"
        const updated = await userService.update(result.items[0].id, user)
        expect(updated.name).toEqual("New Mock Name")
    });

    it('should throw an error when trying to add a existing email address', async () => {
        try {
            await userService.createIfNotExists(user)
        } catch(error) {
            expect(error.message).toEqual('User email(admin1@email.com) already registered, please choose other.')
        }
    })

    it('should have two registries when add a new account with unexistent email address', async () => {
        const user1 = {
            name: "Mock Name 2",
            password: "123abc@A",
            email: "admin3@email.com",
            type: "admin"
        }
        await userService.createIfNotExists(user1)
        const list = await userService.listPaginated(1)
        expect(list.total).toEqual(2)
    })

    it('should have no registry after delete two users', async () => {
        await userService.delete(0)
        await userService.delete(1)
        const result2 = await userService.listPaginated(1)
        expect(result2.items.length).toEqual(0)
    })
});