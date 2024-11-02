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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientWebHookExpo = void 0;
const utils_1 = require("../../../utils");
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../../config/constants");
class ClientWebHookExpo {
    constructor(db) {
        this.db = db;
        this.getBuildStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const io = req.app.get('IO');
                const datasave = yield this.db.from('builds').insert({
                    git_commit_hash: body.metadata.gitCommitHash,
                    git_commit_message: body.metadata.gitCommitMessage,
                    logs_s3_key_prefix: body.artifacts.logsS3KeyPrefix || 'empity',
                    build_url: body.artifacts.buildUrl,
                    created_at: body.createdAt,
                    payload_str: JSON.stringify(body),
                    size: body.metrics.totalDiskWriteBytes,
                });
                console.log(datasave, "DATA-SAVE");
                if (io) {
                    io.emit('send-status-apk', body);
                }
                return res.json(body);
            }
            catch (err) {
                console.log('Error', err);
                return res.json({ msg: 'Error en obtener la respuesta', status: true });
            }
        });
        this.generateAPK = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.query.workflows_id)
                return res.json({ error: true, msg: 'No se ha seleccionado un flujo de trabajo' });
            // const headers = new Headers()
            // headers.set('Authorization', `Bearer ${env('GITHUB_KEY')}`)
            // headers.set('Accept', 'application/vnd.github+json')
            // headers.set('X-GitHub-Api-Version', '2022-11-28')
            try {
                const request = yield axios_1.default.post(`${constants_1.config.gitHubUrl}/${constants_1.config.ownerRepo}/${constants_1.config.repo}/actions/workflows/${req.query.workflows_id}/dispatches`, {
                    "ref": "main",
                    "inputs": {}
                }, {
                    headers: {
                        Authorization: `Bearer ${(0, utils_1.env)('GITHUB_KEY')}`,
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                });
                const data = yield request.data;
                // const data = await this.clientGithub.request('POST /repos/{owner}/{repo}/dispatches', {
                //     owner: 'MiguelFoliaco',
                //     event_type: 'Run by API',
                //     repo: 'hot-runtime'
                // })
                return res.json({ error: false, msg: data || "Generando compilación..." });
            }
            catch (err) {
                console.log(err);
                return res.json({ msg: 'Error' });
            }
        });
    }
}
exports.ClientWebHookExpo = ClientWebHookExpo;
