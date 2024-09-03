import { env } from "./env";
import { RequestTools } from "./requestTools";

export const githubClient = new RequestTools({
    uri: 'https://api.github.com/repos/MiguelFoliaco/runtime-rn',
    configAxios: {
        headers: {
            Authorization: `Bearer ${env('GITHUB_KEY')}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }
})