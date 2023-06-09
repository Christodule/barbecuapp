import { Schema } from '../schema';
import { Money } from './money';
import { ProcessingFee } from './processingFee';
/**
 * Represents a refund of a payment made using Square. Contains information about
 * the original payment and the amount of money refunded.
 */
export interface PaymentRefund {
    /** The unique ID for this refund, generated by Square. */
    id: string;
    /**
     * The refund's status:
     * - `PENDING` - Awaiting approval.
     * - `COMPLETED` - Successfully completed.
     * - `REJECTED` - The refund was rejected.
     * - `FAILED` - An error occurred.
     */
    status?: string;
    /** The location ID associated with the payment this refund is attached to. */
    locationId?: string;
    /**
     * Represents an amount of money. `Money` fields can be signed or unsigned.
     * Fields that do not explicitly define whether they are signed or unsigned are
     * considered unsigned and can only hold positive amounts. For signed fields, the
     * sign of the value indicates the purpose of the money transfer. See
     * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
     * for more information.
     */
    amountMoney: Money;
    /**
     * Represents an amount of money. `Money` fields can be signed or unsigned.
     * Fields that do not explicitly define whether they are signed or unsigned are
     * considered unsigned and can only hold positive amounts. For signed fields, the
     * sign of the value indicates the purpose of the money transfer. See
     * [Working with Monetary Amounts](https://developer.squareup.com/docs/build-basics/working-with-monetary-amounts)
     * for more information.
     */
    appFeeMoney?: Money;
    /** Processing fees and fee adjustments assessed by Square for this refund. */
    processingFee?: ProcessingFee[];
    /** The ID of the payment associated with this refund. */
    paymentId?: string;
    /** The ID of the order associated with the refund. */
    orderId?: string;
    /** The reason for the refund. */
    reason?: string;
    /** The timestamp of when the refund was created, in RFC 3339 format. */
    createdAt?: string;
    /** The timestamp of when the refund was last updated, in RFC 3339 format. */
    updatedAt?: string;
    /** An optional ID of the team member associated with taking the payment. */
    teamMemberId?: string;
}
export declare const paymentRefundSchema: Schema<PaymentRefund>;
