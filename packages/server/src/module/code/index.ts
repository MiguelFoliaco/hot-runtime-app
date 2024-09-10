import { Router } from "express";
import { CodeController } from "./controller";
import { CodeServices } from "./services";
import { client } from './../../db/index';
import { verifySession } from "../auth/middleware/verifySession";
import { verifyGenerateVersion } from "../auth/middleware/verifies";

const routeCode = Router()
const service = new CodeServices(client)
const controllerCode = new CodeController(service)

routeCode.post('/compile', verifySession, controllerCode.compileJSX)
routeCode.post('/generate-code', verifySession, verifyGenerateVersion, controllerCode.generateVersion)
routeCode.get('/version', controllerCode.getVersionByProjectId)

export { routeCode }