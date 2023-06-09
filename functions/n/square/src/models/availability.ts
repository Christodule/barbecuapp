import { array, lazy, object, optional, Schema, string } from '../schema';
import {
  AppointmentSegment,
  appointmentSegmentSchema,
} from './appointmentSegment';

/** Defines an appointment slot that encapsulates the appointment segments, location and starting time available for booking. */
export interface Availability {
  /** The RFC 3339 timestamp specifying the beginning time of the slot available for booking. */
  startAt?: string;
  /** The ID of the location available for booking. */
  locationId?: string;
  /** The list of appointment segments available for booking */
  appointmentSegments?: AppointmentSegment[];
}

export const availabilitySchema: Schema<Availability> = object({
  startAt: ['start_at', optional(string())],
  locationId: ['location_id', optional(string())],
  appointmentSegments: [
    'appointment_segments',
    optional(array(lazy(() => appointmentSegmentSchema))),
  ],
});
