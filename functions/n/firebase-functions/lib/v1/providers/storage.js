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
exports.ObjectBuilder = exports.BucketBuilder = exports._objectWithOptions = exports._bucketWithOptions = exports.object = exports.bucket = exports.service = exports.provider = void 0;
const config_1 = require("../../common/config");
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.provider = "google.storage";
/** @internal */
exports.service = "storage.googleapis.com";
/**
 * Registers a Cloud Function scoped to a specific storage bucket.
 *
 * @param bucket Name of the bucket to which this Cloud Function is
 *   scoped.
 *
 * @returns Storage bucket builder interface.
 */
function bucket(bucket) {
    return _bucketWithOptions({}, bucket);
}
exports.bucket = bucket;
/**
 * Registers a Cloud Function scoped to the default storage bucket for the
 * project.
 *
 * @returns Storage object builder interface.
 */
function object() {
    return _objectWithOptions({});
}
exports.object = object;
/** @internal */
function _bucketWithOptions(options, bucket) {
    const resourceGetter = () => {
        bucket = bucket || (0, config_1.firebaseConfig)().storageBucket;
        if (!bucket) {
            throw new Error("Missing bucket name. If you are unit testing, please provide a bucket name" +
                " through `functions.storage.bucket(bucketName)`, or set process.env.FIREBASE_CONFIG.");
        }
        if (!/^[a-z\d][a-z\d\\._-]{1,230}[a-z\d]$/.test(bucket)) {
            throw new Error(`Invalid bucket name ${bucket}`);
        }
        return `projects/_/buckets/${bucket}`;
    };
    return new BucketBuilder(resourceGetter, options);
}
exports._bucketWithOptions = _bucketWithOptions;
/** @internal */
function _objectWithOptions(options) {
    return _bucketWithOptions(options).object();
}
exports._objectWithOptions = _objectWithOptions;
/**
 * The Google Cloud Storage bucket builder interface.
 *
 * Access via `functions.storage.bucket()`.
 */
class BucketBuilder {
    /** @internal */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    /**
     * Event handler which fires every time a Google Cloud Storage change occurs.
     *
     * @returns Storage object builder interface scoped to the specified storage
     *   bucket.
     */
    object() {
        return new ObjectBuilder(this.triggerResource, this.options);
    }
}
exports.BucketBuilder = BucketBuilder;
/**
 * The Google Cloud Storage object builder interface.
 *
 * Access via `functions.storage.object()`.
 */
class ObjectBuilder {
    /** @internal */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    /**
     * Event handler sent only when a bucket has enabled object versioning.
     * This event indicates that the live version of an object has become an
     * archived version, either because it was archived or because it was
     * overwritten by the upload of an object of the same name.
     *
     * @param handler Event handler which is run every time a Google Cloud Storage
     *   archival occurs.
     *
     * @returns A function which you can export and deploy.
     */
    onArchive(handler) {
        return this.onOperation(handler, "object.archive");
    }
    /**
     * Event handler which fires every time a Google Cloud Storage deletion occurs.
     *
     * Sent when an object has been permanently deleted. This includes objects
     * that are overwritten or are deleted as part of the bucket's lifecycle
     * configuration. For buckets with object versioning enabled, this is not
     * sent when an object is archived, even if archival occurs
     * via the `storage.objects.delete` method.
     *
     * @param handler Event handler which is run every time a Google Cloud Storage
     *   deletion occurs.
     *
     * @returns A function which you can export and deploy.
     */
    onDelete(handler) {
        return this.onOperation(handler, "object.delete");
    }
    /**
     * Event handler which fires every time a Google Cloud Storage object
     * creation occurs.
     *
     * Sent when a new object (or a new generation of an existing object)
     * is successfully created in the bucket. This includes copying or rewriting
     * an existing object. A failed upload does not trigger this event.
     *
     * @param handler Event handler which is run every time a Google Cloud Storage
     *   object creation occurs.
     *
     * @returns A function which you can export and deploy.
     */
    onFinalize(handler) {
        return this.onOperation(handler, "object.finalize");
    }
    /**
     * Event handler which fires every time the metadata of an existing object
     * changes.
     *
     * @param handler Event handler which is run every time a Google Cloud Storage
     *   metadata update occurs.
     *
     * @returns A function which you can export and deploy.
     */
    onMetadataUpdate(handler) {
        return this.onOperation(handler, "object.metadataUpdate");
    }
    /** @hidden */
    onOperation(handler, eventType) {
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            service: exports.service,
            eventType,
            triggerResource: this.triggerResource,
            options: this.options,
        });
    }
}
exports.ObjectBuilder = ObjectBuilder;
