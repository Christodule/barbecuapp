"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2021 Firebase
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
exports.params = exports.Change = exports.setGlobalOptions = exports.firestore = exports.testLab = exports.remoteConfig = exports.scheduler = exports.eventarc = exports.tasks = exports.logger = exports.pubsub = exports.identity = exports.https = exports.storage = exports.database = exports.alerts = void 0;
/**
 * The V2 API for Cloud Functions for Firebase.
 * This SDK also supports deep imports. For example, the namespace
 * 'pubsub' is available at 'firebase-functions/v2' or is directly importable
 * from 'firebase-functions/v2/pubsub'.
 * @packageDocumentation
 */
const logger = require("../logger");
exports.logger = logger;
const alerts = require("./providers/alerts");
exports.alerts = alerts;
const database = require("./providers/database");
exports.database = database;
const eventarc = require("./providers/eventarc");
exports.eventarc = eventarc;
const https = require("./providers/https");
exports.https = https;
const identity = require("./providers/identity");
exports.identity = identity;
const pubsub = require("./providers/pubsub");
exports.pubsub = pubsub;
const scheduler = require("./providers/scheduler");
exports.scheduler = scheduler;
const storage = require("./providers/storage");
exports.storage = storage;
const tasks = require("./providers/tasks");
exports.tasks = tasks;
const remoteConfig = require("./providers/remoteConfig");
exports.remoteConfig = remoteConfig;
const testLab = require("./providers/testLab");
exports.testLab = testLab;
const firestore = require("./providers/firestore");
exports.firestore = firestore;
var options_1 = require("./options");
Object.defineProperty(exports, "setGlobalOptions", { enumerable: true, get: function () { return options_1.setGlobalOptions; } });
var change_1 = require("../common/change");
Object.defineProperty(exports, "Change", { enumerable: true, get: function () { return change_1.Change; } });
// NOTE: Equivalent to `export * as params from "../params"` but api-extractor doesn't support that syntax.
const params = require("../params");
exports.params = params;
