import { Schema } from '../schema';
/** Describes a `CancelInvoice` request. */
export interface CancelInvoiceRequest {
    /**
     * The version of the [invoice]($m/Invoice) to cancel.
     * If you do not know the version, you can call
     * [GetInvoice]($e/Invoices/GetInvoice) or [ListInvoices]($e/Invoices/ListInvoices).
     */
    version: number;
}
export declare const cancelInvoiceRequestSchema: Schema<CancelInvoiceRequest>;
