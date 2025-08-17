import { Router } from "express";
import { UserService } from "../../../core/services/user.service";
import { MemoryDatabase } from "../../db/memory.db";
import { AuthController } from "../controllers/auth.controller";
import { mustBeAuthenticated } from "../middlewares/auth.middleware";

const authRoutes = Router()
const database = new MemoryDatabase()
const userService = new UserService(database)
const authController = new AuthController(userService)

authRoutes.post('/login', authController.authenticate.bind(authController))

authRoutes.use(mustBeAuthenticated)
authRoutes.get('/check', authController.isValidToken.bind(authController))

export default authRoutes 