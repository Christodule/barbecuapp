import { Schema } from '../schema';
import { Error } from './error';
import { Order } from './order';
/**
 * Defines the fields that are included in the response body of a request to the
 * [PayOrder]($e/Orders/PayOrder) endpoint.
 */
export interface PayOrderResponse {
    /** Any errors that occurred during the request. */
    errors?: Error[];
    /**
     * Contains all information related to a single order to process with Square,
     * including line items that specify the products to purchase. `Order` objects also
     * include information about any associated tenders, refunds, and returns.
     * All Connect V2 Transactions have all been converted to Orders including all associated
     * itemization data.
     */
    order?: Order;
}
export declare const payOrderResponseSchema: Schema<PayOrderResponse>;
