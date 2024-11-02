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
exports.verifySession = void 0;
const db_1 = require("../../../db");
const verifySession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwt = req.headers.authorization;
    if (jwt === undefined) {
        return res.status(403).json({ msg: 'With out session', error: { code: '403', msg: 'unauthenticated' } });
    }
    const jwtParse = jwt.replace('Bearer ', '');
    const user = yield db_1.client.auth.getUser(jwtParse);
    yield db_1.client.auth.setSession({ access_token: jwtParse, refresh_token: '1' });
    if (user.data.user) {
        return next();
    }
    else {
        return res.status(403).json({ msg: 'With out session', error: user.error });
    }
});
exports.verifySession = verifySession;
