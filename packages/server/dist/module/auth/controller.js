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
exports.AuthController = void 0;
class AuthController {
    constructor(service) {
        this.service = service;
        this.generateToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const data = yield this.service.generateToken(body);
            return res.json(typeof data === "string" ? { token: data } : Object.assign({ token: null }, data));
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.json(yield this.service.login(req.body));
        });
    }
}
exports.AuthController = AuthController;
