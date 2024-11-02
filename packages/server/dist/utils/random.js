"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
