import { Schema } from '../schema';
/** Filter based on [order fulfillment]($m/OrderFulfillment) information. */
export interface SearchOrdersFulfillmentFilter {
    /**
     * A list of [fulfillment types]($m/OrderFulfillmentType) to filter
     * for. The list returns orders if any of its fulfillments match any of the fulfillment types
     * listed in this field.
     * See [OrderFulfillmentType](#type-orderfulfillmenttype) for possible values
     */
    fulfillmentTypes?: string[];
    /**
     * A list of [fulfillment states]($m/OrderFulfillmentState) to filter
     * for. The list returns orders if any of its fulfillments match any of the
     * fulfillment states listed in this field.
     * See [OrderFulfillmentState](#type-orderfulfillmentstate) for possible values
     */
    fulfillmentStates?: string[];
}
export declare const searchOrdersFulfillmentFilterSchema: Schema<SearchOrdersFulfillmentFilter>;
