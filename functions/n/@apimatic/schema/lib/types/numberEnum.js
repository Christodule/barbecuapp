"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberEnum = void 0;
var utils_1 = require("../utils");
function createEnumChecker(enumVariable) {
    var enumValues = Object.values(enumVariable);
    return function (value) {
        return utils_1.isNumericString(value) &&
            enumValues.includes(utils_1.coerceNumericStringToNumber(value));
    };
}
/**
 * Create a schema for a number enumeration.
 */
function numberEnum(enumVariable) {
    var validate = utils_1.toValidator(createEnumChecker(enumVariable));
    return utils_1.createSymmetricSchema({
        type: "Enum<" + Object.values(enumVariable)
            .filter(function (v) { return typeof v === 'number'; })
            .join(',') + ">",
        map: utils_1.coerceNumericStringToNumber,
        validate: validate,
    });
}
exports.numberEnum = numberEnum;
