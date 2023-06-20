import {
  bigint,
  dict,
  lazy,
  object,
  optional,
  Schema,
  string,
} from '../schema';
import { Money, moneySchema } from './money';

/** A [CatalogModifier]($m/CatalogModifier). */
export interface OrderLineItemModifier {
  /** A unique ID that identifies the modifier only within this order. */
  uid?: string;
  /** The catalog object ID referencing [CatalogModifier]($m/CatalogModifier). */
  catalogObjectId?: string;
  /** The version of the catalog object that this modifier references. */
  catalogVersion?: bigint;
  /** The name of the item modifier. */
  name?: string;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  basePriceMoney?: Money;
  /**
   * Represents an amount of money. `Money` fields can be signed or unsigned.
   * Fields that do not explicitly define whether they are signed or unsigned are
   * considered unsigned and can only hold positive amounts. For signed fields, the
   * sign of the value indicates the purpose of the money transfer. See
   * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
   * for more information.
   */
  totalPriceMoney?: Money;
  /**
   * Application-defined data attached to this order. Metadata fields are intended
   * to store descriptive references or associations with an entity in another system or store brief
   * information about the object. Square does not process this field; it only stores and returns it
   * in relevant API calls. Do not use metadata to store any sensitive information (such as personally
   * identifiable information or card details).
   * Keys written by applications must be 60 characters or less and must be in the character set
   * `[a-zA-Z0-9_-]`. Entries can also include metadata generated by Square. These keys are prefixed
   * with a namespace, separated from the key with a ':' character.
   * Values have a maximum length of 255 characters.
   * An application can have up to 10 entries per metadata field.
   * Entries written by applications are private and can only be read or modified by the same
   * application.
   * For more information, see  [Metadata](https://developer.squareup.com/docs/build-basics/metadata).
   */
  metadata?: Record<string, string>;
}

export const orderLineItemModifierSchema: Schema<OrderLineItemModifier> = object(
  {
    uid: ['uid', optional(string())],
    catalogObjectId: ['catalog_object_id', optional(string())],
    catalogVersion: ['catalog_version', optional(bigint())],
    name: ['name', optional(string())],
    basePriceMoney: ['base_price_money', optional(lazy(() => moneySchema))],
    totalPriceMoney: ['total_price_money', optional(lazy(() => moneySchema))],
    metadata: ['metadata', optional(dict(string()))],
  }
);