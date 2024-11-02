import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IHandler } from "../../../types";
import { Socket } from "socket.io";
import { env } from "../../../utils";
import axios from "axios";
import { PayloadBuild } from "./interfaces/payloadBuilds";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { config } from "../../../config/constants";

export class ClientWebHookExpo {

    constructor(private db: SupabaseClient<Database, 'public'>) { }

    getBuildStatus: IHandler = async (req, res) => {
        try {
            const body = req.body as PayloadBuild
            const io = req.app.get('IO') as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
            const datasave = await this.db.from('builds').insert({
                git_commit_hash: body.metadata.gitCommitHash,
                git_commit_message: body.metadata.gitCommitMessage,
                logs_s3_key_prefix: body.artifacts.logsS3KeyPrefix || 'empity',
                build_url: body.artifacts.buildUrl,
                created_at: body.createdAt,
                payload_str: JSON.stringify(body),
                size: body.metrics.totalDiskWriteBytes,
            })
            console.log(datasave, "DATA-SAVE")
            if (io) {
                io.emit('send-status-apk', body)
            }
            return res.json(body)
        } catch (err) {
            console.log('Error', err)
            return res.json({ msg: 'Error en obtener la respuesta', status: true })
        }
    }
    generateAPK: IHandler = async (req, res) => {
        if (!req.query.workflows_id) return res.json({ error: true, msg: 'No se ha seleccionado un flujo de trabajo' })
        // const headers = new Headers()
        // headers.set('Authorization', `Bearer ${env('GITHUB_KEY')}`)
        // headers.set('Accept', 'application/vnd.github+json')
        // headers.set('X-GitHub-Api-Version', '2022-11-28')
        try {

            const request = await axios.post(`${config.gitHubUrl}/${config.ownerRepo}/${config.repo}/actions/workflows/${req.query.workflows_id as string}/dispatches`,
                {
                    "ref": "main",
                    "inputs": {}
                }
                , {
                    headers: {
                        Authorization: `Bearer ${env('GITHUB_KEY')}`,
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                })
            const data = await request.data
            // const data = await this.clientGithub.request('POST /repos/{owner}/{repo}/dispatches', {
            //     owner: 'MiguelFoliaco',
            //     event_type: 'Run by API',
            //     repo: 'hot-runtime'
            // })

            return res.json({ error: false, msg: data || "Generando compilación..." })
        }
        catch (err) {
            console.log(err)
            return res.json({ msg: 'Error' })
        }
    }
}