"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = void 0;
/**
 * Create an optional schema.
 *
 * The optional schema allows 'undefined' or the values allowed by the given
 * 'schema'.
 */
function optional(schema) {
    return {
        type: function () { return "Optional<" + schema.type() + ">"; },
        validateBeforeMap: function (value, ctxt) {
            return value === undefined ? [] : schema.validateBeforeMap(value, ctxt);
        },
        validateBeforeUnmap: function (value, ctxt) {
            return value === undefined ? [] : schema.validateBeforeUnmap(value, ctxt);
        },
        map: function (value, ctxt) {
            return value === undefined ? undefined : schema.map(value, ctxt);
        },
        unmap: function (value, ctxt) {
            return value === undefined ? undefined : schema.unmap(value, ctxt);
        },
        validateBeforeMapXml: function (value, ctxt) {
            return value === undefined ? [] : schema.validateBeforeMapXml(value, ctxt);
        },
        mapXml: function (value, ctxt) {
            return value === undefined ? undefined : schema.mapXml(value, ctxt);
        },
        unmapXml: function (value, ctxt) {
            return value === undefined ? undefined : schema.unmapXml(value, ctxt);
        },
    };
}
exports.optional = optional;
