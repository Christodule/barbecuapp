import { Schema } from '../schema';
/** Represents the naming used for loyalty points. */
export interface LoyaltyProgramTerminology {
    /** A singular unit for a point (for example, 1 point is called 1 star). */
    one: string;
    /** A plural unit for point (for example, 10 points is called 10 stars). */
    other: string;
}
export declare const loyaltyProgramTerminologySchema: Schema<LoyaltyProgramTerminology>;