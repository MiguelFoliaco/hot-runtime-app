import { Router } from "express";
import { ClientWebHookExpo } from "./client";
import { verifySession } from '../../auth/middleware/verifySession'

const routeWebHook = Router()
const client = new ClientWebHookExpo()

routeWebHook.post('/expo', verifySession, client.getBuildStatus)
routeWebHook.get('/expo/generate-apk', verifySession, client.generateAPK)

export { routeWebHook }