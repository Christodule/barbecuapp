import { Schema } from '../schema';
import { Error } from './error';
import { LoyaltyProgram } from './loyaltyProgram';
/** A response that contains the loyalty program. */
export interface RetrieveLoyaltyProgramResponse {
    /** Any errors that occurred during the request. */
    errors?: Error[];
    /**
     * Represents a Square loyalty program. Loyalty programs define how buyers can earn points and redeem points for rewards.
     * Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard.
     * For more information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).
     */
    program?: LoyaltyProgram;
}
export declare const retrieveLoyaltyProgramResponseSchema: Schema<RetrieveLoyaltyProgramResponse>;
