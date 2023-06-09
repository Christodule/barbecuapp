"use strict";
/**
 * bandwidthLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortError = void 0;
var tslib_1 = require("tslib");
/**
 * Thrown when the API call is aborted by the caller.
 *
 * Note that when an AbortError is thrown, it is not a guarantee that the API call
 * did not go through.
 */
var AbortError = /** @class */ (function (_super) {
    tslib_1.__extends(AbortError, _super);
    function AbortError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbortError;
}(Error));
exports.AbortError = AbortError;
