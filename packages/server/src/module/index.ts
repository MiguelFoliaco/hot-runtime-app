import { routeAuth } from "./auth";
import { routeCMS } from "./cms";
import { routeCode } from "./code";
import { routeWebHook } from "./webhooks/expo";
import { routeWebHookGihub } from "./webhooks/github";

export const routes = [
    routeAuth,
    routeCode,
    routeCMS,
    routeWebHook,
    routeWebHookGihub
]