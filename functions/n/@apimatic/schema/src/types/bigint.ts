import { Schema } from '../schema';
import {
  coerceStringOrNumberToBigInt,
  createSymmetricSchema,
  toValidator,
} from '../utils';

function isValidBigIntValue(value: unknown): value is bigint {
  return (
    typeof value === 'bigint' ||
    typeof value === 'number' ||
    (typeof value === 'string' && /^-?\d+$/.test(value))
  );
}

/** Create a bigint schema */
export function bigint(): Schema<bigint, bigint> {
  return createSymmetricSchema({
    type: 'bigint',
    validate: toValidator(isValidBigIntValue),
    map: coerceStringOrNumberToBigInt as (arg: bigint) => bigint,
  });
}
