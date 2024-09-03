import { routeCMS } from "./cms";
import { routeCode } from "./code";
import { routeWebHook } from "./webhooks/expo";
import { routeWebHookGihub } from "./webhooks/github";

export const routes = [
    routeCode,
    routeCMS,
    routeWebHook,
    routeWebHookGihub
]