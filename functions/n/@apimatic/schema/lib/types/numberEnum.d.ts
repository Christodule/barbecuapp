import { Schema } from '../schema';
/**
 * Create a schema for a number enumeration.
 */
export declare function numberEnum<T extends string, TEnumValue extends number>(enumVariable: {
    [key in T]: TEnumValue;
}): Schema<TEnumValue, TEnumValue>;
//# sourceMappingURL=numberEnum.d.ts.map