import { Router } from "express";
import { ClientWebHookExpo } from "./client";
import { verifySession } from '../../auth/middleware/verifySession'
import { client as _ } from "../../../db";

const routeWebHook = Router()
const client = new ClientWebHookExpo(_)

routeWebHook.post('/expo', client.getBuildStatus)
routeWebHook.get('/expo/generate-apk', verifySession, client.generateAPK)

export { routeWebHook }