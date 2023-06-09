import { Schema } from '../schema';
export interface ListBookingsRequest {
    /** The maximum number of results per page to return in a paged response. */
    limit?: number;
    /** The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results. */
    cursor?: string;
    /** The team member for whom to retrieve bookings. If this is not set, bookings of all members are retrieved. */
    teamMemberId?: string;
    /** The location for which to retrieve bookings. If this is not set, all locations' bookings are retrieved. */
    locationId?: string;
    /** The RFC 3339 timestamp specifying the earliest of the start time. If this is not set, the current time is used. */
    startAtMin?: string;
    /** The RFC 3339 timestamp specifying the latest of the start time. If this is not set, the time of 31 days after `start_at_min` is used. */
    startAtMax?: string;
}
export declare const listBookingsRequestSchema: Schema<ListBookingsRequest>;
