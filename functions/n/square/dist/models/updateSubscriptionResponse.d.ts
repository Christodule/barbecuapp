import { Schema } from '../schema';
import { Error } from './error';
import { Subscription } from './subscription';
/**
 * Defines output parameters in a response from the
 * [UpdateSubscription]($e/Subscriptions/UpdateSubscription) endpoint.
 */
export interface UpdateSubscriptionResponse {
    /** Errors encountered during the request. */
    errors?: Error[];
    /**
     * Represents a subscription to a subscription plan by a subscriber.
     * For an overview of the `Subscription` type, see
     * [Subscription object](https://developer.squareup.com/docs/subscriptions-api/overview#subscription-object-overview).
     */
    subscription?: Subscription;
}
export declare const updateSubscriptionResponseSchema: Schema<UpdateSubscriptionResponse>;
