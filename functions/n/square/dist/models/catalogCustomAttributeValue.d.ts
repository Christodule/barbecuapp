import { Schema } from '../schema';
/**
 * An instance of a custom attribute. Custom attributes can be defined and
 * added to `ITEM` and `ITEM_VARIATION` type catalog objects.
 * [Read more about custom attributes](https://developer.squareup.com/docs/catalog-api/add-custom-attributes).
 */
export interface CatalogCustomAttributeValue {
    /** The name of the custom attribute. */
    name?: string;
    /** The string value of the custom attribute.  Populated if `type` = `STRING`. */
    stringValue?: string;
    /** __Read-only.__ The id of the [CatalogCustomAttributeDefinition]($m/CatalogCustomAttributeDefinition) this value belongs to. */
    customAttributeDefinitionId?: string;
    /** Defines the possible types for a custom attribute. */
    type?: string;
    /**
     * Populated if `type` = `NUMBER`. Contains a string
     * representation of a decimal number, using a `.` as the decimal separator.
     */
    numberValue?: string;
    /** A `true` or `false` value. Populated if `type` = `BOOLEAN`. */
    booleanValue?: boolean;
    /** One or more choices from `allowed_selections`. Populated if `type` = `SELECTION`. */
    selectionUidValues?: string[];
    /** __Read-only.__ A copy of key from the associated `CatalogCustomAttributeDefinition`. */
    key?: string;
}
export declare const catalogCustomAttributeValueSchema: Schema<CatalogCustomAttributeValue>;
