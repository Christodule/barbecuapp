import { Schema } from '../schema';
import {
  coerceNumericStringToNumber,
  createSymmetricSchema,
  isNumericString,
  toValidator,
} from '../utils';

function createEnumChecker<T extends string, TEnumValue extends number>(
  enumVariable: { [key in T]: TEnumValue }
) {
  const enumValues = Object.values(enumVariable);
  return (value: unknown): value is TEnumValue =>
    isNumericString(value) &&
    enumValues.includes(coerceNumericStringToNumber(value));
}

/**
 * Create a schema for a number enumeration.
 */
export function numberEnum<T extends string, TEnumValue extends number>(
  enumVariable: { [key in T]: TEnumValue }
): Schema<TEnumValue, TEnumValue> {
  const validate = toValidator(createEnumChecker(enumVariable));

  return createSymmetricSchema({
    type: `Enum<${Object.values(enumVariable)
      .filter((v) => typeof v === 'number')
      .join(',')}>`,
    map: coerceNumericStringToNumber as (value: TEnumValue) => TEnumValue,
    validate,
  });
}
