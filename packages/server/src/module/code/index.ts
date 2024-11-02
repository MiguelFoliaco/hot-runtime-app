import { Router } from "express";
import { CodeController } from "./controller";
import { CodeServices } from "./services";
import { client } from './../../db/index';
import { verifySession } from "../auth/middleware/verifySession";
import { verifyGenerateVersion } from "../auth/middleware/verifies";
import { verifyTokenDevelop } from "./middleware/verifyToken";
import { verifyPushComponents } from "./middleware/post";

const routeCode = Router()
const service = new CodeServices(client)
const controllerCode = new CodeController(service)

routeCode.post('/compile', verifySession, controllerCode.compileJSX)
routeCode.post('/generate-code', verifySession, verifyGenerateVersion, controllerCode.generateVersion)
routeCode.post('/create-component', verifySession, verifyPushComponents, controllerCode.createComponents)
routeCode.post('/generate-code-dev', verifySession, verifyTokenDevelop, controllerCode.generateVersionDevelop)
routeCode.get('/version', controllerCode.getVersionByProjectId)

export { routeCode }