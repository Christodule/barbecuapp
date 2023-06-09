import { Schema } from '../schema';
import { Error } from './error';
import { Shift } from './shift';
/**
 * The response to a request to update a `Shift`. The response contains
 * the updated `Shift` object and might contain a set of `Error` objects if
 * the request resulted in errors.
 */
export interface UpdateShiftResponse {
    /**
     * A record of the hourly rate, start, and end times for a single work shift
     * for an employee. This might include a record of the start and end times for breaks
     * taken during the shift.
     */
    shift?: Shift;
    /** Any errors that occurred during the request. */
    errors?: Error[];
}
export declare const updateShiftResponseSchema: Schema<UpdateShiftResponse>;
