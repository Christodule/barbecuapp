import { ApiResponse, RequestOptions } from '../core';
import { CancelSubscriptionResponse } from '../models/cancelSubscriptionResponse';
import { CreateSubscriptionRequest } from '../models/createSubscriptionRequest';
import { CreateSubscriptionResponse } from '../models/createSubscriptionResponse';
import { DeleteSubscriptionActionResponse } from '../models/deleteSubscriptionActionResponse';
import { ListSubscriptionEventsResponse } from '../models/listSubscriptionEventsResponse';
import { PauseSubscriptionRequest } from '../models/pauseSubscriptionRequest';
import { PauseSubscriptionResponse } from '../models/pauseSubscriptionResponse';
import { ResumeSubscriptionRequest } from '../models/resumeSubscriptionRequest';
import { ResumeSubscriptionResponse } from '../models/resumeSubscriptionResponse';
import { RetrieveSubscriptionResponse } from '../models/retrieveSubscriptionResponse';
import { SearchSubscriptionsRequest } from '../models/searchSubscriptionsRequest';
import { SearchSubscriptionsResponse } from '../models/searchSubscriptionsResponse';
import { SwapPlanRequest } from '../models/swapPlanRequest';
import { SwapPlanResponse } from '../models/swapPlanResponse';
import { UpdateSubscriptionRequest } from '../models/updateSubscriptionRequest';
import { UpdateSubscriptionResponse } from '../models/updateSubscriptionResponse';
import { BaseApi } from './baseApi';
export declare class SubscriptionsApi extends BaseApi {
    /**
     * Creates a subscription to a subscription plan by a customer.
     *
     * If you provide a card on file in the request, Square charges the card for
     * the subscription. Otherwise, Square bills an invoice to the customer's email
     * address. The subscription starts immediately, unless the request includes
     * the optional `start_date`. Each individual subscription is associated with a particular location.
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                         See the corresponding object definition for field details.
     * @return Response from the API call
     */
    createSubscription(body: CreateSubscriptionRequest, requestOptions?: RequestOptions): Promise<ApiResponse<CreateSubscriptionResponse>>;
    /**
     * Searches for subscriptions.
     *
     * Results are ordered chronologically by subscription creation date. If
     * the request specifies more than one location ID,
     * the endpoint orders the result
     * by location ID, and then by creation date within each location. If no locations are given
     * in the query, all locations are searched.
     *
     * You can also optionally specify `customer_ids` to search by customer.
     * If left unset, all customers
     * associated with the specified locations are returned.
     * If the request specifies customer IDs, the endpoint orders results
     * first by location, within location by customer ID, and within
     * customer by subscription creation date.
     *
     * For more information, see
     * [Retrieve subscriptions](https://developer.squareup.com/docs/subscriptions-api/overview#retrieve-
     * subscriptions).
     *
     * @param body         An object containing the fields to POST for the request.
     *                                                          See the corresponding object definition for field
     *                                                          details.
     * @return Response from the API call
     */
    searchSubscriptions(body: SearchSubscriptionsRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SearchSubscriptionsResponse>>;
    /**
     * Retrieves a subscription.
     *
     * @param subscriptionId  The ID of the subscription to retrieve.
     * @param include         A query parameter to specify related information to be included in the response.
     *                                  The supported query parameter values are:   - `actions`: to include scheduled
     *                                  actions on the targeted subscription.
     * @return Response from the API call
     */
    retrieveSubscription(subscriptionId: string, include?: string, requestOptions?: RequestOptions): Promise<ApiResponse<RetrieveSubscriptionResponse>>;
    /**
     * Updates a subscription. You can set, modify, and clear the
     * `subscription` field values.
     *
     * @param subscriptionId  The ID of the subscription to update.
     * @param body            An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    updateSubscription(subscriptionId: string, body: UpdateSubscriptionRequest, requestOptions?: RequestOptions): Promise<ApiResponse<UpdateSubscriptionResponse>>;
    /**
     * Deletes a scheduled action for a subscription.
     *
     * @param subscriptionId  The ID of the subscription the targeted action is to act upon.
     * @param actionId        The ID of the targeted action to be deleted.
     * @return Response from the API call
     */
    deleteSubscriptionAction(subscriptionId: string, actionId: string, requestOptions?: RequestOptions): Promise<ApiResponse<DeleteSubscriptionActionResponse>>;
    /**
     * Schedules a `CANCEL` action to cancel an active subscription
     * by setting the `canceled_date` field to the end of the active billing period
     * and changing the subscription status from ACTIVE to CANCELED after this date.
     *
     * @param subscriptionId  The ID of the subscription to cancel.
     * @return Response from the API call
     */
    cancelSubscription(subscriptionId: string, requestOptions?: RequestOptions): Promise<ApiResponse<CancelSubscriptionResponse>>;
    /**
     * Lists all events for a specific subscription.
     * In the current implementation, only `START_SUBSCRIPTION` and `STOP_SUBSCRIPTION` (when the
     * subscription was canceled) events are returned.
     *
     * @param subscriptionId  The ID of the subscription to retrieve the events for.
     * @param cursor          When the total number of resulting subscription events exceeds the limit of a
     *                                  paged response,  specify the cursor returned from a preceding response here to
     *                                  fetch the next set of results. If the cursor is unset, the response contains the
     *                                  last page of the results.  For more information, see [Pagination](https:
     *                                  //developer.squareup.com/docs/working-with-apis/pagination).
     * @param limit           The upper limit on the number of subscription events to return in a paged
     *                                  response.
     * @return Response from the API call
     */
    listSubscriptionEvents(subscriptionId: string, cursor?: string, limit?: number, requestOptions?: RequestOptions): Promise<ApiResponse<ListSubscriptionEventsResponse>>;
    /**
     * Schedules a `PAUSE` action to pause an active subscription.
     *
     * @param subscriptionId  The ID of the subscription to pause.
     * @param body            An object containing the fields to POST for the request.
     *                                                           See the corresponding object definition for field
     *                                                           details.
     * @return Response from the API call
     */
    pauseSubscription(subscriptionId: string, body: PauseSubscriptionRequest, requestOptions?: RequestOptions): Promise<ApiResponse<PauseSubscriptionResponse>>;
    /**
     * Schedules a `RESUME` action to resume a paused or a deactivated subscription.
     *
     * @param subscriptionId  The ID of the subscription to resume.
     * @param body            An object containing the fields to POST for the
     *                                                            request.  See the corresponding object definition for
     *                                                            field details.
     * @return Response from the API call
     */
    resumeSubscription(subscriptionId: string, body: ResumeSubscriptionRequest, requestOptions?: RequestOptions): Promise<ApiResponse<ResumeSubscriptionResponse>>;
    /**
     * Schedules a `SWAP_PLAN` action to swap a subscription plan in an existing subscription.
     *
     * @param subscriptionId  The ID of the subscription to swap the subscription plan for.
     * @param body            An object containing the fields to POST for the request.  See
     *                                                  the corresponding object definition for field details.
     * @return Response from the API call
     */
    swapPlan(subscriptionId: string, body: SwapPlanRequest, requestOptions?: RequestOptions): Promise<ApiResponse<SwapPlanResponse>>;
}
