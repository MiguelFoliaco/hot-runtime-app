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
exports.RequestTools = void 0;
const axios_1 = __importDefault(require("axios"));
class RequestTools {
    constructor({ uri, bodyInit, method, query, typeRequest, variables, configAxios, logger }) {
        this.method = 'get';
        this.uri = uri;
        this.bodyInit = bodyInit;
        this.method = method || 'get';
        this.query = query;
        this.typeRequest = typeRequest || 'REST';
        this.variables = variables;
        this.logger = logger || false;
        this.configAxios = Object.assign(Object.assign({}, configAxios), { url: uri });
        this.fetcher = axios_1.default.create(Object.assign(Object.assign({}, configAxios), { url: uri }));
    }
    rest() {
        return __awaiter(this, arguments, void 0, function* (path = '') {
            if (this.logger) {
                console.log('\x1b[41m', ' API REST ', '\x1b[0m', ` ${this.uri}`);
            }
            try {
                const response = yield this.fetcher[this.method](this.uri + `${path}`, this.bodyInit);
                if (response.statusText !== 'ok') {
                    this.error = response.statusText;
                }
                return response.data;
            }
            catch (err) {
                this.error = err;
                return null;
            }
        });
    }
    ql() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logger) {
                console.log('\x1b[44m', ' GrahpQL ', '\x1b[0m', ` ${this.uri}`);
            }
            try {
                const response = yield this.fetcher.post(this.uri, {
                    query: this.query,
                    variables: this.variables,
                });
                if (response.statusText !== 'ok') {
                    this.error = response.statusText;
                }
                return response.data;
            }
            catch (err) {
                this.error = err;
                return null;
            }
        });
    }
}
exports.RequestTools = RequestTools;
