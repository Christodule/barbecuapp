import { Schema } from '../schema';
export interface RetrieveInventoryChangesRequest {
    /**
     * The [Location]($m/Location) IDs to look up as a comma-separated
     * list. An empty list queries all locations.
     */
    locationIds?: string;
    /**
     * A pagination cursor returned by a previous call to this endpoint.
     * Provide this to retrieve the next set of results for the original query.
     * See the [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination) guide for more information.
     */
    cursor?: string;
}
export declare const retrieveInventoryChangesRequestSchema: Schema<RetrieveInventoryChangesRequest>;
