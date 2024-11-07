import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { IHandler } from "../../../types";
import { githubClient } from "../../../utils/github.client";
import { PROCESS_TYPE } from "../../../types/proccess_types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { PayloadBuild } from "./interfaces/payloadBuilds";
import { config } from "../../../config/constants";

export class ClientWebHookGithub {
    constructor(private readonly db: SupabaseClient<Database, 'public'>) { }

    getStatusWorkflows: IHandler = async (req, res) => {
        try {
            const body = req.body as PayloadBuild
            const io = req.app.get('IO') as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
            console.log('up')
            if (io) {
                io.emit('send-status-apk', body)
            }
            if (body?.workflow_job?.status === "completed") {
                const data = await this.db.from('process').update({ status: 'off', last_update: new Date().toISOString() }).eq('id', PROCESS_TYPE.APK_GENERATE)
                console.log('completed',
                    data
                )
            }
            return res.json(body)
        } catch (err) {
            console.log('Error', err)
            return res.json({ msg: 'Error en obtener la respuesta', status: true })
        }
    }

    generateGithub: IHandler = async (req, res) => {

        if (!req.query.workflows_id) return res.json({ error: true, msg: 'No se ha seleccionado un flujo de trabajo' })
        if (!req.query.project_id) return res.json({ error: true, msg: 'No se ha seleccionado un projecto' })
        if (!req.query.os_id) return res.json({ error: true, msg: 'No se ha seleccionado lenguaje' })
        const project = await this.db.from('projects').select().eq('id', parseInt(req.query.project_id as string));
        const processAPk = await this.db.from('process').select().eq('id', PROCESS_TYPE.APK_GENERATE);
        if (!processAPk.data) return res.json({ error: true, msg: 'No existe procesos para esta acción' })
        if (!processAPk.data[0].status || processAPk.data[0].status === 'on') return res.json({ error: true, msg: 'Existe una compilación en curso, por favor espere a que esta termine y vuelva a intentarlo' })
        if (!project.data) return res.json({ error: true, msg: 'El projecto seleccionado no existe' })
        if (!project.data[0]) return res.json({ error: true, msg: 'El projecto seleccionado no existe' })
        if (!project.data[0]) return res.json({ error: true, msg: 'El projecto seleccionado no existe' })
        try {
            githubClient.method = 'post'
            githubClient.bodyInit = {
                "ref": "main",
                "inputs": {
                    projectName: project.data[0].name.replaceAll(' ', '-'),
                    projectId: req.query.project_id,
                    osId: req.query.os_id,
                    service: req.query?.api_url || config.origin,
                    serviceSocket: req.query?.api_socket_url || config.originSocket,
                    dev: req.query?.dev === 'true',
                }
            }
            console.log(githubClient.bodyInit)
            const request = await githubClient.rest(`/actions/workflows/${req.query.workflows_id as string}/dispatches`)
            const data = request?.data
            if (data !== null || data !== undefined) {
                await this.db.from('process').update({ status: 'on', last_update: new Date().toISOString() }).eq('id', PROCESS_TYPE.APK_GENERATE)
                return res.json({ error: false, msg: data || "Generando compilación..." })
            }
            return res.json({ error: true, msg: "Ocurrio un error en generar la aplicación", errorInfo: githubClient.error })
        }
        catch (err) {
            console.log(err)
            return res.json({ msg: 'Error' })
        }
    }

}