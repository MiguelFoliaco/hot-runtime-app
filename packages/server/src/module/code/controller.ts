import esbuild from 'esbuild'
import { IHandler } from "../../types";
import { app, template } from './data/App';
import { CodeServices } from './services';
import { Tables } from '../../database.types';

export class CodeController {
    constructor(private server: CodeServices) { }

    generateVersion: IHandler = async (req, res) => {
        const versionCode = req.body as Tables<'version-code'>
        const data = await this.server.generateVersion(versionCode)
        return res.json(data)
    }

    generateVersionDevelop = () => { }

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