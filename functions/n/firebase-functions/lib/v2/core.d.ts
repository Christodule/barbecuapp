/**
 * Core functionality of the Firebase Functions v2 SDK.
 * @packageDocumentation
 */
import { Change } from "../common/change";
import { ManifestEndpoint } from "../runtime/manifest";
export { Change };
export { ParamsOf } from "../common/params";
/**
 * A CloudEventBase is the base of a cross-platform format for encoding a serverless event.
 * More information can be found in https://github.com/cloudevents/spec
 * @typeParam T - The type of the event data.
 * @beta
 */
export interface CloudEvent<T> {
    /** Version of the CloudEvents spec for this event. */
    readonly specversion: "1.0";
    /** A globally unique ID for this event. */
    id: string;
    /** The resource which published this event. */
    source: string;
    /** The resource, provided by source, that this event relates to */
    subject?: string;
    /** The type of event that this represents. */
    type: string;
    /** When this event occurred. */
    time: string;
    /** Information about this specific event. */
    data: T;
}
/**
 * A handler for CloudEvents.
 * @typeParam EventType - The kind of event this function handles.
 *            Always a subclass of CloudEvent<>
 * @beta
 */
export interface CloudFunction<EventType extends CloudEvent<unknown>> {
    (raw: CloudEvent<unknown>): any | Promise<any>;
    /** @alpha */
    __trigger?: unknown;
    /** @alpha */
    __endpoint: ManifestEndpoint;
    /**
     * The callback passed to the CloudFunction constructor.
     * Use run to test a CloudFunction
     * @param event - The parsed event to handle.
     * @returns Any return value. Google Cloud Functions awaits any promise
     *          before shutting down your function. Resolved return values
     *          are only used for unit testing purposes.
     * @beta
     */
    run(event: EventType): any | Promise<any>;
}
