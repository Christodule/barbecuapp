import { Schema } from '../schema';
/** Defines supported query expressions to search for vendors by. */
export interface SearchVendorsRequestFilter {
    /** The names of the [Vendor]($m/Vendor) objects to retrieve. */
    name?: string[];
    /**
     * The statuses of the [Vendor]($m/Vendor) objects to retrieve.
     * See [VendorStatus](#type-vendorstatus) for possible values
     */
    status?: string[];
}
export declare const searchVendorsRequestFilterSchema: Schema<SearchVendorsRequestFilter>;
