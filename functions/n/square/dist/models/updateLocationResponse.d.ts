import { Schema } from '../schema';
import { Error } from './error';
import { Location } from './location';
/** Response object returned by the [UpdateLocation]($e/Locations/UpdateLocation) endpoint. */
export interface UpdateLocationResponse {
    /** Information on errors encountered during the request. */
    errors?: Error[];
    /** Represents one of a business's [locations](https://developer.squareup.com/docs/locations-api). */
    location?: Location;
}
export declare const updateLocationResponseSchema: Schema<UpdateLocationResponse>;
