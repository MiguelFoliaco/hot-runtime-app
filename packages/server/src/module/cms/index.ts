import { Router } from "express";
import { CMSServices } from "./services";
import { client } from "../../db";
import { CMSController } from "./controller";

const cmsService = new CMSServices(client)
const cmsController = new CMSController(cmsService)

const routeCMS = Router()
routeCMS.get('/cms-props', cmsController.getComponents)
export { routeCMS }