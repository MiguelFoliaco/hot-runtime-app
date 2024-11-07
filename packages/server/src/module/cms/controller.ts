import { IHandler } from "../../types";
import { CMSServices } from "./services";

export class CMSController {
    constructor(private readonly service: CMSServices) { }

    getComponents: IHandler = async (req, res) => {
        const { projectId } = req.query;
        const components = await this.service.getComponents(parseInt(projectId as string || '0'))
        return res.json(components)
    }
}