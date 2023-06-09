import { toValidator, isNumericString, coerceNumericStringToNumber, createSymmetricSchema } from '../utils.js';

function createEnumChecker(enumVariable) {
  var enumValues = Object.values(enumVariable);
  return function (value) {
    return isNumericString(value) && enumValues.includes(coerceNumericStringToNumber(value));
  };
}
/**
 * Create a schema for a number enumeration.
 */


function numberEnum(enumVariable) {
  var validate = toValidator(createEnumChecker(enumVariable));
  return createSymmetricSchema({
    type: "Enum<" + Object.values(enumVariable).filter(function (v) {
      return typeof v === 'number';
    }).join(',') + ">",
    map: coerceNumericStringToNumber,
    validate: validate
  });
}

export { numberEnum };