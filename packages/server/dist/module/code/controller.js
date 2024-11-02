"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeController = void 0;
const App_1 = require("./data/App");
class CodeController {
    constructor(server) {
        this.server = server;
        this.generateVersion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const versionCode = req.body;
            const data = yield this.server.generateVersion(versionCode);
            return res.json(data);
        });
        this.generateVersionDevelop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const payloadToken = req.session.tokenPayload;
            if (!payloadToken.actions.includes('dev-cli-push')) {
                return res.status(403).json({ msg: 'No tienes permiso para esta operación' });
            }
            if (req.body.jsx) {
                const jsx = req.body.jsx;
                const compile = yield this.server.compile(jsx);
                const io = req.app.get('IO');
                console.log('send socket');
                io.emit('send-code-dev', compile);
                return res.json(compile);
            }
            else if (req.body.js) {
                const js = req.body.js;
                const io = req.app.get('IO');
                io.emit('send-code-dev', { code: js, warnings: [] });
                return res.json({ code: js, warnings: [] });
            }
            else {
                return res.json({ msg: 'No haz enviado ningun codigo' });
            }
        });
        this.getVersionByProjectId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { projectId, os_id, all } = req.query;
            if (!projectId)
                return res.json({ error: { message: 'No se ha proporcionado un projecto para generar la version' }, data: null });
            if (!os_id)
                return res.json({ error: { message: 'No se ha proporcionado un sistema operativo para generar la version' }, data: null });
            const data = yield this.server.getVersionByProject(parseInt(projectId), parseInt(os_id));
            if (data.error) {
                return res.send(data.error.message);
            }
            res.setHeader('Content-Type', 'application/javascript');
            if (all === 'true') {
                return res.json(data.data[0]);
            }
            if (data.data[0]) {
                return res.send((0, App_1.template)(data.data[0].code_build));
            }
            return res.send((0, App_1.template)(App_1.app));
        });
        this.compileJSX = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jsx = req.body.jsx;
            const js = yield this.server.compile(jsx);
            return res.json(js);
        });
        this.createComponents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { components, projectId } = req.body;
            const data = yield this.server.createComponents(components, projectId);
            return res.json(Object.assign({ msg: 'Holas' }, data));
        });
    }
}
exports.CodeController = CodeController;
