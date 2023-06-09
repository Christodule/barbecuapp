"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigint = void 0;
var utils_1 = require("../utils");
function isValidBigIntValue(value) {
    return (typeof value === 'bigint' ||
        typeof value === 'number' ||
        (typeof value === 'string' && /^-?\d+$/.test(value)));
}
/** Create a bigint schema */
function bigint() {
    return utils_1.createSymmetricSchema({
        type: 'bigint',
        validate: utils_1.toValidator(isValidBigIntValue),
        map: utils_1.coerceStringOrNumberToBigInt,
    });
}
exports.bigint = bigint;
