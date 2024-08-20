import { routeCMS } from "./cms";
import { routeCode } from "./code";
import { routeWebHook } from "./webhooks/expo";

export const routes = [
    routeCode,
    routeCMS,
    routeWebHook
]