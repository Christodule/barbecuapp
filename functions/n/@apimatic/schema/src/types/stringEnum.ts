import { Schema } from '../schema';
import {
  toValidator,
  createSymmetricSchema,
  identityFn,
  literalToString,
} from '../utils';

function createEnumChecker<T extends string, TEnumValue extends string>(
  enumVariable: { [key in T]: TEnumValue }
) {
  const enumValues = Object.values(enumVariable);
  return (value: unknown): value is TEnumValue =>
    typeof value === 'string' && enumValues.includes(value);
}

/**
 * Create a schema for a string enumeration.
 */
export function stringEnum<T extends string, TEnumValue extends string>(
  enumVariable: { [key in T]: TEnumValue }
): Schema<TEnumValue, TEnumValue> {
  const validate = toValidator(createEnumChecker(enumVariable));

  return createSymmetricSchema({
    type: `Enum<${Object.values(enumVariable).map(literalToString).join(',')}>`,
    map: identityFn,
    validate,
  });
}
