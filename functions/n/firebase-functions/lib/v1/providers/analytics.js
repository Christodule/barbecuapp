"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2017 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportBundleInfo = exports.UserPropertyValue = exports.UserDimensions = exports.AnalyticsEvent = exports.AnalyticsEventBuilder = exports._eventWithOptions = exports.event = exports.service = exports.provider = void 0;
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.provider = "google.analytics";
/** @internal */
exports.service = "app-measurement.com";
/**
 * Registers a function to handle analytics events.
 *
 * @param analyticsEventType Name of the analytics event type to which
 *   this Cloud Function is scoped.
 *
 * @returns Analytics event builder interface.
 */
function event(analyticsEventType) {
    return _eventWithOptions(analyticsEventType, {});
}
exports.event = event;
/** @internal */
function _eventWithOptions(analyticsEventType, options) {
    return new AnalyticsEventBuilder(() => {
        if (!process.env.GCLOUD_PROJECT) {
            throw new Error("process.env.GCLOUD_PROJECT is not set.");
        }
        return "projects/" + process.env.GCLOUD_PROJECT + "/events/" + analyticsEventType;
    }, options);
}
exports._eventWithOptions = _eventWithOptions;
/**
 * The Firebase Analytics event builder interface.
 *
 * Access via `functions.analytics.event()`.
 */
class AnalyticsEventBuilder {
    /** @hidden */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    /**
     * Event handler that fires every time a Firebase Analytics event occurs.
     *
     * @param handler Event handler that fires every time a Firebase Analytics event
     *   occurs.
     *
     * @returns A function that you can export and deploy.
     */
    onLog(handler) {
        const dataConstructor = (raw) => {
            return new AnalyticsEvent(raw.data);
        };
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            eventType: "event.log",
            service: exports.service,
            legacyEventType: `providers/google.firebase.analytics/eventTypes/event.log`,
            triggerResource: this.triggerResource,
            dataConstructor,
            options: this.options,
        });
    }
}
exports.AnalyticsEventBuilder = AnalyticsEventBuilder;
/** Interface representing a Firebase Analytics event that was logged for a specific user. */
class AnalyticsEvent {
    /** @hidden */
    constructor(wireFormat) {
        this.params = {}; // In case of absent field, show empty (not absent) map.
        if (wireFormat.eventDim && wireFormat.eventDim.length > 0) {
            // If there's an eventDim, there'll always be exactly one.
            const eventDim = wireFormat.eventDim[0];
            copyField(eventDim, this, "name");
            copyField(eventDim, this, "params", (p) => mapKeys(p, unwrapValue));
            copyFieldTo(eventDim, this, "valueInUsd", "valueInUSD");
            copyFieldTo(eventDim, this, "date", "reportingDate");
            copyTimestampToString(eventDim, this, "timestampMicros", "logTime");
            copyTimestampToString(eventDim, this, "previousTimestampMicros", "previousLogTime");
        }
        copyFieldTo(wireFormat, this, "userDim", "user", (dim) => new UserDimensions(dim));
    }
}
exports.AnalyticsEvent = AnalyticsEvent;
/**
 * Interface representing the user who triggered the events.
 */
class UserDimensions {
    /** @hidden */
    constructor(wireFormat) {
        // These are interfaces or primitives, no transformation needed.
        copyFields(wireFormat, this, ["userId", "deviceInfo", "geoInfo", "appInfo"]);
        // The following fields do need transformations of some sort.
        copyTimestampToString(wireFormat, this, "firstOpenTimestampMicros", "firstOpenTime");
        this.userProperties = {}; // With no entries in the wire format, present an empty (as opposed to absent) map.
        copyField(wireFormat, this, "userProperties", (r) => {
            const entries = Object.entries(r).map(([k, v]) => [k, new UserPropertyValue(v)]);
            return Object.fromEntries(entries);
        });
        copyField(wireFormat, this, "bundleInfo", (r) => new ExportBundleInfo(r));
        // BUG(36000368) Remove when no longer necessary
        /* tslint:disable:no-string-literal */
        if (!this.userId && this.userProperties["user_id"]) {
            this.userId = this.userProperties["user_id"].value;
        }
        /* tslint:enable:no-string-literal */
    }
}
exports.UserDimensions = UserDimensions;
/** Predefined or custom properties stored on the client side. */
class UserPropertyValue {
    /** @hidden */
    constructor(wireFormat) {
        copyField(wireFormat, this, "value", unwrapValueAsString);
        copyTimestampToString(wireFormat, this, "setTimestampUsec", "setTime");
    }
}
exports.UserPropertyValue = UserPropertyValue;
/** Interface representing the bundle these events were uploaded to. */
class ExportBundleInfo {
    /** @hidden */
    constructor(wireFormat) {
        copyField(wireFormat, this, "bundleSequenceId");
        copyTimestampToMillis(wireFormat, this, "serverTimestampOffsetMicros", "serverTimestampOffset");
    }
}
exports.ExportBundleInfo = ExportBundleInfo;
/** @hidden */
function copyFieldTo(from, to, fromField, toField, transform) {
    if (typeof from[fromField] === "undefined") {
        return;
    }
    if (transform) {
        to[toField] = transform(from[fromField]);
        return;
    }
    to[toField] = from[fromField];
}
/** @hidden */
function copyField(from, to, field, transform = (from) => from) {
    copyFieldTo(from, to, field, field, transform);
}
/** @hidden */
function copyFields(from, to, fields) {
    for (const field of fields) {
        copyField(from, to, field);
    }
}
function mapKeys(obj, transform) {
    const entries = Object.entries(obj).map(([k, v]) => [k, transform(v)]);
    return Object.fromEntries(entries);
}
// The incoming payload will have fields like:
// {
//   'myInt': {
//     'intValue': '123'
//   },
//   'myDouble': {
//     'doubleValue': 1.0
//   },
//   'myFloat': {
//     'floatValue': 1.1
//   },
//   'myString': {
//     'stringValue': 'hi!'
//   }
// }
//
// The following method will remove these four types of 'xValue' fields, flattening them
// to just their values, as a string:
// {
//   'myInt': '123',
//   'myDouble': '1.0',
//   'myFloat': '1.1',
//   'myString': 'hi!'
// }
//
// Note that while 'intValue' will have a quoted payload, 'doubleValue' and 'floatValue' will not. This
// is due to the encoding library, which renders int64 values as strings to avoid loss of precision. This
// method always returns a string, similarly to avoid loss of precision, unlike the less-conservative
// 'unwrapValue' method just below.
/** @hidden */
function unwrapValueAsString(wrapped) {
    const key = Object.keys(wrapped)[0];
    return wrapped[key].toString();
}
// Ditto as the method above, but returning the values in the idiomatic JavaScript type (string for strings,
// number for numbers):
// {
//   'myInt': 123,
//   'myDouble': 1.0,
//   'myFloat': 1.1,
//   'myString': 'hi!'
// }
//
// The field names in the incoming xValue fields identify the type a value has, which for JavaScript's
// purposes can be divided into 'number' versus 'string'. This method will render all the numbers as
// JavaScript's 'number' type, since we prefer using idiomatic types. Note that this may lead to loss
// in precision for int64 fields, so use with care.
/** @hidden */
const xValueNumberFields = ["intValue", "floatValue", "doubleValue"];
/** @hidden */
function unwrapValue(wrapped) {
    const key = Object.keys(wrapped)[0];
    const value = unwrapValueAsString(wrapped);
    return xValueNumberFields.includes(key) ? Number(value) : value;
}
// The JSON payload delivers timestamp fields as strings of timestamps denoted in microseconds.
// The JavaScript convention is to use numbers denoted in milliseconds. This method
// makes it easy to convert a field of one type into the other.
/** @hidden */
function copyTimestampToMillis(from, to, fromName, toName) {
    if (from[fromName] !== undefined) {
        to[toName] = Math.round(from[fromName] / 1000);
    }
}
// The JSON payload delivers timestamp fields as strings of timestamps denoted in microseconds.
// In our SDK, we'd like to present timestamp as ISO-format strings. This method makes it easy
// to convert a field of one type into the other.
/** @hidden */
function copyTimestampToString(from, to, fromName, toName) {
    if (from[fromName] !== undefined) {
        to[toName] = new Date(from[fromName] / 1000).toISOString();
    }
}
