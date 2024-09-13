import esbuild from 'esbuild'
import { IHandler } from "../../types";
import { app, template } from './data/App';
import { CodeServices } from './services';
import { Tables } from '../../database.types';
import { payloadTokenDev } from './middleware/verifyToken';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export class CodeController {
    constructor(private server: CodeServices) { }

    generateVersion: IHandler = async (req, res) => {
        const versionCode = req.body as Tables<'version-code'>
        const data = await this.server.generateVersion(versionCode)
        return res.json(data)
    }

    generateVersionDevelop: IHandler = async (req, res) => {

        //@ts-ignore
        const payloadToken = req.session.tokenPayload as payloadTokenDev
        if (!payloadToken.actions.includes('dev-cli-push')) {
            return res.status(403).json({ msg: 'No tienes permiso para esta operación' })
        }
        if (req.body.jsx) {
            const jsx = req.body.jsx as string;
            const compile = await this.server.compile(jsx)
            const io = req.app.get('IO') as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
            console.log('send socket')
            io.emit('send-code-dev', compile)
            return res.json(compile)
        }
        else if (req.body.js) {
            const js = req.body.js as string;
            const io = req.app.get('IO') as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
            io.emit('send-code-dev', { code: js, warnings: [] })
            return res.json({ code: js, warnings: [] })
        }
        else {
            return res.json({ msg: 'No haz enviado ningun codigo' })
        }
    }

    getVersionByProjectId: IHandler = async (req, res) => {
        const { projectId, os_id, all } = req.query
        if (!projectId) return res.json({ error: { message: 'No se ha proporcionado un projecto para generar la version' }, data: null })
        if (!os_id) return res.json({ error: { message: 'No se ha proporcionado un sistema operativo para generar la version' }, data: null })
        const data = await this.server.getVersionByProject(parseInt(projectId as string), parseInt(os_id as string))
        if (data.error) {
            return res.send(data.error.message)
        }
        res.setHeader('Content-Type', 'application/javascript')
        if (all === 'true') {
            return res.json(data.data[0])
        }
        if (data.data[0]) {
            return res.send(template(data.data[0].code_build))
        }
        return res.send(template(app))
    }

    compileJSX: IHandler = async (req, res) => {
        const jsx = req.body.jsx;
        const js = await this.server.compile(jsx);
        return res.json(js)
    }
}