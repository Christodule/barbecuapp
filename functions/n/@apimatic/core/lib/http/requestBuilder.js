"use strict";
/**
 * bandwidthLib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestBuilderFactory = exports.DefaultRequestBuilder = exports.skipEncode = void 0;
var tslib_1 = require("tslib");
var json_bigint_1 = tslib_1.__importDefault(require("@apimatic/json-bigint"));
var apiHelper_1 = require("../apiHelper");
var argumentsValidationError_1 = require("../errors/argumentsValidationError");
var responseValidationError_1 = require("../errors/responseValidationError");
var schema_1 = require("../schema");
var httpHeaders_1 = require("./httpHeaders");
var httpInterceptor_1 = require("./httpInterceptor");
var pathTemplate_1 = require("./pathTemplate");
var queryString_1 = require("./queryString");
var validate_1 = require("./validate");
var retryConfiguration_1 = require("./retryConfiguration");
var convert_to_stream_1 = require("@apimatic/convert-to-stream");
var JSON = json_bigint_1.default();
function skipEncode(value) {
    return new pathTemplate_1.SkipEncode(value);
}
exports.skipEncode = skipEncode;
var DefaultRequestBuilder = /** @class */ (function () {
    function DefaultRequestBuilder(_httpClient, _baseUrlProvider, _apiErrorFactory, _authenticationProvider, _httpMethod, _xmlSerializer, _retryConfig, _path) {
        this._httpClient = _httpClient;
        this._baseUrlProvider = _baseUrlProvider;
        this._apiErrorFactory = _apiErrorFactory;
        this._authenticationProvider = _authenticationProvider;
        this._httpMethod = _httpMethod;
        this._xmlSerializer = _xmlSerializer;
        this._retryConfig = _retryConfig;
        this._path = _path;
        this._headers = {};
        this._query = [];
        this._interceptors = [];
        this._validateResponse = true;
        this._addResponseValidator();
        this._addAuthentication();
        this._addRetryInterceptor();
        this._retryOption = retryConfiguration_1.RequestRetryOption.Default;
        this.prepareArgs = validate_1.prepareArgs.bind(this);
    }
    DefaultRequestBuilder.prototype.authenticate = function (params) {
        this._authParams = params;
    };
    DefaultRequestBuilder.prototype.requestRetryOption = function (option) {
        this._retryOption = option;
    };
    DefaultRequestBuilder.prototype.deprecated = function (methodName, message) {
        apiHelper_1.deprecated(methodName, message);
    };
    DefaultRequestBuilder.prototype.appendTemplatePath = function (strings) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var pathSegment = pathTemplate_1.pathTemplate.apply(void 0, tslib_1.__spreadArray([strings], tslib_1.__read(args)));
        this.appendPath(pathSegment);
    };
    DefaultRequestBuilder.prototype.method = function (httpMethodName) {
        this._httpMethod = httpMethodName;
    };
    DefaultRequestBuilder.prototype.baseUrl = function (arg) {
        this._baseUrlArg = arg;
    };
    DefaultRequestBuilder.prototype.appendPath = function (path) {
        this._path = this._path ? mergePath(this._path, path) : path;
    };
    DefaultRequestBuilder.prototype.acceptJson = function () {
        this._accept = httpHeaders_1.JSON_CONTENT_TYPE;
    };
    DefaultRequestBuilder.prototype.accept = function (acceptHeaderValue) {
        this._accept = acceptHeaderValue;
    };
    DefaultRequestBuilder.prototype.contentType = function (contentTypeHeaderValue) {
        this._contentType = contentTypeHeaderValue;
    };
    DefaultRequestBuilder.prototype.header = function (name, value) {
        if (value === undefined) {
            return;
        }
        httpHeaders_1.setHeader(this._headers, name, value.toString());
    };
    DefaultRequestBuilder.prototype.headers = function (headersToMerge) {
        httpHeaders_1.mergeHeaders(this._headers, headersToMerge);
    };
    DefaultRequestBuilder.prototype.query = function (nameOrParameters, value) {
        var _a;
        if (nameOrParameters === null || nameOrParameters === undefined) {
            return;
        }
        var queryString = typeof nameOrParameters === 'string'
            ? queryString_1.urlEncodeObject((_a = {},
                _a[nameOrParameters] = value,
                _a))
            : queryString_1.urlEncodeObject(nameOrParameters);
        if (queryString) {
            this._query.push(queryString);
        }
    };
    DefaultRequestBuilder.prototype.text = function (body) {
        this._body = body;
        this._setContentTypeIfNotSet(httpHeaders_1.TEXT_CONTENT_TYPE);
    };
    DefaultRequestBuilder.prototype.json = function (data) {
        this._body = JSON.stringify(data);
        this._setContentTypeIfNotSet(httpHeaders_1.JSON_CONTENT_TYPE);
    };
    DefaultRequestBuilder.prototype.xml = function (argName, data, rootName, schema) {
        var _a;
        var mappingResult = schema_1.validateAndUnmapXml(data, schema);
        if (mappingResult.errors) {
            throw new argumentsValidationError_1.ArgumentsValidationError((_a = {}, _a[argName] = mappingResult.errors, _a));
        }
        this._body = this._xmlSerializer.xmlSerialize(rootName, mappingResult.result);
        this._setContentTypeIfNotSet(httpHeaders_1.XML_CONTENT_TYPE);
    };
    DefaultRequestBuilder.prototype.stream = function (file) {
        this._stream = file;
    };
    DefaultRequestBuilder.prototype.form = function (parameters) {
        this._form = queryString_1.filterFileWrapperFromKeyValuePairs(queryString_1.formDataEncodeObject(parameters));
    };
    DefaultRequestBuilder.prototype.formData = function (parameters) {
        this._formData = queryString_1.formDataEncodeObject(parameters);
    };
    DefaultRequestBuilder.prototype.toRequest = function () {
        var request = {
            method: this._httpMethod,
            url: mergePath(this._baseUrlProvider(this._baseUrlArg), this._path),
        };
        if (this._query.length > 0) {
            var queryString = this._query.join('&');
            request.url +=
                (request.url.indexOf('?') === -1 ? '?' : '&') + queryString;
        }
        request.url = apiHelper_1.sanitizeUrl(request.url);
        // defensively copy headers
        var headers = tslib_1.__assign({}, this._headers);
        if (this._accept) {
            httpHeaders_1.setHeader(headers, httpHeaders_1.ACCEPT_HEADER, this._accept);
        }
        if (this._contentType) {
            httpHeaders_1.setHeader(headers, httpHeaders_1.CONTENT_TYPE_HEADER, this._contentType);
        }
        httpHeaders_1.setHeader(headers, httpHeaders_1.CONTENT_LENGTH_HEADER);
        request.headers = headers;
        if (this._body !== undefined) {
            request.body = { type: 'text', content: this._body };
        }
        else if (this._form !== undefined) {
            request.body = { type: 'form', content: this._form };
        }
        else if (this._formData !== undefined) {
            request.body = { type: 'form-data', content: this._formData };
        }
        else if (this._stream !== undefined) {
            request.body = { type: 'stream', content: this._stream };
        }
        return request;
    };
    DefaultRequestBuilder.prototype.intercept = function (interceptor) {
        this._interceptors.push(interceptor);
    };
    DefaultRequestBuilder.prototype.interceptRequest = function (interceptor) {
        this.intercept(function (req, opt, next) { return next(interceptor(req), opt); });
    };
    DefaultRequestBuilder.prototype.interceptResponse = function (interceptor) {
        var _this = this;
        this.intercept(function (req, opt, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () { var _a; return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = interceptor;
                    return [4 /*yield*/, next(req, opt)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        }); }); });
    };
    DefaultRequestBuilder.prototype.defaultToError = function (apiErrorCtor) {
        this._apiErrorFactory = apiErrorCtor;
    };
    DefaultRequestBuilder.prototype.validateResponse = function (validate) {
        this._validateResponse = validate;
    };
    DefaultRequestBuilder.prototype.throwOn = function (statusCode, errorConstructor) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.interceptResponse(function (context) {
            var response = context.response;
            if ((typeof statusCode === 'number' &&
                response.statusCode === statusCode) ||
                (typeof statusCode !== 'number' &&
                    response.statusCode >= statusCode[0] &&
                    response.statusCode <= statusCode[1])) {
                throw new (errorConstructor.bind.apply(errorConstructor, tslib_1.__spreadArray([void 0, context], tslib_1.__read(args))))();
            }
            return context;
        });
    };
    DefaultRequestBuilder.prototype.call = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pipeline, _a, request, response;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pipeline = httpInterceptor_1.callHttpInterceptors(this._interceptors, 
                        // tslint:disable-next-line:no-shadowed-variable
                        function (request, opt) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var response;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._httpClient(request, opt)];
                                    case 1:
                                        response = _a.sent();
                                        return [2 /*return*/, { request: request, response: response }];
                                }
                            });
                        }); });
                        return [4 /*yield*/, pipeline(this.toRequest(), requestOptions)];
                    case 1:
                        _a = _b.sent(), request = _a.request, response = _a.response;
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, response), { request: request, result: undefined })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype.callAsText = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (typeof result.body !== 'string') {
                            throw new Error('Could not parse body as string.'); // TODO: Replace with SDK error
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: result.body })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype.callAsOptionalText = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (typeof result.body !== 'string') {
                            return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: undefined })];
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: result.body })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype.callAsStream = function (requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.interceptRequest(function (req) { return (tslib_1.__assign(tslib_1.__assign({}, req), { responseType: 'stream' })); });
                        return [4 /*yield*/, this.call(requestOptions)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: convert_to_stream_1.convertToStream(result.body) })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype.callAsJson = function (schema, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, parsed, mappingResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.interceptRequest(function (request) {
                            var headers = tslib_1.__assign({}, request.headers);
                            httpHeaders_1.setHeaderIfNotSet(headers, httpHeaders_1.ACCEPT_HEADER, httpHeaders_1.JSON_CONTENT_TYPE);
                            return tslib_1.__assign(tslib_1.__assign({}, request), { headers: headers });
                        });
                        return [4 /*yield*/, this.call(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.body === '') {
                            throw new Error('Could not parse body as JSON. The response body is empty.');
                        }
                        if (typeof result.body !== 'string') {
                            throw new Error('Could not parse body as JSON. The response body is not a string.');
                        }
                        try {
                            parsed = JSON.parse(result.body);
                        }
                        catch (error) {
                            throw new Error("Could not parse body as JSON.\n\n" + error.message);
                        }
                        mappingResult = schema_1.validateAndMap(parsed, schema);
                        if (mappingResult.errors) {
                            throw new responseValidationError_1.ResponseValidationError(result, mappingResult.errors);
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: mappingResult.result })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype.callAsXml = function (rootName, schema, requestOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, xmlObject, error_1, mappingResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.interceptRequest(function (request) {
                            var headers = tslib_1.__assign({}, request.headers);
                            httpHeaders_1.setHeaderIfNotSet(headers, httpHeaders_1.ACCEPT_HEADER, httpHeaders_1.XML_CONTENT_TYPE);
                            return tslib_1.__assign(tslib_1.__assign({}, request), { headers: headers });
                        });
                        return [4 /*yield*/, this.call(requestOptions)];
                    case 1:
                        result = _a.sent();
                        if (result.body === '') {
                            throw new Error('Could not parse body as XML. The response body is empty.');
                        }
                        if (typeof result.body !== 'string') {
                            throw new Error('Could not parse body as XML. The response body is not a string.');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._xmlSerializer.xmlDeserialize(rootName, result.body)];
                    case 3:
                        xmlObject = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("Could not parse body as XML.\n\n" + error_1.message);
                    case 5:
                        mappingResult = schema_1.validateAndMapXml(xmlObject, schema);
                        if (mappingResult.errors) {
                            throw new responseValidationError_1.ResponseValidationError(result, mappingResult.errors);
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, result), { result: mappingResult.result })];
                }
            });
        });
    };
    DefaultRequestBuilder.prototype._setContentTypeIfNotSet = function (contentType) {
        if (!this._contentType) {
            httpHeaders_1.setHeaderIfNotSet(this._headers, httpHeaders_1.CONTENT_TYPE_HEADER, contentType);
        }
    };
    DefaultRequestBuilder.prototype._addResponseValidator = function () {
        var _this = this;
        this.interceptResponse(function (context) {
            var response = context.response;
            if (_this._validateResponse &&
                (response.statusCode < 200 || response.statusCode >= 300)) {
                throw new _this._apiErrorFactory(context, "Response status code was not ok: " + response.statusCode + ".");
            }
            return context;
        });
    };
    DefaultRequestBuilder.prototype._addAuthentication = function () {
        var _this = this;
        this.intercept(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var handler = _this._authenticationProvider(_this._authParams);
            return handler.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args)));
        });
    };
    DefaultRequestBuilder.prototype._addRetryInterceptor = function () {
        var _this = this;
        this.intercept(function (request, options, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var context, allowedWaitTime, retryCount, waitTime, timeoutError, shouldRetry, error_2;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allowedWaitTime = this._retryConfig.maximumRetryWaitTime;
                        retryCount = 0;
                        waitTime = 0;
                        shouldRetry = retryConfiguration_1.shouldRetryRequest(this._retryConfig, this._retryOption, this._httpMethod);
                        _b.label = 1;
                    case 1:
                        timeoutError = undefined;
                        if (!(retryCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, waitTime * 1000); })];
                    case 2:
                        _b.sent();
                        allowedWaitTime -= waitTime;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, next(request, options)];
                    case 4:
                        context = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        timeoutError = error_2;
                        return [3 /*break*/, 6];
                    case 6:
                        if (shouldRetry) {
                            waitTime = retryConfiguration_1.getRetryWaitTime(this._retryConfig, allowedWaitTime, retryCount, context === null || context === void 0 ? void 0 : context.response.statusCode, (_a = context === null || context === void 0 ? void 0 : context.response) === null || _a === void 0 ? void 0 : _a.headers, timeoutError);
                            retryCount++;
                        }
                        _b.label = 7;
                    case 7:
                        if (waitTime > 0) return [3 /*break*/, 1];
                        _b.label = 8;
                    case 8:
                        if (timeoutError) {
                            throw timeoutError;
                        }
                        if (typeof (context === null || context === void 0 ? void 0 : context.response) === 'undefined') {
                            throw new Error('Response is undefined.');
                        }
                        return [2 /*return*/, { request: request, response: context.response }];
                }
            });
        }); });
    };
    return DefaultRequestBuilder;
}());
exports.DefaultRequestBuilder = DefaultRequestBuilder;
function createRequestBuilderFactory(httpClient, baseUrlProvider, apiErrorFactory, authenticationProvider, xmlSerializer, retryConfig) {
    return function (httpMethod, path) {
        return new DefaultRequestBuilder(httpClient, baseUrlProvider, apiErrorFactory, authenticationProvider, httpMethod, xmlSerializer, retryConfig, path);
    };
}
exports.createRequestBuilderFactory = createRequestBuilderFactory;
function mergePath(left, right) {
    if (!right || right === '') {
        return left;
    }
    if (left[left.length - 1] === '/' && right[0] === '/') {
        return left + right.substr(1);
    }
    else if (left[left.length - 1] === '/' || right[0] === '/') {
        return left + right;
    }
    else {
        return left + "/" + right;
    }
}