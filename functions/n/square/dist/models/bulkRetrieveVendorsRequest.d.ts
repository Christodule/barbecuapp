import { Schema } from '../schema';
/** Represents an input to a call to [BulkRetrieveVendors.]($e/Vendors/BulkRetrieveVendors) */
export interface BulkRetrieveVendorsRequest {
    /** IDs of the [Vendor]($m/Vendor) objects to retrieve. */
    vendorIds?: string[];
}
export declare const bulkRetrieveVendorsRequestSchema: Schema<BulkRetrieveVendorsRequest>;
