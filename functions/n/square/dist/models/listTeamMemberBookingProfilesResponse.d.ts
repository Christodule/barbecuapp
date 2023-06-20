import { Schema } from '../schema';
import { Error } from './error';
import { TeamMemberBookingProfile } from './teamMemberBookingProfile';
export interface ListTeamMemberBookingProfilesResponse {
    /**
     * The list of team member booking profiles. The results are returned in the ascending order of the time
     * when the team member booking profiles were last updated. Multiple booking profiles updated at the same time
     * are further sorted in the ascending order of their IDs.
     */
    teamMemberBookingProfiles?: TeamMemberBookingProfile[];
    /** The pagination cursor to be used in the subsequent request to get the next page of the results. Stop retrieving the next page of the results when the cursor is not set. */
    cursor?: string;
    /** Errors that occurred during the request. */
    errors?: Error[];
}
export declare const listTeamMemberBookingProfilesResponseSchema: Schema<ListTeamMemberBookingProfilesResponse>;
