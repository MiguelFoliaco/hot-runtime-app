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
exports.ClientWebHookGithub = void 0;
const github_client_1 = require("../../../utils/github.client");
const proccess_types_1 = require("../../../types/proccess_types");
const constants_1 = require("../../../config/constants");
class ClientWebHookGithub {
    constructor(db) {
        this.db = db;
        this.getStatusWorkflows = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const body = req.body;
                const io = req.app.get('IO');
                console.log('up');
                if (io) {
                    io.emit('send-status-apk', body);
                }
                if (((_a = body === null || body === void 0 ? void 0 : body.workflow_job) === null || _a === void 0 ? void 0 : _a.status) === "completed") {
                    const data = yield this.db.from('process').update({ status: 'off', last_update: new Date().toISOString() }).eq('id', proccess_types_1.PROCESS_TYPE.APK_GENERATE);
                    console.log('completed', data);
                }
                return res.json(body);
            }
            catch (err) {
                console.log('Error', err);
                return res.json({ msg: 'Error en obtener la respuesta', status: true });
            }
        });
        this.generateGithub = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (!req.query.workflows_id)
                return res.json({ error: true, msg: 'No se ha seleccionado un flujo de trabajo' });
            if (!req.query.project_id)
                return res.json({ error: true, msg: 'No se ha seleccionado un projecto' });
            if (!req.query.os_id)
                return res.json({ error: true, msg: 'No se ha seleccionado lenguaje' });
            const project = yield this.db.from('projects').select().eq('id', parseInt(req.query.project_id));
            const processAPk = yield this.db.from('process').select().eq('id', proccess_types_1.PROCESS_TYPE.APK_GENERATE);
            if (!processAPk.data)
                return res.json({ error: true, msg: 'No existe procesos para esta acción' });
            if (!processAPk.data[0].status || processAPk.data[0].status === 'on')
                return res.json({ error: true, msg: 'Existe una compilación en curso, por favor espere a que esta termine y vuelva a intentarlo' });
            if (!project.data)
                return res.json({ error: true, msg: 'El projecto seleccionado no existe' });
            if (!project.data[0])
                return res.json({ error: true, msg: 'El projecto seleccionado no existe' });
            if (!project.data[0])
                return res.json({ error: true, msg: 'El projecto seleccionado no existe' });
            try {
                github_client_1.githubClient.method = 'post';
                github_client_1.githubClient.bodyInit = {
                    "ref": "main",
                    "inputs": {
                        projectName: project.data[0].name.replaceAll(' ', '-'),
                        projectId: req.query.project_id,
                        osId: req.query.os_id,
                        service: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.api_url) || constants_1.config.origin,
                        serviceSocket: ((_b = req.query) === null || _b === void 0 ? void 0 : _b.api_socket_url) || constants_1.config.originSocket,
                        dev: ((_c = req.query) === null || _c === void 0 ? void 0 : _c.dev) === 'true',
                    }
                };
                console.log(github_client_1.githubClient.bodyInit);
                const request = yield github_client_1.githubClient.rest(`/actions/workflows/${req.query.workflows_id}/dispatches`);
                console.log(request, github_client_1.githubClient.error);
                const data = request === null || request === void 0 ? void 0 : request.data;
                if (data !== null || data !== undefined) {
                    yield this.db.from('process').update({ status: 'on', last_update: new Date().toISOString() }).eq('id', proccess_types_1.PROCESS_TYPE.APK_GENERATE);
                    return res.json({ error: false, msg: data || "Generando compilación..." });
                }
                return res.json({ error: true, msg: "Ocurrio un error en generar la aplicación", errorInfo: github_client_1.githubClient.error });
            }
            catch (err) {
                console.log(err);
                return res.json({ msg: 'Error' });
            }
        });
    }
}
exports.ClientWebHookGithub = ClientWebHookGithub;
