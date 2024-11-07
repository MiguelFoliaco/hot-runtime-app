import { env } from "../utils";

type config = {
    gitHubUrl: string;
    ownerRepo: string;
    repo: string;
    origin: string;
    originSocket: string;
}
const configDev: config = {
    gitHubUrl: `https://api.github.com/repos`,
    ownerRepo: 'MiguelFoliaco',
    repo: 'runtime-rn',
    origin: 'http://192.168.1.6:3000/api',
    originSocket: 'http://192.168.1.6:3000'
}

const configProd: config = {
    gitHubUrl: `https://api.github.com/repos`,
    ownerRepo: 'MiguelFoliaco',
    repo: 'runtime-rn',
    origin: 'https://hot-runtime-app.onrender.com/api',
    originSocket: 'https://hot-runtime-app.onrender.com'
}

export const config = env('NODE_ENV') === 'development' ? configDev : configProd