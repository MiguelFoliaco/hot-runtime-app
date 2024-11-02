"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = verify;
function verify(data, validation, strict = false) {
    var _a;
    const errors = [];
    // @ts-ignore
    const _keys = Object.keys(validation);
    for (const key of _keys) {
        // @ts-ignore
        if (data[key] === undefined && strict) {
            errors.push({ errors: `propertie ${key} is not undefined` });
            break;
        }
        // @ts-ignore
        if (validation[key] === 'date') {
            // @ts-ignore
            const date = new Date(data[key]);
            if (date.toString() === 'Invalid Date') {
                errors.push({
                    // @ts-ignore
                    errors: `propertie ${key} is not type ${validation[key]}`,
                });
                break;
            }
        }
        // @ts-ignore
        else if (validation[key] === 'array') {
            // @ts-ignore
            if (!((_a = data[key]) === null || _a === void 0 ? void 0 : _a.length)) {
                errors.push({
                    // @ts-ignore
                    errors: `propertie ${key} is not type ${validation[key]}`,
                });
                break;
            }
        }
        // @ts-ignore
        else if (typeof data[key] !== validation[key]) {
            errors.push({
                // @ts-ignore
                errors: `propertie ${key} is not type ${validation[key]}`,
            });
            break;
        }
    }
    return { message: 'propertie type invalid', errors };
}
