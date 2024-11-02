import { Router } from "express";
import { client as _ } from "../../../db";
import { ClientWebHookGithub } from "./client";
import { verifySession } from "../../auth/middleware/verifySession";

const routeWebHookGihub = Router()
const client = new ClientWebHookGithub(_)

routeWebHookGihub.post('/github', client.getStatusWorkflows)
routeWebHookGihub.post('/github/generate-apk', verifySession, client.generateGithub)

export { routeWebHookGihub }