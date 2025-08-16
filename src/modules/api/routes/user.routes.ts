import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../../core/services/user.service";
import { MemoryDatabase } from "../../db/memory.db";
import { mustBeAuthenticated } from "../middlewares/auth.middleware";

const userRoutes = Router()
const database = new MemoryDatabase()
const userService = new UserService(database)
const userController = new UserController(userService)
userController.setLinks('users')

userRoutes.use(mustBeAuthenticated)
userRoutes.get('/', userController.list.bind(userController))
userRoutes.post('/create', userController.create.bind(userController))
userRoutes.put('/update/:id', userController.update.bind(userController))
userRoutes.delete('/delete/:id', userController.delete.bind(userController))

export default userRoutes