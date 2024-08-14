import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export type MethodMap = 'get' | 'post' | 'head' | 'options' | 'patch' | 'put';
export type TypeRequest = 'REST' | 'GRAPHQL';

export interface ConstructorType {
    uri: string;
    method?: MethodMap;
    typeRequest?: TypeRequest;
    query?: string;
    variables?: string;
    bodyInit?: RequestInit;
    configAxios?: CreateAxiosDefaults;
    logger?: boolean;
}

export class RequestTools {
    uri: string;
    method: MethodMap = 'get';
    typeRequest: TypeRequest;
    query?: string;
    variables?: unknown;
    bodyInit?: unknown;
    private fetcher: AxiosInstance;
    configAxios: CreateAxiosDefaults;
    error: unknown;
    logger: boolean;

    constructor({
        uri,
        bodyInit,
        method,
        query,
        typeRequest,
        variables,
        configAxios,
        logger
    }: ConstructorType) {
        this.uri = uri;
        this.bodyInit = bodyInit;
        this.method = method || 'get';
        this.query = query;
        this.typeRequest = typeRequest || 'REST';
        this.variables = variables;
        this.logger = logger || false
        this.configAxios = {
            ...configAxios,
            url: uri,
        };
        this.fetcher = axios.create({
            ...configAxios,
            url: uri,
        });
    }

    async rest<T = unknown>(path = '', config?: CreateAxiosDefaults) {
        if (this.logger) {
            console.log('\x1b[41m', ' API REST ', '\x1b[0m', ` ${this.uri}`);
        }
        try {
            console.log(
                this.uri + `${path}`,
                this.method === 'post' ? this.bodyInit : config,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                this.method === 'post' ? config : undefined)
            const response = await this.fetcher[this.method]<T>(
                this.uri + `${path}`,
                this.method === 'post' ? this.bodyInit : config,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                this.method === 'post' ? config : undefined
            );
            if (response.statusText !== 'ok') {
                this.error = response.statusText;
            }
            return response.data;
        } catch (err) {
            this.error = err;
            return null;
        }
    }
    async ql<T = unknown>() {
        if (this.logger) {
            console.log('\x1b[44m', ' GrahpQL ', '\x1b[0m', ` ${this.uri}`);
        }
        try {
            const response = await this.fetcher.post<T>(this.uri, {
                query: this.query,
                variables: this.variables,
            });
            if (response.statusText !== 'ok') {
                this.error = response.statusText;
            }
            return response.data;
        } catch (err) {
            this.error = err;
            return null;
        }
    }
}
