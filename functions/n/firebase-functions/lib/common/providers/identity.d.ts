import * as auth from "firebase-admin/auth";
import { EventContext } from "../../v1/cloud-functions";
import { HttpsError } from "./https";
export { HttpsError };
/**
 * Shorthand auth blocking events from GCIP.
 * @hidden
 * @alpha
 */
export type AuthBlockingEventType = "beforeCreate" | "beforeSignIn";
/**
 * The UserRecord passed to Cloud Functions is the same UserRecord that is returned by the Firebase Admin
 * SDK.
 */
export type UserRecord = auth.UserRecord;
/**
 * UserInfo that is part of the UserRecord
 */
export type UserInfo = auth.UserInfo;
/**
 * Helper class to create the user metadata in a UserRecord object
 */
export declare class UserRecordMetadata implements auth.UserMetadata {
    creationTime: string;
    lastSignInTime: string;
    constructor(creationTime: string, lastSignInTime: string);
    /** Returns a plain JavaScript object with the properties of UserRecordMetadata. */
    toJSON(): AuthUserMetadata;
}
/**
 * Helper function that creates a UserRecord Class from data sent over the wire.
 * @param wireData data sent over the wire
 * @returns an instance of UserRecord with correct toJSON functions
 */
export declare function userRecordConstructor(wireData: Record<string, unknown>): UserRecord;
/**
 * User info that is part of the AuthUserRecord
 */
export interface AuthUserInfo {
    /**
     * The user identifier for the linked provider.
     */
    uid: string;
    /**
     * The display name for the linked provider.
     */
    displayName: string;
    /**
     * The email for the linked provider.
     */
    email: string;
    /**
     * The photo URL for the linked provider.
     */
    photoURL: string;
    /**
     * The linked provider ID (for example, "google.com" for the Google provider).
     */
    providerId: string;
    /**
     * The phone number for the linked provider.
     */
    phoneNumber: string;
}
/**
 * Additional metadata about the user.
 */
export interface AuthUserMetadata {
    /**
     * The date the user was created, formatted as a UTC string.
     */
    creationTime: string;
    /**
     * The date the user last signed in, formatted as a UTC string.
     */
    lastSignInTime: string;
}
/**
 * Interface representing the common properties of a user-enrolled second factor.
 */
export interface AuthMultiFactorInfo {
    /**
     * The ID of the enrolled second factor. This ID is unique to the user.
     */
    uid: string;
    /**
     * The optional display name of the enrolled second factor.
     */
    displayName?: string;
    /**
     * The type identifier of the second factor. For SMS second factors, this is `phone`.
     */
    factorId: string;
    /**
     * The optional date the second factor was enrolled, formatted as a UTC string.
     */
    enrollmentTime?: string;
    /**
     * The phone number associated with a phone second factor.
     */
    phoneNumber?: string;
}
/**
 * The multi-factor related properties for the current user, if available.
 */
export interface AuthMultiFactorSettings {
    /**
     * List of second factors enrolled with the current user.
     */
    enrolledFactors: AuthMultiFactorInfo[];
}
/**
 * The UserRecord passed to auth blocking Cloud Functions from the identity platform.
 */
export interface AuthUserRecord {
    /**
     * The user's `uid`.
     */
    uid: string;
    /**
     * The user's primary email, if set.
     */
    email?: string;
    /**
     * Whether or not the user's primary email is verified.
     */
    emailVerified: boolean;
    /**
     * The user's display name.
     */
    displayName?: string;
    /**
     * The user's photo URL.
     */
    photoURL?: string;
    /**
     * The user's primary phone number, if set.
     */
    phoneNumber?: string;
    /**
     * Whether or not the user is disabled: `true` for disabled; `false` for
     * enabled.
     */
    disabled: boolean;
    /**
     * Additional metadata about the user.
     */
    metadata: AuthUserMetadata;
    /**
     * An array of providers (for example, Google, Facebook) linked to the user.
     */
    providerData: AuthUserInfo[];
    /**
     * The user's hashed password (base64-encoded).
     */
    passwordHash?: string;
    /**
     * The user's password salt (base64-encoded).
     */
    passwordSalt?: string;
    /**
     * The user's custom claims object if available, typically used to define
     * user roles and propagated to an authenticated user's ID token.
     */
    customClaims?: Record<string, any>;
    /**
     * The ID of the tenant the user belongs to, if available.
     */
    tenantId?: string | null;
    /**
     * The date the user's tokens are valid after, formatted as a UTC string.
     */
    tokensValidAfterTime?: string;
    /**
     * The multi-factor related properties for the current user, if available.
     */
    multiFactor?: AuthMultiFactorSettings;
}
/** The additional user info component of the auth event context */
export interface AdditionalUserInfo {
    providerId: string;
    profile?: any;
    username?: string;
    isNewUser: boolean;
}
/** The credential component of the auth event context */
export interface Credential {
    claims?: {
        [key: string]: any;
    };
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    expirationTime?: string;
    secret?: string;
    providerId: string;
    signInMethod: string;
}
/** Defines the auth event context for blocking events */
export interface AuthEventContext extends EventContext {
    locale?: string;
    ipAddress: string;
    userAgent: string;
    additionalUserInfo?: AdditionalUserInfo;
    credential?: Credential;
}
/** Defines the auth event for v2 blocking events */
export interface AuthBlockingEvent extends AuthEventContext {
    data: AuthUserRecord;
}
/** The handler response type for beforeCreate blocking events */
export interface BeforeCreateResponse {
    displayName?: string;
    disabled?: boolean;
    emailVerified?: boolean;
    photoURL?: string;
    customClaims?: object;
}
/** The handler response type for beforeSignIn blocking events */
export interface BeforeSignInResponse extends BeforeCreateResponse {
    sessionClaims?: object;
}
