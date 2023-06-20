import { Schema } from '../schema';
/** Represents an action as a pending change to a subscription. */
export interface SubscriptionAction {
    /** The ID of an action scoped to a subscription. */
    id?: string;
    /** Supported types of an action as a pending change to a subscription. */
    type?: string;
    /** The `YYYY-MM-DD`-formatted date when the action occurs on the subscription. */
    effectiveDate?: string;
    /** The target subscription plan a subscription switches to, for a `SWAP_PLAN` action. */
    newPlanId?: string;
}
export declare const subscriptionActionSchema: Schema<SubscriptionAction>;
