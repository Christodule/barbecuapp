import { array, object, optional, Schema, string } from '../schema';

/**
 * A filter based on the order `customer_id` and any tender `customer_id`
 * associated with the order. It does not filter based on the
 * [FulfillmentRecipient]($m/OrderFulfillmentRecipient) `customer_id`.
 */
export interface SearchOrdersCustomerFilter {
  /**
   * A list of customer IDs to filter by.
   * Max: 10 customer IDs.
   */
  customerIds?: string[];
}

export const searchOrdersCustomerFilterSchema: Schema<SearchOrdersCustomerFilter> = object(
  { customerIds: ['customer_ids', optional(array(string()))] }
);
