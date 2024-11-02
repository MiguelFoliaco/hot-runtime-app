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
exports.CodeServices = void 0;
const esbuild_1 = __importDefault(require("esbuild"));
class CodeServices {
    constructor(client) {
        this.client = client;
        this.generateVersion = (version) => __awaiter(this, void 0, void 0, function* () {
            try {
                const codeRequest = yield this.client.from('components').select().eq("projectid", version.projectid);
                if (codeRequest.error)
                    return {
                        data: null,
                        error: codeRequest.error
                    };
                const codes = codeRequest.data.map(e => e.codeJSX);
                const codesUnion = codes.join('\n').replaceAll('export const', 'const');
                const codebuild = yield esbuild_1.default.transform(codesUnion, {
                    jsx: 'transform',
                    loader: 'tsx',
                    minify: true
                });
                const requestInsert = yield this.client.from('version-code').insert({
                    os_id: version.os_id,
                    projectid: version.projectid,
                    available_production: version.available_production,
                    available_test: version.available_test,
                    code_build: codebuild.code,
                    code_jsx: codesUnion,
                    publicateBy: version.publicateBy,
                    publicate_by_email: version.publicate_by_email,
                    programing_date: version.programing_date,
                    name: version.name || 'Without Name'
                });
                return requestInsert;
            }
            catch (err) {
                return {
                    count: 0,
                    data: null,
                    error: String(err),
                    status: 200,
                    statusText: "Error en compilación"
                };
            }
        });
        this.getVersionByProject = (projectId, os_id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.client.from('version-code').select().eq('projectid', projectId).eq('os_id', os_id).eq('available_production', true).limit(1).order('programing_date', {
                ascending: false
            });
        });
        this.compile = (codeJSX) => __awaiter(this, void 0, void 0, function* () {
            const codebuild = yield esbuild_1.default.transform(codeJSX, {
                jsx: 'transform',
                loader: 'tsx',
                minify: true
            });
            return codebuild;
        });
        this.createComponents = (data, projectId) => __awaiter(this, void 0, void 0, function* () {
            const components = yield this.client.from('components').select().in('name', data.map(e => e.name)).eq('projectid', projectId);
            if (components.error === null) {
                //Update components
                const responses = data.map(e => {
                    const item = components.data.find(el => el.name === e.name);
                    if (item) {
                        return this.client.from('components').update(Object.assign({}, e)).eq('id', item.id);
                    }
                    return this.client.from('components').insert(e);
                });
                return yield Promise.all(responses);
            }
            return components.error;
        });
    }
}
exports.CodeServices = CodeServices;
