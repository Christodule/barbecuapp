import { Schema } from '../schema';
import { CustomerCreationSourceFilter } from './customerCreationSourceFilter';
import { CustomerTextFilter } from './customerTextFilter';
import { FilterValue } from './filterValue';
import { TimeRange } from './timeRange';
/**
 * Represents a set of `CustomerQuery` filters used to limit the set of
 * customers returned by the [SearchCustomers]($e/Customers/SearchCustomers) endpoint.
 */
export interface CustomerFilter {
    /**
     * The creation source filter.
     * If one or more creation sources are set, customer profiles are included in,
     * or excluded from, the result if they match at least one of the filter criteria.
     */
    creationSource?: CustomerCreationSourceFilter;
    /**
     * Represents a generic time range. The start and end values are
     * represented in RFC 3339 format. Time ranges are customized to be
     * inclusive or exclusive based on the needs of a particular endpoint.
     * Refer to the relevant endpoint-specific documentation to determine
     * how time ranges are handled.
     */
    createdAt?: TimeRange;
    /**
     * Represents a generic time range. The start and end values are
     * represented in RFC 3339 format. Time ranges are customized to be
     * inclusive or exclusive based on the needs of a particular endpoint.
     * Refer to the relevant endpoint-specific documentation to determine
     * how time ranges are handled.
     */
    updatedAt?: TimeRange;
    /**
     * A filter to select customers based on exact or fuzzy matching of
     * customer attributes against a specified query. Depending on the customer attributes,
     * the filter can be case-sensitive. This filter can be exact or fuzzy, but it cannot be both.
     */
    emailAddress?: CustomerTextFilter;
    /**
     * A filter to select customers based on exact or fuzzy matching of
     * customer attributes against a specified query. Depending on the customer attributes,
     * the filter can be case-sensitive. This filter can be exact or fuzzy, but it cannot be both.
     */
    phoneNumber?: CustomerTextFilter;
    /**
     * A filter to select customers based on exact or fuzzy matching of
     * customer attributes against a specified query. Depending on the customer attributes,
     * the filter can be case-sensitive. This filter can be exact or fuzzy, but it cannot be both.
     */
    referenceId?: CustomerTextFilter;
    /**
     * A filter to select resources based on an exact field value. For any given
     * value, the value can only be in one property. Depending on the field, either
     * all properties can be set or only a subset will be available.
     * Refer to the documentation of the field.
     */
    groupIds?: FilterValue;
}
export declare const customerFilterSchema: Schema<CustomerFilter>;
