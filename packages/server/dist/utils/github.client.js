"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubClient = void 0;
const constants_1 = require("../config/constants");
const env_1 = require("./env");
const requestTools_1 = require("./requestTools");
exports.githubClient = new requestTools_1.RequestTools({
    uri: `${constants_1.config.gitHubUrl}/${constants_1.config.ownerRepo}/${constants_1.config.repo}`,
    configAxios: {
        headers: {
            Authorization: `Bearer ${(0, env_1.env)('GITHUB_KEY')}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }
});
