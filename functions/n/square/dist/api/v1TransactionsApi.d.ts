import { ApiResponse, RequestOptions } from '../core';
import { V1CreateRefundRequest } from '../models/v1CreateRefundRequest';
import { V1Order } from '../models/v1Order';
import { V1Payment } from '../models/v1Payment';
import { V1Refund } from '../models/v1Refund';
import { V1Settlement } from '../models/v1Settlement';
import { V1UpdateOrderRequest } from '../models/v1UpdateOrderRequest';
import { BaseApi } from './baseApi';
export declare class V1TransactionsApi extends BaseApi {
    /**
     * Provides summary information for a merchant's online store orders.
     *
     * @param locationId  The ID of the location to list online store orders for.
     * @param order       The order in which payments are listed in the response.
     * @param limit       The maximum number of payments to return in a single response. This value cannot
     *                              exceed 200.
     * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
     *                              the endpoint.
     * @return Response from the API call
     * @deprecated
     */
    listOrders(locationId: string, order?: string, limit?: number, batchToken?: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Order[]>>;
    /**
     * Provides comprehensive information for a single online store order, including the order's history.
     *
     * @param locationId  The ID of the order's associated location.
     * @param orderId     The order's Square-issued ID. You obtain this value from Order objects returned by
     *                              the List Orders endpoint
     * @return Response from the API call
     * @deprecated
     */
    retrieveOrder(locationId: string, orderId: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Order>>;
    /**
     * Updates the details of an online store order. Every update you perform on an order corresponds to
     * one of three actions:
     *
     * @param locationId   The ID of the order's associated location.
     * @param orderId      The order's Square-issued ID. You obtain this value from Order
     *                                                    objects returned by the List Orders endpoint
     * @param body         An object containing the fields to POST for the request.  See
     *                                                    the corresponding object definition for field details.
     * @return Response from the API call
     * @deprecated
     */
    updateOrder(locationId: string, orderId: string, body: V1UpdateOrderRequest, requestOptions?: RequestOptions): Promise<ApiResponse<V1Order>>;
    /**
     * Provides summary information for all payments taken for a given
     * Square account during a date range. Date ranges cannot exceed 1 year in
     * length. See Date ranges for details of inclusive and exclusive dates.
     *
     * *Note**: Details for payments processed with Square Point of Sale while
     * in offline mode may not be transmitted to Square for up to 72 hours.
     * Offline payments have a `created_at` value that reflects the time the
     * payment was originally processed, not the time it was subsequently
     * transmitted to Square. Consequently, the ListPayments endpoint might
     * list an offline payment chronologically between online payments that
     * were seen in a previous request.
     *
     * @param locationId      The ID of the location to list payments for. If you specify me, this endpoint
     *                                   returns payments aggregated from all of the business's locations.
     * @param order           The order in which payments are listed in the response.
     * @param beginTime       The beginning of the requested reporting period, in ISO 8601 format. If this
     *                                   value is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an
     *                                   error. Default value: The current time minus one year.
     * @param endTime         The end of the requested reporting period, in ISO 8601 format. If this value is
     *                                   more than one year greater than begin_time, this endpoint returns an error.
     *                                   Default value: The current time.
     * @param limit           The maximum number of payments to return in a single response. This value
     *                                   cannot exceed 200.
     * @param batchToken      A pagination cursor to retrieve the next set of results for your original query
     *                                   to the endpoint.
     * @param includePartial  Indicates whether or not to include partial payments in the response. Partial
     *                                   payments will have the tenders collected so far, but the itemizations will be
     *                                   empty until the payment is completed.
     * @return Response from the API call
     * @deprecated
     */
    listPayments(locationId: string, order?: string, beginTime?: string, endTime?: string, limit?: number, batchToken?: string, includePartial?: boolean, requestOptions?: RequestOptions): Promise<ApiResponse<V1Payment[]>>;
    /**
     * Provides comprehensive information for a single payment.
     *
     * @param locationId  The ID of the payment's associated location.
     * @param paymentId   The Square-issued payment ID. payment_id comes from Payment objects returned by the
     *                              List Payments endpoint, Settlement objects returned by the List Settlements endpoint,
     *                              or Refund objects returned by the List Refunds endpoint.
     * @return Response from the API call
     * @deprecated
     */
    retrievePayment(locationId: string, paymentId: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Payment>>;
    /**
     * Provides the details for all refunds initiated by a merchant or any of the merchant's mobile staff
     * during a date range. Date ranges cannot exceed one year in length.
     *
     * @param locationId  The ID of the location to list refunds for.
     * @param order       The order in which payments are listed in the response.
     * @param beginTime   The beginning of the requested reporting period, in ISO 8601 format. If this value
     *                              is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an error.
     *                              Default value: The current time minus one year.
     * @param endTime     The end of the requested reporting period, in ISO 8601 format. If this value is more
     *                              than one year greater than begin_time, this endpoint returns an error. Default value:
     *                              The current time.
     * @param limit       The approximate number of refunds to return in a single response. Default: 100. Max:
     *                              200. Response may contain more results than the prescribed limit when refunds are
     *                              made simultaneously to multiple tenders in a payment or when refunds are generated in
     *                              an exchange to account for the value of returned goods.
     * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
     *                              the endpoint.
     * @return Response from the API call
     * @deprecated
     */
    listRefunds(locationId: string, order?: string, beginTime?: string, endTime?: string, limit?: number, batchToken?: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Refund[]>>;
    /**
     * Issues a refund for a previously processed payment. You must issue
     * a refund within 60 days of the associated payment.
     *
     * You cannot issue a partial refund for a split tender payment. You must
     * instead issue a full or partial refund for a particular tender, by
     * providing the applicable tender id to the V1CreateRefund endpoint.
     * Issuing a full refund for a split tender payment refunds all tenders
     * associated with the payment.
     *
     * Issuing a refund for a card payment is not reversible. For development
     * purposes, you can create fake cash payments in Square Point of Sale and
     * refund them.
     *
     * @param locationId   The ID of the original payment's associated location.
     * @param body         An object containing the fields to POST for the request.  See
     *                                                     the corresponding object definition for field details.
     * @return Response from the API call
     * @deprecated
     */
    createRefund(locationId: string, body: V1CreateRefundRequest, requestOptions?: RequestOptions): Promise<ApiResponse<V1Refund>>;
    /**
     * Provides summary information for all deposits and withdrawals
     * initiated by Square to a linked bank account during a date range. Date
     * ranges cannot exceed one year in length.
     *
     * *Note**: the ListSettlements endpoint does not provide entry
     * information.
     *
     * @param locationId  The ID of the location to list settlements for. If you specify me, this endpoint
     *                              returns settlements aggregated from all of the business's locations.
     * @param order       The order in which settlements are listed in the response.
     * @param beginTime   The beginning of the requested reporting period, in ISO 8601 format. If this value
     *                              is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an error.
     *                              Default value: The current time minus one year.
     * @param endTime     The end of the requested reporting period, in ISO 8601 format. If this value is more
     *                              than one year greater than begin_time, this endpoint returns an error. Default value:
     *                              The current time.
     * @param limit       The maximum number of settlements to return in a single response. This value cannot
     *                              exceed 200.
     * @param status      Provide this parameter to retrieve only settlements with a particular status (SENT
     *                              or FAILED).
     * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
     *                              the endpoint.
     * @return Response from the API call
     * @deprecated
     */
    listSettlements(locationId: string, order?: string, beginTime?: string, endTime?: string, limit?: number, status?: string, batchToken?: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Settlement[]>>;
    /**
     * Provides comprehensive information for a single settlement.
     *
     * The returned `Settlement` objects include an `entries` field that lists
     * the transactions that contribute to the settlement total. Most
     * settlement entries correspond to a payment payout, but settlement
     * entries are also generated for less common events, like refunds, manual
     * adjustments, or chargeback holds.
     *
     * Square initiates its regular deposits as indicated in the
     * [Deposit Options with Square](https://squareup.com/help/us/en/article/3807)
     * help article. Details for a regular deposit are usually not available
     * from Connect API endpoints before 10 p.m. PST the same day.
     *
     * Square does not know when an initiated settlement **completes**, only
     * whether it has failed. A completed settlement is typically reflected in
     * a bank account within 3 business days, but in exceptional cases it may
     * take longer.
     *
     * @param locationId    The ID of the settlements's associated location.
     * @param settlementId  The settlement's Square-issued ID. You obtain this value from Settlement objects
     *                                returned by the List Settlements endpoint.
     * @return Response from the API call
     * @deprecated
     */
    retrieveSettlement(locationId: string, settlementId: string, requestOptions?: RequestOptions): Promise<ApiResponse<V1Settlement>>;
}
