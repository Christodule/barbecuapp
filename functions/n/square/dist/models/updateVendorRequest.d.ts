import { Schema } from '../schema';
import { Vendor } from './vendor';
/** Represents an input to a call to [UpdateVendor.]($e/Vendors/UpdateVendor) */
export interface UpdateVendorRequest {
    /**
     * A client-supplied, universally unique identifier (UUID) for the
     * request.
     * See [Idempotency](https://developer.squareup.com/docs/basics/api101/idempotency) in the
     * [API Development 101](https://developer.squareup.com/docs/basics/api101/overview) section for more
     * information.
     */
    idempotencyKey?: string;
    /** Represents a supplier to a seller. */
    vendor: Vendor;
}
export declare const updateVendorRequestSchema: Schema<UpdateVendorRequest>;
