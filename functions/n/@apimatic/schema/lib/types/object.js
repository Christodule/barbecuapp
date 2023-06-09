"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendObject = exports.extendExpandoObject = exports.extendStrictObject = exports.object = exports.expandoObject = exports.strictObject = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
/**
 * Create a Strict Object type schema.
 *
 * A strict-object does not allow additional properties during mapping or
 * unmapping. Additional properties will result in a validation error.
 */
function strictObject(objectSchema) {
    var schema = internalObject(objectSchema, false, false);
    schema.type = function () {
        return "StrictObject<{" + Object.keys(objectSchema)
            .map(utils_1.objectKeyEncode)
            .join(',') + "}>";
    };
    return schema;
}
exports.strictObject = strictObject;
/**
 * Create an Expandable Object type schema.
 *
 * The object schema allows additional properties during mapping and unmapping. The
 * additional properties are copied over as is.
 */
function expandoObject(objectSchema) {
    return internalObject(objectSchema, true, true);
}
exports.expandoObject = expandoObject;
/**
 * Create an Object Type schema.
 *
 * The Object schema allows additional properties during mapping and unmapping
 * but discards them.
 */
function object(objectSchema) {
    var schema = internalObject(objectSchema, true, false);
    schema.type = function () {
        return "Object<{" + Object.keys(objectSchema).map(utils_1.objectKeyEncode).join(',') + "}>";
    };
    return schema;
}
exports.object = object;
/**
 * Create a strict-object schema that extends an existing schema.
 */
function extendStrictObject(parentObjectSchema, objectSchema) {
    return strictObject(tslib_1.__assign(tslib_1.__assign({}, parentObjectSchema.objectSchema), objectSchema));
}
exports.extendStrictObject = extendStrictObject;
/**
 * Create an object schema that extends an existing schema.
 */
function extendExpandoObject(parentObjectSchema, objectSchema) {
    return expandoObject(tslib_1.__assign(tslib_1.__assign({}, parentObjectSchema.objectSchema), objectSchema));
}
exports.extendExpandoObject = extendExpandoObject;
/**
 * Create an Object schema that extends an existing object schema.
 */
function extendObject(parentObjectSchema, objectSchema) {
    return object(tslib_1.__assign(tslib_1.__assign({}, parentObjectSchema.objectSchema), objectSchema));
}
exports.extendObject = extendObject;
/**
 * Internal utility to create object schema with different options.
 */
function internalObject(objectSchema, skipValidateAdditionalProps, mapAdditionalProps) {
    var keys = Object.keys(objectSchema);
    var reverseObjectSchema = createReverseObjectSchema(objectSchema);
    var xmlMappingInfo = getXmlPropMappingForObjectSchema(objectSchema);
    var xmlObjectSchema = createXmlObjectSchema(objectSchema);
    var reverseXmlObjectSchema = createReverseXmlObjectSchema(xmlObjectSchema);
    return {
        type: function () { return "Object<{" + keys.map(utils_1.objectKeyEncode).join(',') + ",...}>"; },
        validateBeforeMap: validateObject(objectSchema, 'validateBeforeMap', skipValidateAdditionalProps),
        validateBeforeUnmap: validateObject(reverseObjectSchema, 'validateBeforeUnmap', skipValidateAdditionalProps),
        map: mapObject(objectSchema, 'map', mapAdditionalProps),
        unmap: mapObject(reverseObjectSchema, 'unmap', mapAdditionalProps),
        validateBeforeMapXml: validateObjectBeforeMapXml(objectSchema, xmlMappingInfo, skipValidateAdditionalProps),
        mapXml: mapObjectFromXml(xmlObjectSchema, mapAdditionalProps),
        unmapXml: unmapObjectToXml(reverseXmlObjectSchema, mapAdditionalProps),
        objectSchema: objectSchema,
    };
}
function validateObjectBeforeMapXml(objectSchema, xmlMappingInfo, allowAdditionalProperties) {
    var elementsToProps = xmlMappingInfo.elementsToProps, attributesToProps = xmlMappingInfo.attributesToProps;
    return function (value, ctxt) {
        if (typeof value !== 'object' || value === null) {
            return ctxt.fail();
        }
        var valueObject = value;
        var attrs = valueObject.$, elements = tslib_1.__rest(valueObject, ["$"]);
        var attributes = attrs !== null && attrs !== void 0 ? attrs : {};
        // Validate all known elements and attributes using the schema
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(validateValueObject({
            validationMethod: 'validateBeforeMapXml',
            propTypeName: 'child elements',
            propTypePrefix: 'element',
            valueTypeName: 'element',
            propMapping: elementsToProps,
            objectSchema: objectSchema,
            valueObject: elements,
            ctxt: ctxt,
            allowAdditionalProperties: allowAdditionalProperties,
        }))), tslib_1.__read(validateValueObject({
            validationMethod: 'validateBeforeMapXml',
            propTypeName: 'attributes',
            propTypePrefix: '@',
            valueTypeName: 'element',
            propMapping: attributesToProps,
            objectSchema: objectSchema,
            valueObject: attributes,
            ctxt: ctxt,
            allowAdditionalProperties: allowAdditionalProperties,
        })));
    };
}
function mapObjectFromXml(xmlObjectSchema, allowAdditionalProps) {
    var elementsSchema = xmlObjectSchema.elementsSchema, attributesSchema = xmlObjectSchema.attributesSchema;
    var mapElements = mapObject(elementsSchema, 'mapXml', allowAdditionalProps);
    var mapAttributes = mapObject(attributesSchema, 'mapXml', false // Always false; additional attributes are handled differently below.
    );
    // These are later used to omit know attribute props from the attributes object
    // so that the remaining props can be copied over as additional props.
    var attributeKeys = utils_1.objectEntries(attributesSchema).map(function (_a) {
        var _b = tslib_1.__read(_a, 2), _ = _b[0], _c = tslib_1.__read(_b[1], 1), name = _c[0];
        return name;
    });
    return function (value, ctxt) {
        var valueObject = value;
        var attrs = valueObject.$, elements = tslib_1.__rest(valueObject, ["$"]);
        var attributes = attrs !== null && attrs !== void 0 ? attrs : {};
        var output = tslib_1.__assign(tslib_1.__assign({}, mapAttributes(attributes, ctxt)), mapElements(elements, ctxt));
        if (allowAdditionalProps) {
            // Omit known attributes and copy the rest as additional attributes.
            var additionalAttrs = utils_1.omitKeysFromObject(attributes, attributeKeys);
            if (Object.keys(additionalAttrs).length > 0) {
                // These additional attrs are set in the '$' property by convention.
                output.$ = additionalAttrs;
            }
        }
        return output;
    };
}
function unmapObjectToXml(xmlObjectSchema, allowAdditionalProps) {
    var elementsSchema = xmlObjectSchema.elementsSchema, attributesSchema = xmlObjectSchema.attributesSchema;
    var mapElements = mapObject(elementsSchema, 'unmapXml', allowAdditionalProps);
    var mapAttributes = mapObject(attributesSchema, 'unmapXml', false // Always false so that element props are not copied during mapping
    );
    // These are later used to omit attribute props from the value object so that they
    // do not get mapped during element mapping, if the allowAdditionalProps is true.
    var attributeKeys = utils_1.objectEntries(attributesSchema).map(function (_a) {
        var _b = tslib_1.__read(_a, 2), _ = _b[0], _c = tslib_1.__read(_b[1], 1), name = _c[0];
        return name;
    });
    return function (value, ctxt) {
        // Get additional attributes which are set in the '$' property by convention
        var _a = value, attributes = _a.$, rest = tslib_1.__rest(_a, ["$"]);
        // Ensure 'attributes' is an object and non-null
        var additionalAttributes = typeof attributes === 'object' &&
            attributes !== null &&
            allowAdditionalProps
            ? attributes
            : {};
        return tslib_1.__assign(tslib_1.__assign({}, mapElements(utils_1.omitKeysFromObject(rest, attributeKeys), ctxt)), { $: tslib_1.__assign(tslib_1.__assign({}, additionalAttributes), mapAttributes(value, ctxt)) });
    };
}
function validateValueObject(_a) {
    var validationMethod = _a.validationMethod, propTypeName = _a.propTypeName, propTypePrefix = _a.propTypePrefix, valueTypeName = _a.valueTypeName, propMapping = _a.propMapping, objectSchema = _a.objectSchema, valueObject = _a.valueObject, ctxt = _a.ctxt, allowAdditionalProperties = _a.allowAdditionalProperties;
    var errors = [];
    var missingProps = new Set();
    var unknownProps = new Set(Object.keys(valueObject));
    // Validate all known properties using the schema
    for (var key in propMapping) {
        if (Object.prototype.hasOwnProperty.call(propMapping, key)) {
            var propName = propMapping[key];
            var schema = objectSchema[propName][1];
            unknownProps.delete(key);
            if (key in valueObject) {
                errors.push.apply(errors, tslib_1.__spreadArray([], tslib_1.__read(schema[validationMethod](valueObject[key], ctxt.createChild(propTypePrefix + key, valueObject[key], schema)))));
            }
            else if (schema.type().indexOf('Optional<') !== 0) {
                // Add to missing keys if it is not an optional property
                missingProps.add(key);
            }
        }
    }
    // Create validation error for unknown properties encountered
    var unknownPropsArray = Array.from(unknownProps);
    if (unknownPropsArray.length > 0 && !allowAdditionalProperties) {
        errors.push.apply(errors, tslib_1.__spreadArray([], tslib_1.__read(ctxt.fail("Some unknown " + propTypeName + " were found in the " + valueTypeName + ": " + unknownPropsArray
            .map(utils_1.literalToString)
            .join(', ') + "."))));
    }
    // Create validation error for missing required properties
    var missingPropsArray = Array.from(missingProps);
    if (missingPropsArray.length > 0) {
        errors.push.apply(errors, tslib_1.__spreadArray([], tslib_1.__read(ctxt.fail("Some " + propTypeName + " are missing in the " + valueTypeName + ": " + missingPropsArray
            .map(utils_1.literalToString)
            .join(', ') + "."))));
    }
    return errors;
}
function validateObject(objectSchema, validationMethod, allowAdditionalProperties) {
    var propsMapping = getPropMappingForObjectSchema(objectSchema);
    return function (value, ctxt) {
        if (typeof value !== 'object' || value === null) {
            return ctxt.fail();
        }
        return validateValueObject({
            validationMethod: validationMethod,
            propTypeName: 'properties',
            propTypePrefix: '',
            valueTypeName: 'object',
            propMapping: propsMapping,
            objectSchema: objectSchema,
            valueObject: value,
            ctxt: ctxt,
            allowAdditionalProperties: allowAdditionalProperties,
        });
    };
}
function mapObject(objectSchema, mappingFn, allowAdditionalProperties) {
    return function (value, ctxt) {
        var output = {};
        var objectValue = value;
        /** Properties seen in the object but not in the schema */
        var unknownKeys = new Set(Object.keys(objectValue));
        // Map known properties using the schema
        for (var key in objectSchema) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
                var element = objectSchema[key];
                var propName = element[0];
                var propValue = objectValue[propName];
                unknownKeys.delete(propName);
                // Skip mapping for optional properties to avoid creating properties with value 'undefined'
                if (element[1].type().indexOf('Optional<') !== 0 ||
                    propValue !== undefined) {
                    output[key] = element[1][mappingFn](propValue, ctxt.createChild(propName, propValue, element[1]));
                }
            }
        }
        // Copy unknown properties over if additional properties flag is set
        if (allowAdditionalProperties) {
            unknownKeys.forEach(function (unknownKey) {
                output[unknownKey] = objectValue[unknownKey];
            });
        }
        return output;
    };
}
function getXmlPropMappingForObjectSchema(objectSchema) {
    var _a, _b;
    var elementsToProps = {};
    var attributesToProps = {};
    for (var key in objectSchema) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
            var _c = tslib_1.__read(objectSchema[key], 3), propName = _c[0], xmlOptions = _c[2];
            if ((xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.isAttr) === true) {
                attributesToProps[(_a = xmlOptions.xmlName) !== null && _a !== void 0 ? _a : propName] = key;
            }
            else {
                elementsToProps[(_b = xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.xmlName) !== null && _b !== void 0 ? _b : propName] = key;
            }
        }
    }
    return { elementsToProps: elementsToProps, attributesToProps: attributesToProps };
}
function getPropMappingForObjectSchema(objectSchema) {
    var propsMapping = {};
    for (var key in objectSchema) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
            var propDef = objectSchema[key];
            propsMapping[propDef[0]] = key;
        }
    }
    return propsMapping;
}
function createReverseObjectSchema(objectSchema) {
    var reverseObjectSchema = {};
    for (var key in objectSchema) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
            var element = objectSchema[key];
            reverseObjectSchema[element[0]] = [key, element[1], element[2]];
        }
    }
    return reverseObjectSchema;
}
function createXmlObjectSchema(objectSchema) {
    var _a;
    var elementsSchema = {};
    var attributesSchema = {};
    for (var key in objectSchema) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(objectSchema, key)) {
            var element = objectSchema[key];
            var _b = tslib_1.__read(element, 3), serializedName = _b[0], schema = _b[1], xmlOptions = _b[2];
            var xmlObjectSchema = (xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.isAttr)
                ? attributesSchema
                : elementsSchema;
            xmlObjectSchema[key] = [
                (_a = xmlOptions === null || xmlOptions === void 0 ? void 0 : xmlOptions.xmlName) !== null && _a !== void 0 ? _a : serializedName,
                schema,
                xmlOptions,
            ];
        }
    }
    return { elementsSchema: elementsSchema, attributesSchema: attributesSchema };
}
function createReverseXmlObjectSchema(xmlObjectSchema) {
    return {
        attributesSchema: createReverseObjectSchema(xmlObjectSchema.attributesSchema),
        elementsSchema: createReverseObjectSchema(xmlObjectSchema.elementsSchema),
    };
}
