"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2023 Firebase
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
exports.onChangedOperation = exports.onOperation = exports.makeEndpoint = exports.makeChangedFirestoreEvent = exports.makeFirestoreEvent = exports.makeParams = exports.createBeforeSnapshot = exports.createSnapshot = exports.getOpts = exports.onDocumentDeleted = exports.onDocumentUpdated = exports.onDocumentCreated = exports.onDocumentWritten = exports.deletedEventType = exports.updatedEventType = exports.createdEventType = exports.writtenEventType = exports.Change = void 0;
const logger = require("../../logger");
const path_1 = require("../../common/utilities/path");
const path_pattern_1 = require("../../common/utilities/path-pattern");
const manifest_1 = require("../../runtime/manifest");
const core_1 = require("../core");
Object.defineProperty(exports, "Change", { enumerable: true, get: function () { return core_1.Change; } });
const options_1 = require("../options");
const firestore_1 = require("../../common/providers/firestore");
/** @internal */
exports.writtenEventType = "google.cloud.firestore.document.v1.written";
/** @internal */
exports.createdEventType = "google.cloud.firestore.document.v1.created";
/** @internal */
exports.updatedEventType = "google.cloud.firestore.document.v1.updated";
/** @internal */
exports.deletedEventType = "google.cloud.firestore.document.v1.deleted";
/**
 * Event handler which triggers when a document is created, updated, or deleted in Firestore.
 *
 * @param documentOrOpts - Options or a string document path.
 * @param handler - Event handler which is run every time a Firestore create, update, or delete occurs.
 */
function onDocumentWritten(documentOrOpts, handler) {
    return onChangedOperation(exports.writtenEventType, documentOrOpts, handler);
}
exports.onDocumentWritten = onDocumentWritten;
/**
 * Event handler which triggers when a document is created in Firestore.
 *
 * @param documentOrOpts - Options or a string document path.
 * @param handler - Event handler which is run every time a Firestore create occurs.
 */
function onDocumentCreated(documentOrOpts, handler) {
    return onOperation(exports.createdEventType, documentOrOpts, handler);
}
exports.onDocumentCreated = onDocumentCreated;
/**
 * Event handler which triggers when a document is updated in Firestore.
 *
 * @param documentOrOpts - Options or a string document path.
 * @param handler - Event handler which is run every time a Firestore update occurs.
 */
function onDocumentUpdated(documentOrOpts, handler) {
    return onChangedOperation(exports.updatedEventType, documentOrOpts, handler);
}
exports.onDocumentUpdated = onDocumentUpdated;
/**
 * Event handler which triggers when a document is deleted in Firestore.
 *
 * @param documentOrOpts - Options or a string document path.
 * @param handler - Event handler which is run every time a Firestore delete occurs.
 */
function onDocumentDeleted(documentOrOpts, handler) {
    return onOperation(exports.deletedEventType, documentOrOpts, handler);
}
exports.onDocumentDeleted = onDocumentDeleted;
/** @internal */
function getOpts(documentOrOpts) {
    let document;
    let database;
    let namespace;
    let opts;
    if (typeof documentOrOpts === "string") {
        document = (0, path_1.normalizePath)(documentOrOpts);
        database = "(default)";
        namespace = "(default)";
        opts = {};
    }
    else {
        document = (0, path_1.normalizePath)(documentOrOpts.document);
        database = documentOrOpts.database || "(default)";
        namespace = documentOrOpts.namespace || "(default)";
        opts = { ...documentOrOpts };
        delete opts.document;
        delete opts.database;
        delete opts.namespace;
    }
    return {
        document,
        database,
        namespace,
        opts,
    };
}
exports.getOpts = getOpts;
/** @hidden */
function getPath(event) {
    return `projects/${event.project}/databases/${event.database}/documents/${event.document}`;
}
/** @internal */
function createSnapshot(event) {
    var _a, _b, _c, _d;
    if (((_a = event.datacontenttype) === null || _a === void 0 ? void 0 : _a.includes("application/protobuf")) || Buffer.isBuffer(event.data)) {
        return (0, firestore_1.createSnapshotFromProtobuf)(event.data, getPath(event));
    }
    else if ((_b = event.datacontenttype) === null || _b === void 0 ? void 0 : _b.includes("application/json")) {
        return (0, firestore_1.createSnapshotFromJson)(event.data, event.source, (_c = event.data.value) === null || _c === void 0 ? void 0 : _c.createTime, (_d = event.data.value) === null || _d === void 0 ? void 0 : _d.updateTime);
    }
    else {
        logger.error(`Cannot determine payload type, datacontenttype is ${event.datacontenttype}, failing out.`);
        throw Error("Error: Cannot parse event payload.");
    }
}
exports.createSnapshot = createSnapshot;
/** @internal */
function createBeforeSnapshot(event) {
    var _a, _b, _c, _d;
    if (((_a = event.datacontenttype) === null || _a === void 0 ? void 0 : _a.includes("application/protobuf")) || Buffer.isBuffer(event.data)) {
        return (0, firestore_1.createBeforeSnapshotFromProtobuf)(event.data, getPath(event));
    }
    else if ((_b = event.datacontenttype) === null || _b === void 0 ? void 0 : _b.includes("application/json")) {
        return (0, firestore_1.createBeforeSnapshotFromJson)(event.data, event.source, (_c = event.data.oldValue) === null || _c === void 0 ? void 0 : _c.createTime, (_d = event.data.oldValue) === null || _d === void 0 ? void 0 : _d.updateTime);
    }
    else {
        logger.error(`Cannot determine payload type, datacontenttype is ${event.datacontenttype}, failing out.`);
        throw Error("Error: Cannot parse event payload.");
    }
}
exports.createBeforeSnapshot = createBeforeSnapshot;
/** @internal */
function makeParams(document, documentPattern) {
    return {
        ...documentPattern.extractMatches(document),
    };
}
exports.makeParams = makeParams;
/** @internal */
function makeFirestoreEvent(eventType, event, params) {
    const data = event.data
        ? eventType === exports.createdEventType
            ? createSnapshot(event)
            : createBeforeSnapshot(event)
        : undefined;
    const firestoreEvent = {
        ...event,
        params,
        data,
    };
    delete firestoreEvent.datacontenttype;
    delete firestoreEvent.dataschema;
    return firestoreEvent;
}
exports.makeFirestoreEvent = makeFirestoreEvent;
/** @internal */
function makeChangedFirestoreEvent(event, params) {
    const data = event.data
        ? core_1.Change.fromObjects(createBeforeSnapshot(event), createSnapshot(event))
        : undefined;
    const firestoreEvent = {
        ...event,
        params,
        data,
    };
    delete firestoreEvent.datacontenttype;
    delete firestoreEvent.dataschema;
    return firestoreEvent;
}
exports.makeChangedFirestoreEvent = makeChangedFirestoreEvent;
/** @internal */
function makeEndpoint(eventType, opts, document, database, namespace) {
    const baseOpts = (0, options_1.optionsToEndpoint)((0, options_1.getGlobalOptions)());
    const specificOpts = (0, options_1.optionsToEndpoint)(opts);
    const eventFilters = {
        database,
        namespace,
    };
    const eventFilterPathPatterns = {};
    document.hasWildcards()
        ? (eventFilterPathPatterns.document = document.getValue())
        : (eventFilters.document = document.getValue());
    return {
        ...(0, manifest_1.initV2Endpoint)((0, options_1.getGlobalOptions)(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        eventTrigger: {
            eventType,
            eventFilters,
            eventFilterPathPatterns,
            retry: !!opts.retry,
        },
    };
}
exports.makeEndpoint = makeEndpoint;
/** @internal */
function onOperation(eventType, documentOrOpts, handler) {
    const { document, database, namespace, opts } = getOpts(documentOrOpts);
    const documentPattern = new path_pattern_1.PathPattern(document);
    // wrap the handler
    const func = (raw) => {
        const event = raw;
        const params = makeParams(event.document, documentPattern);
        const firestoreEvent = makeFirestoreEvent(eventType, event, params);
        return handler(firestoreEvent);
    };
    func.run = handler;
    func.__endpoint = makeEndpoint(eventType, opts, documentPattern, database, namespace);
    return func;
}
exports.onOperation = onOperation;
/** @internal */
function onChangedOperation(eventType, documentOrOpts, handler) {
    const { document, database, namespace, opts } = getOpts(documentOrOpts);
    const documentPattern = new path_pattern_1.PathPattern(document);
    // wrap the handler
    const func = (raw) => {
        const event = raw;
        const params = makeParams(event.document, documentPattern);
        const firestoreEvent = makeChangedFirestoreEvent(event, params);
        return handler(firestoreEvent);
    };
    func.run = handler;
    func.__endpoint = makeEndpoint(eventType, opts, documentPattern, database, namespace);
    return func;
}
exports.onChangedOperation = onChangedOperation;
