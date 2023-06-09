"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2019 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultStorage = exports.ClientInfo = exports.TestMatrix = exports.TestMatrixBuilder = exports._testMatrixWithOpts = exports.testMatrix = exports.TEST_MATRIX_COMPLETE_EVENT_TYPE = exports.SERVICE = exports.PROVIDER = void 0;
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.PROVIDER = "google.testing";
/** @internal */
exports.SERVICE = "testing.googleapis.com";
/** @internal */
exports.TEST_MATRIX_COMPLETE_EVENT_TYPE = "testMatrix.complete";
/** Handle events related to Test Lab test matrices. */
function testMatrix() {
    return _testMatrixWithOpts({});
}
exports.testMatrix = testMatrix;
/** @internal */
function _testMatrixWithOpts(opts) {
    return new TestMatrixBuilder(() => {
        if (!process.env.GCLOUD_PROJECT) {
            throw new Error("process.env.GCLOUD_PROJECT is not set.");
        }
        return "projects/" + process.env.GCLOUD_PROJECT + "/testMatrices/{matrix}";
    }, opts);
}
exports._testMatrixWithOpts = _testMatrixWithOpts;
/** Builder used to create Cloud Functions for Test Lab test matrices events. */
class TestMatrixBuilder {
    /** @internal */
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
    }
    /** Handle a TestMatrix that reached a final test state. */
    onComplete(handler) {
        const dataConstructor = (raw) => {
            return new TestMatrix(raw.data);
        };
        return (0, cloud_functions_1.makeCloudFunction)({
            provider: exports.PROVIDER,
            eventType: exports.TEST_MATRIX_COMPLETE_EVENT_TYPE,
            triggerResource: this.triggerResource,
            service: exports.SERVICE,
            dataConstructor,
            handler,
            options: this.options,
        });
    }
}
exports.TestMatrixBuilder = TestMatrixBuilder;
/** TestMatrix captures details about a test run. */
class TestMatrix {
    /** @internal */
    constructor(data) {
        this.testMatrixId = data.testMatrixId;
        this.createTime = data.timestamp;
        this.state = data.state;
        this.outcomeSummary = data.outcomeSummary;
        this.invalidMatrixDetails = data.invalidMatrixDetails;
        this.resultStorage = new ResultStorage(data.resultStorage);
        this.clientInfo = new ClientInfo(data.clientInfo);
    }
}
exports.TestMatrix = TestMatrix;
/** Information about the client which invoked the test. */
class ClientInfo {
    /** @internal */
    constructor(data) {
        this.name = (data === null || data === void 0 ? void 0 : data.name) || "";
        this.details = {};
        for (const detail of (data === null || data === void 0 ? void 0 : data.clientInfoDetails) || []) {
            this.details[detail.key] = detail.value || "";
        }
    }
}
exports.ClientInfo = ClientInfo;
/** Locations where the test results are stored. */
class ResultStorage {
    /** @internal */
    constructor(data) {
        var _a, _b, _c;
        this.gcsPath = (_a = data === null || data === void 0 ? void 0 : data.googleCloudStorage) === null || _a === void 0 ? void 0 : _a.gcsPath;
        this.toolResultsHistoryId = (_b = data === null || data === void 0 ? void 0 : data.toolResultsHistory) === null || _b === void 0 ? void 0 : _b.historyId;
        this.toolResultsExecutionId = (_c = data === null || data === void 0 ? void 0 : data.toolResultsExecution) === null || _c === void 0 ? void 0 : _c.executionId;
        this.resultsUrl = data === null || data === void 0 ? void 0 : data.resultsUrl;
    }
}
exports.ResultStorage = ResultStorage;
