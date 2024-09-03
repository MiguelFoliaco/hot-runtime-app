import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { IHandler, IHandlerSync } from "../../../types";
import { githubClient } from "../../../utils/github.client";

export class ClientWebHookGithub {
    constructor(private db: SupabaseClient<Database, 'public'>) { }

    getStatusWorkflows: IHandlerSync = (req, res) => {
        console.log("BODY GITHUB", req.body)
        return res.json(req.body)
    }

    generateGithub: IHandler = async (req, res) => {
        if (!req.query.workflows_id) return res.json({ error: true, msg: 'No se ha seleccionado un flujo de trabajo' })
        if (!req.query.project_id) return res.json({ error: true, msg: 'No se ha seleccionado un projecto' })
        const project = await this.db.from('projects').select().eq('id', req.query.project_id);
        if (!project.data) return res.json({ error: true, msg: 'El projecto seleccionado no existe' })
        if (!project.data[0]) return res.json({ error: true, msg: 'El projecto seleccionado no existe' })
        try {
            githubClient.method = 'post'
            githubClient.bodyInit = {
                "ref": "main",
                "inputs": {
                    projectName: project.data[0].name
                }
            }
            const request = await githubClient.rest(`/actions/workflows/${req.query.workflows_id as string}/dispatches`)
            const data = request.data
            return res.json({ error: false, msg: data || "Generando compilación..." })
        }
        catch (err) {
            console.log(err)
            return res.json({ msg: 'Error' })
        }
    }

}