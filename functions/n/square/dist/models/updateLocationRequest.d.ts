import { Schema } from '../schema';
import { Location } from './location';
/** Request object for the [UpdateLocation]($e/Locations/UpdateLocation) endpoint. */
export interface UpdateLocationRequest {
    /** Represents one of a business's [locations](https://developer.squareup.com/docs/locations-api). */
    location?: Location;
}
export declare const updateLocationRequestSchema: Schema<UpdateLocationRequest>;
