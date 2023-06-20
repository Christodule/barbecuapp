/**
 * bandwidthLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */
import { FileWrapper } from '../fileWrapper';
/**
 * Type for Key-value pair for form-urlencoded serialization
 */
export interface FormKeyValuePair {
    key: string;
    value: string | FileWrapper;
}
/**
 * Type for list of key-value pairs for form-urlencoded serialization
 */
export declare type FormKeyValuePairList = FormKeyValuePair[];
/**
 * Type for formatting function used to create key for nested arrays
 */
export declare type ArrayPrefixFunction = (prefix: string, key: number | string) => string;
/**
 * Array prefix format: item[1]=1&item[2]=2
 */
export declare const indexedPrefix: ArrayPrefixFunction;
/**
 * Array prefix format: item[]=1&item[]=2
 */
export declare const unindexedPrefix: ArrayPrefixFunction;
/**
 * Array prefix format: item=1&item=2
 */
export declare const plainPrefix: ArrayPrefixFunction;
/**
 * Converts an object to a list of key-value pairs for form-urlencoded serialization.
 *
 * @param obj The object to serialize
 * @param prefixFormat Formatting function to create key for nested arrays
 * @return Result of serialization
 */
export declare function formDataEncodeObject(obj: Record<string, unknown>, prefixFormat?: ArrayPrefixFunction): FormKeyValuePairList;
/**
 * Return a new list with all key-value pairs, which have a FileWrapper as value, removed
 *
 * @param params List of key-value pairs
 */
export declare function filterFileWrapperFromKeyValuePairs(params: FormKeyValuePairList): Array<{
    key: string;
    value: string;
}>;
/**
 * Serializes an object for a form-urlencoded request.
 *
 * Nested and complex types in values will be flattened using {@link formDataEncodeObject() function} method.
 *
 * @param  obj The object to be serialized
 * @return The result of serialization
 */
export declare function urlEncodeObject(obj: Record<string, unknown>): string;
/**
 * Serializes a list of key-value pairs for a form-urlencoded request.
 *
 * @param params List of key-value pairs to serialize
 * @return The result of serialization
 */
export declare function urlEncodeKeyValuePairs(params: FormKeyValuePairList | undefined): string;
//# sourceMappingURL=queryString.d.ts.map