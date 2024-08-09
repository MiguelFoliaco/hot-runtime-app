import { Router } from "express";
import { CodeController } from "./controller";

const routeCode = Router()
const controllerCode = new CodeController()

routeCode.get('/get-code', controllerCode.getCode)

export { routeCode }