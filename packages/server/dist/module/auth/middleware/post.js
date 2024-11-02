"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const verify_1 = require("../../../utils/verify");
const generateToken = (req, res, next) => {
    const checks = (0, verify_1.verify)(req.body, {
        user: 'object',
        rol: 'object',
    });
    if (checks.errors.length > 0) {
        return res.json(checks);
    }
    return next();
};
exports.generateToken = generateToken;
