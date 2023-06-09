"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discriminatedObject = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
function discriminatedObject(discriminatorMappedPropName, discriminatorPropName, discriminatorMap, defaultDiscriminator, xmlOptions) {
    var schemaSelector = function (value, discriminatorProp, isAttr) {
        if (isAttr === void 0) { isAttr = false; }
        if (typeof value === 'object' &&
            value !== null &&
            ((isAttr && xmlObjectHasAttribute(value, discriminatorProp)) ||
                (!isAttr && discriminatorProp in value))) {
            var discriminatorValue = isAttr
                ? value.$[discriminatorProp]
                : value[discriminatorProp];
            if (typeof discriminatorValue === 'string' &&
                discriminatorValue in discriminatorMap) {
                return discriminatorMap[discriminatorValue];
            }
        }
        return discriminatorMap[defaultDiscriminator];
    };
    return {
        type: function () {
            return "DiscriminatedUnion<" + discriminatorPropName + ",[" + utils_1.objectEntries(discriminatorMap)
                .map(function (_a) {
                var _b = tslib_1.__read(_a, 2), _ = _b[0], v = _b[1];
                return v.type;
            })
                .join(',') + "]>";
        },
        map: function (value, ctxt) {
            return schemaSelector(value, discriminatorPropName).map(value, ctxt);
        },
        unmap: function (value, ctxt) {
            return schemaSelector(value, discriminatorMappedPropName).unmap(value, ctxt);
        },
        validateBeforeMap: function (value, ctxt) {
            return schemaSelector(value, discriminatorPropName).validateBeforeMap(value, ctxt);
        },
        validateBeforeUnmap: function (value, ctxt) {
            return schemaSelector(value, discriminatorMappedPropName).validateBeforeUnmap(value, ctxt);
        },
        mapXml: function (value, ctxt) {
            var _a;
            return schemaSelector(value, (_a = xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.xmlName) !== null && _a !== void 0 ? _a : discriminatorPropName, xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.isAttr).mapXml(value, ctxt);
        },
        unmapXml: function (value, ctxt) {
            return schemaSelector(value, discriminatorMappedPropName).unmapXml(value, ctxt);
        },
        validateBeforeMapXml: function (value, ctxt) {
            var _a;
            return schemaSelector(value, (_a = xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.xmlName) !== null && _a !== void 0 ? _a : discriminatorPropName, xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.isAttr).validateBeforeMapXml(value, ctxt);
        },
    };
}
exports.discriminatedObject = discriminatedObject;
function xmlObjectHasAttribute(value, prop) {
    return ('$' in value &&
        typeof value.$ === 'object' &&
        prop in value.$);
}
