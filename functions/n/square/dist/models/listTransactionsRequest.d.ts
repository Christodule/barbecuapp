import { Schema } from '../schema';
/**
 * Defines the query parameters that can be included in
 * a request to the [ListTransactions]($e/Transactions/ListTransactions) endpoint.
 * Deprecated - recommend using [SearchOrders]($e/Orders/SearchOrders)
 */
export interface ListTransactionsRequest {
    /**
     * The beginning of the requested reporting period, in RFC 3339 format.
     * See [Date ranges](https://developer.squareup.com/docs/build-basics/working-with-dates) for details on date inclusivity/exclusivity.
     * Default value: The current time minus one year.
     */
    beginTime?: string;
    /**
     * The end of the requested reporting period, in RFC 3339 format.
     * See [Date ranges](https://developer.squareup.com/docs/build-basics/working-with-dates) for details on date inclusivity/exclusivity.
     * Default value: The current time.
     */
    endTime?: string;
    /** The order (e.g., chronological or alphabetical) in which results from a request are returned. */
    sortOrder?: string;
    /**
     * A pagination cursor returned by a previous call to this endpoint.
     * Provide this to retrieve the next set of results for your original query.
     * See [Paginating results](https://developer.squareup.com/docs/working-with-apis/pagination) for more information.
     */
    cursor?: string;
}
export declare const listTransactionsRequestSchema: Schema<ListTransactionsRequest>;
