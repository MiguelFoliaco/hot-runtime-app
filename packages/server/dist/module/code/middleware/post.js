"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPushComponents = exports.verifyCompile = void 0;
const verify_1 = require("../../../utils/verify");
const verifyCompile = (req, res, next) => {
    const errors = (0, verify_1.verify)(req.body, {
        jsx: 'string'
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
exports.verifyCompile = verifyCompile;
const verifyPushComponents = (req, res, next) => {
    var _a;
    const body = (_a = req.body) === null || _a === void 0 ? void 0 : _a.components;
    if (body instanceof Array && req.body.projectId) {
        return next();
    }
    return res.json({
        data: null,
        error: {
            message: "Payload type invalid"
        },
    });
};
exports.verifyPushComponents = verifyPushComponents;
