import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IHandler, IHandlerSync } from "../../../types";
import { Socket } from "socket.io";
import { env } from "../../../utils";
import axios from "axios";

export class ClientWebHookExpo {
    constructor() { }

    getBuildStatus: IHandlerSync = (req, res) => {
        try {
            console.log('entry', req.body)
            const io = req.app.get('IO') as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
            if (io) {
                io.broadcast.emit('send-status-apk', req.body)
            }
            return res.json(req.body)
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

            const request = await axios.post(`https://api.github.com/repos/MiguelFoliaco/hot-runtime/actions/workflows/${req.query.workflows_id}/dispatches`,
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