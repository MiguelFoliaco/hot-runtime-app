"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGenerateVersion = void 0;
const verify_1 = require("../../../utils/verify");
const verifyGenerateVersion = (req, res, next) => {
    const errors = (0, verify_1.verify)(req.body, {
        available_production: 'boolean',
        available_test: 'boolean',
        os_id: 'number',
        projectid: 'number',
        publicateBy: 'string'
    });
    if (errors.errors.length > 0) {
        return res.json({
            data: null,
            error: {
                message: errors.message
            },
            errors
        });
    }
    return next();
};
exports.verifyGenerateVersion = verifyGenerateVersion;
