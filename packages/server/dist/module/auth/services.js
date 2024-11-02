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
exports.AuthServices = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../../utils");
class AuthServices {
    constructor(client) {
        this.client = client;
        this.generateToken = (payload) => __awaiter(this, void 0, void 0, function* () {
            const actions = yield this.client.from('actions').select().in("id", payload.rol.actions);
            if (actions.error) {
                return actions.error;
            }
            const token_save = yield this.client.from('tokens_dev').insert({
                assing_by: payload.user.email || '',
                show: false,
                title: payload.title,
                create_by: payload.user.id
            }).select('*');
            const config = payload.timeExpire === 0 ? {} : {
                expiresIn: payload.timeExpire,
            };
            if (token_save.data) {
                const token = (0, jsonwebtoken_1.sign)({
                    actions: actions.data.map(e => e.code),
                    userId: payload.user.id,
                    username: payload.user.email,
                    tokenID: token_save.data[0].id || 'non-id'
                }, (0, utils_1.env)('JWT_KEY_CLIENT_generate') || 'secret-mi-perro', config);
                return token;
            }
            return token_save.error;
        });
        this.login = (_a) => __awaiter(this, [_a], void 0, function* ({ password, email }) {
            const sign = yield this.client.auth.signInWithPassword({
                email,
                password,
            });
            return sign;
        });
    }
}
exports.AuthServices = AuthServices;
