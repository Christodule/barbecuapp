import { Schema } from '../schema';
/** ACH-specific details about `BANK_ACCOUNT` type payments with the `transfer_type` of `ACH`. */
export interface ACHDetails {
    /** The routing number for the bank account. */
    routingNumber?: string;
    /** The last few digits of the bank account number. */
    accountNumberSuffix?: string;
    /**
     * The type of the bank account performing the transfer. The account type can be `CHECKING`,
     * `SAVINGS`, or `UNKNOWN`.
     */
    accountType?: string;
}
export declare const aCHDetailsSchema: Schema<ACHDetails>;
