"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToStream = void 0;
function convertToStream(content) {
    if (typeof content !== 'string') {
        return content;
    }
    // ref: https://stackoverflow.com/a/22085851
    var rs = new (require('stream').Readable)();
    // tslint:disable-next-line:no-empty
    rs._read = function () { };
    rs.push(content);
    rs.push(null);
    return rs;
}
exports.convertToStream = convertToStream;
