"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = void 0;
const getSession = (req) => {
    const jwt = typeof req === 'string' ? req : req.headers.authorization;
    return jwt.replace('Bearer ', '');
};
exports.getSession = getSession;
