import { ApiResponse, RequestOptions } from '../core';
import { CancelBookingRequest } from '../models/cancelBookingRequest';
import { CancelBookingResponse } from '../models/cancelBookingResponse';
import { CreateBookingRequest } from '../models/createBookingRequest';
import { CreateBookingResponse } from '../models/createBookingResponse';
import { ListBookingsResponse } from '../models/listBookingsResponse';
import { ListTeamMemberBookingProfilesResponse } from '../models/listTeamMemberBookingProfilesResponse';
import { RetrieveBookingResponse } from '../models/retrieveBookingResponse';
import { RetrieveBusinessBookingProfileResponse } from '../models/retrieveBusinessBookingProfileResponse';
import { RetrieveTeamMemberBookingProfileResponse } from '../models/retrieveTeamMemberBookingProfileResponse';
import { SearchAvailabilityRequest } from '../models/searchAvailabilityRequest';
import { SearchAvailabilityResponse } from '../models/searchAvailabilityResponse';
import { UpdateBookingRequest } from '../models/updateBookingRequest';
import { UpdateBookingResponse } from '../models/updateBookingResponse';
import { BaseApi } from './baseApi';
export declare class BookingsApi extends BaseApi {
    /**
     * Retrieve a collection of bookings.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
     * `APPOINTMENTS_READ` for the OAuth scope.
     *
     * @param limit          The maximum number of results per page to return in a paged response.
     * @param cursor         The pagination cursor from the preceding response to return the next page of the
     *                                 results. Do not set this when retrieving the first page of the results.
     * @param teamMemberId   The team member for whom to retrieve bookings. If this is not set, bookings of
     *                                 all members are retrieved.
     * @param locationId     The location for which to retrieve bookings. If this is not set, all locations'
     *                                 bookings are retrieved.
     * @param startAtMin     The RFC 3339 timestamp specifying the earliest of the start time. If this is not
     *                                 set, the current time is used.
     * @param startAtMax     The RFC 3339 timestamp specifying the latest of the start time. If this is not
     *                                 set, the time of 31 days after `start_at_min` is used.
     * @return Response from the API call
     */
    listBookings(limit?: number, cursor?: string, teamMemberId?: string, locationId?: string, startAtMin?: string, startAtMax?: string, requestOptions?: RequestOptions): Promise<ApiResponse<ListBookingsResponse>>;
    /**
     * Creates a booking.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
     * `APPOINTMENTS_WRITE` for the OAuth scope.
     *
     * @param body         An object containing the fields to POST for the request.  See
     *                                                    the corresponding object definition for field details.
     * @return Response from the API call
     */
    createBooking(body: CreateBookingRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CreateBookingResponse>>;
    /**
     * Searches for availabilities for booking.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
     * `APPOINTMENTS_READ` for the OAuth scope.
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                         See the corresponding object definition for field details.
     * @return Response from the API call
     */
    searchAvailability(body: SearchAvailabilityRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SearchAvailabilityResponse>>;
    /**
     * Retrieves a seller's booking profile.
     *
     * @return Response from the API call
     */
    retrieveBusinessBookingProfile(requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveBusinessBookingProfileResponse>>;
    /**
     * Lists booking profiles for team members.
     *
     * @param bookableOnly  Indicates whether to include only bookable team members in the returned result
     *                                 (`true`) or not (`false`).
     * @param limit         The maximum number of results to return in a paged response.
     * @param cursor        The pagination cursor from the preceding response to return the next page of the
     *                                 results. Do not set this when retrieving the first page of the results.
     * @param locationId    Indicates whether to include only team members enabled at the given location in
     *                                 the returned result.
     * @return Response from the API call
     */
    listTeamMemberBookingProfiles(bookableOnly?: boolean, limit?: number, cursor?: string, locationId?: string, requestOptions?: RequestOptions): Promise<ApiResponse<ListTeamMemberBookingProfilesResponse>>;
    /**
     * Retrieves a team member's booking profile.
     *
     * @param teamMemberId   The ID of the team member to retrieve.
     * @return Response from the API call
     */
    retrieveTeamMemberBookingProfile(teamMemberId: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveTeamMemberBookingProfileResponse>>;
    /**
     * Retrieves a booking.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
     * `APPOINTMENTS_READ` for the OAuth scope.
     *
     * @param bookingId  The ID of the [Booking]($m/Booking) object representing the to-be-retrieved booking.
     * @return Response from the API call
     */
    retrieveBooking(bookingId: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveBookingResponse>>;
    /**
     * Updates a booking.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
     * `APPOINTMENTS_WRITE` for the OAuth scope.
     *
     * @param bookingId    The ID of the [Booking]($m/Booking) object representing the to-
     *                                                    be-updated booking.
     * @param body         An object containing the fields to POST for the request.  See
     *                                                    the corresponding object definition for field details.
     * @return Response from the API call
     */
    updateBooking(bookingId: string, body: UpdateBookingRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateBookingResponse>>;
    /**
     * Cancels an existing booking.
     *
     * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
     * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
     * `APPOINTMENTS_WRITE` for the OAuth scope.
     *
     * @param bookingId    The ID of the [Booking]($m/Booking) object representing the to-
     *                                                    be-cancelled booking.
     * @param body         An object containing the fields to POST for the request.  See
     *                                                    the corresponding object definition for field details.
     * @return Response from the API call
     */
    cancelBooking(bookingId: string, body: CancelBookingRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CancelBookingResponse>>;
}
