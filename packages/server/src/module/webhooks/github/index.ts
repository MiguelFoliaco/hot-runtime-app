import { Router } from "express";
// import { verifySession } from '../../auth/middleware/verifySession'
import { client as _ } from "../../../db";
import { ClientWebHookGithub } from "./client";

const routeWebHookGihub = Router()
const client = new ClientWebHookGithub(_)

routeWebHookGihub.post('/github', client.getStatusWorkflows)
// routeWebHook.get('/expo/generate-apk', verifySession, client.generateAPK)

export { routeWebHookGihub }