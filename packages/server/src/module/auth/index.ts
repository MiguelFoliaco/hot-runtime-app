import { Router } from "express";
import { verifySession } from "./middleware/verifySession";
import { AuthServices } from "./services";
import { client } from "../../db";
import { AuthController } from "./controller";

const routeAuth = Router()
const service = new AuthServices(client)
const controller = new AuthController(service)

routeAuth.post('/generateToken', verifySession, controller.generateToken)
routeAuth.post('/login', controller.login)
routeAuth.get('/get-user', controller.getUsers)

export { routeAuth }