import { Schema } from '../schema';
import { UpdateVendorRequest } from './updateVendorRequest';
/** Represents an input to a call to [BulkUpdateVendors.]($e/Vendors/BulkUpdateVendors) */
export interface BulkUpdateVendorsRequest {
    /**
     * A set of [UpdateVendorRequest]($m/UpdateVendorRequest) objects encapsulating to-be-updated [Vendor]($m/Vendor)
     * objects. The set is represented by  a collection of `Vendor`-ID/`UpdateVendorRequest`-object pairs.
     */
    vendors: Record<string, UpdateVendorRequest>;
}
export declare const bulkUpdateVendorsRequestSchema: Schema<BulkUpdateVendorsRequest>;
