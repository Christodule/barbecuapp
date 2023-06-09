import { toValidator, createSymmetricSchema, literalToString, identityFn } from '../utils.js';

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
  var validate = toValidator(createEnumChecker(enumVariable));
  return createSymmetricSchema({
    type: "Enum<" + Object.values(enumVariable).map(literalToString).join(',') + ">",
    map: identityFn,
    validate: validate
  });
}

export { stringEnum };