"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const www_1 = require("./www");
const main = () => {
    const www = new www_1.WWW();
    www.listen((0, utils_1.env)('PORT'), true);
};
main();
