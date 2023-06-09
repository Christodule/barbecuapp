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
exports.onCall = exports.onRequest = exports.HttpsError = void 0;
/**
 * Cloud functions to handle HTTPS request or callable RPCs.
 * @packageDocumentation
 */
const cors = require("cors");
const encoding_1 = require("../../common/encoding");
const trace_1 = require("../trace");
const debug_1 = require("../../common/debug");
const https_1 = require("../../common/providers/https");
Object.defineProperty(exports, "HttpsError", { enumerable: true, get: function () { return https_1.HttpsError; } });
const manifest_1 = require("../../runtime/manifest");
const options = require("../options");
function onRequest(optsOrHandler, handler) {
    let opts;
    if (arguments.length === 1) {
        opts = {};
        handler = optsOrHandler;
    }
    else {
        opts = optsOrHandler;
    }
    if ((0, debug_1.isDebugFeatureEnabled)("enableCors") || "cors" in opts) {
        let origin = opts.cors;
        if ((0, debug_1.isDebugFeatureEnabled)("enableCors")) {
            // Respect `cors: false` to turn off cors even if debug feature is enabled.
            origin = opts.cors === false ? false : true;
        }
        const userProvidedHandler = handler;
        handler = (req, res) => {
            return new Promise((resolve) => {
                res.on("finish", resolve);
                cors({ origin })(req, res, () => {
                    resolve(userProvidedHandler(req, res));
                });
            });
        };
    }
    handler = (0, trace_1.wrapTraceContext)(handler);
    Object.defineProperty(handler, "__trigger", {
        get: () => {
            const baseOpts = options.optionsToTriggerAnnotations(options.getGlobalOptions());
            // global options calls region a scalar and https allows it to be an array,
            // but optionsToTriggerAnnotations handles both cases.
            const specificOpts = options.optionsToTriggerAnnotations(opts);
            const trigger = {
                platform: "gcfv2",
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                },
                httpsTrigger: {
                    allowInsecure: false,
                },
            };
            (0, encoding_1.convertIfPresent)(trigger.httpsTrigger, opts, "invoker", "invoker", encoding_1.convertInvoker);
            return trigger;
        },
    });
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    // global options calls region a scalar and https allows it to be an array,
    // but optionsToTriggerAnnotations handles both cases.
    const specificOpts = options.optionsToEndpoint(opts);
    const endpoint = {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        httpsTrigger: {},
    };
    (0, encoding_1.convertIfPresent)(endpoint.httpsTrigger, opts, "invoker", "invoker", encoding_1.convertInvoker);
    handler.__endpoint = endpoint;
    return handler;
}
exports.onRequest = onRequest;
function onCall(optsOrHandler, handler) {
    var _a;
    let opts;
    if (arguments.length === 1) {
        opts = {};
        handler = optsOrHandler;
    }
    else {
        opts = optsOrHandler;
    }
    const origin = (0, debug_1.isDebugFeatureEnabled)("enableCors") ? true : "cors" in opts ? opts.cors : true;
    // onCallHandler sniffs the function length to determine which API to present.
    // fix the length to prevent api versions from being mismatched.
    const fixedLen = (req) => handler(req);
    const func = (0, https_1.onCallHandler)({
        cors: { origin, methods: "POST" },
        enforceAppCheck: (_a = opts.enforceAppCheck) !== null && _a !== void 0 ? _a : options.getGlobalOptions().enforceAppCheck,
        consumeAppCheckToken: opts.consumeAppCheckToken,
    }, fixedLen);
    Object.defineProperty(func, "__trigger", {
        get: () => {
            const baseOpts = options.optionsToTriggerAnnotations(options.getGlobalOptions());
            // global options calls region a scalar and https allows it to be an array,
            // but optionsToTriggerAnnotations handles both cases.
            const specificOpts = options.optionsToTriggerAnnotations(opts);
            return {
                platform: "gcfv2",
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                    "deployment-callable": "true",
                },
                httpsTrigger: {
                    allowInsecure: false,
                },
            };
        },
    });
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    // global options calls region a scalar and https allows it to be an array,
    // but optionsToEndpoint handles both cases.
    const specificOpts = options.optionsToEndpoint(opts);
    func.__endpoint = {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        callableTrigger: {},
    };
    func.run = handler;
    return func;
}
exports.onCall = onCall;
