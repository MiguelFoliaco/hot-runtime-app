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
exports.verifyTokenDevelop = void 0;
const db_1 = require("../../../db");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../../../utils");
const verifyTokenDevelop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.headers['x-authentication-code'];
        if (!jwt)
            return res.status(403).json({ msg: 'Not provider Token', error: true });
        const token = jwt.replace('Bearer ', '');
        (0, jsonwebtoken_1.verify)(token, (0, utils_1.env)('JWT_KEY_CLIENT_generate') || '');
        const payload = (0, jsonwebtoken_1.decode)(token, {
            json: true,
        });
        const token_dev = yield db_1.client.from('tokens_dev').select('create_by').eq('id', payload.tokenID);
        if (!token_dev.data || !token_dev.data[0]) {
            return res.status(403).json({ msg: 'Token invalido', error: true });
        }
        const tokenSelected = token_dev.data[0];
        if (payload.userId !== tokenSelected.create_by) {
            return res.status(403).json({ msg: 'El dueño del token no corresponde con el usuario que realiza la petición', error: true });
        }
        //@ts-ignore
        req.session.tokenPayload = payload;
        return next();
    }
    catch (err) {
        const error = err;
        return res.json(error);
    }
});
exports.verifyTokenDevelop = verifyTokenDevelop;
