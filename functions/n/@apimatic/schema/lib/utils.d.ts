/**
 * Utilities for internal library usage
 */
import { Schema, SchemaContextCreator, SchemaValidationError } from './schema';
export declare function arrayEntries<T>(arr: T[]): [number, T][];
export declare function objectEntries<T extends Record<string, unknown>>(obj: T): Array<[Extract<keyof T, string>, T[keyof T]]>;
export declare function literalToString(value: any): string;
export declare function identityFn<T>(value: T): T;
export declare function toValidator(fn: (value: unknown) => boolean): (value: unknown, ctxt: SchemaContextCreator) => SchemaValidationError[];
/**
 * Schema in which the mapping and unmapping is done the same way
 */
export interface SymmetricSchema<T> {
    type: string;
    validate: (value: unknown, ctxt: SchemaContextCreator) => SchemaValidationError[];
    map: (value: T, ctxt: SchemaContextCreator) => T;
}
/**
 * Create a schema in which the mapping and unmapping is done the same way
 */
export declare function createSymmetricSchema<T>(schema: SymmetricSchema<T>): Schema<T, T>;
export declare function isNumericString(value: unknown): value is number | string;
export declare function coerceNumericStringToNumber(value: number | string): number;
export declare function coerceStringOrNumberToBigInt(value: bigint | string | number): bigint;
export declare function once<Args extends any[], R>(func: (...args: Args) => R): (...args: Args) => R;
/**
 * Returns a copy of the object with the given keys omitted.
 */
export declare function omitKeysFromObject(object: Record<string, unknown>, keysToOmit: string[]): Record<string, unknown>;
export declare function objectKeyEncode(key: string): string;
//# sourceMappingURL=utils.d.ts.map