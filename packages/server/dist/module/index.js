"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("./auth");
const cms_1 = require("./cms");
const code_1 = require("./code");
const expo_1 = require("./webhooks/expo");
const github_1 = require("./webhooks/github");
exports.routes = [
    auth_1.routeAuth,
    code_1.routeCode,
    cms_1.routeCMS,
    expo_1.routeWebHook,
    github_1.routeWebHookGihub
];
