import { Schema } from '../schema';
import { Money } from './money';
/**
 * The hourly wage rate that a team member earns on a `Shift` for doing the job
 * specified by the `title` property of this object.
 */
export interface TeamMemberWage {
    /** The UUID for this object. */
    id?: string;
    /** The `TeamMember` that this wage is assigned to. */
    teamMemberId?: string;
    /** The job title that this wage relates to. */
    title?: string;
    /**
     * Represents an amount of money. `Money` fields can be signed or unsigned.
     * Fields that do not explicitly define whether they are signed or unsigned are
     * considered unsigned and can only hold positive amounts. For signed fields, the
     * sign of the value indicates the purpose of the money transfer. See
     * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
     * for more information.
     */
    hourlyRate?: Money;
}
export declare const teamMemberWageSchema: Schema<TeamMemberWage>;
