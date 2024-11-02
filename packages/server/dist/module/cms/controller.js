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
exports.CMSController = void 0;
class CMSController {
    constructor(service) {
        this.service = service;
        this.getComponents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { projectId } = req.query;
            console.log(projectId);
            const components = yield this.service.getComponents(parseInt(projectId || '0'));
            return res.json(components);
        });
    }
}
exports.CMSController = CMSController;
