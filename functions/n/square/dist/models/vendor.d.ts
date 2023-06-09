import { Schema } from '../schema';
import { Address } from './address';
import { VendorContact } from './vendorContact';
/** Represents a supplier to a seller. */
export interface Vendor {
    /**
     * A unique Square-generated ID for the [Vendor]($m/Vendor).
     * This field is required when attempting to update a [Vendor]($m/Vendor).
     */
    id?: string;
    /**
     * An RFC 3339-formatted timestamp that indicates when the
     * [Vendor]($m/Vendor) was created.
     */
    createdAt?: string;
    /**
     * An RFC 3339-formatted timestamp that indicates when the
     * [Vendor]($m/Vendor) was last updated.
     */
    updatedAt?: string;
    /**
     * The name of the [Vendor]($m/Vendor).
     * This field is required when attempting to create or update a [Vendor]($m/Vendor).
     */
    name?: string;
    /**
     * Represents a postal address in a country.
     * For more information, see [Working with Addresses](https://developer.squareup.com/docs/build-basics/working-with-addresses).
     */
    address?: Address;
    /** The contacts of the [Vendor]($m/Vendor). */
    contacts?: VendorContact[];
    /** The account number of the [Vendor]($m/Vendor). */
    accountNumber?: string;
    /** A note detailing information about the [Vendor]($m/Vendor). */
    note?: string;
    /** The version of the [Vendor]($m/Vendor). */
    version?: number;
    /**
     * The status of the [Vendor]($m/Vendor),
     * whether a [Vendor]($m/Vendor) is active or inactive.
     */
    status?: string;
}
export declare const vendorSchema: Schema<Vendor>;
