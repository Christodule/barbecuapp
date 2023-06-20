import { Schema } from '../schema';
/** Provides metadata when the event `type` is `REDEEM_REWARD`. */
export interface LoyaltyEventRedeemReward {
    /** The ID of the [loyalty program]($m/LoyaltyProgram). */
    loyaltyProgramId: string;
    /**
     * The ID of the redeemed [loyalty reward]($m/LoyaltyReward).
     * This field is returned only if the event source is `LOYALTY_API`.
     */
    rewardId?: string;
    /**
     * The ID of the [order]($m/Order) that redeemed the reward.
     * This field is returned only if the Orders API is used to process orders.
     */
    orderId?: string;
}
export declare const loyaltyEventRedeemRewardSchema: Schema<LoyaltyEventRedeemReward>;
