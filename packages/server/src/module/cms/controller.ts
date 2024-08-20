import { IHandler } from "../../types";
import { CMSServices } from "./services";

export class CMSController {
    constructor(private service: CMSServices) { }

    getComponents: IHandler = async (req, res) => {
        const { projectId } = req.query;
        console.log(projectId)
        const components = await this.service.getComponents(parseInt(projectId as string || '0'))
        return res.json(components)
    }
}