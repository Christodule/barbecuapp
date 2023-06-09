import { Schema } from '../schema';
/** Represents a contact of a [Vendor]($m/Vendor). */
export interface VendorContact {
    /**
     * A unique Square-generated ID for the [VendorContact]($m/VendorContact).
     * This field is required when attempting to update a [VendorContact]($m/VendorContact).
     */
    id?: string;
    /**
     * The name of the [VendorContact]($m/VendorContact).
     * This field is required when attempting to create a [Vendor]($m/Vendor).
     */
    name?: string;
    /** The email address of the [VendorContact]($m/VendorContact). */
    emailAddress?: string;
    /** The phone number of the [VendorContact]($m/VendorContact). */
    phoneNumber?: string;
    /** The state of the [VendorContact]($m/VendorContact). */
    removed?: boolean;
    /** The ordinal of the [VendorContact]($m/VendorContact). */
    ordinal: number;
}
export declare const vendorContactSchema: Schema<VendorContact>;
