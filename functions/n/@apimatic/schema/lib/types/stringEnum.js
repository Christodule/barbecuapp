"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringEnum = void 0;
var utils_1 = require("../utils");
function createEnumChecker(enumVariable) {
    var enumValues = Object.values(enumVariable);
    return function (value) {
        return typeof value === 'string' && enumValues.includes(value);
    };
}
/**
 * Create a schema for a string enumeration.
 */
function stringEnum(enumVariable) {
    var validate = utils_1.toValidator(createEnumChecker(enumVariable));
    return utils_1.createSymmetricSchema({
        type: "Enum<" + Object.values(enumVariable).map(utils_1.literalToString).join(',') + ">",
        map: utils_1.identityFn,
        validate: validate,
    });
}
exports.stringEnum = stringEnum;
