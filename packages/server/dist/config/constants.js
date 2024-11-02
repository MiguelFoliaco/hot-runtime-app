"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const utils_1 = require("../utils");
const configDev = {
    gitHubUrl: `https://api.github.com/repos`,
    ownerRepo: 'MiguelFoliaco',
    repo: 'runtime-rn',
    origin: 'http://192.168.1.4:3000/api',
    originSocket: 'http://192.168.1.4:3001'
};
const configProd = {
    gitHubUrl: "",
    ownerRepo: "",
    repo: "",
    origin: 'http://192.168.1.4:3000/api',
    originSocket: 'http://192.168.1.4:3001/api'
};
exports.config = (0, utils_1.env)('NODE_ENV') === 'development' ? configDev : configProd;
