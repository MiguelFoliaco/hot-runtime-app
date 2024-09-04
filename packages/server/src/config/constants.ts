import { env } from "../utils";

type config = {
    gitHubUrl: string;
    ownerRepo: string;
    repo: string;
}
const configDev: config = {
    gitHubUrl: `https://api.github.com/repos`,
    ownerRepo: 'MiguelFoliaco',
    repo: 'hot-runtime'
}

const configProd: config = {
    gitHubUrl: "",
    ownerRepo: "",
    repo: ""
}

export const config = env('NODE_ENV') === 'development' ? configDev : configProd