"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2017 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.ScheduleBuilder = exports._scheduleWithOptions = exports.schedule = exports.TopicBuilder = exports._topicWithOptions = exports.topic = exports.service = exports.provider = void 0;
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.provider = "google.pubsub";
/** @internal */
exports.service = "pubsub.googleapis.com";
/**
 * Registers a Cloud Function triggered when a Google Cloud Pub/Sub message
 * is sent to a specified topic.
 *
 * @param topic - The Pub/Sub topic to watch for message events.
 * @returns Pub/Sub topic builder interface.
 */
function topic(topic) {
    return _topicWithOptions(topic, {});
}
exports.topic = topic;
/** @internal */
function _topicWithOptions(topic, options) {
    if (topic.indexOf("/") !== -1) {
        throw new Error("Topic name may not have a /");
    }
    return new TopicBuilder(() => {
        if (!process.env.GCLOUD_PROJECT) {
            throw new Error("process.env.GCLOUD_PROJECT is not set.");
        }
        return `projects/${process.env.GCLOUD_PROJECT}/topics/${topic}`;
    }, options);
}
exports._topicWithOptions = _topicWithOptions;
/**
 * The Google Cloud Pub/Sub topic builder.
 *
 * Access via `functions.pubsub.topic()`.
 */
class TopicBuilder {
    /** @hidden */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    /**
     * Event handler that fires every time a Cloud Pub/Sub message is
     * published.
     *
     * @param handler - Event handler that runs every time a Cloud Pub/Sub message
     *   is published.
     * @returns A function that you can export and deploy.
     */
    onPublish(handler) {
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            service: exports.service,
            triggerResource: this.triggerResource,
            eventType: "topic.publish",
            dataConstructor: (raw) => new Message(raw.data),
            options: this.options,
        });
    }
}
exports.TopicBuilder = TopicBuilder;
/**
 * Registers a Cloud Function to run at specified times.
 *
 * @param schedule - The schedule, in Unix Crontab or AppEngine syntax.
 * @returns ScheduleBuilder interface.
 */
function schedule(schedule) {
    return _scheduleWithOptions(schedule, {});
}
exports.schedule = schedule;
/** @internal */
function _scheduleWithOptions(schedule, options) {
    const triggerResource = () => {
        if (!process.env.GCLOUD_PROJECT) {
            throw new Error("process.env.GCLOUD_PROJECT is not set.");
        }
        // The CLI will append the correct topic name based on region and function name
        return `projects/${process.env.GCLOUD_PROJECT}/topics`;
    };
    return new ScheduleBuilder(triggerResource, {
        ...options,
        schedule: { schedule },
    });
}
exports._scheduleWithOptions = _scheduleWithOptions;
/**
 * The builder for scheduled functions, which are powered by
 * Google Pub/Sub and Cloud Scheduler. Describes the Cloud Scheduler
 * job that is deployed to trigger a scheduled function at the provided
 * frequency. For more information, see
 * [Schedule functions](/docs/functions/schedule-functions).
 *
 * Access via `functions.pubsub.schedule()`.
 */
class ScheduleBuilder {
    /** @hidden */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    retryConfig(config) {
        this.options.schedule.retryConfig = config;
        return this;
    }
    timeZone(timeZone) {
        this.options.schedule.timeZone = timeZone;
        return this;
    }
    /**
     * Event handler for scheduled functions. Triggered whenever the associated
     * scheduler job sends a Pub/Sub message.
     *
     * @param handler - Handler that fires whenever the associated
     *   scheduler job sends a Pub/Sub message.
     * @returns A function that you can export and deploy.
     */
    onRun(handler) {
        const cloudFunction = (0, cloud_functions_1.makeCloudFunction)({
            contextOnlyHandler: handler,
            provider: exports.provider,
            service: exports.service,
            triggerResource: this.triggerResource,
            eventType: "topic.publish",
            options: this.options,
            labels: { "deployment-scheduled": "true" },
        });
        return cloudFunction;
    }
}
exports.ScheduleBuilder = ScheduleBuilder;
/**
 * Interface representing a Google Cloud Pub/Sub message.
 *
 * @param data - Payload of a Pub/Sub message.
 */
class Message {
    constructor(data) {
        [this.data, this.attributes, this._json] = [data.data, data.attributes || {}, data.json];
    }
    /**
     * The JSON data payload of this message object, if any.
     */
    get json() {
        if (typeof this._json === "undefined") {
            this._json = JSON.parse(Buffer.from(this.data, "base64").toString("utf8"));
        }
        return this._json;
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
        return {
            data: this.data,
            attributes: this.attributes,
        };
    }
}
exports.Message = Message;
