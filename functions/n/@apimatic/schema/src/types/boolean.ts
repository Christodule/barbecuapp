import { Schema } from '../schema';
import { createSymmetricSchema, toValidator } from '../utils';

function isValidBooleanValue(value: unknown): boolean {
  return (
    typeof value === 'boolean' ||
    (typeof value === 'string' && (value === 'true' || value === 'false'))
  );
}

/** Create a boolean schema. */
export function boolean(): Schema<boolean, boolean> {
  return createSymmetricSchema({
    type: 'boolean',
    validate: toValidator(isValidBooleanValue),
    map: (value) => (typeof value === 'boolean' ? value : value === 'true'),
  });
}
