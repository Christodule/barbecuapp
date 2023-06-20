"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2018 Firebase
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
exports.exampleUserRecord = exports.makeUserRecord = void 0;
const firebase_functions_1 = require("firebase-functions");
/** Create a UserRecord. */
function makeUserRecord(
/** Fields of AuthRecord that you'd like to specify. */
fields) {
    return firebase_functions_1.auth.userRecordConstructor(Object.assign({ uid: '' }, fields));
}
exports.makeUserRecord = makeUserRecord;
/** Fetch an example UserRecord already populated with data. */
function exampleUserRecord() {
    return firebase_functions_1.auth.userRecordConstructor({
        email: 'user@gmail.com',
        metadata: {
            creationTime: '2018-03-13T01:24:48Z',
            lastSignInTime: '2018-04-03T03:52:48Z',
        },
        uid: 'SQol8dFfyMapsQtRD4JgZdC5r1G2',
    });
}
exports.exampleUserRecord = exampleUserRecord;
