import { Schema } from '../schema';
import { Address } from './address';
import { BusinessHours } from './businessHours';
import { Coordinates } from './coordinates';
import { TaxIds } from './taxIds';
/** Represents one of a business's [locations](https://developer.squareup.com/docs/locations-api). */
export interface Location {
    /** A short, generated string of letters and numbers that uniquely identifies this location instance. */
    id?: string;
    /**
     * The name of the location.
     * This information appears in the dashboard as the nickname.
     * A location name must be unique within a seller account.
     */
    name?: string;
    /**
     * Represents a postal address in a country.
     * For more information, see [Working with Addresses](https://developer.squareup.com/docs/build-basics/working-with-addresses).
     */
    address?: Address;
    /**
     * The [IANA Timezone](https://www.iana.org/time-zones) identifier for
     * the timezone of the location. For example, `America/Los_Angeles`.
     */
    timezone?: string;
    /**
     * The Square features that are enabled for the location.
     * See [LocationCapability]($m/LocationCapability) for possible values.
     * See [LocationCapability](#type-locationcapability) for possible values
     */
    capabilities?: string[];
    /** A location's status. */
    status?: string;
    /**
     * The time when the location was created, in RFC 3339 format.
     * For more information, see [Working with Dates](https://developer.squareup.com/docs/build-basics/working-with-dates).
     */
    createdAt?: string;
    /** The ID of the merchant that owns the location. */
    merchantId?: string;
    /**
     * Indicates the country associated with another entity, such as a business.
     * Values are in [ISO 3166-1-alpha-2 format](http://www.iso.org/iso/home/standards/country_codes.htm).
     */
    country?: string;
    /**
     * The language associated with the location, in
     * [BCP 47 format](https://tools.ietf.org/html/bcp47#appendix-A).
     * For more information, see [Location language code](https://developer.squareup.com/docs/locations-api#location-language-code).
     */
    languageCode?: string;
    /**
     * Indicates the associated currency for an amount of money. Values correspond
     * to [ISO 4217](https://wikipedia.org/wiki/ISO_4217).
     */
    currency?: string;
    /** The phone number of the location. For example, `+1 855-700-6000`. */
    phoneNumber?: string;
    /** The name of the location's overall business. This name is present on receipts and other customer-facing branding. */
    businessName?: string;
    /** A location's type. */
    type?: string;
    /** The website URL of the location.  For example, `https://squareup.com`. */
    websiteUrl?: string;
    /** The hours of operation for a location. */
    businessHours?: BusinessHours;
    /** The email address of the location. This can be unique to the location, and is not always the email address for the business owner or admin. */
    businessEmail?: string;
    /** The description of the location. For example, `Main Street location`. */
    description?: string;
    /** The Twitter username of the location without the '@' symbol. For example, `Square`. */
    twitterUsername?: string;
    /** The Instagram username of the location without the '@' symbol. For example, `square`. */
    instagramUsername?: string;
    /** The Facebook profile URL of the location. The URL should begin with 'facebook.com/'. For example, `https://www.facebook.com/square`. */
    facebookUrl?: string;
    /** Latitude and longitude coordinates. */
    coordinates?: Coordinates;
    /**
     * The URL of the logo image for the location. When configured in the Seller
     * dashboard (Receipts section), the logo appears on transactions (such as receipts and invoices)
     * that Square generates on behalf of the Seller. This image should have a roughly square (1:1) aspect ratio
     * and is recommended to be at least 200x200 pixels.
     */
    logoUrl?: string;
    /** The URL of the Point of Sale background image for the location. */
    posBackgroundUrl?: string;
    /**
     * A four-digit number that describes the kind of goods or services sold at the location.
     * The [merchant category code (MCC)](https://developer.squareup.com/docs/locations-api#initialize-a-merchant-category-code) of the location as standardized by ISO 18245.
     * For example, `5045`, for a location that sells computer goods and software.
     */
    mcc?: string;
    /**
     * The URL of a full-format logo image for the location. When configured in the Seller
     * dashboard (Receipts section), the logo appears on transactions (such as receipts and invoices)
     * that Square generates on behalf of the Seller. This image can be wider than it is tall,
     * and is recommended to be at least 1280x648 pixels.
     */
    fullFormatLogoUrl?: string;
    /** Identifiers for the location used by various governments for tax purposes. */
    taxIds?: TaxIds;
}
export declare const locationSchema: Schema<Location>;
