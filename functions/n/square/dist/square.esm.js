import { object, string, optional, array, lazy, boolean, number, bigint, dict } from '@apimatic/schema';
import { passThroughInterceptor, setHeader, AUTHORIZATION_HEADER, updateUserAgent, mergeHeaders, HttpClient, pathTemplate, SkipEncode, createRequestBuilderFactory, assertHeaders } from '@apimatic/core';
export { AbortError, ArgumentsValidationError, FileWrapper, ResponseValidationError, cloneFileWrapper, isFileWrapper } from '@apimatic/core';
import JSONBig from '@apimatic/json-bigint';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var registerDomainRequestSchema = /*#__PURE__*/object({
  domainName: ['domain_name', /*#__PURE__*/string()]
});

var errorSchema = /*#__PURE__*/object({
  category: ['category', /*#__PURE__*/string()],
  code: ['code', /*#__PURE__*/string()],
  detail: ['detail', /*#__PURE__*/optional( /*#__PURE__*/string())],
  field: ['field', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var registerDomainResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

/** Base class for all controllers */
var BaseApi = function BaseApi(client) {
  this.createRequest = client.getRequestBuilderFactory();
};

var ApplePayApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(ApplePayApi, _BaseApi);

  function ApplePayApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = ApplePayApi.prototype;

  /**
   * Activates a domain for use with Apple Pay on the Web and Square. A validation
   * is performed on this domain by Apple to ensure that it is properly set up as
   * an Apple Pay enabled domain.
   *
   * This endpoint provides an easy way for platform developers to bulk activate
   * Apple Pay on the Web with Square for merchants using their platform.
   *
   * To learn more about Web Apple Pay, see
   * [Add the Apple Pay on the Web Button](https://developer.squareup.com/docs/payment-form/add-digital-
   * wallets/apple-pay).
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.registerDomain =
  /*#__PURE__*/
  function () {
    var _registerDomain = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/apple-pay/domains');
              mapped = req.prepareArgs({
                body: [body, registerDomainRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(registerDomainResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function registerDomain(_x, _x2) {
      return _registerDomain.apply(this, arguments);
    }

    return registerDomain;
  }();

  return ApplePayApi;
}(BaseApi);

var bankAccountSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  accountNumberSuffix: ['account_number_suffix', /*#__PURE__*/string()],
  country: ['country', /*#__PURE__*/string()],
  currency: ['currency', /*#__PURE__*/string()],
  accountType: ['account_type', /*#__PURE__*/string()],
  holderName: ['holder_name', /*#__PURE__*/string()],
  primaryBankIdentificationNumber: ['primary_bank_identification_number', /*#__PURE__*/string()],
  secondaryBankIdentificationNumber: ['secondary_bank_identification_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  debitMandateReferenceId: ['debit_mandate_reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/string()],
  creditable: ['creditable', /*#__PURE__*/boolean()],
  debitable: ['debitable', /*#__PURE__*/boolean()],
  fingerprint: ['fingerprint', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  bankName: ['bank_name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var getBankAccountByV1IdResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  bankAccount: ['bank_account', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bankAccountSchema;
  }))]
});

var getBankAccountResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  bankAccount: ['bank_account', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bankAccountSchema;
  }))]
});

var listBankAccountsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  bankAccounts: ['bank_accounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return bankAccountSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["/v2/bank-accounts/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["/v2/bank-accounts/by-v1-id/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var BankAccountsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(BankAccountsApi, _BaseApi);

  function BankAccountsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = BankAccountsApi.prototype;

  /**
   * Returns a list of [BankAccount]($m/BankAccount) objects linked to a Square account.
   *
   * @param cursor      The pagination cursor returned by a previous call to this endpoint. Use it in the
   *                              next `ListBankAccounts` request to retrieve the next set  of results.  See the
   *                              [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination) guide
   *                              for more information.
   * @param limit       Upper limit on the number of bank accounts to return in the response.  Currently,
   *                              1000 is the largest supported limit. You can specify a limit  of up to 1000 bank
   *                              accounts. This is also the default limit.
   * @param locationId  Location ID. You can specify this optional filter  to retrieve only the linked bank
   *                              accounts belonging to a specific location.
   * @return Response from the API call
   */
  _proto.listBankAccounts =
  /*#__PURE__*/
  function () {
    var _listBankAccounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, limit, locationId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/bank-accounts');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())],
                locationId: [locationId, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              req.query('location_id', mapped.locationId);
              return _context.abrupt("return", req.callAsJson(listBankAccountsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listBankAccounts(_x, _x2, _x3, _x4) {
      return _listBankAccounts.apply(this, arguments);
    }

    return listBankAccounts;
  }()
  /**
   * Returns details of a [BankAccount]($m/BankAccount) identified by V1 bank account ID.
   *
   * @param v1BankAccountId    Connect V1 ID of the desired `BankAccount`. For more information, see
   *                                     [Retrieve a bank account by using an ID issued by V1 Bank Accounts API](https:
   *                                     //developer.squareup.com/docs/bank-accounts-api#retrieve-a-bank-account-by-
   *                                     using-an-id-issued-by-v1-bank-accounts-api).
   * @return Response from the API call
   */
  ;

  _proto.getBankAccountByV1Id =
  /*#__PURE__*/
  function () {
    var _getBankAccountByV1Id = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(v1BankAccountId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                v1BankAccountId: [v1BankAccountId, string()]
              });
              req.appendTemplatePath(_templateObject(), mapped.v1BankAccountId);
              return _context2.abrupt("return", req.callAsJson(getBankAccountByV1IdResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getBankAccountByV1Id(_x5, _x6) {
      return _getBankAccountByV1Id.apply(this, arguments);
    }

    return getBankAccountByV1Id;
  }()
  /**
   * Returns details of a [BankAccount]($m/BankAccount)
   * linked to a Square account.
   *
   * @param bankAccountId   Square-issued ID of the desired `BankAccount`.
   * @return Response from the API call
   */
  ;

  _proto.getBankAccount =
  /*#__PURE__*/
  function () {
    var _getBankAccount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(bankAccountId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                bankAccountId: [bankAccountId, string()]
              });
              req.appendTemplatePath(_templateObject2(), mapped.bankAccountId);
              return _context3.abrupt("return", req.callAsJson(getBankAccountResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getBankAccount(_x7, _x8) {
      return _getBankAccount.apply(this, arguments);
    }

    return getBankAccount;
  }();

  return BankAccountsApi;
}(BaseApi);

var cancelBookingRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  bookingVersion: ['booking_version', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var appointmentSegmentSchema = /*#__PURE__*/object({
  durationMinutes: ['duration_minutes', /*#__PURE__*/number()],
  serviceVariationId: ['service_variation_id', /*#__PURE__*/string()],
  teamMemberId: ['team_member_id', /*#__PURE__*/string()],
  serviceVariationVersion: ['service_variation_version', /*#__PURE__*/bigint()],
  intermissionMinutes: ['intermission_minutes', /*#__PURE__*/optional( /*#__PURE__*/number())],
  anyTeamMember: ['any_team_member', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  resourceIds: ['resource_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var bookingCreatorDetailsSchema = /*#__PURE__*/object({
  creatorType: ['creator_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var bookingSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startAt: ['start_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerNote: ['customer_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sellerNote: ['seller_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appointmentSegments: ['appointment_segments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return appointmentSegmentSchema;
  })))],
  transitionTimeMinutes: ['transition_time_minutes', /*#__PURE__*/optional( /*#__PURE__*/number())],
  allDay: ['all_day', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  locationType: ['location_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  creatorDetails: ['creator_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bookingCreatorDetailsSchema;
  }))],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cancelBookingResponseSchema = /*#__PURE__*/object({
  booking: ['booking', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bookingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var createBookingRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  booking: ['booking', /*#__PURE__*/lazy(function () {
    return bookingSchema;
  })]
});

var createBookingResponseSchema = /*#__PURE__*/object({
  booking: ['booking', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bookingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listBookingsResponseSchema = /*#__PURE__*/object({
  bookings: ['bookings', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return bookingSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var teamMemberBookingProfileSchema = /*#__PURE__*/object({
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  displayName: ['display_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isBookable: ['is_bookable', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  profileImageUrl: ['profile_image_url', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listTeamMemberBookingProfilesResponseSchema = /*#__PURE__*/object({
  teamMemberBookingProfiles: ['team_member_booking_profiles', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return teamMemberBookingProfileSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var retrieveBookingResponseSchema = /*#__PURE__*/object({
  booking: ['booking', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bookingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var moneySchema = /*#__PURE__*/object({
  amount: ['amount', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  currency: ['currency', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var businessAppointmentSettingsSchema = /*#__PURE__*/object({
  locationTypes: ['location_types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  alignmentTime: ['alignment_time', /*#__PURE__*/optional( /*#__PURE__*/string())],
  minBookingLeadTimeSeconds: ['min_booking_lead_time_seconds', /*#__PURE__*/optional( /*#__PURE__*/number())],
  maxBookingLeadTimeSeconds: ['max_booking_lead_time_seconds', /*#__PURE__*/optional( /*#__PURE__*/number())],
  anyTeamMemberBookingEnabled: ['any_team_member_booking_enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  multipleServiceBookingEnabled: ['multiple_service_booking_enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  maxAppointmentsPerDayLimitType: ['max_appointments_per_day_limit_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  maxAppointmentsPerDayLimit: ['max_appointments_per_day_limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cancellationWindowSeconds: ['cancellation_window_seconds', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cancellationFeeMoney: ['cancellation_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cancellationPolicy: ['cancellation_policy', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cancellationPolicyText: ['cancellation_policy_text', /*#__PURE__*/optional( /*#__PURE__*/string())],
  skipBookingFlowStaffSelection: ['skip_booking_flow_staff_selection', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var businessBookingProfileSchema = /*#__PURE__*/object({
  sellerId: ['seller_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  bookingEnabled: ['booking_enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  customerTimezoneChoice: ['customer_timezone_choice', /*#__PURE__*/optional( /*#__PURE__*/string())],
  bookingPolicy: ['booking_policy', /*#__PURE__*/optional( /*#__PURE__*/string())],
  allowUserCancel: ['allow_user_cancel', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  businessAppointmentSettings: ['business_appointment_settings', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return businessAppointmentSettingsSchema;
  }))]
});

var retrieveBusinessBookingProfileResponseSchema = /*#__PURE__*/object({
  businessBookingProfile: ['business_booking_profile', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return businessBookingProfileSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var retrieveTeamMemberBookingProfileResponseSchema = /*#__PURE__*/object({
  teamMemberBookingProfile: ['team_member_booking_profile', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberBookingProfileSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var filterValueSchema = /*#__PURE__*/object({
  all: ['all', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  any: ['any', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  none: ['none', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var segmentFilterSchema = /*#__PURE__*/object({
  serviceVariationId: ['service_variation_id', /*#__PURE__*/string()],
  teamMemberIdFilter: ['team_member_id_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return filterValueSchema;
  }))]
});

var timeRangeSchema = /*#__PURE__*/object({
  startAt: ['start_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endAt: ['end_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchAvailabilityFilterSchema = /*#__PURE__*/object({
  startAtRange: ['start_at_range', /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  })],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  segmentFilters: ['segment_filters', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return segmentFilterSchema;
  })))],
  bookingId: ['booking_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchAvailabilityQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/lazy(function () {
    return searchAvailabilityFilterSchema;
  })]
});

var searchAvailabilityRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/lazy(function () {
    return searchAvailabilityQuerySchema;
  })]
});

var availabilitySchema = /*#__PURE__*/object({
  startAt: ['start_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appointmentSegments: ['appointment_segments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return appointmentSegmentSchema;
  })))]
});

var searchAvailabilityResponseSchema = /*#__PURE__*/object({
  availabilities: ['availabilities', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return availabilitySchema;
  })))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateBookingRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  booking: ['booking', /*#__PURE__*/lazy(function () {
    return bookingSchema;
  })]
});

var updateBookingResponseSchema = /*#__PURE__*/object({
  booking: ['booking', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bookingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["/v2/bookings/", "/cancel"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["/v2/bookings/", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/bookings/", ""]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/bookings/team-member-booking-profiles/", ""]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var BookingsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(BookingsApi, _BaseApi);

  function BookingsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = BookingsApi.prototype;

  /**
   * Retrieve a collection of bookings.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
   * `APPOINTMENTS_READ` for the OAuth scope.
   *
   * @param limit          The maximum number of results per page to return in a paged response.
   * @param cursor         The pagination cursor from the preceding response to return the next page of the
   *                                 results. Do not set this when retrieving the first page of the results.
   * @param teamMemberId   The team member for whom to retrieve bookings. If this is not set, bookings of
   *                                 all members are retrieved.
   * @param locationId     The location for which to retrieve bookings. If this is not set, all locations'
   *                                 bookings are retrieved.
   * @param startAtMin     The RFC 3339 timestamp specifying the earliest of the start time. If this is not
   *                                 set, the current time is used.
   * @param startAtMax     The RFC 3339 timestamp specifying the latest of the start time. If this is not
   *                                 set, the time of 31 days after `start_at_min` is used.
   * @return Response from the API call
   */
  _proto.listBookings =
  /*#__PURE__*/
  function () {
    var _listBookings = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(limit, cursor, teamMemberId, locationId, startAtMin, startAtMax, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/bookings');
              mapped = req.prepareArgs({
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())],
                teamMemberId: [teamMemberId, optional(string())],
                locationId: [locationId, optional(string())],
                startAtMin: [startAtMin, optional(string())],
                startAtMax: [startAtMax, optional(string())]
              });
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.query('team_member_id', mapped.teamMemberId);
              req.query('location_id', mapped.locationId);
              req.query('start_at_min', mapped.startAtMin);
              req.query('start_at_max', mapped.startAtMax);
              return _context.abrupt("return", req.callAsJson(listBookingsResponseSchema, requestOptions));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listBookings(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
      return _listBookings.apply(this, arguments);
    }

    return listBookings;
  }()
  /**
   * Creates a booking.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
   * `APPOINTMENTS_WRITE` for the OAuth scope.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createBooking =
  /*#__PURE__*/
  function () {
    var _createBooking = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/bookings');
              mapped = req.prepareArgs({
                body: [body, createBookingRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createBookingResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createBooking(_x8, _x9) {
      return _createBooking.apply(this, arguments);
    }

    return createBooking;
  }()
  /**
   * Searches for availabilities for booking.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
   * `APPOINTMENTS_READ` for the OAuth scope.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                         See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchAvailability =
  /*#__PURE__*/
  function () {
    var _searchAvailability = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/bookings/availability/search');
              mapped = req.prepareArgs({
                body: [body, searchAvailabilityRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(searchAvailabilityResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function searchAvailability(_x10, _x11) {
      return _searchAvailability.apply(this, arguments);
    }

    return searchAvailability;
  }()
  /**
   * Retrieves a seller's booking profile.
   *
   * @return Response from the API call
   */
  ;

  _proto.retrieveBusinessBookingProfile =
  /*#__PURE__*/
  function () {
    var _retrieveBusinessBookingProfile = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(requestOptions) {
      var req;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET', '/v2/bookings/business-booking-profile');
              return _context4.abrupt("return", req.callAsJson(retrieveBusinessBookingProfileResponseSchema, requestOptions));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function retrieveBusinessBookingProfile(_x12) {
      return _retrieveBusinessBookingProfile.apply(this, arguments);
    }

    return retrieveBusinessBookingProfile;
  }()
  /**
   * Lists booking profiles for team members.
   *
   * @param bookableOnly  Indicates whether to include only bookable team members in the returned result
   *                                 (`true`) or not (`false`).
   * @param limit         The maximum number of results to return in a paged response.
   * @param cursor        The pagination cursor from the preceding response to return the next page of the
   *                                 results. Do not set this when retrieving the first page of the results.
   * @param locationId    Indicates whether to include only team members enabled at the given location in
   *                                 the returned result.
   * @return Response from the API call
   */
  ;

  _proto.listTeamMemberBookingProfiles =
  /*#__PURE__*/
  function () {
    var _listTeamMemberBookingProfiles = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(bookableOnly, limit, cursor, locationId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('GET', '/v2/bookings/team-member-booking-profiles');
              mapped = req.prepareArgs({
                bookableOnly: [bookableOnly, optional(boolean())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())],
                locationId: [locationId, optional(string())]
              });
              req.query('bookable_only', mapped.bookableOnly);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.query('location_id', mapped.locationId);
              return _context5.abrupt("return", req.callAsJson(listTeamMemberBookingProfilesResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function listTeamMemberBookingProfiles(_x13, _x14, _x15, _x16, _x17) {
      return _listTeamMemberBookingProfiles.apply(this, arguments);
    }

    return listTeamMemberBookingProfiles;
  }()
  /**
   * Retrieves a team member's booking profile.
   *
   * @param teamMemberId   The ID of the team member to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveTeamMemberBookingProfile =
  /*#__PURE__*/
  function () {
    var _retrieveTeamMemberBookingProfile = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(teamMemberId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, string()]
              });
              req.appendTemplatePath(_templateObject$1(), mapped.teamMemberId);
              return _context6.abrupt("return", req.callAsJson(retrieveTeamMemberBookingProfileResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function retrieveTeamMemberBookingProfile(_x18, _x19) {
      return _retrieveTeamMemberBookingProfile.apply(this, arguments);
    }

    return retrieveTeamMemberBookingProfile;
  }()
  /**
   * Retrieves a booking.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and
   * `APPOINTMENTS_READ` for the OAuth scope.
   *
   * @param bookingId  The ID of the [Booking]($m/Booking) object representing the to-be-retrieved booking.
   * @return Response from the API call
   */
  ;

  _proto.retrieveBooking =
  /*#__PURE__*/
  function () {
    var _retrieveBooking = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(bookingId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                bookingId: [bookingId, string()]
              });
              req.appendTemplatePath(_templateObject2$1(), mapped.bookingId);
              return _context7.abrupt("return", req.callAsJson(retrieveBookingResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function retrieveBooking(_x20, _x21) {
      return _retrieveBooking.apply(this, arguments);
    }

    return retrieveBooking;
  }()
  /**
   * Updates a booking.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
   * `APPOINTMENTS_WRITE` for the OAuth scope.
   *
   * @param bookingId    The ID of the [Booking]($m/Booking) object representing the to-
   *                                                    be-updated booking.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateBooking =
  /*#__PURE__*/
  function () {
    var _updateBooking = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(bookingId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                bookingId: [bookingId, string()],
                body: [body, updateBookingRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3(), mapped.bookingId);
              return _context8.abrupt("return", req.callAsJson(updateBookingResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function updateBooking(_x22, _x23, _x24) {
      return _updateBooking.apply(this, arguments);
    }

    return updateBooking;
  }()
  /**
   * Cancels an existing booking.
   *
   * To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
   * To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and
   * `APPOINTMENTS_WRITE` for the OAuth scope.
   *
   * @param bookingId    The ID of the [Booking]($m/Booking) object representing the to-
   *                                                    be-cancelled booking.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.cancelBooking =
  /*#__PURE__*/
  function () {
    var _cancelBooking = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(bookingId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                bookingId: [bookingId, string()],
                body: [body, cancelBookingRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject4(), mapped.bookingId);
              return _context9.abrupt("return", req.callAsJson(cancelBookingResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function cancelBooking(_x25, _x26, _x27) {
      return _cancelBooking.apply(this, arguments);
    }

    return cancelBooking;
  }();

  return BookingsApi;
}(BaseApi);

var addressSchema = /*#__PURE__*/object({
  addressLine1: ['address_line_1', /*#__PURE__*/optional( /*#__PURE__*/string())],
  addressLine2: ['address_line_2', /*#__PURE__*/optional( /*#__PURE__*/string())],
  addressLine3: ['address_line_3', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locality: ['locality', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sublocality: ['sublocality', /*#__PURE__*/optional( /*#__PURE__*/string())],
  administrativeDistrictLevel1: ['administrative_district_level_1', /*#__PURE__*/optional( /*#__PURE__*/string())],
  postalCode: ['postal_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  country: ['country', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cardSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cardBrand: ['card_brand', /*#__PURE__*/optional( /*#__PURE__*/string())],
  last4: ['last_4', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expMonth: ['exp_month', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  expYear: ['exp_year', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  cardholderName: ['cardholder_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  billingAddress: ['billing_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  fingerprint: ['fingerprint', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  enabled: ['enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  cardType: ['card_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prepaidType: ['prepaid_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  bin: ['bin', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var createCardRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  sourceId: ['source_id', /*#__PURE__*/string()],
  verificationToken: ['verification_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  card: ['card', /*#__PURE__*/lazy(function () {
    return cardSchema;
  })]
});

var createCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))]
});

var disableCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))]
});

var listCardsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  cards: ['cards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return cardSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))]
});

function _templateObject2$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/cards/", "/disable"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/cards/", ""]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var CardsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CardsApi, _BaseApi);

  function CardsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CardsApi.prototype;

  /**
   * Retrieves a list of cards owned by the account making the request.
   * A max of 25 cards will be returned.
   *
   * @param cursor           A pagination cursor returned by a previous call to this endpoint. Provide this
   *                                    to retrieve the next set of results for your original query.  See
   *                                    [Pagination](https://developer.squareup.com/docs/basics/api101/pagination) for
   *                                    more information.
   * @param customerId       Limit results to cards associated with the customer supplied. By default, all
   *                                    cards owned by the merchant are returned.
   * @param includeDisabled  Includes disabled cards. By default, all enabled cards owned by the merchant
   *                                    are returned.
   * @param referenceId      Limit results to cards associated with the reference_id supplied.
   * @param sortOrder        Sorts the returned list by when the card was created with the specified order.
   *                                    This field defaults to ASC.
   * @return Response from the API call
   */
  _proto.listCards =
  /*#__PURE__*/
  function () {
    var _listCards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, customerId, includeDisabled, referenceId, sortOrder, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/cards');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                customerId: [customerId, optional(string())],
                includeDisabled: [includeDisabled, optional(boolean())],
                referenceId: [referenceId, optional(string())],
                sortOrder: [sortOrder, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.query('customer_id', mapped.customerId);
              req.query('include_disabled', mapped.includeDisabled);
              req.query('reference_id', mapped.referenceId);
              req.query('sort_order', mapped.sortOrder);
              return _context.abrupt("return", req.callAsJson(listCardsResponseSchema, requestOptions));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listCards(_x, _x2, _x3, _x4, _x5, _x6) {
      return _listCards.apply(this, arguments);
    }

    return listCards;
  }()
  /**
   * Adds a card on file to an existing merchant.
   *
   * @param body         An object containing the fields to POST for the request.  See the
   *                                                 corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createCard =
  /*#__PURE__*/
  function () {
    var _createCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/cards');
              mapped = req.prepareArgs({
                body: [body, createCardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createCardResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createCard(_x7, _x8) {
      return _createCard.apply(this, arguments);
    }

    return createCard;
  }()
  /**
   * Retrieves details for a specific Card.
   *
   * @param cardId  Unique ID for the desired Card.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCard =
  /*#__PURE__*/
  function () {
    var _retrieveCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(cardId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                cardId: [cardId, string()]
              });
              req.appendTemplatePath(_templateObject$2(), mapped.cardId);
              return _context3.abrupt("return", req.callAsJson(retrieveCardResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function retrieveCard(_x9, _x10) {
      return _retrieveCard.apply(this, arguments);
    }

    return retrieveCard;
  }()
  /**
   * Disables the card, preventing any further updates or charges.
   * Disabling an already disabled card is allowed but has no effect.
   *
   * @param cardId  Unique ID for the desired Card.
   * @return Response from the API call
   */
  ;

  _proto.disableCard =
  /*#__PURE__*/
  function () {
    var _disableCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(cardId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                cardId: [cardId, string()]
              });
              req.appendTemplatePath(_templateObject2$2(), mapped.cardId);
              return _context4.abrupt("return", req.callAsJson(disableCardResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function disableCard(_x11, _x12) {
      return _disableCard.apply(this, arguments);
    }

    return disableCard;
  }();

  return CardsApi;
}(BaseApi);

var cashDrawerShiftEventSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  eventType: ['event_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  eventMoney: ['event_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listCashDrawerShiftEventsResponseSchema = /*#__PURE__*/object({
  events: ['events', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return cashDrawerShiftEventSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var cashDrawerShiftSummarySchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  openedAt: ['opened_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endedAt: ['ended_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  closedAt: ['closed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  openedCashMoney: ['opened_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  expectedCashMoney: ['expected_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  closedCashMoney: ['closed_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var listCashDrawerShiftsResponseSchema = /*#__PURE__*/object({
  items: ['items', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return cashDrawerShiftSummarySchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var cashDrawerDeviceSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cashDrawerShiftSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  openedAt: ['opened_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endedAt: ['ended_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  closedAt: ['closed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeIds: ['employee_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  openingEmployeeId: ['opening_employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endingEmployeeId: ['ending_employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  closingEmployeeId: ['closing_employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  openedCashMoney: ['opened_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cashPaymentMoney: ['cash_payment_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cashRefundsMoney: ['cash_refunds_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cashPaidInMoney: ['cash_paid_in_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cashPaidOutMoney: ['cash_paid_out_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  expectedCashMoney: ['expected_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  closedCashMoney: ['closed_cash_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  device: ['device', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cashDrawerDeviceSchema;
  }))]
});

var retrieveCashDrawerShiftResponseSchema = /*#__PURE__*/object({
  cashDrawerShift: ['cash_drawer_shift', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cashDrawerShiftSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject2$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/cash-drawers/shifts/", "/events"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/cash-drawers/shifts/", ""]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var CashDrawersApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CashDrawersApi, _BaseApi);

  function CashDrawersApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CashDrawersApi.prototype;

  /**
   * Provides the details for all of the cash drawer shifts for a location
   * in a date range.
   *
   * @param locationId  The ID of the location to query for a list of cash drawer shifts.
   * @param sortOrder   The order in which cash drawer shifts are listed in the response, based on their
   *                              opened_at field. Default value: ASC
   * @param beginTime   The inclusive start time of the query on opened_at, in ISO 8601 format.
   * @param endTime     The exclusive end date of the query on opened_at, in ISO 8601 format.
   * @param limit       Number of cash drawer shift events in a page of results (200 by default, 1000 max).
   * @param cursor      Opaque cursor for fetching the next page of results.
   * @return Response from the API call
   */
  _proto.listCashDrawerShifts =
  /*#__PURE__*/
  function () {
    var _listCashDrawerShifts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, sortOrder, beginTime, endTime, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/cash-drawers/shifts');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                sortOrder: [sortOrder, optional(string())],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_id', mapped.locationId);
              req.query('sort_order', mapped.sortOrder);
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              return _context.abrupt("return", req.callAsJson(listCashDrawerShiftsResponseSchema, requestOptions));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listCashDrawerShifts(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
      return _listCashDrawerShifts.apply(this, arguments);
    }

    return listCashDrawerShifts;
  }()
  /**
   * Provides the summary details for a single cash drawer shift. See
   * [ListCashDrawerShiftEvents]($e/CashDrawers/ListCashDrawerShiftEvents) for a list of cash drawer
   * shift events.
   *
   * @param locationId  The ID of the location to retrieve cash drawer shifts from.
   * @param shiftId     The shift ID.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCashDrawerShift =
  /*#__PURE__*/
  function () {
    var _retrieveCashDrawerShift = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(locationId, shiftId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                shiftId: [shiftId, string()]
              });
              req.query('location_id', mapped.locationId);
              req.appendTemplatePath(_templateObject$3(), mapped.shiftId);
              return _context2.abrupt("return", req.callAsJson(retrieveCashDrawerShiftResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveCashDrawerShift(_x8, _x9, _x10) {
      return _retrieveCashDrawerShift.apply(this, arguments);
    }

    return retrieveCashDrawerShift;
  }()
  /**
   * Provides a paginated list of events for a single cash drawer shift.
   *
   * @param locationId  The ID of the location to list cash drawer shifts for.
   * @param shiftId     The shift ID.
   * @param limit       Number of resources to be returned in a page of results (200 by default, 1000 max).
   * @param cursor      Opaque cursor for fetching the next page of results.
   * @return Response from the API call
   */
  ;

  _proto.listCashDrawerShiftEvents =
  /*#__PURE__*/
  function () {
    var _listCashDrawerShiftEvents = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(locationId, shiftId, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                shiftId: [shiftId, string()],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_id', mapped.locationId);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.appendTemplatePath(_templateObject2$3(), mapped.shiftId);
              return _context3.abrupt("return", req.callAsJson(listCashDrawerShiftEventsResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function listCashDrawerShiftEvents(_x11, _x12, _x13, _x14, _x15) {
      return _listCashDrawerShiftEvents.apply(this, arguments);
    }

    return listCashDrawerShiftEvents;
  }();

  return CashDrawersApi;
}(BaseApi);

var batchDeleteCatalogObjectsRequestSchema = /*#__PURE__*/object({
  objectIds: ['object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var batchDeleteCatalogObjectsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  deletedObjectIds: ['deleted_object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  deletedAt: ['deleted_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var batchRetrieveCatalogObjectsRequestSchema = /*#__PURE__*/object({
  objectIds: ['object_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  includeRelatedObjects: ['include_related_objects', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var catalogCategorySchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  imageIds: ['image_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogCustomAttributeDefinitionNumberConfigSchema = /*#__PURE__*/object({
  precision: ['precision', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var catalogCustomAttributeDefinitionSelectionConfigCustomAttributeSelectionSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/string()]
});

var catalogCustomAttributeDefinitionSelectionConfigSchema = /*#__PURE__*/object({
  maxAllowedSelections: ['max_allowed_selections', /*#__PURE__*/optional( /*#__PURE__*/number())],
  allowedSelections: ['allowed_selections', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeDefinitionSelectionConfigCustomAttributeSelectionSchema;
  })))]
});

var catalogCustomAttributeDefinitionStringConfigSchema = /*#__PURE__*/object({
  enforceUniqueness: ['enforce_uniqueness', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var sourceApplicationSchema = /*#__PURE__*/object({
  product: ['product', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applicationId: ['application_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogCustomAttributeDefinitionSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/string()],
  name: ['name', /*#__PURE__*/string()],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceApplication: ['source_application', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return sourceApplicationSchema;
  }))],
  allowedObjectTypes: ['allowed_object_types', /*#__PURE__*/array( /*#__PURE__*/string())],
  sellerVisibility: ['seller_visibility', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appVisibility: ['app_visibility', /*#__PURE__*/optional( /*#__PURE__*/string())],
  stringConfig: ['string_config', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeDefinitionStringConfigSchema;
  }))],
  numberConfig: ['number_config', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeDefinitionNumberConfigSchema;
  }))],
  selectionConfig: ['selection_config', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeDefinitionSelectionConfigSchema;
  }))],
  customAttributeUsageCount: ['custom_attribute_usage_count', /*#__PURE__*/optional( /*#__PURE__*/number())],
  key: ['key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogCustomAttributeValueSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  stringValue: ['string_value', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customAttributeDefinitionId: ['custom_attribute_definition_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  numberValue: ['number_value', /*#__PURE__*/optional( /*#__PURE__*/string())],
  booleanValue: ['boolean_value', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  selectionUidValues: ['selection_uid_values', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  key: ['key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogDiscountSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  discountType: ['discount_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  pinRequired: ['pin_required', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  labelColor: ['label_color', /*#__PURE__*/optional( /*#__PURE__*/string())],
  modifyTaxBasis: ['modify_tax_basis', /*#__PURE__*/optional( /*#__PURE__*/string())],
  maximumAmountMoney: ['maximum_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var catalogImageSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  url: ['url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  caption: ['caption', /*#__PURE__*/optional( /*#__PURE__*/string())],
  photoStudioOrderId: ['photo_studio_order_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogModifierOverrideSchema = /*#__PURE__*/object({
  modifierId: ['modifier_id', /*#__PURE__*/string()],
  onByDefault: ['on_by_default', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var catalogItemModifierListInfoSchema = /*#__PURE__*/object({
  modifierListId: ['modifier_list_id', /*#__PURE__*/string()],
  modifierOverrides: ['modifier_overrides', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogModifierOverrideSchema;
  })))],
  minSelectedModifiers: ['min_selected_modifiers', /*#__PURE__*/optional( /*#__PURE__*/number())],
  maxSelectedModifiers: ['max_selected_modifiers', /*#__PURE__*/optional( /*#__PURE__*/number())],
  enabled: ['enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var catalogItemOptionForItemSchema = /*#__PURE__*/object({
  itemOptionId: ['item_option_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogItemSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  abbreviation: ['abbreviation', /*#__PURE__*/optional( /*#__PURE__*/string())],
  labelColor: ['label_color', /*#__PURE__*/optional( /*#__PURE__*/string())],
  availableOnline: ['available_online', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  availableForPickup: ['available_for_pickup', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  availableElectronically: ['available_electronically', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  categoryId: ['category_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  modifierListInfo: ['modifier_list_info', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogItemModifierListInfoSchema;
  })))],
  variations: ['variations', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  productType: ['product_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  skipModifierScreen: ['skip_modifier_screen', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  itemOptions: ['item_options', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogItemOptionForItemSchema;
  })))],
  imageIds: ['image_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  sortName: ['sort_name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogItemOptionSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  displayName: ['display_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  showColors: ['show_colors', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  values: ['values', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))]
});

var catalogItemOptionValueSchema = /*#__PURE__*/object({
  itemOptionId: ['item_option_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  color: ['color', /*#__PURE__*/optional( /*#__PURE__*/string())],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var catalogItemOptionValueForItemVariationSchema = /*#__PURE__*/object({
  itemOptionId: ['item_option_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemOptionValueId: ['item_option_value_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogStockConversionSchema = /*#__PURE__*/object({
  stockableItemVariationId: ['stockable_item_variation_id', /*#__PURE__*/string()],
  stockableQuantity: ['stockable_quantity', /*#__PURE__*/string()],
  nonstockableQuantity: ['nonstockable_quantity', /*#__PURE__*/string()]
});

var itemVariationLocationOverridesSchema = /*#__PURE__*/object({
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  priceMoney: ['price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  pricingType: ['pricing_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  trackInventory: ['track_inventory', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  inventoryAlertType: ['inventory_alert_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inventoryAlertThreshold: ['inventory_alert_threshold', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var catalogItemVariationSchema = /*#__PURE__*/object({
  itemId: ['item_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sku: ['sku', /*#__PURE__*/optional( /*#__PURE__*/string())],
  upc: ['upc', /*#__PURE__*/optional( /*#__PURE__*/string())],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/number())],
  pricingType: ['pricing_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  priceMoney: ['price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  locationOverrides: ['location_overrides', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return itemVariationLocationOverridesSchema;
  })))],
  trackInventory: ['track_inventory', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  inventoryAlertType: ['inventory_alert_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inventoryAlertThreshold: ['inventory_alert_threshold', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  userData: ['user_data', /*#__PURE__*/optional( /*#__PURE__*/string())],
  serviceDuration: ['service_duration', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  availableForBooking: ['available_for_booking', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  itemOptionValues: ['item_option_values', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogItemOptionValueForItemVariationSchema;
  })))],
  measurementUnitId: ['measurement_unit_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  stockable: ['stockable', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  imageIds: ['image_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  teamMemberIds: ['team_member_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  stockableConversion: ['stockable_conversion', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogStockConversionSchema;
  }))]
});

var measurementUnitCustomSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/string()],
  abbreviation: ['abbreviation', /*#__PURE__*/string()]
});

var measurementUnitSchema = /*#__PURE__*/object({
  customUnit: ['custom_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return measurementUnitCustomSchema;
  }))],
  areaUnit: ['area_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lengthUnit: ['length_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  volumeUnit: ['volume_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  weightUnit: ['weight_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  genericUnit: ['generic_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timeUnit: ['time_unit', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogMeasurementUnitSchema = /*#__PURE__*/object({
  measurementUnit: ['measurement_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return measurementUnitSchema;
  }))],
  precision: ['precision', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var catalogModifierSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  priceMoney: ['price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/number())],
  modifierListId: ['modifier_list_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogModifierListSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/number())],
  selectionType: ['selection_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  modifiers: ['modifiers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  imageIds: ['image_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogPricingRuleSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timePeriodIds: ['time_period_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  discountId: ['discount_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  matchProductsId: ['match_products_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applyProductsId: ['apply_products_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  excludeProductsId: ['exclude_products_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  validFromDate: ['valid_from_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  validFromLocalTime: ['valid_from_local_time', /*#__PURE__*/optional( /*#__PURE__*/string())],
  validUntilDate: ['valid_until_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  validUntilLocalTime: ['valid_until_local_time', /*#__PURE__*/optional( /*#__PURE__*/string())],
  excludeStrategy: ['exclude_strategy', /*#__PURE__*/optional( /*#__PURE__*/string())],
  minimumOrderSubtotalMoney: ['minimum_order_subtotal_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  customerGroupIdsAny: ['customer_group_ids_any', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogProductSetSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  productIdsAny: ['product_ids_any', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  productIdsAll: ['product_ids_all', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  quantityExact: ['quantity_exact', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  quantityMin: ['quantity_min', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  quantityMax: ['quantity_max', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  allProducts: ['all_products', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var catalogQuickAmountSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/string()],
  amount: ['amount', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  score: ['score', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var catalogQuickAmountsSettingsSchema = /*#__PURE__*/object({
  option: ['option', /*#__PURE__*/string()],
  eligibleForAutoAmounts: ['eligible_for_auto_amounts', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  amounts: ['amounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogQuickAmountSchema;
  })))]
});

var subscriptionPhaseSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cadence: ['cadence', /*#__PURE__*/string()],
  periods: ['periods', /*#__PURE__*/optional( /*#__PURE__*/number())],
  recurringPriceMoney: ['recurring_price_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  ordinal: ['ordinal', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var catalogSubscriptionPlanSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/string()],
  phases: ['phases', /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionPhaseSchema;
  }))]
});

var catalogTaxSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  calculationPhase: ['calculation_phase', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inclusionType: ['inclusion_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliesToCustomAmounts: ['applies_to_custom_amounts', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  enabled: ['enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var catalogTimePeriodSchema = /*#__PURE__*/object({
  event: ['event', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogV1IdSchema = /*#__PURE__*/object({
  catalogV1Id: ['catalog_v1_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogObjectSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/string()],
  id: ['id', /*#__PURE__*/string()],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  isDeleted: ['is_deleted', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  customAttributeValues: ['custom_attribute_values', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeValueSchema;
  })))],
  catalogV1Ids: ['catalog_v1_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogV1IdSchema;
  })))],
  presentAtAllLocations: ['present_at_all_locations', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  presentAtLocationIds: ['present_at_location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  absentAtLocationIds: ['absent_at_location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  itemData: ['item_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogItemSchema;
  }))],
  categoryData: ['category_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogCategorySchema;
  }))],
  itemVariationData: ['item_variation_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogItemVariationSchema;
  }))],
  taxData: ['tax_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogTaxSchema;
  }))],
  discountData: ['discount_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogDiscountSchema;
  }))],
  modifierListData: ['modifier_list_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogModifierListSchema;
  }))],
  modifierData: ['modifier_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogModifierSchema;
  }))],
  timePeriodData: ['time_period_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogTimePeriodSchema;
  }))],
  productSetData: ['product_set_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogProductSetSchema;
  }))],
  pricingRuleData: ['pricing_rule_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogPricingRuleSchema;
  }))],
  imageData: ['image_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogImageSchema;
  }))],
  measurementUnitData: ['measurement_unit_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogMeasurementUnitSchema;
  }))],
  subscriptionPlanData: ['subscription_plan_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogSubscriptionPlanSchema;
  }))],
  itemOptionData: ['item_option_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogItemOptionSchema;
  }))],
  itemOptionValueData: ['item_option_value_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogItemOptionValueSchema;
  }))],
  customAttributeDefinitionData: ['custom_attribute_definition_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogCustomAttributeDefinitionSchema;
  }))],
  quickAmountsSettingsData: ['quick_amounts_settings_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQuickAmountsSettingsSchema;
  }))]
});

var batchRetrieveCatalogObjectsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  objects: ['objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  relatedObjects: ['related_objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))]
});

var catalogObjectBatchSchema = /*#__PURE__*/object({
  objects: ['objects', /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  }))]
});

var batchUpsertCatalogObjectsRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  batches: ['batches', /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectBatchSchema;
  }))]
});

var catalogIdMappingSchema = /*#__PURE__*/object({
  clientObjectId: ['client_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  objectId: ['object_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var batchUpsertCatalogObjectsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  objects: ['objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  idMappings: ['id_mappings', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogIdMappingSchema;
  })))]
});

var catalogInfoResponseLimitsSchema = /*#__PURE__*/object({
  batchUpsertMaxObjectsPerBatch: ['batch_upsert_max_objects_per_batch', /*#__PURE__*/optional( /*#__PURE__*/number())],
  batchUpsertMaxTotalObjects: ['batch_upsert_max_total_objects', /*#__PURE__*/optional( /*#__PURE__*/number())],
  batchRetrieveMaxObjectIds: ['batch_retrieve_max_object_ids', /*#__PURE__*/optional( /*#__PURE__*/number())],
  searchMaxPageLimit: ['search_max_page_limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  batchDeleteMaxObjectIds: ['batch_delete_max_object_ids', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemTaxesMaxItemIds: ['update_item_taxes_max_item_ids', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemTaxesMaxTaxesToEnable: ['update_item_taxes_max_taxes_to_enable', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemTaxesMaxTaxesToDisable: ['update_item_taxes_max_taxes_to_disable', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemModifierListsMaxItemIds: ['update_item_modifier_lists_max_item_ids', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemModifierListsMaxModifierListsToEnable: ['update_item_modifier_lists_max_modifier_lists_to_enable', /*#__PURE__*/optional( /*#__PURE__*/number())],
  updateItemModifierListsMaxModifierListsToDisable: ['update_item_modifier_lists_max_modifier_lists_to_disable', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var standardUnitDescriptionSchema = /*#__PURE__*/object({
  unit: ['unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return measurementUnitSchema;
  }))],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  abbreviation: ['abbreviation', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var standardUnitDescriptionGroupSchema = /*#__PURE__*/object({
  standardUnitDescriptions: ['standard_unit_descriptions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return standardUnitDescriptionSchema;
  })))],
  languageCode: ['language_code', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogInfoResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  limits: ['limits', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogInfoResponseLimitsSchema;
  }))],
  standardUnitDescriptionGroup: ['standard_unit_description_group', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return standardUnitDescriptionGroupSchema;
  }))]
});

var createCatalogImageRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  objectId: ['object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  image: ['image', /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })],
  isPrimary: ['is_primary', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var createCatalogImageResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  image: ['image', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  }))]
});

var deleteCatalogObjectResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  deletedObjectIds: ['deleted_object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  deletedAt: ['deleted_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listCatalogResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  objects: ['objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))]
});

var retrieveCatalogObjectResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  object: ['object', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  }))],
  relatedObjects: ['related_objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))]
});

var rangeSchema = /*#__PURE__*/object({
  min: ['min', /*#__PURE__*/optional( /*#__PURE__*/string())],
  max: ['max', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var customAttributeFilterSchema = /*#__PURE__*/object({
  customAttributeDefinitionId: ['custom_attribute_definition_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  key: ['key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  stringFilter: ['string_filter', /*#__PURE__*/optional( /*#__PURE__*/string())],
  numberFilter: ['number_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return rangeSchema;
  }))],
  selectionUidsFilter: ['selection_uids_filter', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  boolFilter: ['bool_filter', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var searchCatalogItemsRequestSchema = /*#__PURE__*/object({
  textFilter: ['text_filter', /*#__PURE__*/optional( /*#__PURE__*/string())],
  categoryIds: ['category_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  stockLevels: ['stock_levels', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  enabledLocationIds: ['enabled_location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  sortOrder: ['sort_order', /*#__PURE__*/optional( /*#__PURE__*/string())],
  productTypes: ['product_types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  customAttributeFilters: ['custom_attribute_filters', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return customAttributeFilterSchema;
  })))]
});

var searchCatalogItemsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  items: ['items', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  matchedVariationIds: ['matched_variation_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogQueryExactSchema = /*#__PURE__*/object({
  attributeName: ['attribute_name', /*#__PURE__*/string()],
  attributeValue: ['attribute_value', /*#__PURE__*/string()]
});

var catalogQueryItemsForItemOptionsSchema = /*#__PURE__*/object({
  itemOptionIds: ['item_option_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogQueryItemsForModifierListSchema = /*#__PURE__*/object({
  modifierListIds: ['modifier_list_ids', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var catalogQueryItemsForTaxSchema = /*#__PURE__*/object({
  taxIds: ['tax_ids', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var catalogQueryItemVariationsForItemOptionValuesSchema = /*#__PURE__*/object({
  itemOptionValueIds: ['item_option_value_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var catalogQueryPrefixSchema = /*#__PURE__*/object({
  attributeName: ['attribute_name', /*#__PURE__*/string()],
  attributePrefix: ['attribute_prefix', /*#__PURE__*/string()]
});

var catalogQueryRangeSchema = /*#__PURE__*/object({
  attributeName: ['attribute_name', /*#__PURE__*/string()],
  attributeMinValue: ['attribute_min_value', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  attributeMaxValue: ['attribute_max_value', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var catalogQuerySetSchema = /*#__PURE__*/object({
  attributeName: ['attribute_name', /*#__PURE__*/string()],
  attributeValues: ['attribute_values', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var catalogQuerySortedAttributeSchema = /*#__PURE__*/object({
  attributeName: ['attribute_name', /*#__PURE__*/string()],
  initialAttributeValue: ['initial_attribute_value', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sortOrder: ['sort_order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var catalogQueryTextSchema = /*#__PURE__*/object({
  keywords: ['keywords', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var catalogQuerySchema = /*#__PURE__*/object({
  sortedAttributeQuery: ['sorted_attribute_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQuerySortedAttributeSchema;
  }))],
  exactQuery: ['exact_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryExactSchema;
  }))],
  setQuery: ['set_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQuerySetSchema;
  }))],
  prefixQuery: ['prefix_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryPrefixSchema;
  }))],
  rangeQuery: ['range_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryRangeSchema;
  }))],
  textQuery: ['text_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryTextSchema;
  }))],
  itemsForTaxQuery: ['items_for_tax_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryItemsForTaxSchema;
  }))],
  itemsForModifierListQuery: ['items_for_modifier_list_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryItemsForModifierListSchema;
  }))],
  itemsForItemOptionsQuery: ['items_for_item_options_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryItemsForItemOptionsSchema;
  }))],
  itemVariationsForItemOptionValuesQuery: ['item_variations_for_item_option_values_query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQueryItemVariationsForItemOptionValuesSchema;
  }))]
});

var searchCatalogObjectsRequestSchema = /*#__PURE__*/object({
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  objectTypes: ['object_types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  includeDeletedObjects: ['include_deleted_objects', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  includeRelatedObjects: ['include_related_objects', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  beginTime: ['begin_time', /*#__PURE__*/optional( /*#__PURE__*/string())],
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var searchCatalogObjectsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  objects: ['objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  relatedObjects: ['related_objects', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })))],
  latestTime: ['latest_time', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var updateCatalogImageRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()]
});

var updateCatalogImageResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  image: ['image', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  }))]
});

var updateItemModifierListsRequestSchema = /*#__PURE__*/object({
  itemIds: ['item_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  modifierListsToEnable: ['modifier_lists_to_enable', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  modifierListsToDisable: ['modifier_lists_to_disable', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var updateItemModifierListsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var updateItemTaxesRequestSchema = /*#__PURE__*/object({
  itemIds: ['item_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  taxesToEnable: ['taxes_to_enable', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  taxesToDisable: ['taxes_to_disable', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var updateItemTaxesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var upsertCatalogObjectRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  object: ['object', /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  })]
});

var upsertCatalogObjectResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  catalogObject: ['catalog_object', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogObjectSchema;
  }))],
  idMappings: ['id_mappings', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return catalogIdMappingSchema;
  })))]
});

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/catalog/object/", ""]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/catalog/object/", ""]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/catalog/images/", ""]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var CatalogApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CatalogApi, _BaseApi);

  function CatalogApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CatalogApi.prototype;

  /**
   * Deletes a set of [CatalogItem]($m/CatalogItem)s based on the
   * provided list of target IDs and returns a set of successfully deleted IDs in
   * the response. Deletion is a cascading event such that all children of the
   * targeted object are also deleted. For example, deleting a CatalogItem will
   * also delete all of its [CatalogItemVariation]($m/CatalogItemVariation)
   * children.
   *
   * `BatchDeleteCatalogObjects` succeeds even if only a portion of the targeted
   * IDs can be deleted. The response will only include IDs that were
   * actually deleted.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                request.  See the corresponding object definition
   *                                                                for field details.
   * @return Response from the API call
   */
  _proto.batchDeleteCatalogObjects =
  /*#__PURE__*/
  function () {
    var _batchDeleteCatalogObjects = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/batch-delete');
              mapped = req.prepareArgs({
                body: [body, batchDeleteCatalogObjectsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(batchDeleteCatalogObjectsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function batchDeleteCatalogObjects(_x, _x2) {
      return _batchDeleteCatalogObjects.apply(this, arguments);
    }

    return batchDeleteCatalogObjects;
  }()
  /**
   * Returns a set of objects based on the provided ID.
   * Each [CatalogItem]($m/CatalogItem) returned in the set includes all of its
   * child information including: all of its
   * [CatalogItemVariation]($m/CatalogItemVariation) objects, references to
   * its [CatalogModifierList]($m/CatalogModifierList) objects, and the ids of
   * any [CatalogTax]($m/CatalogTax) objects that apply to it.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                  request.  See the corresponding object definition
   *                                                                  for field details.
   * @return Response from the API call
   */
  ;

  _proto.batchRetrieveCatalogObjects =
  /*#__PURE__*/
  function () {
    var _batchRetrieveCatalogObjects = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/batch-retrieve');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveCatalogObjectsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(batchRetrieveCatalogObjectsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function batchRetrieveCatalogObjects(_x3, _x4) {
      return _batchRetrieveCatalogObjects.apply(this, arguments);
    }

    return batchRetrieveCatalogObjects;
  }()
  /**
   * Creates or updates up to 10,000 target objects based on the provided
   * list of objects. The target objects are grouped into batches and each batch is
   * inserted/updated in an all-or-nothing manner. If an object within a batch is
   * malformed in some way, or violates a database constraint, the entire batch
   * containing that item will be disregarded. However, other batches in the same
   * request may still succeed. Each batch may contain up to 1,000 objects, and
   * batches will be processed in order as long as the total object count for the
   * request (items, variations, modifier lists, discounts, and taxes) is no more
   * than 10,000.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                request.  See the corresponding object definition
   *                                                                for field details.
   * @return Response from the API call
   */
  ;

  _proto.batchUpsertCatalogObjects =
  /*#__PURE__*/
  function () {
    var _batchUpsertCatalogObjects = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/batch-upsert');
              mapped = req.prepareArgs({
                body: [body, batchUpsertCatalogObjectsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(batchUpsertCatalogObjectsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function batchUpsertCatalogObjects(_x5, _x6) {
      return _batchUpsertCatalogObjects.apply(this, arguments);
    }

    return batchUpsertCatalogObjects;
  }()
  /**
   * Uploads an image file to be represented by a [CatalogImage]($m/CatalogImage) object that can be
   * linked to an existing
   * [CatalogObject]($m/CatalogObject) instance. The resulting `CatalogImage` is unattached to any
   * `CatalogObject` if the `object_id`
   * is not specified.
   *
   * This `CreateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an
   * image file part in
   * JPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.
   *
   * @param request
   * @param imageFile
   * @return Response from the API call
   */
  ;

  _proto.createCatalogImage =
  /*#__PURE__*/
  function () {
    var _createCatalogImage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(request, imageFile, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/images');
              mapped = req.prepareArgs({
                request: [request, optional(createCatalogImageRequestSchema)]
              });
              req.formData({
                request: JSON.stringify(mapped.request),
                image_file: imageFile
              });
              return _context4.abrupt("return", req.callAsJson(createCatalogImageResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function createCatalogImage(_x7, _x8, _x9) {
      return _createCatalogImage.apply(this, arguments);
    }

    return createCatalogImage;
  }()
  /**
   * Uploads a new image file to replace the existing one in the specified
   * [CatalogImage]($m/CatalogImage) object.
   *
   * This `UpdateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an
   * image file part in
   * JPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.
   *
   * @param imageId    The ID of the `CatalogImage` object to update the
   *                                                       encapsulated image file.
   * @param request
   * @param imageFile
   * @return Response from the API call
   */
  ;

  _proto.updateCatalogImage =
  /*#__PURE__*/
  function () {
    var _updateCatalogImage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(imageId, request, imageFile, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                imageId: [imageId, string()],
                request: [request, optional(updateCatalogImageRequestSchema)]
              });
              req.formData({
                request: JSON.stringify(mapped.request),
                image_file: imageFile
              });
              req.appendTemplatePath(_templateObject$4(), mapped.imageId);
              return _context5.abrupt("return", req.callAsJson(updateCatalogImageResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updateCatalogImage(_x10, _x11, _x12, _x13) {
      return _updateCatalogImage.apply(this, arguments);
    }

    return updateCatalogImage;
  }()
  /**
   * Retrieves information about the Square Catalog API, such as batch size
   * limits that can be used by the `BatchUpsertCatalogObjects` endpoint.
   *
   * @return Response from the API call
   */
  ;

  _proto.catalogInfo =
  /*#__PURE__*/
  function () {
    var _catalogInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(requestOptions) {
      var req;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET', '/v2/catalog/info');
              return _context6.abrupt("return", req.callAsJson(catalogInfoResponseSchema, requestOptions));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function catalogInfo(_x14) {
      return _catalogInfo.apply(this, arguments);
    }

    return catalogInfo;
  }()
  /**
   * Returns a list of all [CatalogObject]($m/CatalogObject)s of the specified types in the catalog.
   *
   * The `types` parameter is specified as a comma-separated list of the
   * [CatalogObjectType]($m/CatalogObjectType) values,
   * for example, "`ITEM`, `ITEM_VARIATION`, `MODIFIER`, `MODIFIER_LIST`, `CATEGORY`, `DISCOUNT`, `TAX`,
   * `IMAGE`".
   *
   * __Important:__ ListCatalog does not return deleted catalog items. To retrieve
   * deleted catalog items, use [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects)
   * and set the `include_deleted_objects` attribute value to `true`.
   *
   * @param cursor          The pagination cursor returned in the previous response. Leave unset for an
   *                                  initial request. The page size is currently set to be 100. See [Pagination](https:
   *                                  //developer.squareup.com/docs/basics/api101/pagination) for more information.
   * @param types           An optional case-insensitive, comma-separated list of object types to retrieve.
   *                                  The valid values are defined in the [CatalogObjectType]($m/CatalogObjectType)
   *                                  enum, for example, `ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`,
   *                                  `MODIFIER`, `MODIFIER_LIST`, `IMAGE`, etc.  If this is unspecified, the operation
   *                                  returns objects of all the top level types at the version of the Square API used
   *                                  to make the request. Object types that are nested onto other object types are not
   *                                  included in the defaults.  At the current API version the default object types
   *                                  are: ITEM, CATEGORY, TAX, DISCOUNT, MODIFIER_LIST, DINING_OPTION, TAX_EXEMPTION,
   *                                  SERVICE_CHARGE, PRICING_RULE, PRODUCT_SET, TIME_PERIOD, MEASUREMENT_UNIT,
   *                                  SUBSCRIPTION_PLAN, ITEM_OPTION, CUSTOM_ATTRIBUTE_DEFINITION,
   *                                  QUICK_AMOUNT_SETTINGS.
   * @param catalogVersion  The specific version of the catalog objects to be included in the response.
   *                                  This allows you to retrieve historical versions of objects. The specified version
   *                                  value is matched against the [CatalogObject]($m/CatalogObject)s' `version`
   *                                  attribute.  If not included, results will be from the current version of the
   *                                  catalog.
   * @return Response from the API call
   */
  ;

  _proto.listCatalog =
  /*#__PURE__*/
  function () {
    var _listCatalog = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(cursor, types, catalogVersion, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET', '/v2/catalog/list');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                types: [types, optional(string())],
                catalogVersion: [catalogVersion, optional(bigint())]
              });
              req.query('cursor', mapped.cursor);
              req.query('types', mapped.types);
              req.query('catalog_version', mapped.catalogVersion);
              return _context7.abrupt("return", req.callAsJson(listCatalogResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function listCatalog(_x15, _x16, _x17, _x18) {
      return _listCatalog.apply(this, arguments);
    }

    return listCatalog;
  }()
  /**
   * Creates or updates the target [CatalogObject]($m/CatalogObject).
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.upsertCatalogObject =
  /*#__PURE__*/
  function () {
    var _upsertCatalogObject = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/object');
              mapped = req.prepareArgs({
                body: [body, upsertCatalogObjectRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context8.abrupt("return", req.callAsJson(upsertCatalogObjectResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function upsertCatalogObject(_x19, _x20) {
      return _upsertCatalogObject.apply(this, arguments);
    }

    return upsertCatalogObject;
  }()
  /**
   * Deletes a single [CatalogObject]($m/CatalogObject) based on the
   * provided ID and returns the set of successfully deleted IDs in the response.
   * Deletion is a cascading event such that all children of the targeted object
   * are also deleted. For example, deleting a [CatalogItem]($m/CatalogItem)
   * will also delete all of its
   * [CatalogItemVariation]($m/CatalogItemVariation) children.
   *
   * @param objectId  The ID of the catalog object to be deleted. When an object is deleted, other objects
   *                            in the graph that depend on that object will be deleted as well (for example, deleting
   *                            a catalog item will delete its catalog item variations).
   * @return Response from the API call
   */
  ;

  _proto.deleteCatalogObject =
  /*#__PURE__*/
  function () {
    var _deleteCatalogObject = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(objectId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                objectId: [objectId, string()]
              });
              req.appendTemplatePath(_templateObject2$4(), mapped.objectId);
              return _context9.abrupt("return", req.callAsJson(deleteCatalogObjectResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteCatalogObject(_x21, _x22) {
      return _deleteCatalogObject.apply(this, arguments);
    }

    return deleteCatalogObject;
  }()
  /**
   * Returns a single [CatalogItem]($m/CatalogItem) as a
   * [CatalogObject]($m/CatalogObject) based on the provided ID. The returned
   * object includes all of the relevant [CatalogItem]($m/CatalogItem)
   * information including: [CatalogItemVariation]($m/CatalogItemVariation)
   * children, references to its
   * [CatalogModifierList]($m/CatalogModifierList) objects, and the ids of
   * any [CatalogTax]($m/CatalogTax) objects that apply to it.
   *
   * @param objectId                The object ID of any type of catalog objects to be retrieved.
   * @param includeRelatedObjects   If `true`, the response will include additional objects that are
   *                                           related to the requested objects. Related objects are defined as any
   *                                           objects referenced by ID by the results in the `objects` field of the
   *                                           response. These objects are put in the `related_objects` field. Setting
   *                                           this to `true` is helpful when the objects are needed for immediate
   *                                           display to a user. This process only goes one level deep. Objects
   *                                           referenced by the related objects will not be included. For example,  if
   *                                           the `objects` field of the response contains a CatalogItem, its
   *                                           associated CatalogCategory objects, CatalogTax objects, CatalogImage
   *                                           objects and CatalogModifierLists will be returned in the
   *                                           `related_objects` field of the response. If the `objects` field of the
   *                                           response contains a CatalogItemVariation, its parent CatalogItem will be
   *                                           returned in the `related_objects` field of the response.  Default value:
   *                                           `false`
   * @param catalogVersion          Requests objects as of a specific version of the catalog. This allows
   *                                           you to retrieve historical versions of objects. The value to retrieve a
   *                                           specific version of an object can be found in the version field of
   *                                           [CatalogObject]($m/CatalogObject)s. If not included, results will be
   *                                           from the current version of the catalog.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCatalogObject =
  /*#__PURE__*/
  function () {
    var _retrieveCatalogObject = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(objectId, includeRelatedObjects, catalogVersion, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                objectId: [objectId, string()],
                includeRelatedObjects: [includeRelatedObjects, optional(boolean())],
                catalogVersion: [catalogVersion, optional(bigint())]
              });
              req.query('include_related_objects', mapped.includeRelatedObjects);
              req.query('catalog_version', mapped.catalogVersion);
              req.appendTemplatePath(_templateObject3$1(), mapped.objectId);
              return _context10.abrupt("return", req.callAsJson(retrieveCatalogObjectResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function retrieveCatalogObject(_x23, _x24, _x25, _x26) {
      return _retrieveCatalogObject.apply(this, arguments);
    }

    return retrieveCatalogObject;
  }()
  /**
   * Searches for [CatalogObject]($m/CatalogObject) of any type by matching supported search attribute
   * values,
   * excluding custom attribute values on items or item variations, against one or more of the specified
   * query filters.
   *
   * This (`SearchCatalogObjects`) endpoint differs from the
   * [SearchCatalogItems]($e/Catalog/SearchCatalogItems)
   * endpoint in the following aspects:
   *
   * - `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects`
   * can search for any type of catalog objects.
   * - `SearchCatalogItems` supports the custom attribute query filters to return items or item
   * variations that contain custom attribute values, where `SearchCatalogObjects` does not.
   * - `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted
   * items or item variations, whereas `SearchCatalogObjects` does.
   * - The both endpoints have different call conventions, including the query filter formats.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.searchCatalogObjects =
  /*#__PURE__*/
  function () {
    var _searchCatalogObjects = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/search');
              mapped = req.prepareArgs({
                body: [body, searchCatalogObjectsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context11.abrupt("return", req.callAsJson(searchCatalogObjectsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function searchCatalogObjects(_x27, _x28) {
      return _searchCatalogObjects.apply(this, arguments);
    }

    return searchCatalogObjects;
  }()
  /**
   * Searches for catalog items or item variations by matching supported search attribute values,
   * including
   * custom attribute values, against one or more of the specified query filters.
   *
   * This (`SearchCatalogItems`) endpoint differs from the
   * [SearchCatalogObjects]($e/Catalog/SearchCatalogObjects)
   * endpoint in the following aspects:
   *
   * - `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects`
   * can search for any type of catalog objects.
   * - `SearchCatalogItems` supports the custom attribute query filters to return items or item
   * variations that contain custom attribute values, where `SearchCatalogObjects` does not.
   * - `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted
   * items or item variations, whereas `SearchCatalogObjects` does.
   * - The both endpoints use different call conventions, including the query filter formats.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                         See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchCatalogItems =
  /*#__PURE__*/
  function () {
    var _searchCatalogItems = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/search-catalog-items');
              mapped = req.prepareArgs({
                body: [body, searchCatalogItemsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context12.abrupt("return", req.callAsJson(searchCatalogItemsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function searchCatalogItems(_x29, _x30) {
      return _searchCatalogItems.apply(this, arguments);
    }

    return searchCatalogItems;
  }()
  /**
   * Updates the [CatalogModifierList]($m/CatalogModifierList) objects
   * that apply to the targeted [CatalogItem]($m/CatalogItem) without having
   * to perform an upsert on the entire item.
   *
   * @param body         An object containing the fields to POST for the
   *                                                              request.  See the corresponding object definition for
   *                                                              field details.
   * @return Response from the API call
   */
  ;

  _proto.updateItemModifierLists =
  /*#__PURE__*/
  function () {
    var _updateItemModifierLists = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/update-item-modifier-lists');
              mapped = req.prepareArgs({
                body: [body, updateItemModifierListsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context13.abrupt("return", req.callAsJson(updateItemModifierListsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function updateItemModifierLists(_x31, _x32) {
      return _updateItemModifierLists.apply(this, arguments);
    }

    return updateItemModifierLists;
  }()
  /**
   * Updates the [CatalogTax]($m/CatalogTax) objects that apply to the
   * targeted [CatalogItem]($m/CatalogItem) without having to perform an
   * upsert on the entire item.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                      See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateItemTaxes =
  /*#__PURE__*/
  function () {
    var _updateItemTaxes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              req = this.createRequest('POST', '/v2/catalog/update-item-taxes');
              mapped = req.prepareArgs({
                body: [body, updateItemTaxesRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context14.abrupt("return", req.callAsJson(updateItemTaxesResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function updateItemTaxes(_x33, _x34) {
      return _updateItemTaxes.apply(this, arguments);
    }

    return updateItemTaxes;
  }();

  return CatalogApi;
}(BaseApi);

var chargeRequestAdditionalRecipientSchema = /*#__PURE__*/object({
  locationId: ['location_id', /*#__PURE__*/string()],
  description: ['description', /*#__PURE__*/string()],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })]
});

var orderFulfillmentFulfillmentEntrySchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lineItemUid: ['line_item_uid', /*#__PURE__*/string()],
  quantity: ['quantity', /*#__PURE__*/string()],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))]
});

var orderFulfillmentPickupDetailsCurbsidePickupDetailsSchema = /*#__PURE__*/object({
  curbsideDetails: ['curbside_details', /*#__PURE__*/optional( /*#__PURE__*/string())],
  buyerArrivedAt: ['buyer_arrived_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderFulfillmentRecipientSchema = /*#__PURE__*/object({
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  displayName: ['display_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))]
});

var orderFulfillmentPickupDetailsSchema = /*#__PURE__*/object({
  recipient: ['recipient', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderFulfillmentRecipientSchema;
  }))],
  expiresAt: ['expires_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  autoCompleteDuration: ['auto_complete_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  scheduleType: ['schedule_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pickupAt: ['pickup_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pickupWindowDuration: ['pickup_window_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prepTimeDuration: ['prep_time_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  placedAt: ['placed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  acceptedAt: ['accepted_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  rejectedAt: ['rejected_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  readyAt: ['ready_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expiredAt: ['expired_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pickedUpAt: ['picked_up_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledAt: ['canceled_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cancelReason: ['cancel_reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isCurbsidePickup: ['is_curbside_pickup', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  curbsidePickupDetails: ['curbside_pickup_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderFulfillmentPickupDetailsCurbsidePickupDetailsSchema;
  }))]
});

var orderFulfillmentShipmentDetailsSchema = /*#__PURE__*/object({
  recipient: ['recipient', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderFulfillmentRecipientSchema;
  }))],
  carrier: ['carrier', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shippingNote: ['shipping_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shippingType: ['shipping_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  trackingNumber: ['tracking_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  trackingUrl: ['tracking_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  placedAt: ['placed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inProgressAt: ['in_progress_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  packagedAt: ['packaged_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expectedShippedAt: ['expected_shipped_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shippedAt: ['shipped_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledAt: ['canceled_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cancelReason: ['cancel_reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  failedAt: ['failed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  failureReason: ['failure_reason', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderFulfillmentSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lineItemApplication: ['line_item_application', /*#__PURE__*/optional( /*#__PURE__*/string())],
  entries: ['entries', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderFulfillmentFulfillmentEntrySchema;
  })))],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  pickupDetails: ['pickup_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderFulfillmentPickupDetailsSchema;
  }))],
  shipmentDetails: ['shipment_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderFulfillmentShipmentDetailsSchema;
  }))]
});

var orderLineItemAppliedDiscountSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  discountUid: ['discount_uid', /*#__PURE__*/string()],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderLineItemAppliedTaxSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxUid: ['tax_uid', /*#__PURE__*/string()],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderLineItemModifierSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  basePriceMoney: ['base_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalPriceMoney: ['total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))]
});

var orderLineItemPricingBlocklistsBlockedDiscountSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  discountUid: ['discount_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  discountCatalogObjectId: ['discount_catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderLineItemPricingBlocklistsBlockedTaxSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxUid: ['tax_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxCatalogObjectId: ['tax_catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderLineItemPricingBlocklistsSchema = /*#__PURE__*/object({
  blockedDiscounts: ['blocked_discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemPricingBlocklistsBlockedDiscountSchema;
  })))],
  blockedTaxes: ['blocked_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemPricingBlocklistsBlockedTaxSchema;
  })))]
});

var orderQuantityUnitSchema = /*#__PURE__*/object({
  measurementUnit: ['measurement_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return measurementUnitSchema;
  }))],
  precision: ['precision', /*#__PURE__*/optional( /*#__PURE__*/number())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var orderLineItemSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/string()],
  quantityUnit: ['quantity_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderQuantityUnitSchema;
  }))],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  variationName: ['variation_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemType: ['item_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  modifiers: ['modifiers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemModifierSchema;
  })))],
  appliedTaxes: ['applied_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedTaxSchema;
  })))],
  appliedDiscounts: ['applied_discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedDiscountSchema;
  })))],
  basePriceMoney: ['base_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  variationTotalPriceMoney: ['variation_total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  grossSalesMoney: ['gross_sales_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalDiscountMoney: ['total_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  pricingBlocklists: ['pricing_blocklists', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderLineItemPricingBlocklistsSchema;
  }))]
});

var orderLineItemDiscountSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  scope: ['scope', /*#__PURE__*/optional( /*#__PURE__*/string())],
  rewardIds: ['reward_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  pricingRuleId: ['pricing_rule_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderLineItemTaxSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  scope: ['scope', /*#__PURE__*/optional( /*#__PURE__*/string())],
  autoApplied: ['auto_applied', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var orderMoneyAmountsSchema = /*#__PURE__*/object({
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  taxMoney: ['tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  discountMoney: ['discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  tipMoney: ['tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  serviceChargeMoney: ['service_charge_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderPricingOptionsSchema = /*#__PURE__*/object({
  autoApplyDiscounts: ['auto_apply_discounts', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  autoApplyTaxes: ['auto_apply_taxes', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var orderReturnDiscountSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceDiscountUid: ['source_discount_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  scope: ['scope', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderReturnLineItemModifierSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceModifierUid: ['source_modifier_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  basePriceMoney: ['base_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalPriceMoney: ['total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderReturnLineItemSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceLineItemUid: ['source_line_item_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/string()],
  quantityUnit: ['quantity_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderQuantityUnitSchema;
  }))],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  variationName: ['variation_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemType: ['item_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  returnModifiers: ['return_modifiers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnLineItemModifierSchema;
  })))],
  appliedTaxes: ['applied_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedTaxSchema;
  })))],
  appliedDiscounts: ['applied_discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedDiscountSchema;
  })))],
  basePriceMoney: ['base_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  variationTotalPriceMoney: ['variation_total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  grossReturnMoney: ['gross_return_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalDiscountMoney: ['total_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderReturnServiceChargeSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceServiceChargeUid: ['source_service_charge_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  calculationPhase: ['calculation_phase', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxable: ['taxable', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  appliedTaxes: ['applied_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedTaxSchema;
  })))]
});

var orderReturnTaxSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceTaxUid: ['source_tax_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  scope: ['scope', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderRoundingAdjustmentSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var orderReturnSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceOrderId: ['source_order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  returnLineItems: ['return_line_items', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnLineItemSchema;
  })))],
  returnServiceCharges: ['return_service_charges', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnServiceChargeSchema;
  })))],
  returnTaxes: ['return_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnTaxSchema;
  })))],
  returnDiscounts: ['return_discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnDiscountSchema;
  })))],
  roundingAdjustment: ['rounding_adjustment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderRoundingAdjustmentSchema;
  }))],
  returnAmounts: ['return_amounts', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderMoneyAmountsSchema;
  }))]
});

var orderRewardSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  rewardTierId: ['reward_tier_id', /*#__PURE__*/string()]
});

var orderServiceChargeSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  percentage: ['percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  calculationPhase: ['calculation_phase', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxable: ['taxable', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  appliedTaxes: ['applied_taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemAppliedTaxSchema;
  })))],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderSourceSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var additionalRecipientSchema = /*#__PURE__*/object({
  locationId: ['location_id', /*#__PURE__*/string()],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  receivableId: ['receivable_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var refundSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/string()],
  transactionId: ['transaction_id', /*#__PURE__*/string()],
  tenderId: ['tender_id', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reason: ['reason', /*#__PURE__*/string()],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  status: ['status', /*#__PURE__*/string()],
  processingFeeMoney: ['processing_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  additionalRecipients: ['additional_recipients', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return additionalRecipientSchema;
  })))]
});

var tenderCardDetailsSchema = /*#__PURE__*/object({
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))],
  entryMethod: ['entry_method', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var tenderCashDetailsSchema = /*#__PURE__*/object({
  buyerTenderedMoney: ['buyer_tendered_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  changeBackMoney: ['change_back_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var tenderSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  transactionId: ['transaction_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  tipMoney: ['tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  processingFeeMoney: ['processing_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/string()],
  cardDetails: ['card_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return tenderCardDetailsSchema;
  }))],
  cashDetails: ['cash_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return tenderCashDetailsSchema;
  }))],
  additionalRecipients: ['additional_recipients', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return additionalRecipientSchema;
  })))],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var orderSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/string()],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSourceSchema;
  }))],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lineItems: ['line_items', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemSchema;
  })))],
  taxes: ['taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemTaxSchema;
  })))],
  discounts: ['discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderLineItemDiscountSchema;
  })))],
  serviceCharges: ['service_charges', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderServiceChargeSchema;
  })))],
  fulfillments: ['fulfillments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderFulfillmentSchema;
  })))],
  returns: ['returns', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderReturnSchema;
  })))],
  returnAmounts: ['return_amounts', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderMoneyAmountsSchema;
  }))],
  netAmounts: ['net_amounts', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderMoneyAmountsSchema;
  }))],
  roundingAdjustment: ['rounding_adjustment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderRoundingAdjustmentSchema;
  }))],
  tenders: ['tenders', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return tenderSchema;
  })))],
  refunds: ['refunds', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return refundSchema;
  })))],
  metadata: ['metadata', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/string()))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  closedAt: ['closed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalDiscountMoney: ['total_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalTipMoney: ['total_tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalServiceChargeMoney: ['total_service_charge_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  ticketName: ['ticket_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pricingOptions: ['pricing_options', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderPricingOptionsSchema;
  }))],
  rewards: ['rewards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderRewardSchema;
  })))]
});

var createOrderRequestSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createCheckoutRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  order: ['order', /*#__PURE__*/lazy(function () {
    return createOrderRequestSchema;
  })],
  askForShippingAddress: ['ask_for_shipping_address', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  merchantSupportEmail: ['merchant_support_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prePopulateBuyerEmail: ['pre_populate_buyer_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prePopulateShippingAddress: ['pre_populate_shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  redirectUrl: ['redirect_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  additionalRecipients: ['additional_recipients', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return chargeRequestAdditionalRecipientSchema;
  })))],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var checkoutSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  checkoutPageUrl: ['checkout_page_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  askForShippingAddress: ['ask_for_shipping_address', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  merchantSupportEmail: ['merchant_support_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prePopulateBuyerEmail: ['pre_populate_buyer_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  prePopulateShippingAddress: ['pre_populate_shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  redirectUrl: ['redirect_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  additionalRecipients: ['additional_recipients', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return additionalRecipientSchema;
  })))]
});

var createCheckoutResponseSchema = /*#__PURE__*/object({
  checkout: ['checkout', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return checkoutSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", "/checkouts"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var CheckoutApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CheckoutApi, _BaseApi);

  function CheckoutApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CheckoutApi.prototype;

  /**
   * Links a `checkoutId` to a `checkout_page_url` that customers are
   * directed to in order to provide their payment information using a
   * payment processing workflow hosted on connect.squareup.com.
   *
   * @param locationId   The ID of the business location to associate the checkout
   *                                                     with.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.createCheckout =
  /*#__PURE__*/
  function () {
    var _createCheckout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                body: [body, createCheckoutRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject$5(), mapped.locationId);
              return _context.abrupt("return", req.callAsJson(createCheckoutResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createCheckout(_x, _x2, _x3) {
      return _createCheckout.apply(this, arguments);
    }

    return createCheckout;
  }();

  return CheckoutApi;
}(BaseApi);

var customerGroupSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createCustomerGroupRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  group: ['group', /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  })]
});

var createCustomerGroupResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  group: ['group', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  }))]
});

var deleteCustomerGroupResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listCustomerGroupsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  groups: ['groups', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveCustomerGroupResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  group: ['group', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  }))]
});

var updateCustomerGroupRequestSchema = /*#__PURE__*/object({
  group: ['group', /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  })]
});

var updateCustomerGroupResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  group: ['group', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerGroupSchema;
  }))]
});

function _templateObject3$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/groups/", ""]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/groups/", ""]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/groups/", ""]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var CustomerGroupsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CustomerGroupsApi, _BaseApi);

  function CustomerGroupsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CustomerGroupsApi.prototype;

  /**
   * Retrieves the list of customer groups of a business.
   *
   * @param cursor A pagination cursor returned by a previous call to this endpoint. Provide this cursor to
   *                         retrieve the next set of results for your original query.  For more information, see
   *                         [Pagination](https://developer.squareup.com/docs/build-basics/common-api-
   *                         patterns/pagination).
   * @param limit  The maximum number of results to return in a single page. This limit is advisory. The
   *                         response might contain more or fewer results. If the limit is less than 1 or greater than
   *                         50, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The default value
   *                         is 50.  For more information, see [Pagination](https://developer.squareup.com/docs/build-
   *                         basics/common-api-patterns/pagination).
   * @return Response from the API call
   */
  _proto.listCustomerGroups =
  /*#__PURE__*/
  function () {
    var _listCustomerGroups = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/customers/groups');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              return _context.abrupt("return", req.callAsJson(listCustomerGroupsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listCustomerGroups(_x, _x2, _x3) {
      return _listCustomerGroups.apply(this, arguments);
    }

    return listCustomerGroups;
  }()
  /**
   * Creates a new customer group for a business.
   *
   * The request must include the `name` value of the group.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.createCustomerGroup =
  /*#__PURE__*/
  function () {
    var _createCustomerGroup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/customers/groups');
              mapped = req.prepareArgs({
                body: [body, createCustomerGroupRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createCustomerGroupResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createCustomerGroup(_x4, _x5) {
      return _createCustomerGroup.apply(this, arguments);
    }

    return createCustomerGroup;
  }()
  /**
   * Deletes a customer group as identified by the `group_id` value.
   *
   * @param groupId  The ID of the customer group to delete.
   * @return Response from the API call
   */
  ;

  _proto.deleteCustomerGroup =
  /*#__PURE__*/
  function () {
    var _deleteCustomerGroup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(groupId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                groupId: [groupId, string()]
              });
              req.appendTemplatePath(_templateObject$6(), mapped.groupId);
              return _context3.abrupt("return", req.callAsJson(deleteCustomerGroupResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteCustomerGroup(_x6, _x7) {
      return _deleteCustomerGroup.apply(this, arguments);
    }

    return deleteCustomerGroup;
  }()
  /**
   * Retrieves a specific customer group as identified by the `group_id` value.
   *
   * @param groupId  The ID of the customer group to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCustomerGroup =
  /*#__PURE__*/
  function () {
    var _retrieveCustomerGroup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(groupId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                groupId: [groupId, string()]
              });
              req.appendTemplatePath(_templateObject2$5(), mapped.groupId);
              return _context4.abrupt("return", req.callAsJson(retrieveCustomerGroupResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function retrieveCustomerGroup(_x8, _x9) {
      return _retrieveCustomerGroup.apply(this, arguments);
    }

    return retrieveCustomerGroup;
  }()
  /**
   * Updates a customer group as identified by the `group_id` value.
   *
   * @param groupId      The ID of the customer group to update.
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.updateCustomerGroup =
  /*#__PURE__*/
  function () {
    var _updateCustomerGroup = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(groupId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                groupId: [groupId, string()],
                body: [body, updateCustomerGroupRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$2(), mapped.groupId);
              return _context5.abrupt("return", req.callAsJson(updateCustomerGroupResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updateCustomerGroup(_x10, _x11, _x12) {
      return _updateCustomerGroup.apply(this, arguments);
    }

    return updateCustomerGroup;
  }();

  return CustomerGroupsApi;
}(BaseApi);

var addGroupToCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var createCustomerCardRequestSchema = /*#__PURE__*/object({
  cardNonce: ['card_nonce', /*#__PURE__*/string()],
  billingAddress: ['billing_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  cardholderName: ['cardholder_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  verificationToken: ['verification_token', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createCustomerCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))]
});

var customerTaxIdsSchema = /*#__PURE__*/object({
  euVat: ['eu_vat', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createCustomerRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  givenName: ['given_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  familyName: ['family_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  companyName: ['company_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  nickname: ['nickname', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  birthday: ['birthday', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTaxIdsSchema;
  }))]
});

var customerPreferencesSchema = /*#__PURE__*/object({
  emailUnsubscribed: ['email_unsubscribed', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var customerSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cards: ['cards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return cardSchema;
  })))],
  givenName: ['given_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  familyName: ['family_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  nickname: ['nickname', /*#__PURE__*/optional( /*#__PURE__*/string())],
  companyName: ['company_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  birthday: ['birthday', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  preferences: ['preferences', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerPreferencesSchema;
  }))],
  creationSource: ['creation_source', /*#__PURE__*/optional( /*#__PURE__*/string())],
  groupIds: ['group_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  segmentIds: ['segment_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTaxIdsSchema;
  }))]
});

var createCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  customer: ['customer', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerSchema;
  }))]
});

var deleteCustomerCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var deleteCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listCustomersResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  customers: ['customers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return customerSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var removeGroupFromCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var retrieveCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  customer: ['customer', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerSchema;
  }))]
});

var customerCreationSourceFilterSchema = /*#__PURE__*/object({
  values: ['values', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  rule: ['rule', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var customerTextFilterSchema = /*#__PURE__*/object({
  exact: ['exact', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fuzzy: ['fuzzy', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var customerFilterSchema = /*#__PURE__*/object({
  creationSource: ['creation_source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerCreationSourceFilterSchema;
  }))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTextFilterSchema;
  }))],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTextFilterSchema;
  }))],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTextFilterSchema;
  }))],
  groupIds: ['group_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return filterValueSchema;
  }))]
});

var customerSortSchema = /*#__PURE__*/object({
  field: ['field', /*#__PURE__*/optional( /*#__PURE__*/string())],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var customerQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerSortSchema;
  }))]
});

var searchCustomersRequestSchema = /*#__PURE__*/object({
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerQuerySchema;
  }))]
});

var searchCustomersResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  customers: ['customers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return customerSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var updateCustomerRequestSchema = /*#__PURE__*/object({
  givenName: ['given_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  familyName: ['family_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  companyName: ['company_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  nickname: ['nickname', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  birthday: ['birthday', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerTaxIdsSchema;
  }))]
});

var updateCustomerResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  customer: ['customer', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerSchema;
  }))]
});

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", "/groups/", ""]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", "/groups/", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", "/cards/", ""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", "/cards"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", ""]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$6() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", ""]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/", ""]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var CustomersApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CustomersApi, _BaseApi);

  function CustomersApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CustomersApi.prototype;

  /**
   * Lists customer profiles associated with a Square account.
   *
   * Under normal operating conditions, newly created or updated customer profiles become available
   * for the listing operation in well under 30 seconds. Occasionally, propagation of the new or updated
   * profiles can take closer to one minute or longer, especially during network incidents and outages.
   *
   * @param cursor     A pagination cursor returned by a previous call to this endpoint. Provide this cursor
   *                             to retrieve the next set of results for your original query.  For more information,
   *                             see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-
   *                             patterns/pagination).
   * @param limit      The maximum number of results to return in a single page. This limit is advisory. The
   *                             response might contain more or fewer results. If the specified limit is less than 1 or
   *                             greater than 100, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error.
   *                             The default value is 100.  For more information, see [Pagination](https://developer.
   *                             squareup.com/docs/build-basics/common-api-patterns/pagination).
   * @param sortField  Indicates how customers should be sorted.  The default value is `DEFAULT`.
   * @param sortOrder  Indicates whether customers should be sorted in ascending (`ASC`) or descending
   *                             (`DESC`) order.  The default value is `ASC`.
   * @return Response from the API call
   */
  _proto.listCustomers =
  /*#__PURE__*/
  function () {
    var _listCustomers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, limit, sortField, sortOrder, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/customers');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())],
                sortField: [sortField, optional(string())],
                sortOrder: [sortOrder, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              req.query('sort_field', mapped.sortField);
              req.query('sort_order', mapped.sortOrder);
              return _context.abrupt("return", req.callAsJson(listCustomersResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listCustomers(_x, _x2, _x3, _x4, _x5) {
      return _listCustomers.apply(this, arguments);
    }

    return listCustomers;
  }()
  /**
   * Creates a new customer for a business.
   *
   * You must provide at least one of the following values in your request to this
   * endpoint:
   *
   * - `given_name`
   * - `family_name`
   * - `company_name`
   * - `email_address`
   * - `phone_number`
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createCustomer =
  /*#__PURE__*/
  function () {
    var _createCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/customers');
              mapped = req.prepareArgs({
                body: [body, createCustomerRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createCustomerResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createCustomer(_x6, _x7) {
      return _createCustomer.apply(this, arguments);
    }

    return createCustomer;
  }()
  /**
   * Searches the customer profiles associated with a Square account using a supported query filter.
   *
   * Calling `SearchCustomers` without any explicit query filter returns all
   * customer profiles ordered alphabetically based on `given_name` and
   * `family_name`.
   *
   * Under normal operating conditions, newly created or updated customer profiles become available
   * for the search operation in well under 30 seconds. Occasionally, propagation of the new or updated
   * profiles can take closer to one minute or longer, especially during network incidents and outages.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                      See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchCustomers =
  /*#__PURE__*/
  function () {
    var _searchCustomers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/customers/search');
              mapped = req.prepareArgs({
                body: [body, searchCustomersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(searchCustomersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function searchCustomers(_x8, _x9) {
      return _searchCustomers.apply(this, arguments);
    }

    return searchCustomers;
  }()
  /**
   * Deletes a customer profile from a business. This operation also unlinks any associated cards on file.
   *
   *
   * As a best practice, you should include the `version` field in the request to enable [optimistic
   * concurrency](https://developer.squareup.com/docs/working-with-apis/optimistic-concurrency) control.
   * The value must be set to the current version of the customer profile.
   *
   * To delete a customer profile that was created by merging existing profiles, you must use the ID of
   * the newly created profile.
   *
   * @param customerId  The ID of the customer to delete.
   * @param version     The current version of the customer profile.  As a best practice, you should include
   *                              this parameter to enable [optimistic concurrency](https://developer.squareup.
   *                              com/docs/build-basics/common-api-patterns/optimistic-concurrency) control.  For more
   *                              information, see [Delete a customer profile](https://developer.squareup.
   *                              com/docs/customers-api/use-the-api/keep-records#delete-customer-profile).
   * @return Response from the API call
   */
  ;

  _proto.deleteCustomer =
  /*#__PURE__*/
  function () {
    var _deleteCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(customerId, version, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                version: [version, optional(bigint())]
              });
              req.query('version', mapped.version);
              req.appendTemplatePath(_templateObject$7(), mapped.customerId);
              return _context4.abrupt("return", req.callAsJson(deleteCustomerResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteCustomer(_x10, _x11, _x12) {
      return _deleteCustomer.apply(this, arguments);
    }

    return deleteCustomer;
  }()
  /**
   * Returns details for a single customer.
   *
   * @param customerId  The ID of the customer to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCustomer =
  /*#__PURE__*/
  function () {
    var _retrieveCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(customerId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                customerId: [customerId, string()]
              });
              req.appendTemplatePath(_templateObject2$6(), mapped.customerId);
              return _context5.abrupt("return", req.callAsJson(retrieveCustomerResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function retrieveCustomer(_x13, _x14) {
      return _retrieveCustomer.apply(this, arguments);
    }

    return retrieveCustomer;
  }()
  /**
   * Updates a customer profile. To change an attribute, specify the new value. To remove an attribute,
   * specify the value as an empty string or empty object.
   *
   * As a best practice, you should include the `version` field in the request to enable [optimistic
   * concurrency](https://developer.squareup.com/docs/working-with-apis/optimistic-concurrency) control.
   * The value must be set to the current version of the customer profile.
   *
   * To update a customer profile that was created by merging existing profiles, you must use the ID of
   * the newly created profile.
   *
   * You cannot use this endpoint to change cards on file. To make changes, use the [Cards API]($e/Cards)
   * or [Gift Cards API]($e/GiftCards).
   *
   * @param customerId   The ID of the customer to update.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateCustomer =
  /*#__PURE__*/
  function () {
    var _updateCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(customerId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                body: [body, updateCustomerRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$3(), mapped.customerId);
              return _context6.abrupt("return", req.callAsJson(updateCustomerResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updateCustomer(_x15, _x16, _x17) {
      return _updateCustomer.apply(this, arguments);
    }

    return updateCustomer;
  }()
  /**
   * Adds a card on file to an existing customer.
   *
   * As with charges, calls to `CreateCustomerCard` are idempotent. Multiple
   * calls with the same card nonce return the same card record that was created
   * with the provided nonce during the _first_ call.
   *
   * @param customerId   The Square ID of the customer profile the card is linked
   *                                                         to.
   * @param body         An object containing the fields to POST for the request.
   *                                                         See the corresponding object definition for field details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.createCustomerCard =
  /*#__PURE__*/
  function () {
    var _createCustomerCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(customerId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                body: [body, createCustomerCardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject4$1(), mapped.customerId);
              req.deprecated('CustomersApi.createCustomerCard');
              return _context7.abrupt("return", req.callAsJson(createCustomerCardResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function createCustomerCard(_x18, _x19, _x20) {
      return _createCustomerCard.apply(this, arguments);
    }

    return createCustomerCard;
  }()
  /**
   * Removes a card on file from a customer.
   *
   * @param customerId  The ID of the customer that the card on file belongs to.
   * @param cardId      The ID of the card on file to delete.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.deleteCustomerCard =
  /*#__PURE__*/
  function () {
    var _deleteCustomerCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(customerId, cardId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                cardId: [cardId, string()]
              });
              req.appendTemplatePath(_templateObject5(), mapped.customerId, mapped.cardId);
              req.deprecated('CustomersApi.deleteCustomerCard');
              return _context8.abrupt("return", req.callAsJson(deleteCustomerCardResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteCustomerCard(_x21, _x22, _x23) {
      return _deleteCustomerCard.apply(this, arguments);
    }

    return deleteCustomerCard;
  }()
  /**
   * Removes a group membership from a customer.
   *
   * The customer is identified by the `customer_id` value
   * and the customer group is identified by the `group_id` value.
   *
   * @param customerId  The ID of the customer to remove from the group.
   * @param groupId     The ID of the customer group to remove the customer from.
   * @return Response from the API call
   */
  ;

  _proto.removeGroupFromCustomer =
  /*#__PURE__*/
  function () {
    var _removeGroupFromCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(customerId, groupId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                groupId: [groupId, string()]
              });
              req.appendTemplatePath(_templateObject6(), mapped.customerId, mapped.groupId);
              return _context9.abrupt("return", req.callAsJson(removeGroupFromCustomerResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function removeGroupFromCustomer(_x24, _x25, _x26) {
      return _removeGroupFromCustomer.apply(this, arguments);
    }

    return removeGroupFromCustomer;
  }()
  /**
   * Adds a group membership to a customer.
   *
   * The customer is identified by the `customer_id` value
   * and the customer group is identified by the `group_id` value.
   *
   * @param customerId  The ID of the customer to add to a group.
   * @param groupId     The ID of the customer group to add the customer to.
   * @return Response from the API call
   */
  ;

  _proto.addGroupToCustomer =
  /*#__PURE__*/
  function () {
    var _addGroupToCustomer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(customerId, groupId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                customerId: [customerId, string()],
                groupId: [groupId, string()]
              });
              req.appendTemplatePath(_templateObject7(), mapped.customerId, mapped.groupId);
              return _context10.abrupt("return", req.callAsJson(addGroupToCustomerResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function addGroupToCustomer(_x27, _x28, _x29) {
      return _addGroupToCustomer.apply(this, arguments);
    }

    return addGroupToCustomer;
  }();

  return CustomersApi;
}(BaseApi);

var customerSegmentSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listCustomerSegmentsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  segments: ['segments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return customerSegmentSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveCustomerSegmentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  segment: ['segment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return customerSegmentSchema;
  }))]
});

function _templateObject$8() {
  var data = _taggedTemplateLiteralLoose(["/v2/customers/segments/", ""]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var CustomerSegmentsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(CustomerSegmentsApi, _BaseApi);

  function CustomerSegmentsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = CustomerSegmentsApi.prototype;

  /**
   * Retrieves the list of customer segments of a business.
   *
   * @param cursor A pagination cursor returned by previous calls to `ListCustomerSegments`. This cursor is
   *                         used to retrieve the next set of query results.  For more information, see
   *                         [Pagination](https://developer.squareup.com/docs/build-basics/common-api-
   *                         patterns/pagination).
   * @param limit  The maximum number of results to return in a single page. This limit is advisory. The
   *                         response might contain more or fewer results. If the specified limit is less than 1 or
   *                         greater than 50, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The
   *                         default value is 50.  For more information, see [Pagination](https://developer.squareup.
   *                         com/docs/build-basics/common-api-patterns/pagination).
   * @return Response from the API call
   */
  _proto.listCustomerSegments =
  /*#__PURE__*/
  function () {
    var _listCustomerSegments = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/customers/segments');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              return _context.abrupt("return", req.callAsJson(listCustomerSegmentsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listCustomerSegments(_x, _x2, _x3) {
      return _listCustomerSegments.apply(this, arguments);
    }

    return listCustomerSegments;
  }()
  /**
   * Retrieves a specific customer segment as identified by the `segment_id` value.
   *
   * @param segmentId  The Square-issued ID of the customer segment.
   * @return Response from the API call
   */
  ;

  _proto.retrieveCustomerSegment =
  /*#__PURE__*/
  function () {
    var _retrieveCustomerSegment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(segmentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                segmentId: [segmentId, string()]
              });
              req.appendTemplatePath(_templateObject$8(), mapped.segmentId);
              return _context2.abrupt("return", req.callAsJson(retrieveCustomerSegmentResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveCustomerSegment(_x4, _x5) {
      return _retrieveCustomerSegment.apply(this, arguments);
    }

    return retrieveCustomerSegment;
  }();

  return CustomerSegmentsApi;
}(BaseApi);

var deviceCodeSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  code: ['code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceId: ['device_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  productType: ['product_type', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pairBy: ['pair_by', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  statusChangedAt: ['status_changed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pairedAt: ['paired_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createDeviceCodeRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  deviceCode: ['device_code', /*#__PURE__*/lazy(function () {
    return deviceCodeSchema;
  })]
});

var createDeviceCodeResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  deviceCode: ['device_code', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return deviceCodeSchema;
  }))]
});

var getDeviceCodeResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  deviceCode: ['device_code', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return deviceCodeSchema;
  }))]
});

var listDeviceCodesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  deviceCodes: ['device_codes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return deviceCodeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject$9() {
  var data = _taggedTemplateLiteralLoose(["/v2/devices/codes/", ""]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var DevicesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(DevicesApi, _BaseApi);

  function DevicesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = DevicesApi.prototype;

  /**
   * Lists all DeviceCodes associated with the merchant.
   *
   * @param cursor       A pagination cursor returned by a previous call to this endpoint. Provide this to
   *                               retrieve the next set of results for your original query.  See [Paginating
   *                               results](https://developer.squareup.com/docs/working-with-apis/pagination) for more
   *                               information.
   * @param locationId   If specified, only returns DeviceCodes of the specified location. Returns
   *                               DeviceCodes of all locations if empty.
   * @param productType  If specified, only returns DeviceCodes targeting the specified product type.
   *                               Returns DeviceCodes of all product types if empty.
   * @param status       If specified, returns DeviceCodes with the specified statuses. Returns DeviceCodes
   *                               of status `PAIRED` and `UNPAIRED` if empty.
   * @return Response from the API call
   */
  _proto.listDeviceCodes =
  /*#__PURE__*/
  function () {
    var _listDeviceCodes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, locationId, productType, status, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/devices/codes');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                locationId: [locationId, optional(string())],
                productType: [productType, optional(string())],
                status: [status, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.query('location_id', mapped.locationId);
              req.query('product_type', mapped.productType);
              req.query('status', mapped.status);
              return _context.abrupt("return", req.callAsJson(listDeviceCodesResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listDeviceCodes(_x, _x2, _x3, _x4, _x5) {
      return _listDeviceCodes.apply(this, arguments);
    }

    return listDeviceCodes;
  }()
  /**
   * Creates a DeviceCode that can be used to login to a Square Terminal device to enter the connected
   * terminal mode.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                       See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createDeviceCode =
  /*#__PURE__*/
  function () {
    var _createDeviceCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/devices/codes');
              mapped = req.prepareArgs({
                body: [body, createDeviceCodeRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createDeviceCodeResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createDeviceCode(_x6, _x7) {
      return _createDeviceCode.apply(this, arguments);
    }

    return createDeviceCode;
  }()
  /**
   * Retrieves DeviceCode with the associated ID.
   *
   * @param id The unique identifier for the device code.
   * @return Response from the API call
   */
  ;

  _proto.getDeviceCode =
  /*#__PURE__*/
  function () {
    var _getDeviceCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject$9(), mapped.id);
              return _context3.abrupt("return", req.callAsJson(getDeviceCodeResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getDeviceCode(_x8, _x9) {
      return _getDeviceCode.apply(this, arguments);
    }

    return getDeviceCode;
  }();

  return DevicesApi;
}(BaseApi);

var disputedPaymentSchema = /*#__PURE__*/object({
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var disputeSchema = /*#__PURE__*/object({
  disputeId: ['dispute_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  dueAt: ['due_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  disputedPayment: ['disputed_payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputedPaymentSchema;
  }))],
  evidenceIds: ['evidence_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  cardBrand: ['card_brand', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  brandDisputeId: ['brand_dispute_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reportedDate: ['reported_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reportedAt: ['reported_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var acceptDisputeResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  dispute: ['dispute', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeSchema;
  }))]
});

var createDisputeEvidenceFileRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  evidenceType: ['evidence_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  contentType: ['content_type', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var disputeEvidenceFileSchema = /*#__PURE__*/object({
  filename: ['filename', /*#__PURE__*/optional( /*#__PURE__*/string())],
  filetype: ['filetype', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var disputeEvidenceSchema = /*#__PURE__*/object({
  evidenceId: ['evidence_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  disputeId: ['dispute_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  evidenceFile: ['evidence_file', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeEvidenceFileSchema;
  }))],
  evidenceText: ['evidence_text', /*#__PURE__*/optional( /*#__PURE__*/string())],
  uploadedAt: ['uploaded_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  evidenceType: ['evidence_type', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createDisputeEvidenceFileResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  evidence: ['evidence', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeEvidenceSchema;
  }))]
});

var createDisputeEvidenceTextRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  evidenceType: ['evidence_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  evidenceText: ['evidence_text', /*#__PURE__*/string()]
});

var createDisputeEvidenceTextResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  evidence: ['evidence', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeEvidenceSchema;
  }))]
});

var deleteDisputeEvidenceResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listDisputeEvidenceResponseSchema = /*#__PURE__*/object({
  evidence: ['evidence', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return disputeEvidenceSchema;
  })))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listDisputesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  disputes: ['disputes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return disputeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveDisputeEvidenceResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  evidence: ['evidence', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeEvidenceSchema;
  }))]
});

var retrieveDisputeResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  dispute: ['dispute', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeSchema;
  }))]
});

var submitEvidenceResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  dispute: ['dispute', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return disputeSchema;
  }))]
});

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/submit-evidence"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/evidence/", ""]);

  _templateObject7$1 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/evidence/", ""]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/evidence-text"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/evidence-files"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/evidence"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", "/accept"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteralLoose(["/v2/disputes/", ""]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var DisputesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(DisputesApi, _BaseApi);

  function DisputesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = DisputesApi.prototype;

  /**
   * Returns a list of disputes associated with a particular account.
   *
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this
   *                              cursor to retrieve the next set of results for the original query. For more
   *                              information, see [Pagination](https://developer.squareup.
   *                              com/docs/basics/api101/pagination).
   * @param states      The dispute states to filter the result. If not specified, the endpoint returns all
   *                              open disputes (the dispute status is not `INQUIRY_CLOSED`, `WON`, or `LOST`).
   * @param locationId  The ID of the location for which to return a list of disputes. If not specified, the
   *                              endpoint returns all open disputes (the dispute status is not `INQUIRY_CLOSED`, `WON`,
   *                              or `LOST`) associated with all locations.
   * @return Response from the API call
   */
  _proto.listDisputes =
  /*#__PURE__*/
  function () {
    var _listDisputes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, states, locationId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/disputes');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(string())],
                states: [states, optional(string())],
                locationId: [locationId, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.query('states', mapped.states);
              req.query('location_id', mapped.locationId);
              return _context.abrupt("return", req.callAsJson(listDisputesResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listDisputes(_x, _x2, _x3, _x4) {
      return _listDisputes.apply(this, arguments);
    }

    return listDisputes;
  }()
  /**
   * Returns details about a specific dispute.
   *
   * @param disputeId  The ID of the dispute you want more details about.
   * @return Response from the API call
   */
  ;

  _proto.retrieveDispute =
  /*#__PURE__*/
  function () {
    var _retrieveDispute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(disputeId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()]
              });
              req.appendTemplatePath(_templateObject$a(), mapped.disputeId);
              return _context2.abrupt("return", req.callAsJson(retrieveDisputeResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveDispute(_x5, _x6) {
      return _retrieveDispute.apply(this, arguments);
    }

    return retrieveDispute;
  }()
  /**
   * Accepts the loss on a dispute. Square returns the disputed amount to the cardholder and
   * updates the dispute state to ACCEPTED.
   *
   * Square debits the disputed amount from the seller’s Square account. If the Square account
   * does not have sufficient funds, Square debits the associated bank account.
   *
   * @param disputeId  The ID of the dispute you want to accept.
   * @return Response from the API call
   */
  ;

  _proto.acceptDispute =
  /*#__PURE__*/
  function () {
    var _acceptDispute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(disputeId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()]
              });
              req.appendTemplatePath(_templateObject2$7(), mapped.disputeId);
              return _context3.abrupt("return", req.callAsJson(acceptDisputeResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function acceptDispute(_x7, _x8) {
      return _acceptDispute.apply(this, arguments);
    }

    return acceptDispute;
  }()
  /**
   * Returns a list of evidence associated with a dispute.
   *
   * @param disputeId  The ID of the dispute.
   * @param cursor     A pagination cursor returned by a previous call to this endpoint. Provide this cursor
   *                             to retrieve the next set of results for the original query. For more information, see
   *                             [Pagination](https://developer.squareup.com/docs/basics/api101/pagination).
   * @return Response from the API call
   */
  ;

  _proto.listDisputeEvidence =
  /*#__PURE__*/
  function () {
    var _listDisputeEvidence = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(disputeId, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()],
                cursor: [cursor, optional(string())]
              });
              req.query('cursor', mapped.cursor);
              req.appendTemplatePath(_templateObject3$4(), mapped.disputeId);
              return _context4.abrupt("return", req.callAsJson(listDisputeEvidenceResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function listDisputeEvidence(_x9, _x10, _x11) {
      return _listDisputeEvidence.apply(this, arguments);
    }

    return listDisputeEvidence;
  }()
  /**
   * Uploads a file to use as evidence in a dispute challenge. The endpoint accepts HTTP
   * multipart/form-data file uploads in HEIC, HEIF, JPEG, PDF, PNG, and TIFF formats.
   *
   * @param disputeId  The ID of the dispute you want to upload evidence
   *                                                              for.
   * @param request    Defines the parameters for a
   *                                                              `CreateDisputeEvidenceFile` request.
   * @param imageFile
   * @return Response from the API call
   */
  ;

  _proto.createDisputeEvidenceFile =
  /*#__PURE__*/
  function () {
    var _createDisputeEvidenceFile = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(disputeId, request, imageFile, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()],
                request: [request, optional(createDisputeEvidenceFileRequestSchema)]
              });
              req.formData({
                request: JSON.stringify(mapped.request),
                image_file: imageFile
              });
              req.appendTemplatePath(_templateObject4$2(), mapped.disputeId);
              return _context5.abrupt("return", req.callAsJson(createDisputeEvidenceFileResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function createDisputeEvidenceFile(_x12, _x13, _x14, _x15) {
      return _createDisputeEvidenceFile.apply(this, arguments);
    }

    return createDisputeEvidenceFile;
  }()
  /**
   * Uploads text to use as evidence for a dispute challenge.
   *
   * @param disputeId    The ID of the dispute you want to upload evidence
   *                                                                for.
   * @param body         An object containing the fields to POST for the
   *                                                                request.  See the corresponding object definition
   *                                                                for field details.
   * @return Response from the API call
   */
  ;

  _proto.createDisputeEvidenceText =
  /*#__PURE__*/
  function () {
    var _createDisputeEvidenceText = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(disputeId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()],
                body: [body, createDisputeEvidenceTextRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject5$1(), mapped.disputeId);
              return _context6.abrupt("return", req.callAsJson(createDisputeEvidenceTextResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function createDisputeEvidenceText(_x16, _x17, _x18) {
      return _createDisputeEvidenceText.apply(this, arguments);
    }

    return createDisputeEvidenceText;
  }()
  /**
   * Removes specified evidence from a dispute.
   *
   * Square does not send the bank any evidence that is removed. Also, you cannot remove evidence after
   * submitting it to the bank using [SubmitEvidence]($e/Disputes/SubmitEvidence).
   *
   * @param disputeId   The ID of the dispute you want to remove evidence from.
   * @param evidenceId  The ID of the evidence you want to remove.
   * @return Response from the API call
   */
  ;

  _proto.deleteDisputeEvidence =
  /*#__PURE__*/
  function () {
    var _deleteDisputeEvidence = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(disputeId, evidenceId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()],
                evidenceId: [evidenceId, string()]
              });
              req.appendTemplatePath(_templateObject6$1(), mapped.disputeId, mapped.evidenceId);
              return _context7.abrupt("return", req.callAsJson(deleteDisputeEvidenceResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function deleteDisputeEvidence(_x19, _x20, _x21) {
      return _deleteDisputeEvidence.apply(this, arguments);
    }

    return deleteDisputeEvidence;
  }()
  /**
   * Returns the evidence metadata specified by the evidence ID in the request URL path
   *
   * You must maintain a copy of the evidence you upload if you want to reference it later. You cannot
   * download the evidence after you upload it.
   *
   * @param disputeId   The ID of the dispute that you want to retrieve evidence from.
   * @param evidenceId  The ID of the evidence to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveDisputeEvidence =
  /*#__PURE__*/
  function () {
    var _retrieveDisputeEvidence = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(disputeId, evidenceId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()],
                evidenceId: [evidenceId, string()]
              });
              req.appendTemplatePath(_templateObject7$1(), mapped.disputeId, mapped.evidenceId);
              return _context8.abrupt("return", req.callAsJson(retrieveDisputeEvidenceResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function retrieveDisputeEvidence(_x22, _x23, _x24) {
      return _retrieveDisputeEvidence.apply(this, arguments);
    }

    return retrieveDisputeEvidence;
  }()
  /**
   * Submits evidence to the cardholder's bank.
   *
   * Before submitting evidence, Square compiles all available evidence. This includes evidence uploaded
   * using the [CreateDisputeEvidenceFile]($e/Disputes/CreateDisputeEvidenceFile) and
   * [CreateDisputeEvidenceText]($e/Disputes/CreateDisputeEvidenceText) endpoints and
   * evidence automatically provided by Square, when available.
   *
   * @param disputeId  The ID of the dispute that you want to submit evidence for.
   * @return Response from the API call
   */
  ;

  _proto.submitEvidence =
  /*#__PURE__*/
  function () {
    var _submitEvidence = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(disputeId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                disputeId: [disputeId, string()]
              });
              req.appendTemplatePath(_templateObject8(), mapped.disputeId);
              return _context9.abrupt("return", req.callAsJson(submitEvidenceResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function submitEvidence(_x25, _x26) {
      return _submitEvidence.apply(this, arguments);
    }

    return submitEvidence;
  }();

  return DisputesApi;
}(BaseApi);

var employeeSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  firstName: ['first_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lastName: ['last_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  email: ['email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isOwner: ['is_owner', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listEmployeesResponseSchema = /*#__PURE__*/object({
  employees: ['employees', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return employeeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var retrieveEmployeeResponseSchema = /*#__PURE__*/object({
  employee: ['employee', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return employeeSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject$b() {
  var data = _taggedTemplateLiteralLoose(["/v2/employees/", ""]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var EmployeesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(EmployeesApi, _BaseApi);

  function EmployeesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = EmployeesApi.prototype;

  /**
   * ListEmployees
   *
   * @param locationId
   * @param status      Specifies the EmployeeStatus to filter the employee by.
   * @param limit       The number of employees to be returned on each page.
   * @param cursor      The token required to retrieve the specified page of results.
   * @return Response from the API call
   * @deprecated
   */
  _proto.listEmployees =
  /*#__PURE__*/
  function () {
    var _listEmployees = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, status, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/employees');
              mapped = req.prepareArgs({
                locationId: [locationId, optional(string())],
                status: [status, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_id', mapped.locationId);
              req.query('status', mapped.status);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.deprecated('EmployeesApi.listEmployees');
              return _context.abrupt("return", req.callAsJson(listEmployeesResponseSchema, requestOptions));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listEmployees(_x, _x2, _x3, _x4, _x5) {
      return _listEmployees.apply(this, arguments);
    }

    return listEmployees;
  }()
  /**
   * RetrieveEmployee
   *
   * @param id UUID for the employee that was requested.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrieveEmployee =
  /*#__PURE__*/
  function () {
    var _retrieveEmployee = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject$b(), mapped.id);
              req.deprecated('EmployeesApi.retrieveEmployee');
              return _context2.abrupt("return", req.callAsJson(retrieveEmployeeResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveEmployee(_x6, _x7) {
      return _retrieveEmployee.apply(this, arguments);
    }

    return retrieveEmployee;
  }();

  return EmployeesApi;
}(BaseApi);

var giftCardActivityActivateSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lineItemUid: ['line_item_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  buyerPaymentInstrumentIds: ['buyer_payment_instrument_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var giftCardActivityAdjustDecrementSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityAdjustIncrementSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityBlockSchema = /*#__PURE__*/object({
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityClearBalanceSchema = /*#__PURE__*/object({
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityDeactivateSchema = /*#__PURE__*/object({
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityImportSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })]
});

var giftCardActivityImportReversalSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })]
});

var giftCardActivityLoadSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  lineItemUid: ['line_item_uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  buyerPaymentInstrumentIds: ['buyer_payment_instrument_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var giftCardActivityRedeemSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var giftCardActivityRefundSchema = /*#__PURE__*/object({
  redeemActivityId: ['redeem_activity_id', /*#__PURE__*/string()],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var giftCardActivityUnblockSchema = /*#__PURE__*/object({
  reason: ['reason', /*#__PURE__*/string()]
});

var giftCardActivityUnlinkedActivityRefundSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var giftCardActivitySchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  giftCardId: ['gift_card_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  giftCardGan: ['gift_card_gan', /*#__PURE__*/optional( /*#__PURE__*/string())],
  giftCardBalanceMoney: ['gift_card_balance_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  loadActivityDetails: ['load_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityLoadSchema;
  }))],
  activateActivityDetails: ['activate_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityActivateSchema;
  }))],
  redeemActivityDetails: ['redeem_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityRedeemSchema;
  }))],
  clearBalanceActivityDetails: ['clear_balance_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityClearBalanceSchema;
  }))],
  deactivateActivityDetails: ['deactivate_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityDeactivateSchema;
  }))],
  adjustIncrementActivityDetails: ['adjust_increment_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityAdjustIncrementSchema;
  }))],
  adjustDecrementActivityDetails: ['adjust_decrement_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityAdjustDecrementSchema;
  }))],
  refundActivityDetails: ['refund_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityRefundSchema;
  }))],
  unlinkedActivityRefundActivityDetails: ['unlinked_activity_refund_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityUnlinkedActivityRefundSchema;
  }))],
  importActivityDetails: ['import_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityImportSchema;
  }))],
  blockActivityDetails: ['block_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityBlockSchema;
  }))],
  unblockActivityDetails: ['unblock_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityUnblockSchema;
  }))],
  importReversalActivityDetails: ['import_reversal_activity_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivityImportReversalSchema;
  }))]
});

var createGiftCardActivityRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  giftCardActivity: ['gift_card_activity', /*#__PURE__*/lazy(function () {
    return giftCardActivitySchema;
  })]
});

var createGiftCardActivityResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCardActivity: ['gift_card_activity', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardActivitySchema;
  }))]
});

var listGiftCardActivitiesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCardActivities: ['gift_card_activities', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return giftCardActivitySchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var GiftCardActivitiesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(GiftCardActivitiesApi, _BaseApi);

  function GiftCardActivitiesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = GiftCardActivitiesApi.prototype;

  /**
   * Lists gift card activities. By default, you get gift card activities for all
   * gift cards in the seller's account. You can optionally specify query parameters to
   * filter the list. For example, you can get a list of gift card activities for a gift card,
   * for all gift cards in a specific region, or for activities within a time window.
   *
   * @param giftCardId   If a gift card ID is provided, the endpoint returns activities related  to the
   *                               specified gift card. Otherwise, the endpoint returns all gift card activities for
   *                               the seller.
   * @param type         If a [type]($m/GiftCardActivityType) is provided, the endpoint returns gift card
   *                               activities of the specified type.  Otherwise, the endpoint returns all types of gift
   *                               card activities.
   * @param locationId   If a location ID is provided, the endpoint returns gift card activities for the
   *                               specified location.  Otherwise, the endpoint returns gift card activities for all
   *                               locations.
   * @param beginTime    The timestamp for the beginning of the reporting period, in RFC 3339 format. This
   *                               start time is inclusive. The default value is the current time minus one year.
   * @param endTime      The timestamp for the end of the reporting period, in RFC 3339 format. This end
   *                               time is inclusive. The default value is the current time.
   * @param limit        If a limit is provided, the endpoint returns the specified number  of results (or
   *                               fewer) per page. The maximum value is 100. The default value is 50. For more
   *                               information, see [Pagination](https://developer.squareup.com/docs/working-with-
   *                               apis/pagination).
   * @param cursor       A pagination cursor returned by a previous call to this endpoint. Provide this
   *                               cursor to retrieve the next set of results for the original query. If a cursor is
   *                               not provided, the endpoint returns the first page of the results. For more
   *                               information, see [Pagination](https://developer.squareup.com/docs/working-with-
   *                               apis/pagination).
   * @param sortOrder    The order in which the endpoint returns the activities, based on `created_at`. -
   *                               `ASC` - Oldest to newest. - `DESC` - Newest to oldest (default).
   * @return Response from the API call
   */
  _proto.listGiftCardActivities =
  /*#__PURE__*/
  function () {
    var _listGiftCardActivities = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(giftCardId, type, locationId, beginTime, endTime, limit, cursor, sortOrder, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/gift-cards/activities');
              mapped = req.prepareArgs({
                giftCardId: [giftCardId, optional(string())],
                type: [type, optional(string())],
                locationId: [locationId, optional(string())],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())],
                sortOrder: [sortOrder, optional(string())]
              });
              req.query('gift_card_id', mapped.giftCardId);
              req.query('type', mapped.type);
              req.query('location_id', mapped.locationId);
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.query('sort_order', mapped.sortOrder);
              return _context.abrupt("return", req.callAsJson(listGiftCardActivitiesResponseSchema, requestOptions));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listGiftCardActivities(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
      return _listGiftCardActivities.apply(this, arguments);
    }

    return listGiftCardActivities;
  }()
  /**
   * Creates a gift card activity. For more information, see
   * [GiftCardActivity](https://developer.squareup.com/docs/gift-cards/using-gift-cards-
   * api#giftcardactivity) and
   * [Using activated gift cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-
   * api#using-activated-gift-cards).
   *
   * @param body         An object containing the fields to POST for the
   *                                                             request.  See the corresponding object definition for
   *                                                             field details.
   * @return Response from the API call
   */
  ;

  _proto.createGiftCardActivity =
  /*#__PURE__*/
  function () {
    var _createGiftCardActivity = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/gift-cards/activities');
              mapped = req.prepareArgs({
                body: [body, createGiftCardActivityRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createGiftCardActivityResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createGiftCardActivity(_x10, _x11) {
      return _createGiftCardActivity.apply(this, arguments);
    }

    return createGiftCardActivity;
  }();

  return GiftCardActivitiesApi;
}(BaseApi);

var giftCardSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/string()],
  ganSource: ['gan_source', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  balanceMoney: ['balance_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  gan: ['gan', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerIds: ['customer_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var createGiftCardRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/string()],
  giftCard: ['gift_card', /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  })]
});

var createGiftCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

var linkCustomerToGiftCardRequestSchema = /*#__PURE__*/object({
  customerId: ['customer_id', /*#__PURE__*/string()]
});

var linkCustomerToGiftCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

var listGiftCardsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCards: ['gift_cards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveGiftCardFromGANRequestSchema = /*#__PURE__*/object({
  gan: ['gan', /*#__PURE__*/string()]
});

var retrieveGiftCardFromGANResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

var retrieveGiftCardFromNonceRequestSchema = /*#__PURE__*/object({
  nonce: ['nonce', /*#__PURE__*/string()]
});

var retrieveGiftCardFromNonceResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

var retrieveGiftCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

var unlinkCustomerFromGiftCardRequestSchema = /*#__PURE__*/object({
  customerId: ['customer_id', /*#__PURE__*/string()]
});

var unlinkCustomerFromGiftCardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  giftCard: ['gift_card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return giftCardSchema;
  }))]
});

function _templateObject3$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/gift-cards/", ""]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteralLoose(["/v2/gift-cards/", "/unlink-customer"]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$c() {
  var data = _taggedTemplateLiteralLoose(["/v2/gift-cards/", "/link-customer"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var GiftCardsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(GiftCardsApi, _BaseApi);

  function GiftCardsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = GiftCardsApi.prototype;

  /**
   * Lists all gift cards. You can specify optional filters to retrieve
   * a subset of the gift cards.
   *
   * @param type        If a [type]($m/GiftCardType) is provided, the endpoint returns gift cards of the
   *                              specified type. Otherwise, the endpoint returns gift cards of all types.
   * @param state       If a [state]($m/GiftCardStatus) is provided, the endpoint returns the gift cards in
   *                              the specified state. Otherwise, the endpoint returns the gift cards of all states.
   * @param limit       If a limit is provided, the endpoint returns only the specified number of results
   *                              per page. The maximum value is 50. The default value is 30. For more information, see
   *                              [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this
   *                              cursor to retrieve the next set of results for the original query. If a cursor is not
   *                              provided, the endpoint returns the first page of the results.  For more information,
   *                              see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination).
   * @param customerId  If a customer ID is provided, the endpoint returns only the gift cards linked to the
   *                              specified customer.
   * @return Response from the API call
   */
  _proto.listGiftCards =
  /*#__PURE__*/
  function () {
    var _listGiftCards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(type, state, limit, cursor, customerId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/gift-cards');
              mapped = req.prepareArgs({
                type: [type, optional(string())],
                state: [state, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())],
                customerId: [customerId, optional(string())]
              });
              req.query('type', mapped.type);
              req.query('state', mapped.state);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.query('customer_id', mapped.customerId);
              return _context.abrupt("return", req.callAsJson(listGiftCardsResponseSchema, requestOptions));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listGiftCards(_x, _x2, _x3, _x4, _x5, _x6) {
      return _listGiftCards.apply(this, arguments);
    }

    return listGiftCards;
  }()
  /**
   * Creates a digital gift card or registers a physical (plastic) gift card. You must activate the gift
   * card before
   * it can be used for payment. For more information, see
   * [Selling gift cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api#selling-
   * square-gift-cards).
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createGiftCard =
  /*#__PURE__*/
  function () {
    var _createGiftCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/gift-cards');
              mapped = req.prepareArgs({
                body: [body, createGiftCardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createGiftCardResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createGiftCard(_x7, _x8) {
      return _createGiftCard.apply(this, arguments);
    }

    return createGiftCard;
  }()
  /**
   * Retrieves a gift card using the gift card account number (GAN).
   *
   * @param body         An object containing the fields to POST for the
   *                                                              request.  See the corresponding object definition for
   *                                                              field details.
   * @return Response from the API call
   */
  ;

  _proto.retrieveGiftCardFromGAN =
  /*#__PURE__*/
  function () {
    var _retrieveGiftCardFromGAN = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/gift-cards/from-gan');
              mapped = req.prepareArgs({
                body: [body, retrieveGiftCardFromGANRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(retrieveGiftCardFromGANResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function retrieveGiftCardFromGAN(_x9, _x10) {
      return _retrieveGiftCardFromGAN.apply(this, arguments);
    }

    return retrieveGiftCardFromGAN;
  }()
  /**
   * Retrieves a gift card using a secure payment token that represents the gift card.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                request.  See the corresponding object definition
   *                                                                for field details.
   * @return Response from the API call
   */
  ;

  _proto.retrieveGiftCardFromNonce =
  /*#__PURE__*/
  function () {
    var _retrieveGiftCardFromNonce = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/gift-cards/from-nonce');
              mapped = req.prepareArgs({
                body: [body, retrieveGiftCardFromNonceRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context4.abrupt("return", req.callAsJson(retrieveGiftCardFromNonceResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function retrieveGiftCardFromNonce(_x11, _x12) {
      return _retrieveGiftCardFromNonce.apply(this, arguments);
    }

    return retrieveGiftCardFromNonce;
  }()
  /**
   * Links a customer to a gift card, which is also referred to as adding a card on file.
   *
   * @param giftCardId   The ID of the gift card to be linked.
   * @param body         An object containing the fields to POST for the
   *                                                             request.  See the corresponding object definition for
   *                                                             field details.
   * @return Response from the API call
   */
  ;

  _proto.linkCustomerToGiftCard =
  /*#__PURE__*/
  function () {
    var _linkCustomerToGiftCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(giftCardId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                giftCardId: [giftCardId, string()],
                body: [body, linkCustomerToGiftCardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject$c(), mapped.giftCardId);
              return _context5.abrupt("return", req.callAsJson(linkCustomerToGiftCardResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function linkCustomerToGiftCard(_x13, _x14, _x15) {
      return _linkCustomerToGiftCard.apply(this, arguments);
    }

    return linkCustomerToGiftCard;
  }()
  /**
   * Unlinks a customer from a gift card, which is also referred to as removing a card on file.
   *
   * @param giftCardId   The ID of the gift card to be unlinked.
   * @param body         An object containing the fields to POST for the
   *                                                                 request.  See the corresponding object definition
   *                                                                 for field details.
   * @return Response from the API call
   */
  ;

  _proto.unlinkCustomerFromGiftCard =
  /*#__PURE__*/
  function () {
    var _unlinkCustomerFromGiftCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(giftCardId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                giftCardId: [giftCardId, string()],
                body: [body, unlinkCustomerFromGiftCardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$8(), mapped.giftCardId);
              return _context6.abrupt("return", req.callAsJson(unlinkCustomerFromGiftCardResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function unlinkCustomerFromGiftCard(_x16, _x17, _x18) {
      return _unlinkCustomerFromGiftCard.apply(this, arguments);
    }

    return unlinkCustomerFromGiftCard;
  }()
  /**
   * Retrieves a gift card using its ID.
   *
   * @param id The ID of the gift card to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveGiftCard =
  /*#__PURE__*/
  function () {
    var _retrieveGiftCard = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject3$5(), mapped.id);
              return _context7.abrupt("return", req.callAsJson(retrieveGiftCardResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function retrieveGiftCard(_x19, _x20) {
      return _retrieveGiftCard.apply(this, arguments);
    }

    return retrieveGiftCard;
  }();

  return GiftCardsApi;
}(BaseApi);

var inventoryAdjustmentGroupSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  rootAdjustmentId: ['root_adjustment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fromState: ['from_state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  toState: ['to_state', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var inventoryAdjustmentSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fromState: ['from_state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  toState: ['to_state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectType: ['catalog_object_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/optional( /*#__PURE__*/string())],
  totalPriceMoney: ['total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  occurredAt: ['occurred_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return sourceApplicationSchema;
  }))],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  transactionId: ['transaction_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundId: ['refund_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  purchaseOrderId: ['purchase_order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  goodsReceiptId: ['goods_receipt_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  adjustmentGroup: ['adjustment_group', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryAdjustmentGroupSchema;
  }))]
});

var inventoryPhysicalCountSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectType: ['catalog_object_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return sourceApplicationSchema;
  }))],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  occurredAt: ['occurred_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var inventoryTransferSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fromLocationId: ['from_location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  toLocationId: ['to_location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectType: ['catalog_object_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/optional( /*#__PURE__*/string())],
  occurredAt: ['occurred_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return sourceApplicationSchema;
  }))],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var inventoryChangeSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  physicalCount: ['physical_count', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryPhysicalCountSchema;
  }))],
  adjustment: ['adjustment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryAdjustmentSchema;
  }))],
  transfer: ['transfer', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryTransferSchema;
  }))],
  measurementUnit: ['measurement_unit', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogMeasurementUnitSchema;
  }))],
  measurementUnitId: ['measurement_unit_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var batchChangeInventoryRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  changes: ['changes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryChangeSchema;
  })))],
  ignoreUnchangedCounts: ['ignore_unchanged_counts', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var inventoryCountSchema = /*#__PURE__*/object({
  catalogObjectId: ['catalog_object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectType: ['catalog_object_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/optional( /*#__PURE__*/string())],
  calculatedAt: ['calculated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isEstimated: ['is_estimated', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var batchChangeInventoryResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  counts: ['counts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryCountSchema;
  })))],
  changes: ['changes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryChangeSchema;
  })))]
});

var batchRetrieveInventoryChangesRequestSchema = /*#__PURE__*/object({
  catalogObjectIds: ['catalog_object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  types: ['types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  states: ['states', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  updatedAfter: ['updated_after', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedBefore: ['updated_before', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var batchRetrieveInventoryChangesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  changes: ['changes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryChangeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var batchRetrieveInventoryCountsRequestSchema = /*#__PURE__*/object({
  catalogObjectIds: ['catalog_object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  updatedAfter: ['updated_after', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  states: ['states', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var batchRetrieveInventoryCountsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  counts: ['counts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryCountSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveInventoryAdjustmentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  adjustment: ['adjustment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryAdjustmentSchema;
  }))]
});

var retrieveInventoryChangesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  changes: ['changes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryChangeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveInventoryCountResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  counts: ['counts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return inventoryCountSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveInventoryPhysicalCountResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  count: ['count', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryPhysicalCountSchema;
  }))]
});

var retrieveInventoryTransferResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  transfer: ['transfer', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return inventoryTransferSchema;
  }))]
});

function _templateObject7$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/", "/changes"]);

  _templateObject7$2 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/", ""]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/transfers/", ""]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/physical-counts/", ""]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/physical-count/", ""]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$9() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/adjustments/", ""]);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteralLoose(["/v2/inventory/adjustment/", ""]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var InventoryApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(InventoryApi, _BaseApi);

  function InventoryApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = InventoryApi.prototype;

  /**
   * Deprecated version of [RetrieveInventoryAdjustment]($e/Inventory/RetrieveInventoryAdjustment) after
   * the endpoint URL
   * is updated to conform to the standard convention.
   *
   * @param adjustmentId  ID of the [InventoryAdjustment]($m/InventoryAdjustment) to retrieve.
   * @return Response from the API call
   * @deprecated
   */
  _proto.deprecatedRetrieveInventoryAdjustment =
  /*#__PURE__*/
  function () {
    var _deprecatedRetrieveInventoryAdjustment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(adjustmentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                adjustmentId: [adjustmentId, string()]
              });
              req.appendTemplatePath(_templateObject$d(), mapped.adjustmentId);
              req.deprecated('InventoryApi.deprecatedRetrieveInventoryAdjustment');
              return _context.abrupt("return", req.callAsJson(retrieveInventoryAdjustmentResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function deprecatedRetrieveInventoryAdjustment(_x, _x2) {
      return _deprecatedRetrieveInventoryAdjustment.apply(this, arguments);
    }

    return deprecatedRetrieveInventoryAdjustment;
  }()
  /**
   * Returns the [InventoryAdjustment]($m/InventoryAdjustment) object
   * with the provided `adjustment_id`.
   *
   * @param adjustmentId  ID of the [InventoryAdjustment]($m/InventoryAdjustment) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveInventoryAdjustment =
  /*#__PURE__*/
  function () {
    var _retrieveInventoryAdjustment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(adjustmentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                adjustmentId: [adjustmentId, string()]
              });
              req.appendTemplatePath(_templateObject2$9(), mapped.adjustmentId);
              return _context2.abrupt("return", req.callAsJson(retrieveInventoryAdjustmentResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveInventoryAdjustment(_x3, _x4) {
      return _retrieveInventoryAdjustment.apply(this, arguments);
    }

    return retrieveInventoryAdjustment;
  }()
  /**
   * Deprecated version of [BatchChangeInventory]($e/Inventory/BatchChangeInventory) after the endpoint
   * URL
   * is updated to conform to the standard convention.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.deprecatedBatchChangeInventory =
  /*#__PURE__*/
  function () {
    var _deprecatedBatchChangeInventory = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/batch-change');
              mapped = req.prepareArgs({
                body: [body, batchChangeInventoryRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.deprecated('InventoryApi.deprecatedBatchChangeInventory');
              return _context3.abrupt("return", req.callAsJson(batchChangeInventoryResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deprecatedBatchChangeInventory(_x5, _x6) {
      return _deprecatedBatchChangeInventory.apply(this, arguments);
    }

    return deprecatedBatchChangeInventory;
  }()
  /**
   * Deprecated version of [BatchRetrieveInventoryChanges]($e/Inventory/BatchRetrieveInventoryChanges)
   * after the endpoint URL
   * is updated to conform to the standard convention.
   *
   * @param body         An object containing the fields to POST for
   *                                                                    the request.  See the corresponding object
   *                                                                    definition for field details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.deprecatedBatchRetrieveInventoryChanges =
  /*#__PURE__*/
  function () {
    var _deprecatedBatchRetrieveInventoryChanges = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/batch-retrieve-changes');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveInventoryChangesRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.deprecated('InventoryApi.deprecatedBatchRetrieveInventoryChanges');
              return _context4.abrupt("return", req.callAsJson(batchRetrieveInventoryChangesResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deprecatedBatchRetrieveInventoryChanges(_x7, _x8) {
      return _deprecatedBatchRetrieveInventoryChanges.apply(this, arguments);
    }

    return deprecatedBatchRetrieveInventoryChanges;
  }()
  /**
   * Deprecated version of [BatchRetrieveInventoryCounts]($e/Inventory/BatchRetrieveInventoryCounts)
   * after the endpoint URL
   * is updated to conform to the standard convention.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                   request.  See the corresponding object
   *                                                                   definition for field details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.deprecatedBatchRetrieveInventoryCounts =
  /*#__PURE__*/
  function () {
    var _deprecatedBatchRetrieveInventoryCounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/batch-retrieve-counts');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveInventoryCountsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.deprecated('InventoryApi.deprecatedBatchRetrieveInventoryCounts');
              return _context5.abrupt("return", req.callAsJson(batchRetrieveInventoryCountsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deprecatedBatchRetrieveInventoryCounts(_x9, _x10) {
      return _deprecatedBatchRetrieveInventoryCounts.apply(this, arguments);
    }

    return deprecatedBatchRetrieveInventoryCounts;
  }()
  /**
   * Applies adjustments and counts to the provided item quantities.
   *
   * On success: returns the current calculated counts for all objects
   * referenced in the request.
   * On failure: returns a list of related errors.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.batchChangeInventory =
  /*#__PURE__*/
  function () {
    var _batchChangeInventory = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/changes/batch-create');
              mapped = req.prepareArgs({
                body: [body, batchChangeInventoryRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context6.abrupt("return", req.callAsJson(batchChangeInventoryResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function batchChangeInventory(_x11, _x12) {
      return _batchChangeInventory.apply(this, arguments);
    }

    return batchChangeInventory;
  }()
  /**
   * Returns historical physical counts and adjustments based on the
   * provided filter criteria.
   *
   * Results are paginated and sorted in ascending order according their
   * `occurred_at` timestamp (oldest first).
   *
   * BatchRetrieveInventoryChanges is a catch-all query endpoint for queries
   * that cannot be handled by other, simpler endpoints.
   *
   * @param body         An object containing the fields to POST for
   *                                                                    the request.  See the corresponding object
   *                                                                    definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.batchRetrieveInventoryChanges =
  /*#__PURE__*/
  function () {
    var _batchRetrieveInventoryChanges = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/changes/batch-retrieve');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveInventoryChangesRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context7.abrupt("return", req.callAsJson(batchRetrieveInventoryChangesResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function batchRetrieveInventoryChanges(_x13, _x14) {
      return _batchRetrieveInventoryChanges.apply(this, arguments);
    }

    return batchRetrieveInventoryChanges;
  }()
  /**
   * Returns current counts for the provided
   * [CatalogObject]($m/CatalogObject)s at the requested
   * [Location]($m/Location)s.
   *
   * Results are paginated and sorted in descending order according to their
   * `calculated_at` timestamp (newest first).
   *
   * When `updated_after` is specified, only counts that have changed since that
   * time (based on the server timestamp for the most recent change) are
   * returned. This allows clients to perform a "sync" operation, for example
   * in response to receiving a Webhook notification.
   *
   * @param body         An object containing the fields to POST for the
   *                                                                   request.  See the corresponding object
   *                                                                   definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.batchRetrieveInventoryCounts =
  /*#__PURE__*/
  function () {
    var _batchRetrieveInventoryCounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST', '/v2/inventory/counts/batch-retrieve');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveInventoryCountsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context8.abrupt("return", req.callAsJson(batchRetrieveInventoryCountsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function batchRetrieveInventoryCounts(_x15, _x16) {
      return _batchRetrieveInventoryCounts.apply(this, arguments);
    }

    return batchRetrieveInventoryCounts;
  }()
  /**
   * Deprecated version of [RetrieveInventoryPhysicalCount]($e/Inventory/RetrieveInventoryPhysicalCount)
   * after the endpoint URL
   * is updated to conform to the standard convention.
   *
   * @param physicalCountId   ID of the [InventoryPhysicalCount]($m/InventoryPhysicalCount) to retrieve.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.deprecatedRetrieveInventoryPhysicalCount =
  /*#__PURE__*/
  function () {
    var _deprecatedRetrieveInventoryPhysicalCount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(physicalCountId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                physicalCountId: [physicalCountId, string()]
              });
              req.appendTemplatePath(_templateObject3$6(), mapped.physicalCountId);
              req.deprecated('InventoryApi.deprecatedRetrieveInventoryPhysicalCount');
              return _context9.abrupt("return", req.callAsJson(retrieveInventoryPhysicalCountResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deprecatedRetrieveInventoryPhysicalCount(_x17, _x18) {
      return _deprecatedRetrieveInventoryPhysicalCount.apply(this, arguments);
    }

    return deprecatedRetrieveInventoryPhysicalCount;
  }()
  /**
   * Returns the [InventoryPhysicalCount]($m/InventoryPhysicalCount)
   * object with the provided `physical_count_id`.
   *
   * @param physicalCountId   ID of the [InventoryPhysicalCount]($m/InventoryPhysicalCount) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveInventoryPhysicalCount =
  /*#__PURE__*/
  function () {
    var _retrieveInventoryPhysicalCount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(physicalCountId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                physicalCountId: [physicalCountId, string()]
              });
              req.appendTemplatePath(_templateObject4$3(), mapped.physicalCountId);
              return _context10.abrupt("return", req.callAsJson(retrieveInventoryPhysicalCountResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function retrieveInventoryPhysicalCount(_x19, _x20) {
      return _retrieveInventoryPhysicalCount.apply(this, arguments);
    }

    return retrieveInventoryPhysicalCount;
  }()
  /**
   * Returns the [InventoryTransfer]($m/InventoryTransfer) object
   * with the provided `transfer_id`.
   *
   * @param transferId  ID of the [InventoryTransfer]($m/InventoryTransfer) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveInventoryTransfer =
  /*#__PURE__*/
  function () {
    var _retrieveInventoryTransfer = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(transferId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                transferId: [transferId, string()]
              });
              req.appendTemplatePath(_templateObject5$2(), mapped.transferId);
              return _context11.abrupt("return", req.callAsJson(retrieveInventoryTransferResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function retrieveInventoryTransfer(_x21, _x22) {
      return _retrieveInventoryTransfer.apply(this, arguments);
    }

    return retrieveInventoryTransfer;
  }()
  /**
   * Retrieves the current calculated stock count for a given
   * [CatalogObject]($m/CatalogObject) at a given set of
   * [Location]($m/Location)s. Responses are paginated and unsorted.
   * For more sophisticated queries, use a batch endpoint.
   *
   * @param catalogObjectId   ID of the [CatalogObject]($m/CatalogObject) to retrieve.
   * @param locationIds       The [Location]($m/Location) IDs to look up as a comma-separated list. An empty
   *                                    list queries all locations.
   * @param cursor            A pagination cursor returned by a previous call to this endpoint. Provide this
   *                                    to retrieve the next set of results for the original query.  See the
   *                                    [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)
   *                                    guide for more information.
   * @return Response from the API call
   */
  ;

  _proto.retrieveInventoryCount =
  /*#__PURE__*/
  function () {
    var _retrieveInventoryCount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(catalogObjectId, locationIds, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                catalogObjectId: [catalogObjectId, string()],
                locationIds: [locationIds, optional(string())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_ids', mapped.locationIds);
              req.query('cursor', mapped.cursor);
              req.appendTemplatePath(_templateObject6$2(), mapped.catalogObjectId);
              return _context12.abrupt("return", req.callAsJson(retrieveInventoryCountResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function retrieveInventoryCount(_x23, _x24, _x25, _x26) {
      return _retrieveInventoryCount.apply(this, arguments);
    }

    return retrieveInventoryCount;
  }()
  /**
   * Returns a set of physical counts and inventory adjustments for the
   * provided [CatalogObject]($m/CatalogObject) at the requested
   * [Location]($m/Location)s.
   *
   * You can achieve the same result by calling
   * [BatchRetrieveInventoryChanges]($e/Inventory/BatchRetrieveInventoryChanges)
   * and having the `catalog_object_ids` list contain a single element of the `CatalogObject` ID.
   *
   * Results are paginated and sorted in descending order according to their
   * `occurred_at` timestamp (newest first).
   *
   * There are no limits on how far back the caller can page. This endpoint can be
   * used to display recent changes for a specific item. For more
   * sophisticated queries, use a batch endpoint.
   *
   * @param catalogObjectId   ID of the [CatalogObject]($m/CatalogObject) to retrieve.
   * @param locationIds       The [Location]($m/Location) IDs to look up as a comma-separated list. An empty
   *                                    list queries all locations.
   * @param cursor            A pagination cursor returned by a previous call to this endpoint. Provide this
   *                                    to retrieve the next set of results for the original query.  See the
   *                                    [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)
   *                                    guide for more information.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrieveInventoryChanges =
  /*#__PURE__*/
  function () {
    var _retrieveInventoryChanges = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(catalogObjectId, locationIds, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                catalogObjectId: [catalogObjectId, string()],
                locationIds: [locationIds, optional(string())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_ids', mapped.locationIds);
              req.query('cursor', mapped.cursor);
              req.appendTemplatePath(_templateObject7$2(), mapped.catalogObjectId);
              req.deprecated('InventoryApi.retrieveInventoryChanges');
              return _context13.abrupt("return", req.callAsJson(retrieveInventoryChangesResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function retrieveInventoryChanges(_x27, _x28, _x29, _x30) {
      return _retrieveInventoryChanges.apply(this, arguments);
    }

    return retrieveInventoryChanges;
  }();

  return InventoryApi;
}(BaseApi);

var cancelInvoiceRequestSchema = /*#__PURE__*/object({
  version: ['version', /*#__PURE__*/number()]
});

var invoiceAcceptedPaymentMethodsSchema = /*#__PURE__*/object({
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  squareGiftCard: ['square_gift_card', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  bankAccount: ['bank_account', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var invoiceCustomFieldSchema = /*#__PURE__*/object({
  label: ['label', /*#__PURE__*/optional( /*#__PURE__*/string())],
  value: ['value', /*#__PURE__*/optional( /*#__PURE__*/string())],
  placement: ['placement', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var invoicePaymentReminderSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  relativeScheduledDays: ['relative_scheduled_days', /*#__PURE__*/optional( /*#__PURE__*/number())],
  message: ['message', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sentAt: ['sent_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var invoicePaymentRequestSchema = /*#__PURE__*/object({
  uid: ['uid', /*#__PURE__*/optional( /*#__PURE__*/string())],
  requestMethod: ['request_method', /*#__PURE__*/optional( /*#__PURE__*/string())],
  requestType: ['request_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  dueDate: ['due_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fixedAmountRequestedMoney: ['fixed_amount_requested_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  percentageRequested: ['percentage_requested', /*#__PURE__*/optional( /*#__PURE__*/string())],
  tippingEnabled: ['tipping_enabled', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  automaticPaymentSource: ['automatic_payment_source', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cardId: ['card_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reminders: ['reminders', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return invoicePaymentReminderSchema;
  })))],
  computedAmountMoney: ['computed_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalCompletedAmountMoney: ['total_completed_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  roundingAdjustmentIncludedMoney: ['rounding_adjustment_included_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var invoiceRecipientTaxIdsSchema = /*#__PURE__*/object({
  euVat: ['eu_vat', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var invoiceRecipientSchema = /*#__PURE__*/object({
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  givenName: ['given_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  familyName: ['family_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  companyName: ['company_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceRecipientTaxIdsSchema;
  }))]
});

var invoiceSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  primaryRecipient: ['primary_recipient', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceRecipientSchema;
  }))],
  paymentRequests: ['payment_requests', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return invoicePaymentRequestSchema;
  })))],
  deliveryMethod: ['delivery_method', /*#__PURE__*/optional( /*#__PURE__*/string())],
  invoiceNumber: ['invoice_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  title: ['title', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  scheduledAt: ['scheduled_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  publicUrl: ['public_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  nextPaymentAmountMoney: ['next_payment_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timezone: ['timezone', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  acceptedPaymentMethods: ['accepted_payment_methods', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceAcceptedPaymentMethodsSchema;
  }))],
  customFields: ['custom_fields', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return invoiceCustomFieldSchema;
  })))],
  subscriptionId: ['subscription_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  saleOrServiceDate: ['sale_or_service_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentConditions: ['payment_conditions', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cancelInvoiceResponseSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var createInvoiceRequestSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  })],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createInvoiceResponseSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var deleteInvoiceResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var getInvoiceResponseSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listInvoicesResponseSchema = /*#__PURE__*/object({
  invoices: ['invoices', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var publishInvoiceRequestSchema = /*#__PURE__*/object({
  version: ['version', /*#__PURE__*/number()],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var publishInvoiceResponseSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var invoiceFilterSchema = /*#__PURE__*/object({
  locationIds: ['location_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  customerIds: ['customer_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var invoiceSortSchema = /*#__PURE__*/object({
  field: ['field', /*#__PURE__*/string()],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var invoiceQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/lazy(function () {
    return invoiceFilterSchema;
  })],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSortSchema;
  }))]
});

var searchInvoicesRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/lazy(function () {
    return invoiceQuerySchema;
  })],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchInvoicesResponseSchema = /*#__PURE__*/object({
  invoices: ['invoices', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateInvoiceRequestSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  })],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fieldsToClear: ['fields_to_clear', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var updateInvoiceResponseSchema = /*#__PURE__*/object({
  invoice: ['invoice', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return invoiceSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject5$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/invoices/", "/publish"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/invoices/", "/cancel"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$7() {
  var data = _taggedTemplateLiteralLoose(["/v2/invoices/", ""]);

  _templateObject3$7 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$a() {
  var data = _taggedTemplateLiteralLoose(["/v2/invoices/", ""]);

  _templateObject2$a = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$e() {
  var data = _taggedTemplateLiteralLoose(["/v2/invoices/", ""]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var InvoicesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(InvoicesApi, _BaseApi);

  function InvoicesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = InvoicesApi.prototype;

  /**
   * Returns a list of invoices for a given location. The response
   * is paginated. If truncated, the response includes a `cursor` that you
   * use in a subsequent request to retrieve the next set of invoices.
   *
   * @param locationId  The ID of the location for which to list invoices.
   * @param cursor      A pagination cursor returned by a previous call to this endpoint.  Provide this
   *                              cursor to retrieve the next set of results for your original query.  For more
   *                              information, see [Pagination](https://developer.squareup.com/docs/working-with-
   *                              apis/pagination).
   * @param limit       The maximum number of invoices to return (200 is the maximum `limit`).  If not
   *                              provided, the server uses a default limit of 100 invoices.
   * @return Response from the API call
   */
  _proto.listInvoices =
  /*#__PURE__*/
  function () {
    var _listInvoices = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, cursor, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/invoices');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('location_id', mapped.locationId);
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              return _context.abrupt("return", req.callAsJson(listInvoicesResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listInvoices(_x, _x2, _x3, _x4) {
      return _listInvoices.apply(this, arguments);
    }

    return listInvoices;
  }()
  /**
   * Creates a draft [invoice]($m/Invoice)
   * for an order created using the Orders API.
   *
   * A draft invoice remains in your account and no action is taken.
   * You must publish the invoice before Square can process it (send it to the customer's email address
   * or charge the customer’s card on file).
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createInvoice =
  /*#__PURE__*/
  function () {
    var _createInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/invoices');
              mapped = req.prepareArgs({
                body: [body, createInvoiceRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createInvoiceResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createInvoice(_x5, _x6) {
      return _createInvoice.apply(this, arguments);
    }

    return createInvoice;
  }()
  /**
   * Searches for invoices from a location specified in
   * the filter. You can optionally specify customers in the filter for whom to
   * retrieve invoices. In the current implementation, you can only specify one location and
   * optionally one customer.
   *
   * The response is paginated. If truncated, the response includes a `cursor`
   * that you use in a subsequent request to retrieve the next set of invoices.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchInvoices =
  /*#__PURE__*/
  function () {
    var _searchInvoices = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/invoices/search');
              mapped = req.prepareArgs({
                body: [body, searchInvoicesRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(searchInvoicesResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function searchInvoices(_x7, _x8) {
      return _searchInvoices.apply(this, arguments);
    }

    return searchInvoices;
  }()
  /**
   * Deletes the specified invoice. When an invoice is deleted, the
   * associated order status changes to CANCELED. You can only delete a draft
   * invoice (you cannot delete a published invoice, including one that is scheduled for processing).
   *
   * @param invoiceId  The ID of the invoice to delete.
   * @param version    The version of the [invoice]($m/Invoice) to delete. If you do not know the version,
   *                             you can call [GetInvoice]($e/Invoices/GetInvoice) or
   *                             [ListInvoices]($e/Invoices/ListInvoices).
   * @return Response from the API call
   */
  ;

  _proto.deleteInvoice =
  /*#__PURE__*/
  function () {
    var _deleteInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(invoiceId, version, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                invoiceId: [invoiceId, string()],
                version: [version, optional(number())]
              });
              req.query('version', mapped.version);
              req.appendTemplatePath(_templateObject$e(), mapped.invoiceId);
              return _context4.abrupt("return", req.callAsJson(deleteInvoiceResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteInvoice(_x9, _x10, _x11) {
      return _deleteInvoice.apply(this, arguments);
    }

    return deleteInvoice;
  }()
  /**
   * Retrieves an invoice by invoice ID.
   *
   * @param invoiceId  The ID of the invoice to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.getInvoice =
  /*#__PURE__*/
  function () {
    var _getInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(invoiceId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                invoiceId: [invoiceId, string()]
              });
              req.appendTemplatePath(_templateObject2$a(), mapped.invoiceId);
              return _context5.abrupt("return", req.callAsJson(getInvoiceResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getInvoice(_x12, _x13) {
      return _getInvoice.apply(this, arguments);
    }

    return getInvoice;
  }()
  /**
   * Updates an invoice by modifying fields, clearing fields, or both. For most updates, you can use a
   * sparse
   * `Invoice` object to add fields or change values and use the `fields_to_clear` field to specify
   * fields to clear.
   * However, some restrictions apply. For example, you cannot change the `order_id` or `location_id`
   * field and you
   * must provide the complete `custom_fields` list to update a custom field. Published invoices have
   * additional restrictions.
   *
   * @param invoiceId    The ID of the invoice to update.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateInvoice =
  /*#__PURE__*/
  function () {
    var _updateInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(invoiceId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                invoiceId: [invoiceId, string()],
                body: [body, updateInvoiceRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$7(), mapped.invoiceId);
              return _context6.abrupt("return", req.callAsJson(updateInvoiceResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updateInvoice(_x14, _x15, _x16) {
      return _updateInvoice.apply(this, arguments);
    }

    return updateInvoice;
  }()
  /**
   * Cancels an invoice. The seller cannot collect payments for
   * the canceled invoice.
   *
   * You cannot cancel an invoice in the `DRAFT` state or in a terminal state: `PAID`, `REFUNDED`,
   * `CANCELED`, or `FAILED`.
   *
   * @param invoiceId    The ID of the [invoice]($m/Invoice) to cancel.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.cancelInvoice =
  /*#__PURE__*/
  function () {
    var _cancelInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(invoiceId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                invoiceId: [invoiceId, string()],
                body: [body, cancelInvoiceRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject4$4(), mapped.invoiceId);
              return _context7.abrupt("return", req.callAsJson(cancelInvoiceResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function cancelInvoice(_x17, _x18, _x19) {
      return _cancelInvoice.apply(this, arguments);
    }

    return cancelInvoice;
  }()
  /**
   * Publishes the specified draft invoice.
   *
   * After an invoice is published, Square
   * follows up based on the invoice configuration. For example, Square
   * sends the invoice to the customer's email address, charges the customer's card on file, or does
   * nothing. Square also makes the invoice available on a Square-hosted invoice page.
   *
   * The invoice `status` also changes from `DRAFT` to a status
   * based on the invoice configuration. For example, the status changes to `UNPAID` if
   * Square emails the invoice or `PARTIALLY_PAID` if Square charge a card on file for a portion of the
   * invoice amount.
   *
   * @param invoiceId    The ID of the invoice to publish.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.publishInvoice =
  /*#__PURE__*/
  function () {
    var _publishInvoice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(invoiceId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                invoiceId: [invoiceId, string()],
                body: [body, publishInvoiceRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject5$3(), mapped.invoiceId);
              return _context8.abrupt("return", req.callAsJson(publishInvoiceResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function publishInvoice(_x20, _x21, _x22) {
      return _publishInvoice.apply(this, arguments);
    }

    return publishInvoice;
  }();

  return InvoicesApi;
}(BaseApi);

var breakTypeSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/string()],
  breakName: ['break_name', /*#__PURE__*/string()],
  expectedDuration: ['expected_duration', /*#__PURE__*/string()],
  isPaid: ['is_paid', /*#__PURE__*/boolean()],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createBreakTypeRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  breakType: ['break_type', /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  })]
});

var createBreakTypeResponseSchema = /*#__PURE__*/object({
  breakType: ['break_type', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var breakSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startAt: ['start_at', /*#__PURE__*/string()],
  endAt: ['end_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  breakTypeId: ['break_type_id', /*#__PURE__*/string()],
  name: ['name', /*#__PURE__*/string()],
  expectedDuration: ['expected_duration', /*#__PURE__*/string()],
  isPaid: ['is_paid', /*#__PURE__*/boolean()]
});

var shiftWageSchema = /*#__PURE__*/object({
  title: ['title', /*#__PURE__*/optional( /*#__PURE__*/string())],
  hourlyRate: ['hourly_rate', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var shiftSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timezone: ['timezone', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startAt: ['start_at', /*#__PURE__*/string()],
  endAt: ['end_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  wage: ['wage', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftWageSchema;
  }))],
  breaks: ['breaks', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return breakSchema;
  })))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createShiftRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shift: ['shift', /*#__PURE__*/lazy(function () {
    return shiftSchema;
  })]
});

var createShiftResponseSchema = /*#__PURE__*/object({
  shift: ['shift', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var deleteBreakTypeResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var deleteShiftResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var getBreakTypeResponseSchema = /*#__PURE__*/object({
  breakType: ['break_type', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var employeeWageSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  title: ['title', /*#__PURE__*/optional( /*#__PURE__*/string())],
  hourlyRate: ['hourly_rate', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var getEmployeeWageResponseSchema = /*#__PURE__*/object({
  employeeWage: ['employee_wage', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return employeeWageSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var getShiftResponseSchema = /*#__PURE__*/object({
  shift: ['shift', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var teamMemberWageSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  title: ['title', /*#__PURE__*/optional( /*#__PURE__*/string())],
  hourlyRate: ['hourly_rate', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var getTeamMemberWageResponseSchema = /*#__PURE__*/object({
  teamMemberWage: ['team_member_wage', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberWageSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listBreakTypesResponseSchema = /*#__PURE__*/object({
  breakTypes: ['break_types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listEmployeeWagesResponseSchema = /*#__PURE__*/object({
  employeeWages: ['employee_wages', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return employeeWageSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var listTeamMemberWagesResponseSchema = /*#__PURE__*/object({
  teamMemberWages: ['team_member_wages', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return teamMemberWageSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var workweekConfigSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startOfWeek: ['start_of_week', /*#__PURE__*/string()],
  startOfDayLocalTime: ['start_of_day_local_time', /*#__PURE__*/string()],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listWorkweekConfigsResponseSchema = /*#__PURE__*/object({
  workweekConfigs: ['workweek_configs', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return workweekConfigSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var dateRangeSchema = /*#__PURE__*/object({
  startDate: ['start_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endDate: ['end_date', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var shiftWorkdaySchema = /*#__PURE__*/object({
  dateRange: ['date_range', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return dateRangeSchema;
  }))],
  matchShiftsBy: ['match_shifts_by', /*#__PURE__*/optional( /*#__PURE__*/string())],
  defaultTimezone: ['default_timezone', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var shiftFilterSchema = /*#__PURE__*/object({
  locationIds: ['location_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  employeeIds: ['employee_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  start: ['start', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  end: ['end', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  workday: ['workday', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftWorkdaySchema;
  }))],
  teamMemberIds: ['team_member_ids', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var shiftSortSchema = /*#__PURE__*/object({
  field: ['field', /*#__PURE__*/optional( /*#__PURE__*/string())],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var shiftQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftSortSchema;
  }))]
});

var searchShiftsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchShiftsResponseSchema = /*#__PURE__*/object({
  shifts: ['shifts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return shiftSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateBreakTypeRequestSchema = /*#__PURE__*/object({
  breakType: ['break_type', /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  })]
});

var updateBreakTypeResponseSchema = /*#__PURE__*/object({
  breakType: ['break_type', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return breakTypeSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateShiftRequestSchema = /*#__PURE__*/object({
  shift: ['shift', /*#__PURE__*/lazy(function () {
    return shiftSchema;
  })]
});

var updateShiftResponseSchema = /*#__PURE__*/object({
  shift: ['shift', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return shiftSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateWorkweekConfigRequestSchema = /*#__PURE__*/object({
  workweekConfig: ['workweek_config', /*#__PURE__*/lazy(function () {
    return workweekConfigSchema;
  })]
});

var updateWorkweekConfigResponseSchema = /*#__PURE__*/object({
  workweekConfig: ['workweek_config', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return workweekConfigSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/workweek-configs/", ""]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$1() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/team-member-wages/", ""]);

  _templateObject8$1 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/shifts/", ""]);

  _templateObject7$3 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/shifts/", ""]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/shifts/", ""]);

  _templateObject5$4 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/employee-wages/", ""]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$8() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/break-types/", ""]);

  _templateObject3$8 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$b() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/break-types/", ""]);

  _templateObject2$b = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$f() {
  var data = _taggedTemplateLiteralLoose(["/v2/labor/break-types/", ""]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
var LaborApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(LaborApi, _BaseApi);

  function LaborApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = LaborApi.prototype;

  /**
   * Returns a paginated list of `BreakType` instances for a business.
   *
   * @param locationId  Filter the returned `BreakType` results to only those that are associated with the
   *                              specified location.
   * @param limit       The maximum number of `BreakType` results to return per page. The number can range
   *                              between 1 and 200. The default is 200.
   * @param cursor      A pointer to the next page of `BreakType` results to fetch.
   * @return Response from the API call
   */
  _proto.listBreakTypes =
  /*#__PURE__*/
  function () {
    var _listBreakTypes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/labor/break-types');
              mapped = req.prepareArgs({
                locationId: [locationId, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('location_id', mapped.locationId);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              return _context.abrupt("return", req.callAsJson(listBreakTypesResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listBreakTypes(_x, _x2, _x3, _x4) {
      return _listBreakTypes.apply(this, arguments);
    }

    return listBreakTypes;
  }()
  /**
   * Creates a new `BreakType`.
   *
   * A `BreakType` is a template for creating `Break` objects.
   * You must provide the following values in your request to this
   * endpoint:
   *
   * - `location_id`
   * - `break_name`
   * - `expected_duration`
   * - `is_paid`
   *
   * You can only have three `BreakType` instances per location. If you attempt to add a fourth
   * `BreakType` for a location, an `INVALID_REQUEST_ERROR` "Exceeded limit of 3 breaks per location."
   * is returned.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                      See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createBreakType =
  /*#__PURE__*/
  function () {
    var _createBreakType = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/labor/break-types');
              mapped = req.prepareArgs({
                body: [body, createBreakTypeRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createBreakTypeResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createBreakType(_x5, _x6) {
      return _createBreakType.apply(this, arguments);
    }

    return createBreakType;
  }()
  /**
   * Deletes an existing `BreakType`.
   *
   * A `BreakType` can be deleted even if it is referenced from a `Shift`.
   *
   * @param id The UUID for the `BreakType` being deleted.
   * @return Response from the API call
   */
  ;

  _proto.deleteBreakType =
  /*#__PURE__*/
  function () {
    var _deleteBreakType = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject$f(), mapped.id);
              return _context3.abrupt("return", req.callAsJson(deleteBreakTypeResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteBreakType(_x7, _x8) {
      return _deleteBreakType.apply(this, arguments);
    }

    return deleteBreakType;
  }()
  /**
   * Returns a single `BreakType` specified by `id`.
   *
   * @param id The UUID for the `BreakType` being retrieved.
   * @return Response from the API call
   */
  ;

  _proto.getBreakType =
  /*#__PURE__*/
  function () {
    var _getBreakType = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject2$b(), mapped.id);
              return _context4.abrupt("return", req.callAsJson(getBreakTypeResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getBreakType(_x9, _x10) {
      return _getBreakType.apply(this, arguments);
    }

    return getBreakType;
  }()
  /**
   * Updates an existing `BreakType`.
   *
   * @param id           The UUID for the `BreakType` being updated.
   * @param body         An object containing the fields to POST for the request.
   *                                                      See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateBreakType =
  /*#__PURE__*/
  function () {
    var _updateBreakType = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(id, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                id: [id, string()],
                body: [body, updateBreakTypeRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$8(), mapped.id);
              return _context5.abrupt("return", req.callAsJson(updateBreakTypeResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updateBreakType(_x11, _x12, _x13) {
      return _updateBreakType.apply(this, arguments);
    }

    return updateBreakType;
  }()
  /**
   * Returns a paginated list of `EmployeeWage` instances for a business.
   *
   * @param employeeId  Filter the returned wages to only those that are associated with the specified
   *                              employee.
   * @param limit       The maximum number of `EmployeeWage` results to return per page. The number can
   *                              range between 1 and 200. The default is 200.
   * @param cursor      A pointer to the next page of `EmployeeWage` results to fetch.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.listEmployeeWages =
  /*#__PURE__*/
  function () {
    var _listEmployeeWages = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(employeeId, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET', '/v2/labor/employee-wages');
              mapped = req.prepareArgs({
                employeeId: [employeeId, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('employee_id', mapped.employeeId);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              req.deprecated('LaborApi.listEmployeeWages');
              return _context6.abrupt("return", req.callAsJson(listEmployeeWagesResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function listEmployeeWages(_x14, _x15, _x16, _x17) {
      return _listEmployeeWages.apply(this, arguments);
    }

    return listEmployeeWages;
  }()
  /**
   * Returns a single `EmployeeWage` specified by `id`.
   *
   * @param id The UUID for the `EmployeeWage` being retrieved.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.getEmployeeWage =
  /*#__PURE__*/
  function () {
    var _getEmployeeWage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject4$5(), mapped.id);
              req.deprecated('LaborApi.getEmployeeWage');
              return _context7.abrupt("return", req.callAsJson(getEmployeeWageResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getEmployeeWage(_x18, _x19) {
      return _getEmployeeWage.apply(this, arguments);
    }

    return getEmployeeWage;
  }()
  /**
   * Creates a new `Shift`.
   *
   * A `Shift` represents a complete workday for a single employee.
   * You must provide the following values in your request to this
   * endpoint:
   *
   * - `location_id`
   * - `employee_id`
   * - `start_at`
   *
   * An attempt to create a new `Shift` can result in a `BAD_REQUEST` error when:
   * - The `status` of the new `Shift` is `OPEN` and the employee has another
   * shift with an `OPEN` status.
   * - The `start_at` date is in the future.
   * - The `start_at` or `end_at` date overlaps another shift for the same employee.
   * - The `Break` instances are set in the request and a break `start_at`
   * is before the `Shift.start_at`, a break `end_at` is after
   * the `Shift.end_at`, or both.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createShift =
  /*#__PURE__*/
  function () {
    var _createShift = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST', '/v2/labor/shifts');
              mapped = req.prepareArgs({
                body: [body, createShiftRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context8.abrupt("return", req.callAsJson(createShiftResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function createShift(_x20, _x21) {
      return _createShift.apply(this, arguments);
    }

    return createShift;
  }()
  /**
   * Returns a paginated list of `Shift` records for a business.
   * The list to be returned can be filtered by:
   * - Location IDs.
   * - Employee IDs.
   * - Shift status (`OPEN` and `CLOSED`).
   * - Shift start.
   * - Shift end.
   * - Workday details.
   *
   * The list can be sorted by:
   * - `start_at`.
   * - `end_at`.
   * - `created_at`.
   * - `updated_at`.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                   the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchShifts =
  /*#__PURE__*/
  function () {
    var _searchShifts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('POST', '/v2/labor/shifts/search');
              mapped = req.prepareArgs({
                body: [body, searchShiftsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context9.abrupt("return", req.callAsJson(searchShiftsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function searchShifts(_x22, _x23) {
      return _searchShifts.apply(this, arguments);
    }

    return searchShifts;
  }()
  /**
   * Deletes a `Shift`.
   *
   * @param id The UUID for the `Shift` being deleted.
   * @return Response from the API call
   */
  ;

  _proto.deleteShift =
  /*#__PURE__*/
  function () {
    var _deleteShift = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject5$4(), mapped.id);
              return _context10.abrupt("return", req.callAsJson(deleteShiftResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function deleteShift(_x24, _x25) {
      return _deleteShift.apply(this, arguments);
    }

    return deleteShift;
  }()
  /**
   * Returns a single `Shift` specified by `id`.
   *
   * @param id The UUID for the `Shift` being retrieved.
   * @return Response from the API call
   */
  ;

  _proto.getShift =
  /*#__PURE__*/
  function () {
    var _getShift = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject6$3(), mapped.id);
              return _context11.abrupt("return", req.callAsJson(getShiftResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function getShift(_x26, _x27) {
      return _getShift.apply(this, arguments);
    }

    return getShift;
  }()
  /**
   * Updates an existing `Shift`.
   *
   * When adding a `Break` to a `Shift`, any earlier `Break` instances in the `Shift` have
   * the `end_at` property set to a valid RFC-3339 datetime string.
   *
   * When closing a `Shift`, all `Break` instances in the `Shift` must be complete with `end_at`
   * set on each `Break`.
   *
   * @param id           The ID of the object being updated.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateShift =
  /*#__PURE__*/
  function () {
    var _updateShift = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(id, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                id: [id, string()],
                body: [body, updateShiftRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject7$3(), mapped.id);
              return _context12.abrupt("return", req.callAsJson(updateShiftResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function updateShift(_x28, _x29, _x30) {
      return _updateShift.apply(this, arguments);
    }

    return updateShift;
  }()
  /**
   * Returns a paginated list of `TeamMemberWage` instances for a business.
   *
   * @param teamMemberId   Filter the returned wages to only those that are associated with the specified
   *                                 team member.
   * @param limit          The maximum number of `TeamMemberWage` results to return per page. The number can
   *                                 range between 1 and 200. The default is 200.
   * @param cursor         A pointer to the next page of `EmployeeWage` results to fetch.
   * @return Response from the API call
   */
  ;

  _proto.listTeamMemberWages =
  /*#__PURE__*/
  function () {
    var _listTeamMemberWages = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(teamMemberId, limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              req = this.createRequest('GET', '/v2/labor/team-member-wages');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, optional(string())],
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('team_member_id', mapped.teamMemberId);
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              return _context13.abrupt("return", req.callAsJson(listTeamMemberWagesResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function listTeamMemberWages(_x31, _x32, _x33, _x34) {
      return _listTeamMemberWages.apply(this, arguments);
    }

    return listTeamMemberWages;
  }()
  /**
   * Returns a single `TeamMemberWage` specified by `id `.
   *
   * @param id The UUID for the `TeamMemberWage` being retrieved.
   * @return Response from the API call
   */
  ;

  _proto.getTeamMemberWage =
  /*#__PURE__*/
  function () {
    var _getTeamMemberWage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(id, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                id: [id, string()]
              });
              req.appendTemplatePath(_templateObject8$1(), mapped.id);
              return _context14.abrupt("return", req.callAsJson(getTeamMemberWageResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function getTeamMemberWage(_x35, _x36) {
      return _getTeamMemberWage.apply(this, arguments);
    }

    return getTeamMemberWage;
  }()
  /**
   * Returns a list of `WorkweekConfig` instances for a business.
   *
   * @param limit  The maximum number of `WorkweekConfigs` results to return per page.
   * @param cursor A pointer to the next page of `WorkweekConfig` results to fetch.
   * @return Response from the API call
   */
  ;

  _proto.listWorkweekConfigs =
  /*#__PURE__*/
  function () {
    var _listWorkweekConfigs = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(limit, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              req = this.createRequest('GET', '/v2/labor/workweek-configs');
              mapped = req.prepareArgs({
                limit: [limit, optional(number())],
                cursor: [cursor, optional(string())]
              });
              req.query('limit', mapped.limit);
              req.query('cursor', mapped.cursor);
              return _context15.abrupt("return", req.callAsJson(listWorkweekConfigsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function listWorkweekConfigs(_x37, _x38, _x39) {
      return _listWorkweekConfigs.apply(this, arguments);
    }

    return listWorkweekConfigs;
  }()
  /**
   * Updates a `WorkweekConfig`.
   *
   * @param id           The UUID for the `WorkweekConfig` object being updated.
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.updateWorkweekConfig =
  /*#__PURE__*/
  function () {
    var _updateWorkweekConfig = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee16(id, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                id: [id, string()],
                body: [body, updateWorkweekConfigRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject9(), mapped.id);
              return _context16.abrupt("return", req.callAsJson(updateWorkweekConfigResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function updateWorkweekConfig(_x40, _x41, _x42) {
      return _updateWorkweekConfig.apply(this, arguments);
    }

    return updateWorkweekConfig;
  }();

  return LaborApi;
}(BaseApi);

var businessHoursPeriodSchema = /*#__PURE__*/object({
  dayOfWeek: ['day_of_week', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startLocalTime: ['start_local_time', /*#__PURE__*/optional( /*#__PURE__*/string())],
  endLocalTime: ['end_local_time', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var businessHoursSchema = /*#__PURE__*/object({
  periods: ['periods', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return businessHoursPeriodSchema;
  })))]
});

var coordinatesSchema = /*#__PURE__*/object({
  latitude: ['latitude', /*#__PURE__*/optional( /*#__PURE__*/number())],
  longitude: ['longitude', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var taxIdsSchema = /*#__PURE__*/object({
  euVat: ['eu_vat', /*#__PURE__*/optional( /*#__PURE__*/string())],
  frSiret: ['fr_siret', /*#__PURE__*/optional( /*#__PURE__*/string())],
  frNaf: ['fr_naf', /*#__PURE__*/optional( /*#__PURE__*/string())],
  esNif: ['es_nif', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var locationSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  timezone: ['timezone', /*#__PURE__*/optional( /*#__PURE__*/string())],
  capabilities: ['capabilities', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  country: ['country', /*#__PURE__*/optional( /*#__PURE__*/string())],
  languageCode: ['language_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  currency: ['currency', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  businessName: ['business_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  websiteUrl: ['website_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  businessHours: ['business_hours', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return businessHoursSchema;
  }))],
  businessEmail: ['business_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  description: ['description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  twitterUsername: ['twitter_username', /*#__PURE__*/optional( /*#__PURE__*/string())],
  instagramUsername: ['instagram_username', /*#__PURE__*/optional( /*#__PURE__*/string())],
  facebookUrl: ['facebook_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  coordinates: ['coordinates', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return coordinatesSchema;
  }))],
  logoUrl: ['logo_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  posBackgroundUrl: ['pos_background_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  mcc: ['mcc', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fullFormatLogoUrl: ['full_format_logo_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxIds: ['tax_ids', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return taxIdsSchema;
  }))]
});

var createLocationRequestSchema = /*#__PURE__*/object({
  location: ['location', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return locationSchema;
  }))]
});

var createLocationResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  location: ['location', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return locationSchema;
  }))]
});

var listLocationsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  locations: ['locations', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return locationSchema;
  })))]
});

var retrieveLocationResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  location: ['location', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return locationSchema;
  }))]
});

var updateLocationRequestSchema = /*#__PURE__*/object({
  location: ['location', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return locationSchema;
  }))]
});

var updateLocationResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  location: ['location', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return locationSchema;
  }))]
});

function _templateObject2$c() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", ""]);

  _templateObject2$c = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$g() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", ""]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
var LocationsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(LocationsApi, _BaseApi);

  function LocationsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = LocationsApi.prototype;

  /**
   * Provides details about all of the seller's [locations](https://developer.squareup.com/docs/locations-
   * api),
   * including those with an inactive status.
   *
   * @return Response from the API call
   */
  _proto.listLocations =
  /*#__PURE__*/
  function () {
    var _listLocations = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(requestOptions) {
      var req;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/locations');
              return _context.abrupt("return", req.callAsJson(listLocationsResponseSchema, requestOptions));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listLocations(_x) {
      return _listLocations.apply(this, arguments);
    }

    return listLocations;
  }()
  /**
   * Creates a [location](https://developer.squareup.com/docs/locations-api).
   * Creating new locations allows for separate configuration of receipt layouts, item prices,
   * and sales reports. Developers can use locations to separate sales activity via applications
   * that integrate with Square from sales activity elsewhere in a seller's account.
   * Locations created programmatically with the Locations API will last forever and
   * are visible to the seller for their own management, so ensure that
   * each location has a sensible and unique name.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createLocation =
  /*#__PURE__*/
  function () {
    var _createLocation = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/locations');
              mapped = req.prepareArgs({
                body: [body, createLocationRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createLocationResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createLocation(_x2, _x3) {
      return _createLocation.apply(this, arguments);
    }

    return createLocation;
  }()
  /**
   * Retrieves details of a single location. Specify "main"
   * as the location ID to retrieve details of the [main location](https://developer.squareup.
   * com/docs/locations-api#about-the-main-location).
   *
   * @param locationId  The ID of the location to retrieve. Specify the string "main" to return the main
   *                              location.
   * @return Response from the API call
   */
  ;

  _proto.retrieveLocation =
  /*#__PURE__*/
  function () {
    var _retrieveLocation = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(locationId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()]
              });
              req.appendTemplatePath(_templateObject$g(), mapped.locationId);
              return _context3.abrupt("return", req.callAsJson(retrieveLocationResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function retrieveLocation(_x4, _x5) {
      return _retrieveLocation.apply(this, arguments);
    }

    return retrieveLocation;
  }()
  /**
   * Updates a [location](https://developer.squareup.com/docs/locations-api).
   *
   * @param locationId   The ID of the location to update.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateLocation =
  /*#__PURE__*/
  function () {
    var _updateLocation = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(locationId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                body: [body, updateLocationRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$c(), mapped.locationId);
              return _context4.abrupt("return", req.callAsJson(updateLocationResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateLocation(_x6, _x7, _x8) {
      return _updateLocation.apply(this, arguments);
    }

    return updateLocation;
  }();

  return LocationsApi;
}(BaseApi);

var loyaltyEventAccumulatePointsSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  points: ['points', /*#__PURE__*/optional( /*#__PURE__*/number())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var accumulateLoyaltyPointsRequestSchema = /*#__PURE__*/object({
  accumulatePoints: ['accumulate_points', /*#__PURE__*/lazy(function () {
    return loyaltyEventAccumulatePointsSchema;
  })],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/string()]
});

var loyaltyEventAdjustPointsSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  points: ['points', /*#__PURE__*/number()],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var loyaltyEventCreateRewardSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/string()],
  rewardId: ['reward_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  points: ['points', /*#__PURE__*/number()]
});

var loyaltyEventDeleteRewardSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/string()],
  rewardId: ['reward_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  points: ['points', /*#__PURE__*/number()]
});

var loyaltyEventExpirePointsSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/string()],
  points: ['points', /*#__PURE__*/number()]
});

var loyaltyEventOtherSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/string()],
  points: ['points', /*#__PURE__*/number()]
});

var loyaltyEventRedeemRewardSchema = /*#__PURE__*/object({
  loyaltyProgramId: ['loyalty_program_id', /*#__PURE__*/string()],
  rewardId: ['reward_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var loyaltyEventSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  type: ['type', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/string()],
  accumulatePoints: ['accumulate_points', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventAccumulatePointsSchema;
  }))],
  createReward: ['create_reward', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventCreateRewardSchema;
  }))],
  redeemReward: ['redeem_reward', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventRedeemRewardSchema;
  }))],
  deleteReward: ['delete_reward', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventDeleteRewardSchema;
  }))],
  adjustPoints: ['adjust_points', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventAdjustPointsSchema;
  }))],
  loyaltyAccountId: ['loyalty_account_id', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/string()],
  expirePoints: ['expire_points', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventExpirePointsSchema;
  }))],
  otherEvent: ['other_event', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventOtherSchema;
  }))]
});

var accumulateLoyaltyPointsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  event: ['event', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventSchema;
  }))]
});

var adjustLoyaltyPointsRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  adjustPoints: ['adjust_points', /*#__PURE__*/lazy(function () {
    return loyaltyEventAdjustPointsSchema;
  })]
});

var adjustLoyaltyPointsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  event: ['event', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventSchema;
  }))]
});

var calculateLoyaltyPointsRequestSchema = /*#__PURE__*/object({
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  transactionAmountMoney: ['transaction_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var calculateLoyaltyPointsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  points: ['points', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var loyaltyAccountExpiringPointDeadlineSchema = /*#__PURE__*/object({
  points: ['points', /*#__PURE__*/number()],
  expiresAt: ['expires_at', /*#__PURE__*/string()]
});

var loyaltyAccountMappingSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var loyaltyAccountSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  programId: ['program_id', /*#__PURE__*/string()],
  balance: ['balance', /*#__PURE__*/optional( /*#__PURE__*/number())],
  lifetimePoints: ['lifetime_points', /*#__PURE__*/optional( /*#__PURE__*/number())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  enrolledAt: ['enrolled_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  mapping: ['mapping', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyAccountMappingSchema;
  }))],
  expiringPointDeadlines: ['expiring_point_deadlines', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyAccountExpiringPointDeadlineSchema;
  })))]
});

var createLoyaltyAccountRequestSchema = /*#__PURE__*/object({
  loyaltyAccount: ['loyalty_account', /*#__PURE__*/lazy(function () {
    return loyaltyAccountSchema;
  })],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()]
});

var createLoyaltyAccountResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  loyaltyAccount: ['loyalty_account', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyAccountSchema;
  }))]
});

var loyaltyRewardSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  loyaltyAccountId: ['loyalty_account_id', /*#__PURE__*/string()],
  rewardTierId: ['reward_tier_id', /*#__PURE__*/string()],
  points: ['points', /*#__PURE__*/optional( /*#__PURE__*/number())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  redeemedAt: ['redeemed_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createLoyaltyRewardRequestSchema = /*#__PURE__*/object({
  reward: ['reward', /*#__PURE__*/lazy(function () {
    return loyaltyRewardSchema;
  })],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()]
});

var createLoyaltyRewardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  reward: ['reward', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyRewardSchema;
  }))]
});

var deleteLoyaltyRewardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var loyaltyProgramAccrualRuleCategoryDataSchema = /*#__PURE__*/object({
  categoryId: ['category_id', /*#__PURE__*/string()]
});

var loyaltyProgramAccrualRuleItemVariationDataSchema = /*#__PURE__*/object({
  itemVariationId: ['item_variation_id', /*#__PURE__*/string()]
});

var loyaltyProgramAccrualRuleSpendDataSchema = /*#__PURE__*/object({
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  excludedCategoryIds: ['excluded_category_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  excludedItemVariationIds: ['excluded_item_variation_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  taxMode: ['tax_mode', /*#__PURE__*/string()]
});

var loyaltyProgramAccrualRuleVisitDataSchema = /*#__PURE__*/object({
  minimumAmountMoney: ['minimum_amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  taxMode: ['tax_mode', /*#__PURE__*/string()]
});

var loyaltyProgramAccrualRuleSchema = /*#__PURE__*/object({
  accrualType: ['accrual_type', /*#__PURE__*/string()],
  points: ['points', /*#__PURE__*/optional( /*#__PURE__*/number())],
  visitData: ['visit_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramAccrualRuleVisitDataSchema;
  }))],
  spendData: ['spend_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramAccrualRuleSpendDataSchema;
  }))],
  itemVariationData: ['item_variation_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramAccrualRuleItemVariationDataSchema;
  }))],
  categoryData: ['category_data', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramAccrualRuleCategoryDataSchema;
  }))]
});

var loyaltyProgramExpirationPolicySchema = /*#__PURE__*/object({
  expirationDuration: ['expiration_duration', /*#__PURE__*/string()]
});

var catalogObjectReferenceSchema = /*#__PURE__*/object({
  objectId: ['object_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogVersion: ['catalog_version', /*#__PURE__*/optional( /*#__PURE__*/bigint())]
});

var loyaltyProgramRewardDefinitionSchema = /*#__PURE__*/object({
  scope: ['scope', /*#__PURE__*/string()],
  discountType: ['discount_type', /*#__PURE__*/string()],
  percentageDiscount: ['percentage_discount', /*#__PURE__*/optional( /*#__PURE__*/string())],
  catalogObjectIds: ['catalog_object_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  fixedDiscountMoney: ['fixed_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  maxDiscountMoney: ['max_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var loyaltyProgramRewardTierSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  points: ['points', /*#__PURE__*/number()],
  name: ['name', /*#__PURE__*/string()],
  definition: ['definition', /*#__PURE__*/lazy(function () {
    return loyaltyProgramRewardDefinitionSchema;
  })],
  createdAt: ['created_at', /*#__PURE__*/string()],
  pricingRuleReference: ['pricing_rule_reference', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return catalogObjectReferenceSchema;
  }))]
});

var loyaltyProgramTerminologySchema = /*#__PURE__*/object({
  one: ['one', /*#__PURE__*/string()],
  other: ['other', /*#__PURE__*/string()]
});

var loyaltyProgramSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  status: ['status', /*#__PURE__*/string()],
  rewardTiers: ['reward_tiers', /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyProgramRewardTierSchema;
  }))],
  expirationPolicy: ['expiration_policy', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramExpirationPolicySchema;
  }))],
  terminology: ['terminology', /*#__PURE__*/lazy(function () {
    return loyaltyProgramTerminologySchema;
  })],
  locationIds: ['location_ids', /*#__PURE__*/array( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/string()],
  updatedAt: ['updated_at', /*#__PURE__*/string()],
  accrualRules: ['accrual_rules', /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyProgramAccrualRuleSchema;
  }))]
});

var listLoyaltyProgramsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  programs: ['programs', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyProgramSchema;
  })))]
});

var redeemLoyaltyRewardRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  locationId: ['location_id', /*#__PURE__*/string()]
});

var redeemLoyaltyRewardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  event: ['event', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventSchema;
  }))]
});

var retrieveLoyaltyAccountResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  loyaltyAccount: ['loyalty_account', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyAccountSchema;
  }))]
});

var retrieveLoyaltyProgramResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  program: ['program', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyProgramSchema;
  }))]
});

var retrieveLoyaltyRewardResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  reward: ['reward', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyRewardSchema;
  }))]
});

var searchLoyaltyAccountsRequestLoyaltyAccountQuerySchema = /*#__PURE__*/object({
  mappings: ['mappings', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyAccountMappingSchema;
  })))],
  customerIds: ['customer_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchLoyaltyAccountsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchLoyaltyAccountsRequestLoyaltyAccountQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchLoyaltyAccountsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  loyaltyAccounts: ['loyalty_accounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyAccountSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var loyaltyEventDateTimeFilterSchema = /*#__PURE__*/object({
  createdAt: ['created_at', /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  })]
});

var loyaltyEventLocationFilterSchema = /*#__PURE__*/object({
  locationIds: ['location_ids', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var loyaltyEventLoyaltyAccountFilterSchema = /*#__PURE__*/object({
  loyaltyAccountId: ['loyalty_account_id', /*#__PURE__*/string()]
});

var loyaltyEventOrderFilterSchema = /*#__PURE__*/object({
  orderId: ['order_id', /*#__PURE__*/string()]
});

var loyaltyEventTypeFilterSchema = /*#__PURE__*/object({
  types: ['types', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var loyaltyEventFilterSchema = /*#__PURE__*/object({
  loyaltyAccountFilter: ['loyalty_account_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventLoyaltyAccountFilterSchema;
  }))],
  typeFilter: ['type_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventTypeFilterSchema;
  }))],
  dateTimeFilter: ['date_time_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventDateTimeFilterSchema;
  }))],
  locationFilter: ['location_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventLocationFilterSchema;
  }))],
  orderFilter: ['order_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventOrderFilterSchema;
  }))]
});

var loyaltyEventQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventFilterSchema;
  }))]
});

var searchLoyaltyEventsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return loyaltyEventQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchLoyaltyEventsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  events: ['events', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyEventSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchLoyaltyRewardsRequestLoyaltyRewardQuerySchema = /*#__PURE__*/object({
  loyaltyAccountId: ['loyalty_account_id', /*#__PURE__*/string()],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchLoyaltyRewardsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchLoyaltyRewardsRequestLoyaltyRewardQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchLoyaltyRewardsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  rewards: ['rewards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return loyaltyRewardSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject8$2() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/rewards/", "/redeem"]);

  _templateObject8$2 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/rewards/", ""]);

  _templateObject7$4 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$4() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/rewards/", ""]);

  _templateObject6$4 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/programs/", "/calculate"]);

  _templateObject5$5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$6() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/programs/", ""]);

  _templateObject4$6 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$9() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/accounts/", "/adjust"]);

  _templateObject3$9 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$d() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/accounts/", "/accumulate"]);

  _templateObject2$d = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$h() {
  var data = _taggedTemplateLiteralLoose(["/v2/loyalty/accounts/", ""]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
var LoyaltyApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(LoyaltyApi, _BaseApi);

  function LoyaltyApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = LoyaltyApi.prototype;

  /**
   * Creates a loyalty account. To create a loyalty account, you must provide the `program_id` and a
   * `mapping` with the `phone_number` of the buyer.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  _proto.createLoyaltyAccount =
  /*#__PURE__*/
  function () {
    var _createLoyaltyAccount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/loyalty/accounts');
              mapped = req.prepareArgs({
                body: [body, createLoyaltyAccountRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createLoyaltyAccountResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createLoyaltyAccount(_x, _x2) {
      return _createLoyaltyAccount.apply(this, arguments);
    }

    return createLoyaltyAccount;
  }()
  /**
   * Searches for loyalty accounts in a loyalty program.
   *
   * You can search for a loyalty account using the phone number or customer ID associated with the
   * account. To return all loyalty accounts, specify an empty `query` object or omit it entirely.
   *
   * Search results are sorted by `created_at` in ascending order.
   *
   * @param body         An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.searchLoyaltyAccounts =
  /*#__PURE__*/
  function () {
    var _searchLoyaltyAccounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/loyalty/accounts/search');
              mapped = req.prepareArgs({
                body: [body, searchLoyaltyAccountsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(searchLoyaltyAccountsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function searchLoyaltyAccounts(_x3, _x4) {
      return _searchLoyaltyAccounts.apply(this, arguments);
    }

    return searchLoyaltyAccounts;
  }()
  /**
   * Retrieves a loyalty account.
   *
   * @param accountId  The ID of the [loyalty account]($m/LoyaltyAccount) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveLoyaltyAccount =
  /*#__PURE__*/
  function () {
    var _retrieveLoyaltyAccount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(accountId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                accountId: [accountId, string()]
              });
              req.appendTemplatePath(_templateObject$h(), mapped.accountId);
              return _context3.abrupt("return", req.callAsJson(retrieveLoyaltyAccountResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function retrieveLoyaltyAccount(_x5, _x6) {
      return _retrieveLoyaltyAccount.apply(this, arguments);
    }

    return retrieveLoyaltyAccount;
  }()
  /**
   * Adds points to a loyalty account.
   *
   * - If you are using the Orders API to manage orders, you only provide the `order_id`.
   * The endpoint reads the order to compute points to add to the buyer's account.
   * - If you are not using the Orders API to manage orders,
   * you first perform a client-side computation to compute the points.
   * For spend-based and visit-based programs, you can first call
   * [CalculateLoyaltyPoints]($e/Loyalty/CalculateLoyaltyPoints) to compute the points
   * that you provide to this endpoint.
   *
   * @param accountId    The [loyalty account]($m/LoyaltyAccount) ID to which
   *                                                              to add the points.
   * @param body         An object containing the fields to POST for the
   *                                                              request.  See the corresponding object definition for
   *                                                              field details.
   * @return Response from the API call
   */
  ;

  _proto.accumulateLoyaltyPoints =
  /*#__PURE__*/
  function () {
    var _accumulateLoyaltyPoints = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(accountId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                accountId: [accountId, string()],
                body: [body, accumulateLoyaltyPointsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$d(), mapped.accountId);
              return _context4.abrupt("return", req.callAsJson(accumulateLoyaltyPointsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function accumulateLoyaltyPoints(_x7, _x8, _x9) {
      return _accumulateLoyaltyPoints.apply(this, arguments);
    }

    return accumulateLoyaltyPoints;
  }()
  /**
   * Adds points to or subtracts points from a buyer's account.
   *
   * Use this endpoint only when you need to manually adjust points. Otherwise, in your application flow,
   * you call
   * [AccumulateLoyaltyPoints]($e/Loyalty/AccumulateLoyaltyPoints)
   * to add points when a buyer pays for the purchase.
   *
   * @param accountId    The ID of the [loyalty account]($m/LoyaltyAccount) in
   *                                                          which to adjust the points.
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.adjustLoyaltyPoints =
  /*#__PURE__*/
  function () {
    var _adjustLoyaltyPoints = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(accountId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                accountId: [accountId, string()],
                body: [body, adjustLoyaltyPointsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$9(), mapped.accountId);
              return _context5.abrupt("return", req.callAsJson(adjustLoyaltyPointsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function adjustLoyaltyPoints(_x10, _x11, _x12) {
      return _adjustLoyaltyPoints.apply(this, arguments);
    }

    return adjustLoyaltyPoints;
  }()
  /**
   * Searches for loyalty events.
   *
   * A Square loyalty program maintains a ledger of events that occur during the lifetime of a
   * buyer's loyalty account. Each change in the point balance
   * (for example, points earned, points redeemed, and points expired) is
   * recorded in the ledger. Using this endpoint, you can search the ledger for events.
   *
   * Search results are sorted by `created_at` in descending order.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.searchLoyaltyEvents =
  /*#__PURE__*/
  function () {
    var _searchLoyaltyEvents = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST', '/v2/loyalty/events/search');
              mapped = req.prepareArgs({
                body: [body, searchLoyaltyEventsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context6.abrupt("return", req.callAsJson(searchLoyaltyEventsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function searchLoyaltyEvents(_x13, _x14) {
      return _searchLoyaltyEvents.apply(this, arguments);
    }

    return searchLoyaltyEvents;
  }()
  /**
   * Returns a list of loyalty programs in the seller's account.
   * Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can
   * have only one loyalty program, which is created and managed from the Seller Dashboard. For more
   * information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).
   *
   *
   * Replaced with [RetrieveLoyaltyProgram]($e/Loyalty/RetrieveLoyaltyProgram) when used with the keyword
   * `main`.
   *
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.listLoyaltyPrograms =
  /*#__PURE__*/
  function () {
    var _listLoyaltyPrograms = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(requestOptions) {
      var req;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET', '/v2/loyalty/programs');
              req.deprecated('LoyaltyApi.listLoyaltyPrograms');
              return _context7.abrupt("return", req.callAsJson(listLoyaltyProgramsResponseSchema, requestOptions));

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function listLoyaltyPrograms(_x15) {
      return _listLoyaltyPrograms.apply(this, arguments);
    }

    return listLoyaltyPrograms;
  }()
  /**
   * Retrieves the loyalty program in a seller's account, specified by the program ID or the keyword
   * `main`.
   *
   * Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can
   * have only one loyalty program, which is created and managed from the Seller Dashboard. For more
   * information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).
   *
   * @param programId  The ID of the loyalty program or the keyword `main`. Either value can be used to
   *                             retrieve the single loyalty program that belongs to the seller.
   * @return Response from the API call
   */
  ;

  _proto.retrieveLoyaltyProgram =
  /*#__PURE__*/
  function () {
    var _retrieveLoyaltyProgram = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(programId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                programId: [programId, string()]
              });
              req.appendTemplatePath(_templateObject4$6(), mapped.programId);
              return _context8.abrupt("return", req.callAsJson(retrieveLoyaltyProgramResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function retrieveLoyaltyProgram(_x16, _x17) {
      return _retrieveLoyaltyProgram.apply(this, arguments);
    }

    return retrieveLoyaltyProgram;
  }()
  /**
   * Calculates the points a purchase earns.
   *
   * - If you are using the Orders API to manage orders, you provide the `order_id` in the request. The
   * endpoint calculates the points by reading the order.
   * - If you are not using the Orders API to manage orders, you provide the purchase amount in
   * the request for the endpoint to calculate the points.
   *
   * An application might call this endpoint to show the points that a buyer can earn with the
   * specific purchase.
   *
   * For spend-based and visit-based programs, the `tax_mode` setting of the accrual rule indicates how
   * taxes should be treated for loyalty points accrual.
   *
   * @param programId    The [loyalty program]($m/LoyaltyProgram) ID, which
   *                                                             defines the rules for accruing points.
   * @param body         An object containing the fields to POST for the
   *                                                             request.  See the corresponding object definition for
   *                                                             field details.
   * @return Response from the API call
   */
  ;

  _proto.calculateLoyaltyPoints =
  /*#__PURE__*/
  function () {
    var _calculateLoyaltyPoints = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(programId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                programId: [programId, string()],
                body: [body, calculateLoyaltyPointsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject5$5(), mapped.programId);
              return _context9.abrupt("return", req.callAsJson(calculateLoyaltyPointsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function calculateLoyaltyPoints(_x18, _x19, _x20) {
      return _calculateLoyaltyPoints.apply(this, arguments);
    }

    return calculateLoyaltyPoints;
  }()
  /**
   * Creates a loyalty reward. In the process, the endpoint does following:
   *
   * - Uses the `reward_tier_id` in the request to determine the number of points
   * to lock for this reward.
   * - If the request includes `order_id`, it adds the reward and related discount to the order.
   *
   * After a reward is created, the points are locked and
   * not available for the buyer to redeem another reward.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.createLoyaltyReward =
  /*#__PURE__*/
  function () {
    var _createLoyaltyReward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('POST', '/v2/loyalty/rewards');
              mapped = req.prepareArgs({
                body: [body, createLoyaltyRewardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context10.abrupt("return", req.callAsJson(createLoyaltyRewardResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function createLoyaltyReward(_x21, _x22) {
      return _createLoyaltyReward.apply(this, arguments);
    }

    return createLoyaltyReward;
  }()
  /**
   * Searches for loyalty rewards. This endpoint accepts a request with no query filters and returns
   * results for all loyalty accounts.
   * If you include a `query` object, `loyalty_account_id` is required and `status` is  optional.
   *
   * If you know a reward ID, use the
   * [RetrieveLoyaltyReward]($e/Loyalty/RetrieveLoyaltyReward) endpoint.
   *
   * Search results are sorted by `updated_at` in descending order.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.searchLoyaltyRewards =
  /*#__PURE__*/
  function () {
    var _searchLoyaltyRewards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              req = this.createRequest('POST', '/v2/loyalty/rewards/search');
              mapped = req.prepareArgs({
                body: [body, searchLoyaltyRewardsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context11.abrupt("return", req.callAsJson(searchLoyaltyRewardsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function searchLoyaltyRewards(_x23, _x24) {
      return _searchLoyaltyRewards.apply(this, arguments);
    }

    return searchLoyaltyRewards;
  }()
  /**
   * Deletes a loyalty reward by doing the following:
   *
   * - Returns the loyalty points back to the loyalty account.
   * - If an order ID was specified when the reward was created
   * (see [CreateLoyaltyReward]($e/Loyalty/CreateLoyaltyReward)),
   * it updates the order by removing the reward and related
   * discounts.
   *
   * You cannot delete a reward that has reached the terminal state (REDEEMED).
   *
   * @param rewardId  The ID of the [loyalty reward]($m/LoyaltyReward) to delete.
   * @return Response from the API call
   */
  ;

  _proto.deleteLoyaltyReward =
  /*#__PURE__*/
  function () {
    var _deleteLoyaltyReward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(rewardId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                rewardId: [rewardId, string()]
              });
              req.appendTemplatePath(_templateObject6$4(), mapped.rewardId);
              return _context12.abrupt("return", req.callAsJson(deleteLoyaltyRewardResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function deleteLoyaltyReward(_x25, _x26) {
      return _deleteLoyaltyReward.apply(this, arguments);
    }

    return deleteLoyaltyReward;
  }()
  /**
   * Retrieves a loyalty reward.
   *
   * @param rewardId  The ID of the [loyalty reward]($m/LoyaltyReward) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveLoyaltyReward =
  /*#__PURE__*/
  function () {
    var _retrieveLoyaltyReward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(rewardId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                rewardId: [rewardId, string()]
              });
              req.appendTemplatePath(_templateObject7$4(), mapped.rewardId);
              return _context13.abrupt("return", req.callAsJson(retrieveLoyaltyRewardResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function retrieveLoyaltyReward(_x27, _x28) {
      return _retrieveLoyaltyReward.apply(this, arguments);
    }

    return retrieveLoyaltyReward;
  }()
  /**
   * Redeems a loyalty reward.
   *
   * The endpoint sets the reward to the `REDEEMED` terminal state.
   *
   * If you are using your own order processing system (not using the
   * Orders API), you call this endpoint after the buyer paid for the
   * purchase.
   *
   * After the reward reaches the terminal state, it cannot be deleted.
   * In other words, points used for the reward cannot be returned
   * to the account.
   *
   * @param rewardId     The ID of the [loyalty reward]($m/LoyaltyReward) to
   *                                                          redeem.
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.redeemLoyaltyReward =
  /*#__PURE__*/
  function () {
    var _redeemLoyaltyReward = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(rewardId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                rewardId: [rewardId, string()],
                body: [body, redeemLoyaltyRewardRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject8$2(), mapped.rewardId);
              return _context14.abrupt("return", req.callAsJson(redeemLoyaltyRewardResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function redeemLoyaltyReward(_x29, _x30, _x31) {
      return _redeemLoyaltyReward.apply(this, arguments);
    }

    return redeemLoyaltyReward;
  }();

  return LoyaltyApi;
}(BaseApi);

var merchantSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  businessName: ['business_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  country: ['country', /*#__PURE__*/string()],
  languageCode: ['language_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  currency: ['currency', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  mainLocationId: ['main_location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listMerchantsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  merchant: ['merchant', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return merchantSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var retrieveMerchantResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  merchant: ['merchant', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return merchantSchema;
  }))]
});

function _templateObject$i() {
  var data = _taggedTemplateLiteralLoose(["/v2/merchants/", ""]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
var MerchantsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(MerchantsApi, _BaseApi);

  function MerchantsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = MerchantsApi.prototype;

  /**
   * Provides details about the merchant associated with a given access token.
   *
   * The access token used to connect your application to a Square seller is associated
   * with a single merchant. That means that `ListMerchants` returns a list
   * with a single `Merchant` object. You can specify your personal access token
   * to get your own merchant information or specify an OAuth token to get the
   * information for the merchant that granted your application access.
   *
   * If you know the merchant ID, you can also use the [RetrieveMerchant]($e/Merchants/RetrieveMerchant)
   * endpoint to retrieve the merchant information.
   *
   * @param cursor The cursor generated by the previous response.
   * @return Response from the API call
   */
  _proto.listMerchants =
  /*#__PURE__*/
  function () {
    var _listMerchants = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/merchants');
              mapped = req.prepareArgs({
                cursor: [cursor, optional(number())]
              });
              req.query('cursor', mapped.cursor);
              return _context.abrupt("return", req.callAsJson(listMerchantsResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listMerchants(_x, _x2) {
      return _listMerchants.apply(this, arguments);
    }

    return listMerchants;
  }()
  /**
   * Retrieves the `Merchant` object for the given `merchant_id`.
   *
   * @param merchantId  The ID of the merchant to retrieve. If the string "me" is supplied as the ID, then
   *                              retrieve the merchant that is currently accessible to this call.
   * @return Response from the API call
   */
  ;

  _proto.retrieveMerchant =
  /*#__PURE__*/
  function () {
    var _retrieveMerchant = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(merchantId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                merchantId: [merchantId, string()]
              });
              req.appendTemplatePath(_templateObject$i(), mapped.merchantId);
              return _context2.abrupt("return", req.callAsJson(retrieveMerchantResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveMerchant(_x3, _x4) {
      return _retrieveMerchant.apply(this, arguments);
    }

    return retrieveMerchant;
  }();

  return MerchantsApi;
}(BaseApi);

var createMobileAuthorizationCodeRequestSchema = /*#__PURE__*/object({
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var createMobileAuthorizationCodeResponseSchema = /*#__PURE__*/object({
  authorizationCode: ['authorization_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expiresAt: ['expires_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  error: ['error', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return errorSchema;
  }))]
});

var MobileAuthorizationApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(MobileAuthorizationApi, _BaseApi);

  function MobileAuthorizationApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = MobileAuthorizationApi.prototype;

  /**
   * Generates code to authorize a mobile application to connect to a Square card reader.
   *
   * Authorization codes are one-time-use codes and expire 60 minutes after being issued.
   *
   * __Important:__ The `Authorization` header you provide to this endpoint must have the following
   * format:
   *
   * ```
   * Authorization: Bearer ACCESS_TOKEN
   * ```
   *
   * Replace `ACCESS_TOKEN` with a
   * [valid production authorization credential](https://developer.squareup.com/docs/build-basics/access-
   * tokens).
   *
   * @param body         An object containing the fields to POST for
   *                                                                    the request.  See the corresponding object
   *                                                                    definition for field details.
   * @return Response from the API call
   */
  _proto.createMobileAuthorizationCode =
  /*#__PURE__*/
  function () {
    var _createMobileAuthorizationCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/mobile/authorization-code');
              mapped = req.prepareArgs({
                body: [body, createMobileAuthorizationCodeRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createMobileAuthorizationCodeResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createMobileAuthorizationCode(_x, _x2) {
      return _createMobileAuthorizationCode.apply(this, arguments);
    }

    return createMobileAuthorizationCode;
  }();

  return MobileAuthorizationApi;
}(BaseApi);

var obtainTokenRequestSchema = /*#__PURE__*/object({
  clientId: ['client_id', /*#__PURE__*/string()],
  clientSecret: ['client_secret', /*#__PURE__*/string()],
  code: ['code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  redirectUri: ['redirect_uri', /*#__PURE__*/optional( /*#__PURE__*/string())],
  grantType: ['grant_type', /*#__PURE__*/string()],
  refreshToken: ['refresh_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  migrationToken: ['migration_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  scopes: ['scopes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  shortLived: ['short_lived', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var obtainTokenResponseSchema = /*#__PURE__*/object({
  accessToken: ['access_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  tokenType: ['token_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expiresAt: ['expires_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  subscriptionId: ['subscription_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  planId: ['plan_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  idToken: ['id_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refreshToken: ['refresh_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shortLived: ['short_lived', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var renewTokenRequestSchema = /*#__PURE__*/object({
  accessToken: ['access_token', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var renewTokenResponseSchema = /*#__PURE__*/object({
  accessToken: ['access_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  tokenType: ['token_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expiresAt: ['expires_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  subscriptionId: ['subscription_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  planId: ['plan_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var revokeTokenRequestSchema = /*#__PURE__*/object({
  clientId: ['client_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  accessToken: ['access_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  revokeOnlyAccessToken: ['revoke_only_access_token', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var revokeTokenResponseSchema = /*#__PURE__*/object({
  success: ['success', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject$j() {
  var data = _taggedTemplateLiteralLoose(["/oauth2/clients/", "/access-token/renew"]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
var OAuthApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(OAuthApi, _BaseApi);

  function OAuthApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = OAuthApi.prototype;

  /**
   * `RenewToken` is deprecated. For information about refreshing OAuth access tokens, see
   * [Migrate from Renew to Refresh OAuth Tokens](https://developer.squareup.com/docs/oauth-api/migrate-
   * to-refresh-tokens).
   *
   * Renews an OAuth access token before it expires.
   *
   * OAuth access tokens besides your application's personal access token expire after 30 days.
   * You can also renew expired tokens within 15 days of their expiration.
   * You cannot renew an access token that has been expired for more than 15 days.
   * Instead, the associated user must recomplete the OAuth flow from the beginning.
   *
   * __Important:__ The `Authorization` header for this endpoint must have the
   * following format:
   *
   * ```
   * Authorization: Client APPLICATION_SECRET
   * ```
   *
   * Replace `APPLICATION_SECRET` with the application secret on the Credentials
   * page in the [Developer Dashboard](https://developer.squareup.com/apps).
   *
   * @param clientId      Your application ID, which is available in the OAuth page in the
   *                                                  [Developer Dashboard](https://developer.squareup.com/apps).
   * @param body          An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @param authorization Client APPLICATION_SECRET
   * @return Response from the API call
   * @deprecated
   */
  _proto.renewToken =
  /*#__PURE__*/
  function () {
    var _renewToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(clientId, body, authorization, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                clientId: [clientId, string()],
                body: [body, renewTokenRequestSchema],
                authorization: [authorization, string()]
              });
              req.header('Content-Type', 'application/json');
              req.header('Authorization', mapped.authorization);
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject$j(), mapped.clientId);
              req.deprecated('OAuthApi.renewToken');
              req.authenticate(false);
              return _context.abrupt("return", req.callAsJson(renewTokenResponseSchema, requestOptions));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function renewToken(_x, _x2, _x3, _x4) {
      return _renewToken.apply(this, arguments);
    }

    return renewToken;
  }()
  /**
   * Revokes an access token generated with the OAuth flow.
   *
   * If an account has more than one OAuth access token for your application, this
   * endpoint revokes all of them, regardless of which token you specify. When an
   * OAuth access token is revoked, all of the active subscriptions associated
   * with that OAuth token are canceled immediately.
   *
   * __Important:__ The `Authorization` header for this endpoint must have the
   * following format:
   *
   * ```
   * Authorization: Client APPLICATION_SECRET
   * ```
   *
   * Replace `APPLICATION_SECRET` with the application secret on the OAuth
   * page for your application on the Developer Dashboard.
   *
   * @param body          An object containing the fields to POST for the request.  See
   *                                                   the corresponding object definition for field details.
   * @param authorization Client APPLICATION_SECRET
   * @return Response from the API call
   */
  ;

  _proto.revokeToken =
  /*#__PURE__*/
  function () {
    var _revokeToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, authorization, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/oauth2/revoke');
              mapped = req.prepareArgs({
                body: [body, revokeTokenRequestSchema],
                authorization: [authorization, string()]
              });
              req.header('Content-Type', 'application/json');
              req.header('Authorization', mapped.authorization);
              req.json(mapped.body);
              req.authenticate(false);
              return _context2.abrupt("return", req.callAsJson(revokeTokenResponseSchema, requestOptions));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function revokeToken(_x5, _x6, _x7) {
      return _revokeToken.apply(this, arguments);
    }

    return revokeToken;
  }()
  /**
   * Returns an OAuth access token and a refresh token unless the
   * `short_lived` parameter is set to `true`, in which case the endpoint
   * returns only an access token.
   *
   * The `grant_type` parameter specifies the type of OAuth request. If
   * `grant_type` is `authorization_code`, you must include the authorization
   * code you received when a seller granted you authorization. If `grant_type`
   * is `refresh_token`, you must provide a valid refresh token. If you are using
   * an old version of the Square APIs (prior to March 13, 2019), `grant_type`
   * can be `migration_token` and you must provide a valid migration token.
   *
   * You can use the `scopes` parameter to limit the set of permissions granted
   * to the access token and refresh token. You can use the `short_lived` parameter
   * to create an access token that expires in 24 hours.
   *
   * __Note:__ OAuth tokens should be encrypted and stored on a secure server.
   * Application clients should never interact directly with OAuth tokens.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.obtainToken =
  /*#__PURE__*/
  function () {
    var _obtainToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/oauth2/token');
              mapped = req.prepareArgs({
                body: [body, obtainTokenRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.authenticate(false);
              return _context3.abrupt("return", req.callAsJson(obtainTokenResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function obtainToken(_x8, _x9) {
      return _obtainToken.apply(this, arguments);
    }

    return obtainToken;
  }();

  return OAuthApi;
}(BaseApi);

var batchRetrieveOrdersRequestSchema = /*#__PURE__*/object({
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  orderIds: ['order_ids', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var batchRetrieveOrdersResponseSchema = /*#__PURE__*/object({
  orders: ['orders', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderSchema;
  })))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var calculateOrderRequestSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/lazy(function () {
    return orderSchema;
  })],
  proposedRewards: ['proposed_rewards', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderRewardSchema;
  })))]
});

var calculateOrderResponseSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var cloneOrderRequestSchema = /*#__PURE__*/object({
  orderId: ['order_id', /*#__PURE__*/string()],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cloneOrderResponseSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var createOrderResponseSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var payOrderRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  orderVersion: ['order_version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  paymentIds: ['payment_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var payOrderResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))]
});

var retrieveOrderResponseSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var searchOrdersCustomerFilterSchema = /*#__PURE__*/object({
  customerIds: ['customer_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchOrdersDateTimeFilterSchema = /*#__PURE__*/object({
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  closedAt: ['closed_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))]
});

var searchOrdersFulfillmentFilterSchema = /*#__PURE__*/object({
  fulfillmentTypes: ['fulfillment_types', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  fulfillmentStates: ['fulfillment_states', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchOrdersSourceFilterSchema = /*#__PURE__*/object({
  sourceNames: ['source_names', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchOrdersStateFilterSchema = /*#__PURE__*/object({
  states: ['states', /*#__PURE__*/array( /*#__PURE__*/string())]
});

var searchOrdersFilterSchema = /*#__PURE__*/object({
  stateFilter: ['state_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersStateFilterSchema;
  }))],
  dateTimeFilter: ['date_time_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersDateTimeFilterSchema;
  }))],
  fulfillmentFilter: ['fulfillment_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersFulfillmentFilterSchema;
  }))],
  sourceFilter: ['source_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersSourceFilterSchema;
  }))],
  customerFilter: ['customer_filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersCustomerFilterSchema;
  }))]
});

var searchOrdersSortSchema = /*#__PURE__*/object({
  sortField: ['sort_field', /*#__PURE__*/string()],
  sortOrder: ['sort_order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchOrdersQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersSortSchema;
  }))]
});

var searchOrdersRequestSchema = /*#__PURE__*/object({
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchOrdersQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  returnEntries: ['return_entries', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var orderEntrySchema = /*#__PURE__*/object({
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchOrdersResponseSchema = /*#__PURE__*/object({
  orderEntries: ['order_entries', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderEntrySchema;
  })))],
  orders: ['orders', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return orderSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateOrderRequestSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  fieldsToClear: ['fields_to_clear', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var updateOrderResponseSchema = /*#__PURE__*/object({
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return orderSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject3$a() {
  var data = _taggedTemplateLiteralLoose(["/v2/orders/", "/pay"]);

  _templateObject3$a = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$e() {
  var data = _taggedTemplateLiteralLoose(["/v2/orders/", ""]);

  _templateObject2$e = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$k() {
  var data = _taggedTemplateLiteralLoose(["/v2/orders/", ""]);

  _templateObject$k = function _templateObject() {
    return data;
  };

  return data;
}
var OrdersApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(OrdersApi, _BaseApi);

  function OrdersApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = OrdersApi.prototype;

  /**
   * Creates a new [order]($m/Order) that can include information about products for
   * purchase and settings to apply to the purchase.
   *
   * To pay for a created order, see
   * [Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).
   *
   * You can modify open orders using the [UpdateOrder]($e/Orders/UpdateOrder) endpoint.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.createOrder =
  /*#__PURE__*/
  function () {
    var _createOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/orders');
              mapped = req.prepareArgs({
                body: [body, createOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createOrderResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createOrder(_x, _x2) {
      return _createOrder.apply(this, arguments);
    }

    return createOrder;
  }()
  /**
   * Retrieves a set of [orders]($m/Order) by their IDs.
   *
   * If a given order ID does not exist, the ID is ignored instead of generating an error.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.batchRetrieveOrders =
  /*#__PURE__*/
  function () {
    var _batchRetrieveOrders = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/orders/batch-retrieve');
              mapped = req.prepareArgs({
                body: [body, batchRetrieveOrdersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(batchRetrieveOrdersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function batchRetrieveOrders(_x3, _x4) {
      return _batchRetrieveOrders.apply(this, arguments);
    }

    return batchRetrieveOrders;
  }()
  /**
   * Enables applications to preview order pricing without creating an order.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.calculateOrder =
  /*#__PURE__*/
  function () {
    var _calculateOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/orders/calculate');
              mapped = req.prepareArgs({
                body: [body, calculateOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(calculateOrderResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function calculateOrder(_x5, _x6) {
      return _calculateOrder.apply(this, arguments);
    }

    return calculateOrder;
  }()
  /**
   * Creates a new order, in the `DRAFT` state, by duplicating an existing order. The newly created order
   * has
   * only the core fields (such as line items, taxes, and discounts) copied from the original order.
   *
   * @param body         An object containing the fields to POST for the request.  See the
   *                                                 corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.cloneOrder =
  /*#__PURE__*/
  function () {
    var _cloneOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/orders/clone');
              mapped = req.prepareArgs({
                body: [body, cloneOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context4.abrupt("return", req.callAsJson(cloneOrderResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function cloneOrder(_x7, _x8) {
      return _cloneOrder.apply(this, arguments);
    }

    return cloneOrder;
  }()
  /**
   * Search all orders for one or more locations. Orders include all sales,
   * returns, and exchanges regardless of how or when they entered the Square
   * ecosystem (such as Point of Sale, Invoices, and Connect APIs).
   *
   * `SearchOrders` requests need to specify which locations to search and define a
   * [SearchOrdersQuery]($m/SearchOrdersQuery) object that controls
   * how to sort or filter the results. Your `SearchOrdersQuery` can:
   *
   * Set filter criteria.
   * Set the sort order.
   * Determine whether to return results as complete `Order` objects or as
   * [OrderEntry]($m/OrderEntry) objects.
   *
   * Note that details for orders processed with Square Point of Sale while in
   * offline mode might not be transmitted to Square for up to 72 hours. Offline
   * orders have a `created_at` value that reflects the time the order was created,
   * not the time it was subsequently transmitted to Square.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                   the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchOrders =
  /*#__PURE__*/
  function () {
    var _searchOrders = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST', '/v2/orders/search');
              mapped = req.prepareArgs({
                body: [body, searchOrdersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context5.abrupt("return", req.callAsJson(searchOrdersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function searchOrders(_x9, _x10) {
      return _searchOrders.apply(this, arguments);
    }

    return searchOrders;
  }()
  /**
   * Retrieves an [Order]($m/Order) by ID.
   *
   * @param orderId  The ID of the order to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveOrder =
  /*#__PURE__*/
  function () {
    var _retrieveOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(orderId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                orderId: [orderId, string()]
              });
              req.appendTemplatePath(_templateObject$k(), mapped.orderId);
              return _context6.abrupt("return", req.callAsJson(retrieveOrderResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function retrieveOrder(_x11, _x12) {
      return _retrieveOrder.apply(this, arguments);
    }

    return retrieveOrder;
  }()
  /**
   * Updates an open [order]($m/Order) by adding, replacing, or deleting
   * fields. Orders with a `COMPLETED` or `CANCELED` state cannot be updated.
   *
   * An `UpdateOrder` request requires the following:
   *
   * - The `order_id` in the endpoint path, identifying the order to update.
   * - The latest `version` of the order to update.
   * - The [sparse order](https://developer.squareup.com/docs/orders-api/manage-orders#sparse-order-
   * objects)
   * containing only the fields to update and the version to which the update is
   * being applied.
   * - If deleting fields, the [dot notation paths](https://developer.squareup.com/docs/orders-api/manage-
   * orders#on-dot-notation)
   * identifying the fields to clear.
   *
   * To pay for an order, see
   * [Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).
   *
   * @param orderId      The ID of the order to update.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateOrder =
  /*#__PURE__*/
  function () {
    var _updateOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(orderId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                orderId: [orderId, string()],
                body: [body, updateOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$e(), mapped.orderId);
              return _context7.abrupt("return", req.callAsJson(updateOrderResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function updateOrder(_x13, _x14, _x15) {
      return _updateOrder.apply(this, arguments);
    }

    return updateOrder;
  }()
  /**
   * Pay for an [order]($m/Order) using one or more approved [payments]($m/Payment)
   * or settle an order with a total of `0`.
   *
   * The total of the `payment_ids` listed in the request must be equal to the order
   * total. Orders with a total amount of `0` can be marked as paid by specifying an empty
   * array of `payment_ids` in the request.
   *
   * To be used with `PayOrder`, a payment must:
   *
   * - Reference the order by specifying the `order_id` when [creating the
   * payment]($e/Payments/CreatePayment).
   * Any approved payments that reference the same `order_id` not specified in the
   * `payment_ids` is canceled.
   * - Be approved with [delayed capture](https://developer.squareup.com/docs/payments-api/take-
   * payments#delayed-capture).
   * Using a delayed capture payment with `PayOrder` completes the approved payment.
   *
   * @param orderId      The ID of the order being paid.
   * @param body         An object containing the fields to POST for the request.  See the
   *                                               corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.payOrder =
  /*#__PURE__*/
  function () {
    var _payOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(orderId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                orderId: [orderId, string()],
                body: [body, payOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$a(), mapped.orderId);
              return _context8.abrupt("return", req.callAsJson(payOrderResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function payOrder(_x16, _x17, _x18) {
      return _payOrder.apply(this, arguments);
    }

    return payOrder;
  }();

  return OrdersApi;
}(BaseApi);

var cancelPaymentByIdempotencyKeyRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()]
});

var cancelPaymentByIdempotencyKeyResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var applicationDetailsSchema = /*#__PURE__*/object({
  squareProduct: ['square_product', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applicationId: ['application_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var aCHDetailsSchema = /*#__PURE__*/object({
  routingNumber: ['routing_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  accountNumberSuffix: ['account_number_suffix', /*#__PURE__*/optional( /*#__PURE__*/string())],
  accountType: ['account_type', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var bankAccountPaymentDetailsSchema = /*#__PURE__*/object({
  bankName: ['bank_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  transferType: ['transfer_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  accountOwnershipType: ['account_ownership_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  fingerprint: ['fingerprint', /*#__PURE__*/optional( /*#__PURE__*/string())],
  country: ['country', /*#__PURE__*/optional( /*#__PURE__*/string())],
  statementDescription: ['statement_description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  achDetails: ['ach_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return aCHDetailsSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var afterpayDetailsSchema = /*#__PURE__*/object({
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var buyNowPayLaterDetailsSchema = /*#__PURE__*/object({
  brand: ['brand', /*#__PURE__*/optional( /*#__PURE__*/string())],
  afterpayDetails: ['afterpay_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return afterpayDetailsSchema;
  }))]
});

var cardPaymentTimelineSchema = /*#__PURE__*/object({
  authorizedAt: ['authorized_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  capturedAt: ['captured_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  voidedAt: ['voided_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var deviceDetailsSchema = /*#__PURE__*/object({
  deviceId: ['device_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceInstallationId: ['device_installation_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceName: ['device_name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cardPaymentDetailsSchema = /*#__PURE__*/object({
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  card: ['card', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardSchema;
  }))],
  entryMethod: ['entry_method', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cvvStatus: ['cvv_status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  avsStatus: ['avs_status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  authResultCode: ['auth_result_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applicationIdentifier: ['application_identifier', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applicationName: ['application_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  applicationCryptogram: ['application_cryptogram', /*#__PURE__*/optional( /*#__PURE__*/string())],
  verificationMethod: ['verification_method', /*#__PURE__*/optional( /*#__PURE__*/string())],
  verificationResults: ['verification_results', /*#__PURE__*/optional( /*#__PURE__*/string())],
  statementDescription: ['statement_description', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceDetails: ['device_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return deviceDetailsSchema;
  }))],
  cardPaymentTimeline: ['card_payment_timeline', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardPaymentTimelineSchema;
  }))],
  refundRequiresCardPresence: ['refund_requires_card_presence', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var cashPaymentDetailsSchema = /*#__PURE__*/object({
  buyerSuppliedMoney: ['buyer_supplied_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  changeBackMoney: ['change_back_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var digitalWalletDetailsSchema = /*#__PURE__*/object({
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var externalPaymentDetailsSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/string()],
  source: ['source', /*#__PURE__*/string()],
  sourceId: ['source_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceFeeMoney: ['source_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var processingFeeSchema = /*#__PURE__*/object({
  effectiveAt: ['effective_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))]
});

var riskEvaluationSchema = /*#__PURE__*/object({
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  riskLevel: ['risk_level', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var paymentSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  tipMoney: ['tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appFeeMoney: ['app_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  approvedMoney: ['approved_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  processingFee: ['processing_fee', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return processingFeeSchema;
  })))],
  refundedMoney: ['refunded_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  delayDuration: ['delay_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  delayAction: ['delay_action', /*#__PURE__*/optional( /*#__PURE__*/string())],
  delayedUntil: ['delayed_until', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sourceType: ['source_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cardDetails: ['card_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cardPaymentDetailsSchema;
  }))],
  cashDetails: ['cash_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cashPaymentDetailsSchema;
  }))],
  bankAccountDetails: ['bank_account_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return bankAccountPaymentDetailsSchema;
  }))],
  externalDetails: ['external_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return externalPaymentDetailsSchema;
  }))],
  walletDetails: ['wallet_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return digitalWalletDetailsSchema;
  }))],
  buyNowPayLaterDetails: ['buy_now_pay_later_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return buyNowPayLaterDetailsSchema;
  }))],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundIds: ['refund_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  riskEvaluation: ['risk_evaluation', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return riskEvaluationSchema;
  }))],
  buyerEmailAddress: ['buyer_email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  billingAddress: ['billing_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  shippingAddress: ['shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  statementDescriptionIdentifier: ['statement_description_identifier', /*#__PURE__*/optional( /*#__PURE__*/string())],
  capabilities: ['capabilities', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  receiptNumber: ['receipt_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  receiptUrl: ['receipt_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceDetails: ['device_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return deviceDetailsSchema;
  }))],
  applicationDetails: ['application_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return applicationDetailsSchema;
  }))],
  versionToken: ['version_token', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cancelPaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))]
});

var completePaymentRequestSchema = /*#__PURE__*/object({
  versionToken: ['version_token', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var completePaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))]
});

var createPaymentRequestSchema = /*#__PURE__*/object({
  sourceId: ['source_id', /*#__PURE__*/string()],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  tipMoney: ['tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  appFeeMoney: ['app_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  delayDuration: ['delay_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  autocomplete: ['autocomplete', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  verificationToken: ['verification_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  acceptPartialAuthorization: ['accept_partial_authorization', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  buyerEmailAddress: ['buyer_email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  billingAddress: ['billing_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  shippingAddress: ['shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  statementDescriptionIdentifier: ['statement_description_identifier', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cashDetails: ['cash_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return cashPaymentDetailsSchema;
  }))],
  externalDetails: ['external_details', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return externalPaymentDetailsSchema;
  }))]
});

var createPaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))]
});

var getPaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))]
});

var listPaymentsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payments: ['payments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var updatePaymentRequestSchema = /*#__PURE__*/object({
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))],
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()]
});

var updatePaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  payment: ['payment', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentSchema;
  }))]
});

function _templateObject4$7() {
  var data = _taggedTemplateLiteralLoose(["/v2/payments/", "/complete"]);

  _templateObject4$7 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$b() {
  var data = _taggedTemplateLiteralLoose(["/v2/payments/", "/cancel"]);

  _templateObject3$b = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$f() {
  var data = _taggedTemplateLiteralLoose(["/v2/payments/", ""]);

  _templateObject2$f = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$l() {
  var data = _taggedTemplateLiteralLoose(["/v2/payments/", ""]);

  _templateObject$l = function _templateObject() {
    return data;
  };

  return data;
}
var PaymentsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(PaymentsApi, _BaseApi);

  function PaymentsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = PaymentsApi.prototype;

  /**
   * Retrieves a list of payments taken by the account making the request.
   *
   * Results are eventually consistent, and new payments or changes to payments might take several
   * seconds to appear.
   *
   * The maximum results per page is 100.
   *
   * @param beginTime   The timestamp for the beginning of the reporting period, in RFC 3339 format.
   *                              Inclusive. Default: The current time minus one year.
   * @param endTime     The timestamp for the end of the reporting period, in RFC 3339 format.  Default: The
   *                              current time.
   * @param sortOrder   The order in which results are listed: - `ASC` - Oldest to newest. - `DESC` - Newest
   *                              to oldest (default).
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this
   *                              cursor to retrieve the next set of results for the original query.  For more
   *                              information, see [Pagination](https://developer.squareup.
   *                              com/docs/basics/api101/pagination).
   * @param locationId  Limit results to the location supplied. By default, results are returned for the
   *                              default (main) location associated with the seller.
   * @param total       The exact amount in the `total_money` for a payment.
   * @param last4       The last four digits of a payment card.
   * @param cardBrand   The brand of the payment card (for example, VISA).
   * @param limit       The maximum number of results to be returned in a single page. It is possible to
   *                              receive fewer results than the specified limit on a given page.  The default value of
   *                              100 is also the maximum allowed value. If the provided value is  greater than 100, it
   *                              is ignored and the default value is used instead.  Default: `100`
   * @return Response from the API call
   */
  _proto.listPayments =
  /*#__PURE__*/
  function () {
    var _listPayments = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(beginTime, endTime, sortOrder, cursor, locationId, total, last4, cardBrand, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/payments');
              mapped = req.prepareArgs({
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                sortOrder: [sortOrder, optional(string())],
                cursor: [cursor, optional(string())],
                locationId: [locationId, optional(string())],
                total: [total, optional(bigint())],
                last4: [last4, optional(string())],
                cardBrand: [cardBrand, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('sort_order', mapped.sortOrder);
              req.query('cursor', mapped.cursor);
              req.query('location_id', mapped.locationId);
              req.query('total', mapped.total);
              req.query('last_4', mapped.last4);
              req.query('card_brand', mapped.cardBrand);
              req.query('limit', mapped.limit);
              return _context.abrupt("return", req.callAsJson(listPaymentsResponseSchema, requestOptions));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listPayments(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
      return _listPayments.apply(this, arguments);
    }

    return listPayments;
  }()
  /**
   * Creates a payment using the provided source. You can use this endpoint
   * to charge a card (credit/debit card or
   * Square gift card) or record a payment that the seller received outside of Square
   * (cash payment from a buyer or a payment that an external entity
   * processed on behalf of the seller).
   *
   * The endpoint creates a
   * `Payment` object and returns it in the response.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createPayment =
  /*#__PURE__*/
  function () {
    var _createPayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/payments');
              mapped = req.prepareArgs({
                body: [body, createPaymentRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(createPaymentResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createPayment(_x11, _x12) {
      return _createPayment.apply(this, arguments);
    }

    return createPayment;
  }()
  /**
   * Cancels (voids) a payment identified by the idempotency key that is specified in the
   * request.
   *
   * Use this method when the status of a `CreatePayment` request is unknown (for example, after you send
   * a
   * `CreatePayment` request, a network error occurs and you do not get a response). In this case, you
   * can
   * direct Square to cancel the payment using this endpoint. In the request, you provide the same
   * idempotency key that you provided in your `CreatePayment` request that you want to cancel. After
   * canceling the payment, you can submit your `CreatePayment` request again.
   *
   * Note that if no payment with the specified idempotency key is found, no action is taken and the
   * endpoint
   * returns successfully.
   *
   * @param body         An object containing the fields to POST for
   *                                                                    the request.  See the corresponding object
   *                                                                    definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.cancelPaymentByIdempotencyKey =
  /*#__PURE__*/
  function () {
    var _cancelPaymentByIdempotencyKey = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/payments/cancel');
              mapped = req.prepareArgs({
                body: [body, cancelPaymentByIdempotencyKeyRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(cancelPaymentByIdempotencyKeyResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function cancelPaymentByIdempotencyKey(_x13, _x14) {
      return _cancelPaymentByIdempotencyKey.apply(this, arguments);
    }

    return cancelPaymentByIdempotencyKey;
  }()
  /**
   * Retrieves details for a specific payment.
   *
   * @param paymentId  A unique ID for the desired payment.
   * @return Response from the API call
   */
  ;

  _proto.getPayment =
  /*#__PURE__*/
  function () {
    var _getPayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(paymentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                paymentId: [paymentId, string()]
              });
              req.appendTemplatePath(_templateObject$l(), mapped.paymentId);
              return _context4.abrupt("return", req.callAsJson(getPaymentResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getPayment(_x15, _x16) {
      return _getPayment.apply(this, arguments);
    }

    return getPayment;
  }()
  /**
   * Updates a payment with the APPROVED status.
   * You can update the `amount_money` and `tip_money` using this endpoint.
   *
   * @param paymentId    The ID of the payment to update.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updatePayment =
  /*#__PURE__*/
  function () {
    var _updatePayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(paymentId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                paymentId: [paymentId, string()],
                body: [body, updatePaymentRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$f(), mapped.paymentId);
              return _context5.abrupt("return", req.callAsJson(updatePaymentResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function updatePayment(_x17, _x18, _x19) {
      return _updatePayment.apply(this, arguments);
    }

    return updatePayment;
  }()
  /**
   * Cancels (voids) a payment. You can use this endpoint to cancel a payment with
   * the APPROVED `status`.
   *
   * @param paymentId  The ID of the payment to cancel.
   * @return Response from the API call
   */
  ;

  _proto.cancelPayment =
  /*#__PURE__*/
  function () {
    var _cancelPayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(paymentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                paymentId: [paymentId, string()]
              });
              req.appendTemplatePath(_templateObject3$b(), mapped.paymentId);
              return _context6.abrupt("return", req.callAsJson(cancelPaymentResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function cancelPayment(_x20, _x21) {
      return _cancelPayment.apply(this, arguments);
    }

    return cancelPayment;
  }()
  /**
   * Completes (captures) a payment.
   * By default, payments are set to complete immediately after they are created.
   *
   * You can use this endpoint to complete a payment with the APPROVED `status`.
   *
   * @param paymentId    The unique ID identifying the payment to be completed.
   * @param body         An object containing the fields to POST for the request.
   *                                                      See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.completePayment =
  /*#__PURE__*/
  function () {
    var _completePayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(paymentId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                paymentId: [paymentId, string()],
                body: [body, completePaymentRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject4$7(), mapped.paymentId);
              return _context7.abrupt("return", req.callAsJson(completePaymentResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function completePayment(_x22, _x23, _x24) {
      return _completePayment.apply(this, arguments);
    }

    return completePayment;
  }();

  return PaymentsApi;
}(BaseApi);

var paymentRefundSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  appFeeMoney: ['app_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  processingFee: ['processing_fee', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return processingFeeSchema;
  })))],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var getPaymentRefundResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentRefundSchema;
  }))]
});

var listPaymentRefundsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refunds: ['refunds', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return paymentRefundSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var refundPaymentRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  appFeeMoney: ['app_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentVersionToken: ['payment_version_token', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var refundPaymentResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return paymentRefundSchema;
  }))]
});

function _templateObject$m() {
  var data = _taggedTemplateLiteralLoose(["/v2/refunds/", ""]);

  _templateObject$m = function _templateObject() {
    return data;
  };

  return data;
}
var RefundsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(RefundsApi, _BaseApi);

  function RefundsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = RefundsApi.prototype;

  /**
   * Retrieves a list of refunds for the account making the request.
   *
   * Results are eventually consistent, and new refunds or changes to refunds might take several
   * seconds to appear.
   *
   * The maximum results per page is 100.
   *
   * @param beginTime   The timestamp for the beginning of the requested reporting period, in RFC 3339
   *                              format.  Default: The current time minus one year.
   * @param endTime     The timestamp for the end of the requested reporting period, in RFC 3339 format.
   *                              Default: The current time.
   * @param sortOrder   The order in which results are listed: - `ASC` - Oldest to newest. - `DESC` - Newest
   *                              to oldest (default).
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this
   *                              cursor to retrieve the next set of results for the original query.  For more
   *                              information, see [Pagination](https://developer.squareup.
   *                              com/docs/basics/api101/pagination).
   * @param locationId  Limit results to the location supplied. By default, results are returned for all
   *                              locations associated with the seller.
   * @param status      If provided, only refunds with the given status are returned. For a list of refund
   *                              status values, see [PaymentRefund]($m/PaymentRefund).  Default: If omitted, refunds
   *                              are returned regardless of their status.
   * @param sourceType  If provided, only returns refunds whose payments have the indicated source type.
   *                              Current values include `CARD`, `BANK_ACCOUNT`, `WALLET`, `CASH`, and `EXTERNAL`. For
   *                              information about these payment source types, see [Take Payments](https://developer.
   *                              squareup.com/docs/payments-api/take-payments).  Default: If omitted, refunds are
   *                              returned regardless of the source type.
   * @param limit       The maximum number of results to be returned in a single page.  It is possible to
   *                              receive fewer results than the specified limit on a given page.  If the supplied
   *                              value is greater than 100, no more than 100 results are returned.  Default: 100
   * @return Response from the API call
   */
  _proto.listPaymentRefunds =
  /*#__PURE__*/
  function () {
    var _listPaymentRefunds = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(beginTime, endTime, sortOrder, cursor, locationId, status, sourceType, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/refunds');
              mapped = req.prepareArgs({
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                sortOrder: [sortOrder, optional(string())],
                cursor: [cursor, optional(string())],
                locationId: [locationId, optional(string())],
                status: [status, optional(string())],
                sourceType: [sourceType, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('sort_order', mapped.sortOrder);
              req.query('cursor', mapped.cursor);
              req.query('location_id', mapped.locationId);
              req.query('status', mapped.status);
              req.query('source_type', mapped.sourceType);
              req.query('limit', mapped.limit);
              return _context.abrupt("return", req.callAsJson(listPaymentRefundsResponseSchema, requestOptions));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listPaymentRefunds(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
      return _listPaymentRefunds.apply(this, arguments);
    }

    return listPaymentRefunds;
  }()
  /**
   * Refunds a payment. You can refund the entire payment amount or a
   * portion of it. You can use this endpoint to refund a card payment or record a
   * refund of a cash or external payment. For more information, see
   * [Refund Payment](https://developer.squareup.com/docs/payments-api/refund-payments).
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.refundPayment =
  /*#__PURE__*/
  function () {
    var _refundPayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/refunds');
              mapped = req.prepareArgs({
                body: [body, refundPaymentRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(refundPaymentResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function refundPayment(_x10, _x11) {
      return _refundPayment.apply(this, arguments);
    }

    return refundPayment;
  }()
  /**
   * Retrieves a specific refund using the `refund_id`.
   *
   * @param refundId  The unique ID for the desired `PaymentRefund`.
   * @return Response from the API call
   */
  ;

  _proto.getPaymentRefund =
  /*#__PURE__*/
  function () {
    var _getPaymentRefund = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(refundId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                refundId: [refundId, string()]
              });
              req.appendTemplatePath(_templateObject$m(), mapped.refundId);
              return _context3.abrupt("return", req.callAsJson(getPaymentRefundResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getPaymentRefund(_x12, _x13) {
      return _getPaymentRefund.apply(this, arguments);
    }

    return getPaymentRefund;
  }();

  return RefundsApi;
}(BaseApi);

var siteSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  siteTitle: ['site_title', /*#__PURE__*/optional( /*#__PURE__*/string())],
  domain: ['domain', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isPublished: ['is_published', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listSitesResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  sites: ['sites', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return siteSchema;
  })))]
});

var SitesApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(SitesApi, _BaseApi);

  function SitesApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = SitesApi.prototype;

  /**
   * Lists the Square Online sites that belong to a seller. Sites are listed in descending order by the
   * `created_at` date.
   *
   *
   * __Note:__ Square Online APIs are publicly available as part of an early access program. For more
   * information, see [Early access program for Square Online APIs](https://developer.squareup.
   * com/docs/online-api#early-access-program-for-square-online-apis).
   *
   * @return Response from the API call
   */
  _proto.listSites =
  /*#__PURE__*/
  function () {
    var _listSites = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(requestOptions) {
      var req;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET', '/v2/sites');
              return _context.abrupt("return", req.callAsJson(listSitesResponseSchema, requestOptions));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listSites(_x) {
      return _listSites.apply(this, arguments);
    }

    return listSites;
  }();

  return SitesApi;
}(BaseApi);

var deleteSnippetResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var snippetSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  siteId: ['site_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  content: ['content', /*#__PURE__*/string()],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveSnippetResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  snippet: ['snippet', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return snippetSchema;
  }))]
});

var upsertSnippetRequestSchema = /*#__PURE__*/object({
  snippet: ['snippet', /*#__PURE__*/lazy(function () {
    return snippetSchema;
  })]
});

var upsertSnippetResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  snippet: ['snippet', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return snippetSchema;
  }))]
});

function _templateObject3$c() {
  var data = _taggedTemplateLiteralLoose(["/v2/sites/", "/snippet"]);

  _templateObject3$c = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$g() {
  var data = _taggedTemplateLiteralLoose(["/v2/sites/", "/snippet"]);

  _templateObject2$g = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$n() {
  var data = _taggedTemplateLiteralLoose(["/v2/sites/", "/snippet"]);

  _templateObject$n = function _templateObject() {
    return data;
  };

  return data;
}
var SnippetsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(SnippetsApi, _BaseApi);

  function SnippetsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = SnippetsApi.prototype;

  /**
   * Removes your snippet from a Square Online site.
   *
   * You can call [ListSites]($e/Sites/ListSites) to get the IDs of the sites that belong to a seller.
   *
   *
   * __Note:__ Square Online APIs are publicly available as part of an early access program. For more
   * information, see [Early access program for Square Online APIs](https://developer.squareup.
   * com/docs/online-api#early-access-program-for-square-online-apis).
   *
   * @param siteId  The ID of the site that contains the snippet.
   * @return Response from the API call
   */
  _proto.deleteSnippet =
  /*#__PURE__*/
  function () {
    var _deleteSnippet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(siteId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                siteId: [siteId, string()]
              });
              req.appendTemplatePath(_templateObject$n(), mapped.siteId);
              return _context.abrupt("return", req.callAsJson(deleteSnippetResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function deleteSnippet(_x, _x2) {
      return _deleteSnippet.apply(this, arguments);
    }

    return deleteSnippet;
  }()
  /**
   * Retrieves your snippet from a Square Online site. A site can contain snippets from multiple snippet
   * applications, but you can retrieve only the snippet that was added by your application.
   *
   * You can call [ListSites]($e/Sites/ListSites) to get the IDs of the sites that belong to a seller.
   *
   *
   * __Note:__ Square Online APIs are publicly available as part of an early access program. For more
   * information, see [Early access program for Square Online APIs](https://developer.squareup.
   * com/docs/online-api#early-access-program-for-square-online-apis).
   *
   * @param siteId  The ID of the site that contains the snippet.
   * @return Response from the API call
   */
  ;

  _proto.retrieveSnippet =
  /*#__PURE__*/
  function () {
    var _retrieveSnippet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(siteId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                siteId: [siteId, string()]
              });
              req.appendTemplatePath(_templateObject2$g(), mapped.siteId);
              return _context2.abrupt("return", req.callAsJson(retrieveSnippetResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveSnippet(_x3, _x4) {
      return _retrieveSnippet.apply(this, arguments);
    }

    return retrieveSnippet;
  }()
  /**
   * Adds a snippet to a Square Online site or updates the existing snippet on the site.
   * The snippet code is appended to the end of the `head` element on every page of the site, except
   * checkout pages. A snippet application can add one snippet to a given site.
   *
   * You can call [ListSites]($e/Sites/ListSites) to get the IDs of the sites that belong to a seller.
   *
   *
   * __Note:__ Square Online APIs are publicly available as part of an early access program. For more
   * information, see [Early access program for Square Online APIs](https://developer.squareup.
   * com/docs/online-api#early-access-program-for-square-online-apis).
   *
   * @param siteId       The ID of the site where you want to add or update the snippet.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.upsertSnippet =
  /*#__PURE__*/
  function () {
    var _upsertSnippet = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(siteId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                siteId: [siteId, string()],
                body: [body, upsertSnippetRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$c(), mapped.siteId);
              return _context3.abrupt("return", req.callAsJson(upsertSnippetResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function upsertSnippet(_x5, _x6, _x7) {
      return _upsertSnippet.apply(this, arguments);
    }

    return upsertSnippet;
  }();

  return SnippetsApi;
}(BaseApi);

var subscriptionActionSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  effectiveDate: ['effective_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  newPlanId: ['new_plan_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var subscriptionSourceSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var subscriptionSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  planId: ['plan_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  startDate: ['start_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledDate: ['canceled_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  chargedThroughDate: ['charged_through_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxPercentage: ['tax_percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  invoiceIds: ['invoice_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  priceOverrideMoney: ['price_override_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cardId: ['card_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timezone: ['timezone', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSourceSchema;
  }))],
  actions: ['actions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionActionSchema;
  })))]
});

var cancelSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))],
  actions: ['actions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionActionSchema;
  })))]
});

var createSubscriptionRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/string()],
  planId: ['plan_id', /*#__PURE__*/string()],
  customerId: ['customer_id', /*#__PURE__*/string()],
  startDate: ['start_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledDate: ['canceled_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxPercentage: ['tax_percentage', /*#__PURE__*/optional( /*#__PURE__*/string())],
  priceOverrideMoney: ['price_override_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  cardId: ['card_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  timezone: ['timezone', /*#__PURE__*/optional( /*#__PURE__*/string())],
  source: ['source', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSourceSchema;
  }))]
});

var createSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))]
});

var deleteSubscriptionActionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))]
});

var subscriptionEventInfoSchema = /*#__PURE__*/object({
  detail: ['detail', /*#__PURE__*/optional( /*#__PURE__*/string())],
  code: ['code', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var subscriptionEventSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/string()],
  subscriptionEventType: ['subscription_event_type', /*#__PURE__*/string()],
  effectiveDate: ['effective_date', /*#__PURE__*/string()],
  planId: ['plan_id', /*#__PURE__*/string()],
  info: ['info', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionEventInfoSchema;
  }))]
});

var listSubscriptionEventsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscriptionEvents: ['subscription_events', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionEventSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var pauseSubscriptionRequestSchema = /*#__PURE__*/object({
  pauseEffectiveDate: ['pause_effective_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pauseCycleDuration: ['pause_cycle_duration', /*#__PURE__*/optional( /*#__PURE__*/bigint())],
  resumeEffectiveDate: ['resume_effective_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  resumeChangeTiming: ['resume_change_timing', /*#__PURE__*/optional( /*#__PURE__*/string())],
  pauseReason: ['pause_reason', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var pauseSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))],
  actions: ['actions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionActionSchema;
  })))]
});

var resumeSubscriptionRequestSchema = /*#__PURE__*/object({
  resumeEffectiveDate: ['resume_effective_date', /*#__PURE__*/optional( /*#__PURE__*/string())],
  resumeChangeTiming: ['resume_change_timing', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var resumeSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))],
  actions: ['actions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionActionSchema;
  })))]
});

var retrieveSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))]
});

var searchSubscriptionsFilterSchema = /*#__PURE__*/object({
  customerIds: ['customer_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  sourceNames: ['source_names', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchSubscriptionsQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchSubscriptionsFilterSchema;
  }))]
});

var searchSubscriptionsRequestSchema = /*#__PURE__*/object({
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchSubscriptionsQuerySchema;
  }))],
  include: ['include', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchSubscriptionsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscriptions: ['subscriptions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var swapPlanRequestSchema = /*#__PURE__*/object({
  newPlanId: ['new_plan_id', /*#__PURE__*/string()]
});

var swapPlanResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))],
  actions: ['actions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return subscriptionActionSchema;
  })))]
});

var updateSubscriptionRequestSchema = /*#__PURE__*/object({
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))]
});

var updateSubscriptionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  subscription: ['subscription', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return subscriptionSchema;
  }))]
});

function _templateObject8$3() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/swap-plan"]);

  _templateObject8$3 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/resume"]);

  _templateObject7$5 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$5() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/pause"]);

  _templateObject6$5 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$6() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/events"]);

  _templateObject5$6 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$8() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/cancel"]);

  _templateObject4$8 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$d() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", "/actions/", ""]);

  _templateObject3$d = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$h() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", ""]);

  _templateObject2$h = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$o() {
  var data = _taggedTemplateLiteralLoose(["/v2/subscriptions/", ""]);

  _templateObject$o = function _templateObject() {
    return data;
  };

  return data;
}
var SubscriptionsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(SubscriptionsApi, _BaseApi);

  function SubscriptionsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = SubscriptionsApi.prototype;

  /**
   * Creates a subscription to a subscription plan by a customer.
   *
   * If you provide a card on file in the request, Square charges the card for
   * the subscription. Otherwise, Square bills an invoice to the customer's email
   * address. The subscription starts immediately, unless the request includes
   * the optional `start_date`. Each individual subscription is associated with a particular location.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                         See the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.createSubscription =
  /*#__PURE__*/
  function () {
    var _createSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/subscriptions');
              mapped = req.prepareArgs({
                body: [body, createSubscriptionRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createSubscriptionResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createSubscription(_x, _x2) {
      return _createSubscription.apply(this, arguments);
    }

    return createSubscription;
  }()
  /**
   * Searches for subscriptions.
   *
   * Results are ordered chronologically by subscription creation date. If
   * the request specifies more than one location ID,
   * the endpoint orders the result
   * by location ID, and then by creation date within each location. If no locations are given
   * in the query, all locations are searched.
   *
   * You can also optionally specify `customer_ids` to search by customer.
   * If left unset, all customers
   * associated with the specified locations are returned.
   * If the request specifies customer IDs, the endpoint orders results
   * first by location, within location by customer ID, and within
   * customer by subscription creation date.
   *
   * For more information, see
   * [Retrieve subscriptions](https://developer.squareup.com/docs/subscriptions-api/overview#retrieve-
   * subscriptions).
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.searchSubscriptions =
  /*#__PURE__*/
  function () {
    var _searchSubscriptions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/subscriptions/search');
              mapped = req.prepareArgs({
                body: [body, searchSubscriptionsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(searchSubscriptionsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function searchSubscriptions(_x3, _x4) {
      return _searchSubscriptions.apply(this, arguments);
    }

    return searchSubscriptions;
  }()
  /**
   * Retrieves a subscription.
   *
   * @param subscriptionId  The ID of the subscription to retrieve.
   * @param include         A query parameter to specify related information to be included in the response.
   *                                  The supported query parameter values are:   - `actions`: to include scheduled
   *                                  actions on the targeted subscription.
   * @return Response from the API call
   */
  ;

  _proto.retrieveSubscription =
  /*#__PURE__*/
  function () {
    var _retrieveSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(subscriptionId, include, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                include: [include, optional(string())]
              });
              req.query('include', mapped.include);
              req.appendTemplatePath(_templateObject$o(), mapped.subscriptionId);
              return _context3.abrupt("return", req.callAsJson(retrieveSubscriptionResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function retrieveSubscription(_x5, _x6, _x7) {
      return _retrieveSubscription.apply(this, arguments);
    }

    return retrieveSubscription;
  }()
  /**
   * Updates a subscription. You can set, modify, and clear the
   * `subscription` field values.
   *
   * @param subscriptionId  The ID of the subscription to update.
   * @param body            An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.updateSubscription =
  /*#__PURE__*/
  function () {
    var _updateSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(subscriptionId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                body: [body, updateSubscriptionRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$h(), mapped.subscriptionId);
              return _context4.abrupt("return", req.callAsJson(updateSubscriptionResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateSubscription(_x8, _x9, _x10) {
      return _updateSubscription.apply(this, arguments);
    }

    return updateSubscription;
  }()
  /**
   * Deletes a scheduled action for a subscription.
   *
   * @param subscriptionId  The ID of the subscription the targeted action is to act upon.
   * @param actionId        The ID of the targeted action to be deleted.
   * @return Response from the API call
   */
  ;

  _proto.deleteSubscriptionAction =
  /*#__PURE__*/
  function () {
    var _deleteSubscriptionAction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(subscriptionId, actionId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('DELETE');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                actionId: [actionId, string()]
              });
              req.appendTemplatePath(_templateObject3$d(), mapped.subscriptionId, mapped.actionId);
              return _context5.abrupt("return", req.callAsJson(deleteSubscriptionActionResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deleteSubscriptionAction(_x11, _x12, _x13) {
      return _deleteSubscriptionAction.apply(this, arguments);
    }

    return deleteSubscriptionAction;
  }()
  /**
   * Schedules a `CANCEL` action to cancel an active subscription
   * by setting the `canceled_date` field to the end of the active billing period
   * and changing the subscription status from ACTIVE to CANCELED after this date.
   *
   * @param subscriptionId  The ID of the subscription to cancel.
   * @return Response from the API call
   */
  ;

  _proto.cancelSubscription =
  /*#__PURE__*/
  function () {
    var _cancelSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(subscriptionId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()]
              });
              req.appendTemplatePath(_templateObject4$8(), mapped.subscriptionId);
              return _context6.abrupt("return", req.callAsJson(cancelSubscriptionResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function cancelSubscription(_x14, _x15) {
      return _cancelSubscription.apply(this, arguments);
    }

    return cancelSubscription;
  }()
  /**
   * Lists all events for a specific subscription.
   * In the current implementation, only `START_SUBSCRIPTION` and `STOP_SUBSCRIPTION` (when the
   * subscription was canceled) events are returned.
   *
   * @param subscriptionId  The ID of the subscription to retrieve the events for.
   * @param cursor          When the total number of resulting subscription events exceeds the limit of a
   *                                  paged response,  specify the cursor returned from a preceding response here to
   *                                  fetch the next set of results. If the cursor is unset, the response contains the
   *                                  last page of the results.  For more information, see [Pagination](https:
   *                                  //developer.squareup.com/docs/working-with-apis/pagination).
   * @param limit           The upper limit on the number of subscription events to return in a paged
   *                                  response.
   * @return Response from the API call
   */
  ;

  _proto.listSubscriptionEvents =
  /*#__PURE__*/
  function () {
    var _listSubscriptionEvents = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(subscriptionId, cursor, limit, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                cursor: [cursor, optional(string())],
                limit: [limit, optional(number())]
              });
              req.query('cursor', mapped.cursor);
              req.query('limit', mapped.limit);
              req.appendTemplatePath(_templateObject5$6(), mapped.subscriptionId);
              return _context7.abrupt("return", req.callAsJson(listSubscriptionEventsResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function listSubscriptionEvents(_x16, _x17, _x18, _x19) {
      return _listSubscriptionEvents.apply(this, arguments);
    }

    return listSubscriptionEvents;
  }()
  /**
   * Schedules a `PAUSE` action to pause an active subscription.
   *
   * @param subscriptionId  The ID of the subscription to pause.
   * @param body            An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.pauseSubscription =
  /*#__PURE__*/
  function () {
    var _pauseSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(subscriptionId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                body: [body, pauseSubscriptionRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject6$5(), mapped.subscriptionId);
              return _context8.abrupt("return", req.callAsJson(pauseSubscriptionResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function pauseSubscription(_x20, _x21, _x22) {
      return _pauseSubscription.apply(this, arguments);
    }

    return pauseSubscription;
  }()
  /**
   * Schedules a `RESUME` action to resume a paused or a deactivated subscription.
   *
   * @param subscriptionId  The ID of the subscription to resume.
   * @param body            An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.resumeSubscription =
  /*#__PURE__*/
  function () {
    var _resumeSubscription = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(subscriptionId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                body: [body, resumeSubscriptionRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject7$5(), mapped.subscriptionId);
              return _context9.abrupt("return", req.callAsJson(resumeSubscriptionResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function resumeSubscription(_x23, _x24, _x25) {
      return _resumeSubscription.apply(this, arguments);
    }

    return resumeSubscription;
  }()
  /**
   * Schedules a `SWAP_PLAN` action to swap a subscription plan in an existing subscription.
   *
   * @param subscriptionId  The ID of the subscription to swap the subscription plan for.
   * @param body            An object containing the fields to POST for the request.  See
   *                                                  the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.swapPlan =
  /*#__PURE__*/
  function () {
    var _swapPlan = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(subscriptionId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                subscriptionId: [subscriptionId, string()],
                body: [body, swapPlanRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject8$3(), mapped.subscriptionId);
              return _context10.abrupt("return", req.callAsJson(swapPlanResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function swapPlan(_x26, _x27, _x28) {
      return _swapPlan.apply(this, arguments);
    }

    return swapPlan;
  }();

  return SubscriptionsApi;
}(BaseApi);

var teamMemberAssignedLocationsSchema = /*#__PURE__*/object({
  assignmentType: ['assignment_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var teamMemberSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isOwner: ['is_owner', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  givenName: ['given_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  familyName: ['family_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  assignedLocations: ['assigned_locations', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberAssignedLocationsSchema;
  }))]
});

var createTeamMemberRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  teamMember: ['team_member', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  }))]
});

var bulkCreateTeamMembersRequestSchema = /*#__PURE__*/object({
  teamMembers: ['team_members', /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return createTeamMemberRequestSchema;
  }))]
});

var createTeamMemberResponseSchema = /*#__PURE__*/object({
  teamMember: ['team_member', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var bulkCreateTeamMembersResponseSchema = /*#__PURE__*/object({
  teamMembers: ['team_members', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return createTeamMemberResponseSchema;
  })))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateTeamMemberRequestSchema = /*#__PURE__*/object({
  teamMember: ['team_member', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  }))]
});

var bulkUpdateTeamMembersRequestSchema = /*#__PURE__*/object({
  teamMembers: ['team_members', /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return updateTeamMemberRequestSchema;
  }))]
});

var updateTeamMemberResponseSchema = /*#__PURE__*/object({
  teamMember: ['team_member', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var bulkUpdateTeamMembersResponseSchema = /*#__PURE__*/object({
  teamMembers: ['team_members', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return updateTeamMemberResponseSchema;
  })))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var retrieveTeamMemberResponseSchema = /*#__PURE__*/object({
  teamMember: ['team_member', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var jobAssignmentSchema = /*#__PURE__*/object({
  jobTitle: ['job_title', /*#__PURE__*/string()],
  payType: ['pay_type', /*#__PURE__*/string()],
  hourlyRate: ['hourly_rate', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  annualRate: ['annual_rate', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return moneySchema;
  }))],
  weeklyHours: ['weekly_hours', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var wageSettingSchema = /*#__PURE__*/object({
  teamMemberId: ['team_member_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  jobAssignments: ['job_assignments', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return jobAssignmentSchema;
  })))],
  isOvertimeExempt: ['is_overtime_exempt', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveWageSettingResponseSchema = /*#__PURE__*/object({
  wageSetting: ['wage_setting', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return wageSettingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var searchTeamMembersFilterSchema = /*#__PURE__*/object({
  locationIds: ['location_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isOwner: ['is_owner', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var searchTeamMembersQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchTeamMembersFilterSchema;
  }))]
});

var searchTeamMembersRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchTeamMembersQuerySchema;
  }))],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchTeamMembersResponseSchema = /*#__PURE__*/object({
  teamMembers: ['team_members', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return teamMemberSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var updateWageSettingRequestSchema = /*#__PURE__*/object({
  wageSetting: ['wage_setting', /*#__PURE__*/lazy(function () {
    return wageSettingSchema;
  })]
});

var updateWageSettingResponseSchema = /*#__PURE__*/object({
  wageSetting: ['wage_setting', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return wageSettingSchema;
  }))],
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject4$9() {
  var data = _taggedTemplateLiteralLoose(["/v2/team-members/", "/wage-setting"]);

  _templateObject4$9 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$e() {
  var data = _taggedTemplateLiteralLoose(["/v2/team-members/", "/wage-setting"]);

  _templateObject3$e = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$i() {
  var data = _taggedTemplateLiteralLoose(["/v2/team-members/", ""]);

  _templateObject2$i = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$p() {
  var data = _taggedTemplateLiteralLoose(["/v2/team-members/", ""]);

  _templateObject$p = function _templateObject() {
    return data;
  };

  return data;
}
var TeamApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(TeamApi, _BaseApi);

  function TeamApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = TeamApi.prototype;

  /**
   * Creates a single `TeamMember` object. The `TeamMember` object is returned on successful creates.
   * You must provide the following values in your request to this endpoint:
   * - `given_name`
   * - `family_name`
   *
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#createteammember).
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                       See the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.createTeamMember =
  /*#__PURE__*/
  function () {
    var _createTeamMember = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/team-members');
              mapped = req.prepareArgs({
                body: [body, createTeamMemberRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createTeamMemberResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createTeamMember(_x, _x2) {
      return _createTeamMember.apply(this, arguments);
    }

    return createTeamMember;
  }()
  /**
   * Creates multiple `TeamMember` objects. The created `TeamMember` objects are returned on successful
   * creates.
   * This process is non-transactional and processes as much of the request as possible. If one of the
   * creates in
   * the request cannot be successfully processed, the request is not marked as failed, but the body of
   * the response
   * contains explicit error information for the failed create.
   *
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#bulk-create-team-members).
   *
   * @param body         An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.bulkCreateTeamMembers =
  /*#__PURE__*/
  function () {
    var _bulkCreateTeamMembers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/team-members/bulk-create');
              mapped = req.prepareArgs({
                body: [body, bulkCreateTeamMembersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(bulkCreateTeamMembersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function bulkCreateTeamMembers(_x3, _x4) {
      return _bulkCreateTeamMembers.apply(this, arguments);
    }

    return bulkCreateTeamMembers;
  }()
  /**
   * Updates multiple `TeamMember` objects. The updated `TeamMember` objects are returned on successful
   * updates.
   * This process is non-transactional and processes as much of the request as possible. If one of the
   * updates in
   * the request cannot be successfully processed, the request is not marked as failed, but the body of
   * the response
   * contains explicit error information for the failed update.
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#bulk-update-team-members).
   *
   * @param body         An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.bulkUpdateTeamMembers =
  /*#__PURE__*/
  function () {
    var _bulkUpdateTeamMembers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST', '/v2/team-members/bulk-update');
              mapped = req.prepareArgs({
                body: [body, bulkUpdateTeamMembersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(bulkUpdateTeamMembersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function bulkUpdateTeamMembers(_x5, _x6) {
      return _bulkUpdateTeamMembers.apply(this, arguments);
    }

    return bulkUpdateTeamMembers;
  }()
  /**
   * Returns a paginated list of `TeamMember` objects for a business.
   * The list can be filtered by the following:
   * - location IDs
   * - `status`
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                        See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchTeamMembers =
  /*#__PURE__*/
  function () {
    var _searchTeamMembers = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/team-members/search');
              mapped = req.prepareArgs({
                body: [body, searchTeamMembersRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context4.abrupt("return", req.callAsJson(searchTeamMembersResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function searchTeamMembers(_x7, _x8) {
      return _searchTeamMembers.apply(this, arguments);
    }

    return searchTeamMembers;
  }()
  /**
   * Retrieves a `TeamMember` object for the given `TeamMember.id`.
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#retrieve-a-team-member).
   *
   * @param teamMemberId   The ID of the team member to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveTeamMember =
  /*#__PURE__*/
  function () {
    var _retrieveTeamMember = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(teamMemberId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, string()]
              });
              req.appendTemplatePath(_templateObject$p(), mapped.teamMemberId);
              return _context5.abrupt("return", req.callAsJson(retrieveTeamMemberResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function retrieveTeamMember(_x9, _x10) {
      return _retrieveTeamMember.apply(this, arguments);
    }

    return retrieveTeamMember;
  }()
  /**
   * Updates a single `TeamMember` object. The `TeamMember` object is returned on successful updates.
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#update-a-team-member).
   *
   * @param teamMemberId   The ID of the team member to update.
   * @param body           An object containing the fields to POST for the request.
   *                                                         See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.updateTeamMember =
  /*#__PURE__*/
  function () {
    var _updateTeamMember = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(teamMemberId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, string()],
                body: [body, updateTeamMemberRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$i(), mapped.teamMemberId);
              return _context6.abrupt("return", req.callAsJson(updateTeamMemberResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updateTeamMember(_x11, _x12, _x13) {
      return _updateTeamMember.apply(this, arguments);
    }

    return updateTeamMember;
  }()
  /**
   * Retrieves a `WageSetting` object for a team member specified
   * by `TeamMember.id`.
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#retrievewagesetting).
   *
   * @param teamMemberId   The ID of the team member for which to retrieve the wage setting.
   * @return Response from the API call
   */
  ;

  _proto.retrieveWageSetting =
  /*#__PURE__*/
  function () {
    var _retrieveWageSetting = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(teamMemberId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, string()]
              });
              req.appendTemplatePath(_templateObject3$e(), mapped.teamMemberId);
              return _context7.abrupt("return", req.callAsJson(retrieveWageSettingResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function retrieveWageSetting(_x14, _x15) {
      return _retrieveWageSetting.apply(this, arguments);
    }

    return retrieveWageSetting;
  }()
  /**
   * Creates or updates a `WageSetting` object. The object is created if a
   * `WageSetting` with the specified `team_member_id` does not exist. Otherwise,
   * it fully replaces the `WageSetting` object for the team member.
   * The `WageSetting` is returned on a successful update.
   * Learn about [Troubleshooting the Team API](https://developer.squareup.
   * com/docs/team/troubleshooting#create-or-update-a-wage-setting).
   *
   * @param teamMemberId   The ID of the team member for which to update the
   *                                                          `WageSetting` object.
   * @param body           An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.updateWageSetting =
  /*#__PURE__*/
  function () {
    var _updateWageSetting = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(teamMemberId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                teamMemberId: [teamMemberId, string()],
                body: [body, updateWageSettingRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject4$9(), mapped.teamMemberId);
              return _context8.abrupt("return", req.callAsJson(updateWageSettingResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function updateWageSetting(_x16, _x17, _x18) {
      return _updateWageSetting.apply(this, arguments);
    }

    return updateWageSetting;
  }();

  return TeamApi;
}(BaseApi);

var tipSettingsSchema = /*#__PURE__*/object({
  allowTipping: ['allow_tipping', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  separateTipScreen: ['separate_tip_screen', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  customTipField: ['custom_tip_field', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  tipPercentages: ['tip_percentages', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/number()))],
  smartTipping: ['smart_tipping', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var deviceCheckoutOptionsSchema = /*#__PURE__*/object({
  deviceId: ['device_id', /*#__PURE__*/string()],
  skipReceiptScreen: ['skip_receipt_screen', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  tipSettings: ['tip_settings', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return tipSettingsSchema;
  }))]
});

var terminalCheckoutSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceOptions: ['device_options', /*#__PURE__*/lazy(function () {
    return deviceCheckoutOptionsSchema;
  })],
  deadlineDuration: ['deadline_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cancelReason: ['cancel_reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentIds: ['payment_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appId: ['app_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentType: ['payment_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  customerId: ['customer_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cancelTerminalCheckoutResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  checkout: ['checkout', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutSchema;
  }))]
});

var terminalRefundSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundId: ['refund_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentId: ['payment_id', /*#__PURE__*/string()],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/lazy(function () {
    return moneySchema;
  })],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deviceId: ['device_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  deadlineDuration: ['deadline_duration', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cancelReason: ['cancel_reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appId: ['app_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var cancelTerminalRefundResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundSchema;
  }))]
});

var createTerminalCheckoutRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  checkout: ['checkout', /*#__PURE__*/lazy(function () {
    return terminalCheckoutSchema;
  })]
});

var createTerminalCheckoutResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  checkout: ['checkout', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutSchema;
  }))]
});

var createTerminalRefundRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundSchema;
  }))]
});

var createTerminalRefundResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundSchema;
  }))]
});

var getTerminalCheckoutResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  checkout: ['checkout', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutSchema;
  }))]
});

var getTerminalRefundResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refund: ['refund', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundSchema;
  }))]
});

var terminalCheckoutQueryFilterSchema = /*#__PURE__*/object({
  deviceId: ['device_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var terminalCheckoutQuerySortSchema = /*#__PURE__*/object({
  sortOrder: ['sort_order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var terminalCheckoutQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutQueryFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutQuerySortSchema;
  }))]
});

var searchTerminalCheckoutsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalCheckoutQuerySchema;
  }))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var searchTerminalCheckoutsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  checkouts: ['checkouts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return terminalCheckoutSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var terminalRefundQueryFilterSchema = /*#__PURE__*/object({
  deviceId: ['device_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return timeRangeSchema;
  }))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var terminalRefundQuerySortSchema = /*#__PURE__*/object({
  sortOrder: ['sort_order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var terminalRefundQuerySchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundQueryFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundQuerySortSchema;
  }))]
});

var searchTerminalRefundsRequestSchema = /*#__PURE__*/object({
  query: ['query', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return terminalRefundQuerySchema;
  }))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())],
  limit: ['limit', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var searchTerminalRefundsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  refunds: ['refunds', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return terminalRefundSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject4$a() {
  var data = _taggedTemplateLiteralLoose(["/v2/terminals/refunds/", "/cancel"]);

  _templateObject4$a = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$f() {
  var data = _taggedTemplateLiteralLoose(["/v2/terminals/refunds/", ""]);

  _templateObject3$f = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$j() {
  var data = _taggedTemplateLiteralLoose(["/v2/terminals/checkouts/", "/cancel"]);

  _templateObject2$j = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$q() {
  var data = _taggedTemplateLiteralLoose(["/v2/terminals/checkouts/", ""]);

  _templateObject$q = function _templateObject() {
    return data;
  };

  return data;
}
var TerminalApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(TerminalApi, _BaseApi);

  function TerminalApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = TerminalApi.prototype;

  /**
   * Creates a Terminal checkout request and sends it to the specified device to take a payment
   * for the requested amount.
   *
   * @param body         An object containing the fields to POST for the
   *                                                             request.  See the corresponding object definition for
   *                                                             field details.
   * @return Response from the API call
   */
  _proto.createTerminalCheckout =
  /*#__PURE__*/
  function () {
    var _createTerminalCheckout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/terminals/checkouts');
              mapped = req.prepareArgs({
                body: [body, createTerminalCheckoutRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(createTerminalCheckoutResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createTerminalCheckout(_x, _x2) {
      return _createTerminalCheckout.apply(this, arguments);
    }

    return createTerminalCheckout;
  }()
  /**
   * Retrieves a filtered list of Terminal checkout requests created by the account making the request.
   *
   * @param body         An object containing the fields to POST for the
   *                                                              request.  See the corresponding object definition for
   *                                                              field details.
   * @return Response from the API call
   */
  ;

  _proto.searchTerminalCheckouts =
  /*#__PURE__*/
  function () {
    var _searchTerminalCheckouts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/terminals/checkouts/search');
              mapped = req.prepareArgs({
                body: [body, searchTerminalCheckoutsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(searchTerminalCheckoutsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function searchTerminalCheckouts(_x3, _x4) {
      return _searchTerminalCheckouts.apply(this, arguments);
    }

    return searchTerminalCheckouts;
  }()
  /**
   * Retrieves a Terminal checkout request by `checkout_id`.
   *
   * @param checkoutId  The unique ID for the desired `TerminalCheckout`.
   * @return Response from the API call
   */
  ;

  _proto.getTerminalCheckout =
  /*#__PURE__*/
  function () {
    var _getTerminalCheckout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(checkoutId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                checkoutId: [checkoutId, string()]
              });
              req.appendTemplatePath(_templateObject$q(), mapped.checkoutId);
              return _context3.abrupt("return", req.callAsJson(getTerminalCheckoutResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getTerminalCheckout(_x5, _x6) {
      return _getTerminalCheckout.apply(this, arguments);
    }

    return getTerminalCheckout;
  }()
  /**
   * Cancels a Terminal checkout request if the status of the request permits it.
   *
   * @param checkoutId  The unique ID for the desired `TerminalCheckout`.
   * @return Response from the API call
   */
  ;

  _proto.cancelTerminalCheckout =
  /*#__PURE__*/
  function () {
    var _cancelTerminalCheckout = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(checkoutId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                checkoutId: [checkoutId, string()]
              });
              req.appendTemplatePath(_templateObject2$j(), mapped.checkoutId);
              return _context4.abrupt("return", req.callAsJson(cancelTerminalCheckoutResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function cancelTerminalCheckout(_x7, _x8) {
      return _cancelTerminalCheckout.apply(this, arguments);
    }

    return cancelTerminalCheckout;
  }()
  /**
   * Creates a request to refund an Interac payment completed on a Square Terminal.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                           See the corresponding object definition for field
   *                                                           details.
   * @return Response from the API call
   */
  ;

  _proto.createTerminalRefund =
  /*#__PURE__*/
  function () {
    var _createTerminalRefund = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST', '/v2/terminals/refunds');
              mapped = req.prepareArgs({
                body: [body, createTerminalRefundRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context5.abrupt("return", req.callAsJson(createTerminalRefundResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function createTerminalRefund(_x9, _x10) {
      return _createTerminalRefund.apply(this, arguments);
    }

    return createTerminalRefund;
  }()
  /**
   * Retrieves a filtered list of Interac Terminal refund requests created by the seller making the
   * request.
   *
   * @param body         An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  ;

  _proto.searchTerminalRefunds =
  /*#__PURE__*/
  function () {
    var _searchTerminalRefunds = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('POST', '/v2/terminals/refunds/search');
              mapped = req.prepareArgs({
                body: [body, searchTerminalRefundsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context6.abrupt("return", req.callAsJson(searchTerminalRefundsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function searchTerminalRefunds(_x11, _x12) {
      return _searchTerminalRefunds.apply(this, arguments);
    }

    return searchTerminalRefunds;
  }()
  /**
   * Retrieves an Interac Terminal refund object by ID.
   *
   * @param terminalRefundId   The unique ID for the desired `TerminalRefund`.
   * @return Response from the API call
   */
  ;

  _proto.getTerminalRefund =
  /*#__PURE__*/
  function () {
    var _getTerminalRefund = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(terminalRefundId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                terminalRefundId: [terminalRefundId, string()]
              });
              req.appendTemplatePath(_templateObject3$f(), mapped.terminalRefundId);
              return _context7.abrupt("return", req.callAsJson(getTerminalRefundResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getTerminalRefund(_x13, _x14) {
      return _getTerminalRefund.apply(this, arguments);
    }

    return getTerminalRefund;
  }()
  /**
   * Cancels an Interac Terminal refund request by refund request ID if the status of the request permits
   * it.
   *
   * @param terminalRefundId   The unique ID for the desired `TerminalRefund`.
   * @return Response from the API call
   */
  ;

  _proto.cancelTerminalRefund =
  /*#__PURE__*/
  function () {
    var _cancelTerminalRefund = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(terminalRefundId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                terminalRefundId: [terminalRefundId, string()]
              });
              req.appendTemplatePath(_templateObject4$a(), mapped.terminalRefundId);
              return _context8.abrupt("return", req.callAsJson(cancelTerminalRefundResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function cancelTerminalRefund(_x15, _x16) {
      return _cancelTerminalRefund.apply(this, arguments);
    }

    return cancelTerminalRefund;
  }();

  return TerminalApi;
}(BaseApi);

var captureTransactionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

var transactionSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  locationId: ['location_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  tenders: ['tenders', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return tenderSchema;
  })))],
  refunds: ['refunds', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return refundSchema;
  })))],
  referenceId: ['reference_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  product: ['product', /*#__PURE__*/optional( /*#__PURE__*/string())],
  clientId: ['client_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shippingAddress: ['shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  orderId: ['order_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var listTransactionsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  transactions: ['transactions', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return transactionSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var retrieveTransactionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  transaction: ['transaction', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return transactionSchema;
  }))]
});

var voidTransactionResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))]
});

function _templateObject4$b() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", "/transactions/", "/void"]);

  _templateObject4$b = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$g() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", "/transactions/", "/capture"]);

  _templateObject3$g = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$k() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", "/transactions/", ""]);

  _templateObject2$k = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$r() {
  var data = _taggedTemplateLiteralLoose(["/v2/locations/", "/transactions"]);

  _templateObject$r = function _templateObject() {
    return data;
  };

  return data;
}
var TransactionsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(TransactionsApi, _BaseApi);

  function TransactionsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = TransactionsApi.prototype;

  /**
   * Lists transactions for a particular location.
   *
   * Transactions include payment information from sales and exchanges and refund
   * information from returns and exchanges.
   *
   * Max results per [page](https://developer.squareup.com/docs/working-with-apis/pagination): 50
   *
   * @param locationId  The ID of the location to list transactions for.
   * @param beginTime   The beginning of the requested reporting period, in RFC 3339 format.  See [Date
   *                              ranges](https://developer.squareup.com/docs/build-basics/working-with-dates) for
   *                              details on date inclusivity/exclusivity.  Default value: The current time minus one
   *                              year.
   * @param endTime     The end of the requested reporting period, in RFC 3339 format.  See [Date
   *                              ranges](https://developer.squareup.com/docs/build-basics/working-with-dates) for
   *                              details on date inclusivity/exclusivity.  Default value: The current time.
   * @param sortOrder   The order in which results are listed in the response (`ASC` for oldest first,
   *                              `DESC` for newest first).  Default value: `DESC`
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this to
   *                              retrieve the next set of results for your original query.  See [Paginating
   *                              results](https://developer.squareup.com/docs/working-with-apis/pagination) for more
   *                              information.
   * @return Response from the API call
   * @deprecated
   */
  _proto.listTransactions =
  /*#__PURE__*/
  function () {
    var _listTransactions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, beginTime, endTime, sortOrder, cursor, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                sortOrder: [sortOrder, optional(string())],
                cursor: [cursor, optional(string())]
              });
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('sort_order', mapped.sortOrder);
              req.query('cursor', mapped.cursor);
              req.appendTemplatePath(_templateObject$r(), mapped.locationId);
              req.deprecated('TransactionsApi.listTransactions');
              return _context.abrupt("return", req.callAsJson(listTransactionsResponseSchema, requestOptions));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listTransactions(_x, _x2, _x3, _x4, _x5, _x6) {
      return _listTransactions.apply(this, arguments);
    }

    return listTransactions;
  }()
  /**
   * Retrieves details for a single transaction.
   *
   * @param locationId     The ID of the transaction's associated location.
   * @param transactionId  The ID of the transaction to retrieve.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrieveTransaction =
  /*#__PURE__*/
  function () {
    var _retrieveTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(locationId, transactionId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                transactionId: [transactionId, string()]
              });
              req.appendTemplatePath(_templateObject2$k(), mapped.locationId, mapped.transactionId);
              req.deprecated('TransactionsApi.retrieveTransaction');
              return _context2.abrupt("return", req.callAsJson(retrieveTransactionResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveTransaction(_x7, _x8, _x9) {
      return _retrieveTransaction.apply(this, arguments);
    }

    return retrieveTransaction;
  }()
  /**
   * Captures a transaction that was created with the [Charge]($e/Transactions/Charge)
   * endpoint with a `delay_capture` value of `true`.
   *
   *
   * See [Delayed capture transactions](https://developer.squareup.
   * com/docs/payments/transactions/overview#delayed-capture)
   * for more information.
   *
   * @param locationId
   * @param transactionId
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.captureTransaction =
  /*#__PURE__*/
  function () {
    var _captureTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(locationId, transactionId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                transactionId: [transactionId, string()]
              });
              req.appendTemplatePath(_templateObject3$g(), mapped.locationId, mapped.transactionId);
              req.deprecated('TransactionsApi.captureTransaction');
              return _context3.abrupt("return", req.callAsJson(captureTransactionResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function captureTransaction(_x10, _x11, _x12) {
      return _captureTransaction.apply(this, arguments);
    }

    return captureTransaction;
  }()
  /**
   * Cancels a transaction that was created with the [Charge]($e/Transactions/Charge)
   * endpoint with a `delay_capture` value of `true`.
   *
   *
   * See [Delayed capture transactions](https://developer.squareup.
   * com/docs/payments/transactions/overview#delayed-capture)
   * for more information.
   *
   * @param locationId
   * @param transactionId
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.voidTransaction =
  /*#__PURE__*/
  function () {
    var _voidTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(locationId, transactionId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                transactionId: [transactionId, string()]
              });
              req.appendTemplatePath(_templateObject4$b(), mapped.locationId, mapped.transactionId);
              req.deprecated('TransactionsApi.voidTransaction');
              return _context4.abrupt("return", req.callAsJson(voidTransactionResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function voidTransaction(_x13, _x14, _x15) {
      return _voidTransaction.apply(this, arguments);
    }

    return voidTransaction;
  }();

  return TransactionsApi;
}(BaseApi);

var v1MoneySchema = /*#__PURE__*/object({
  amount: ['amount', /*#__PURE__*/optional( /*#__PURE__*/number())],
  currencyCode: ['currency_code', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1CreateRefundRequestSchema = /*#__PURE__*/object({
  paymentId: ['payment_id', /*#__PURE__*/string()],
  type: ['type', /*#__PURE__*/string()],
  reason: ['reason', /*#__PURE__*/string()],
  refundedMoney: ['refunded_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  requestIdempotenceKey: ['request_idempotence_key', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1OrderHistoryEntrySchema = /*#__PURE__*/object({
  action: ['action', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1TenderSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  employeeId: ['employee_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  receiptUrl: ['receipt_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  cardBrand: ['card_brand', /*#__PURE__*/optional( /*#__PURE__*/string())],
  panSuffix: ['pan_suffix', /*#__PURE__*/optional( /*#__PURE__*/string())],
  entryMethod: ['entry_method', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentNote: ['payment_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  tenderedMoney: ['tendered_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  tenderedAt: ['tendered_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  settledAt: ['settled_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  changeBackMoney: ['change_back_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedMoney: ['refunded_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  isExchange: ['is_exchange', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var v1OrderSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  buyerEmail: ['buyer_email', /*#__PURE__*/optional( /*#__PURE__*/string())],
  recipientName: ['recipient_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  recipientPhoneNumber: ['recipient_phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  state: ['state', /*#__PURE__*/optional( /*#__PURE__*/string())],
  shippingAddress: ['shipping_address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  subtotalMoney: ['subtotal_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  totalShippingMoney: ['total_shipping_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  totalTaxMoney: ['total_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  totalPriceMoney: ['total_price_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  totalDiscountMoney: ['total_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  expiresAt: ['expires_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  buyerNote: ['buyer_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  completedNote: ['completed_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundedNote: ['refunded_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledNote: ['canceled_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  tender: ['tender', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1TenderSchema;
  }))],
  orderHistory: ['order_history', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1OrderHistoryEntrySchema;
  })))],
  promoCode: ['promo_code', /*#__PURE__*/optional( /*#__PURE__*/string())],
  btcReceiveAddress: ['btc_receive_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  btcPriceSatoshi: ['btc_price_satoshi', /*#__PURE__*/optional( /*#__PURE__*/number())]
});

var deviceSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1PaymentDiscountSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  discountId: ['discount_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1PaymentItemDetailSchema = /*#__PURE__*/object({
  categoryName: ['category_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  sku: ['sku', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemId: ['item_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemVariationId: ['item_variation_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1PaymentModifierSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  modifierOptionId: ['modifier_option_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1PaymentTaxSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  rate: ['rate', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inclusionType: ['inclusion_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  feeId: ['fee_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1PaymentItemizationSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  quantity: ['quantity', /*#__PURE__*/optional( /*#__PURE__*/number())],
  itemizationType: ['itemization_type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemDetail: ['item_detail', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1PaymentItemDetailSchema;
  }))],
  notes: ['notes', /*#__PURE__*/optional( /*#__PURE__*/string())],
  itemVariationName: ['item_variation_name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  singleQuantityMoney: ['single_quantity_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  grossSalesMoney: ['gross_sales_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  discountMoney: ['discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  netSalesMoney: ['net_sales_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  taxes: ['taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  discounts: ['discounts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentDiscountSchema;
  })))],
  modifiers: ['modifiers', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentModifierSchema;
  })))]
});

var v1PaymentSurchargeSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  appliedMoney: ['applied_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  rate: ['rate', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  taxable: ['taxable', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  taxes: ['taxes', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  surchargeId: ['surcharge_id', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var v1RefundSchema = /*#__PURE__*/object({
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  reason: ['reason', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundedMoney: ['refunded_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedProcessingFeeMoney: ['refunded_processing_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedTaxMoney: ['refunded_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedAdditiveTaxMoney: ['refunded_additive_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedAdditiveTax: ['refunded_additive_tax', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  refundedInclusiveTaxMoney: ['refunded_inclusive_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedInclusiveTax: ['refunded_inclusive_tax', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  refundedTipMoney: ['refunded_tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedDiscountMoney: ['refunded_discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedSurchargeMoney: ['refunded_surcharge_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedSurcharges: ['refunded_surcharges', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentSurchargeSchema;
  })))],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  processedAt: ['processed_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  isExchange: ['is_exchange', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var v1PaymentSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  merchantId: ['merchant_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  creatorId: ['creator_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  device: ['device', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return deviceSchema;
  }))],
  paymentUrl: ['payment_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  receiptUrl: ['receipt_url', /*#__PURE__*/optional( /*#__PURE__*/string())],
  inclusiveTaxMoney: ['inclusive_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  additiveTaxMoney: ['additive_tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  taxMoney: ['tax_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  tipMoney: ['tip_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  discountMoney: ['discount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  totalCollectedMoney: ['total_collected_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  processingFeeMoney: ['processing_fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  netTotalMoney: ['net_total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  refundedMoney: ['refunded_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  swedishRoundingMoney: ['swedish_rounding_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  grossSalesMoney: ['gross_sales_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  netSalesMoney: ['net_sales_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  inclusiveTax: ['inclusive_tax', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  additiveTax: ['additive_tax', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentTaxSchema;
  })))],
  tender: ['tender', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1TenderSchema;
  })))],
  refunds: ['refunds', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1RefundSchema;
  })))],
  itemizations: ['itemizations', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentItemizationSchema;
  })))],
  surchargeMoney: ['surcharge_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  surcharges: ['surcharges', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1PaymentSurchargeSchema;
  })))],
  isPartial: ['is_partial', /*#__PURE__*/optional( /*#__PURE__*/boolean())]
});

var v1SettlementEntrySchema = /*#__PURE__*/object({
  paymentId: ['payment_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  type: ['type', /*#__PURE__*/optional( /*#__PURE__*/string())],
  amountMoney: ['amount_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  feeMoney: ['fee_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))]
});

var v1SettlementSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())],
  totalMoney: ['total_money', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return v1MoneySchema;
  }))],
  initiatedAt: ['initiated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  bankAccountId: ['bank_account_id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  entries: ['entries', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return v1SettlementEntrySchema;
  })))]
});

var v1UpdateOrderRequestSchema = /*#__PURE__*/object({
  action: ['action', /*#__PURE__*/string()],
  shippedTrackingNumber: ['shipped_tracking_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  completedNote: ['completed_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  refundedNote: ['refunded_note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  canceledNote: ['canceled_note', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject9$1() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/settlements/", ""]);

  _templateObject9$1 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8$4() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/settlements"]);

  _templateObject8$4 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7$6() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/refunds"]);

  _templateObject7$6 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6$6() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/refunds"]);

  _templateObject6$6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$7() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/payments/", ""]);

  _templateObject5$7 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$c() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/payments"]);

  _templateObject4$c = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$h() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/orders/", ""]);

  _templateObject3$h = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$l() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/orders/", ""]);

  _templateObject2$l = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$s() {
  var data = _taggedTemplateLiteralLoose(["/v1/", "/orders"]);

  _templateObject$s = function _templateObject() {
    return data;
  };

  return data;
}
var V1TransactionsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(V1TransactionsApi, _BaseApi);

  function V1TransactionsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = V1TransactionsApi.prototype;

  /**
   * Provides summary information for a merchant's online store orders.
   *
   * @param locationId  The ID of the location to list online store orders for.
   * @param order       The order in which payments are listed in the response.
   * @param limit       The maximum number of payments to return in a single response. This value cannot
   *                              exceed 200.
   * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
   *                              the endpoint.
   * @return Response from the API call
   * @deprecated
   */
  _proto.listOrders =
  /*#__PURE__*/
  function () {
    var _listOrders = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(locationId, order, limit, batchToken, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                order: [order, optional(string())],
                limit: [limit, optional(number())],
                batchToken: [batchToken, optional(string())]
              });
              req.query('order', mapped.order);
              req.query('limit', mapped.limit);
              req.query('batch_token', mapped.batchToken);
              req.appendTemplatePath(_templateObject$s(), mapped.locationId);
              req.deprecated('V1TransactionsApi.listOrders');
              return _context.abrupt("return", req.callAsJson(array(v1OrderSchema), requestOptions));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listOrders(_x, _x2, _x3, _x4, _x5) {
      return _listOrders.apply(this, arguments);
    }

    return listOrders;
  }()
  /**
   * Provides comprehensive information for a single online store order, including the order's history.
   *
   * @param locationId  The ID of the order's associated location.
   * @param orderId     The order's Square-issued ID. You obtain this value from Order objects returned by
   *                              the List Orders endpoint
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrieveOrder =
  /*#__PURE__*/
  function () {
    var _retrieveOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(locationId, orderId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                orderId: [orderId, string()]
              });
              req.appendTemplatePath(_templateObject2$l(), mapped.locationId, mapped.orderId);
              req.deprecated('V1TransactionsApi.retrieveOrder');
              return _context2.abrupt("return", req.callAsJson(v1OrderSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function retrieveOrder(_x6, _x7, _x8) {
      return _retrieveOrder.apply(this, arguments);
    }

    return retrieveOrder;
  }()
  /**
   * Updates the details of an online store order. Every update you perform on an order corresponds to
   * one of three actions:
   *
   * @param locationId   The ID of the order's associated location.
   * @param orderId      The order's Square-issued ID. You obtain this value from Order
   *                                                    objects returned by the List Orders endpoint
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.updateOrder =
  /*#__PURE__*/
  function () {
    var _updateOrder = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(locationId, orderId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                orderId: [orderId, string()],
                body: [body, v1UpdateOrderRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject3$h(), mapped.locationId, mapped.orderId);
              req.deprecated('V1TransactionsApi.updateOrder');
              return _context3.abrupt("return", req.callAsJson(v1OrderSchema, requestOptions));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function updateOrder(_x9, _x10, _x11, _x12) {
      return _updateOrder.apply(this, arguments);
    }

    return updateOrder;
  }()
  /**
   * Provides summary information for all payments taken for a given
   * Square account during a date range. Date ranges cannot exceed 1 year in
   * length. See Date ranges for details of inclusive and exclusive dates.
   *
   * *Note**: Details for payments processed with Square Point of Sale while
   * in offline mode may not be transmitted to Square for up to 72 hours.
   * Offline payments have a `created_at` value that reflects the time the
   * payment was originally processed, not the time it was subsequently
   * transmitted to Square. Consequently, the ListPayments endpoint might
   * list an offline payment chronologically between online payments that
   * were seen in a previous request.
   *
   * @param locationId      The ID of the location to list payments for. If you specify me, this endpoint
   *                                   returns payments aggregated from all of the business's locations.
   * @param order           The order in which payments are listed in the response.
   * @param beginTime       The beginning of the requested reporting period, in ISO 8601 format. If this
   *                                   value is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an
   *                                   error. Default value: The current time minus one year.
   * @param endTime         The end of the requested reporting period, in ISO 8601 format. If this value is
   *                                   more than one year greater than begin_time, this endpoint returns an error.
   *                                   Default value: The current time.
   * @param limit           The maximum number of payments to return in a single response. This value
   *                                   cannot exceed 200.
   * @param batchToken      A pagination cursor to retrieve the next set of results for your original query
   *                                   to the endpoint.
   * @param includePartial  Indicates whether or not to include partial payments in the response. Partial
   *                                   payments will have the tenders collected so far, but the itemizations will be
   *                                   empty until the payment is completed.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.listPayments =
  /*#__PURE__*/
  function () {
    var _listPayments = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(locationId, order, beginTime, endTime, limit, batchToken, includePartial, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                order: [order, optional(string())],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                limit: [limit, optional(number())],
                batchToken: [batchToken, optional(string())],
                includePartial: [includePartial, optional(boolean())]
              });
              req.query('order', mapped.order);
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('limit', mapped.limit);
              req.query('batch_token', mapped.batchToken);
              req.query('include_partial', mapped.includePartial);
              req.appendTemplatePath(_templateObject4$c(), mapped.locationId);
              req.deprecated('V1TransactionsApi.listPayments');
              return _context4.abrupt("return", req.callAsJson(array(v1PaymentSchema), requestOptions));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function listPayments(_x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20) {
      return _listPayments.apply(this, arguments);
    }

    return listPayments;
  }()
  /**
   * Provides comprehensive information for a single payment.
   *
   * @param locationId  The ID of the payment's associated location.
   * @param paymentId   The Square-issued payment ID. payment_id comes from Payment objects returned by the
   *                              List Payments endpoint, Settlement objects returned by the List Settlements endpoint,
   *                              or Refund objects returned by the List Refunds endpoint.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrievePayment =
  /*#__PURE__*/
  function () {
    var _retrievePayment = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(locationId, paymentId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                paymentId: [paymentId, string()]
              });
              req.appendTemplatePath(_templateObject5$7(), mapped.locationId, mapped.paymentId);
              req.deprecated('V1TransactionsApi.retrievePayment');
              return _context5.abrupt("return", req.callAsJson(v1PaymentSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function retrievePayment(_x21, _x22, _x23) {
      return _retrievePayment.apply(this, arguments);
    }

    return retrievePayment;
  }()
  /**
   * Provides the details for all refunds initiated by a merchant or any of the merchant's mobile staff
   * during a date range. Date ranges cannot exceed one year in length.
   *
   * @param locationId  The ID of the location to list refunds for.
   * @param order       The order in which payments are listed in the response.
   * @param beginTime   The beginning of the requested reporting period, in ISO 8601 format. If this value
   *                              is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an error.
   *                              Default value: The current time minus one year.
   * @param endTime     The end of the requested reporting period, in ISO 8601 format. If this value is more
   *                              than one year greater than begin_time, this endpoint returns an error. Default value:
   *                              The current time.
   * @param limit       The approximate number of refunds to return in a single response. Default: 100. Max:
   *                              200. Response may contain more results than the prescribed limit when refunds are
   *                              made simultaneously to multiple tenders in a payment or when refunds are generated in
   *                              an exchange to account for the value of returned goods.
   * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
   *                              the endpoint.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.listRefunds =
  /*#__PURE__*/
  function () {
    var _listRefunds = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(locationId, order, beginTime, endTime, limit, batchToken, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                order: [order, optional(string())],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                limit: [limit, optional(number())],
                batchToken: [batchToken, optional(string())]
              });
              req.query('order', mapped.order);
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('limit', mapped.limit);
              req.query('batch_token', mapped.batchToken);
              req.appendTemplatePath(_templateObject6$6(), mapped.locationId);
              req.deprecated('V1TransactionsApi.listRefunds');
              return _context6.abrupt("return", req.callAsJson(array(v1RefundSchema), requestOptions));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function listRefunds(_x24, _x25, _x26, _x27, _x28, _x29, _x30) {
      return _listRefunds.apply(this, arguments);
    }

    return listRefunds;
  }()
  /**
   * Issues a refund for a previously processed payment. You must issue
   * a refund within 60 days of the associated payment.
   *
   * You cannot issue a partial refund for a split tender payment. You must
   * instead issue a full or partial refund for a particular tender, by
   * providing the applicable tender id to the V1CreateRefund endpoint.
   * Issuing a full refund for a split tender payment refunds all tenders
   * associated with the payment.
   *
   * Issuing a refund for a card payment is not reversible. For development
   * purposes, you can create fake cash payments in Square Point of Sale and
   * refund them.
   *
   * @param locationId   The ID of the original payment's associated location.
   * @param body         An object containing the fields to POST for the request.  See
   *                                                     the corresponding object definition for field details.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.createRefund =
  /*#__PURE__*/
  function () {
    var _createRefund = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(locationId, body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('POST');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                body: [body, v1CreateRefundRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject7$6(), mapped.locationId);
              req.deprecated('V1TransactionsApi.createRefund');
              return _context7.abrupt("return", req.callAsJson(v1RefundSchema, requestOptions));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function createRefund(_x31, _x32, _x33) {
      return _createRefund.apply(this, arguments);
    }

    return createRefund;
  }()
  /**
   * Provides summary information for all deposits and withdrawals
   * initiated by Square to a linked bank account during a date range. Date
   * ranges cannot exceed one year in length.
   *
   * *Note**: the ListSettlements endpoint does not provide entry
   * information.
   *
   * @param locationId  The ID of the location to list settlements for. If you specify me, this endpoint
   *                              returns settlements aggregated from all of the business's locations.
   * @param order       The order in which settlements are listed in the response.
   * @param beginTime   The beginning of the requested reporting period, in ISO 8601 format. If this value
   *                              is before January 1, 2013 (2013-01-01T00:00:00Z), this endpoint returns an error.
   *                              Default value: The current time minus one year.
   * @param endTime     The end of the requested reporting period, in ISO 8601 format. If this value is more
   *                              than one year greater than begin_time, this endpoint returns an error. Default value:
   *                              The current time.
   * @param limit       The maximum number of settlements to return in a single response. This value cannot
   *                              exceed 200.
   * @param status      Provide this parameter to retrieve only settlements with a particular status (SENT
   *                              or FAILED).
   * @param batchToken  A pagination cursor to retrieve the next set of results for your original query to
   *                              the endpoint.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.listSettlements =
  /*#__PURE__*/
  function () {
    var _listSettlements = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(locationId, order, beginTime, endTime, limit, status, batchToken, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                order: [order, optional(string())],
                beginTime: [beginTime, optional(string())],
                endTime: [endTime, optional(string())],
                limit: [limit, optional(number())],
                status: [status, optional(string())],
                batchToken: [batchToken, optional(string())]
              });
              req.query('order', mapped.order);
              req.query('begin_time', mapped.beginTime);
              req.query('end_time', mapped.endTime);
              req.query('limit', mapped.limit);
              req.query('status', mapped.status);
              req.query('batch_token', mapped.batchToken);
              req.appendTemplatePath(_templateObject8$4(), mapped.locationId);
              req.deprecated('V1TransactionsApi.listSettlements');
              return _context8.abrupt("return", req.callAsJson(array(v1SettlementSchema), requestOptions));

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function listSettlements(_x34, _x35, _x36, _x37, _x38, _x39, _x40, _x41) {
      return _listSettlements.apply(this, arguments);
    }

    return listSettlements;
  }()
  /**
   * Provides comprehensive information for a single settlement.
   *
   * The returned `Settlement` objects include an `entries` field that lists
   * the transactions that contribute to the settlement total. Most
   * settlement entries correspond to a payment payout, but settlement
   * entries are also generated for less common events, like refunds, manual
   * adjustments, or chargeback holds.
   *
   * Square initiates its regular deposits as indicated in the
   * [Deposit Options with Square](https://squareup.com/help/us/en/article/3807)
   * help article. Details for a regular deposit are usually not available
   * from Connect API endpoints before 10 p.m. PST the same day.
   *
   * Square does not know when an initiated settlement **completes**, only
   * whether it has failed. A completed settlement is typically reflected in
   * a bank account within 3 business days, but in exceptional cases it may
   * take longer.
   *
   * @param locationId    The ID of the settlements's associated location.
   * @param settlementId  The settlement's Square-issued ID. You obtain this value from Settlement objects
   *                                returned by the List Settlements endpoint.
   * @return Response from the API call
   * @deprecated
   */
  ;

  _proto.retrieveSettlement =
  /*#__PURE__*/
  function () {
    var _retrieveSettlement = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(locationId, settlementId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                locationId: [locationId, string()],
                settlementId: [settlementId, string()]
              });
              req.appendTemplatePath(_templateObject9$1(), mapped.locationId, mapped.settlementId);
              req.deprecated('V1TransactionsApi.retrieveSettlement');
              return _context9.abrupt("return", req.callAsJson(v1SettlementSchema, requestOptions));

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function retrieveSettlement(_x42, _x43, _x44) {
      return _retrieveSettlement.apply(this, arguments);
    }

    return retrieveSettlement;
  }();

  return V1TransactionsApi;
}(BaseApi);

var vendorContactSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  emailAddress: ['email_address', /*#__PURE__*/optional( /*#__PURE__*/string())],
  phoneNumber: ['phone_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  removed: ['removed', /*#__PURE__*/optional( /*#__PURE__*/boolean())],
  ordinal: ['ordinal', /*#__PURE__*/number()]
});

var vendorSchema = /*#__PURE__*/object({
  id: ['id', /*#__PURE__*/optional( /*#__PURE__*/string())],
  createdAt: ['created_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  updatedAt: ['updated_at', /*#__PURE__*/optional( /*#__PURE__*/string())],
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/string())],
  address: ['address', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return addressSchema;
  }))],
  contacts: ['contacts', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return vendorContactSchema;
  })))],
  accountNumber: ['account_number', /*#__PURE__*/optional( /*#__PURE__*/string())],
  note: ['note', /*#__PURE__*/optional( /*#__PURE__*/string())],
  version: ['version', /*#__PURE__*/optional( /*#__PURE__*/number())],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var bulkCreateVendorsRequestSchema = /*#__PURE__*/object({
  vendors: ['vendors', /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  }))]
});

var createVendorResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  vendor: ['vendor', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  }))]
});

var bulkCreateVendorsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  responses: ['responses', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return createVendorResponseSchema;
  })))]
});

var bulkRetrieveVendorsRequestSchema = /*#__PURE__*/object({
  vendorIds: ['vendor_ids', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var retrieveVendorResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  vendor: ['vendor', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  }))]
});

var bulkRetrieveVendorsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  responses: ['responses', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return retrieveVendorResponseSchema;
  })))]
});

var updateVendorRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/optional( /*#__PURE__*/string())],
  vendor: ['vendor', /*#__PURE__*/lazy(function () {
    return vendorSchema;
  })]
});

var bulkUpdateVendorsRequestSchema = /*#__PURE__*/object({
  vendors: ['vendors', /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return updateVendorRequestSchema;
  }))]
});

var updateVendorResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  vendor: ['vendor', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  }))]
});

var bulkUpdateVendorsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  responses: ['responses', /*#__PURE__*/optional( /*#__PURE__*/dict( /*#__PURE__*/lazy(function () {
    return updateVendorResponseSchema;
  })))]
});

var createVendorRequestSchema = /*#__PURE__*/object({
  idempotencyKey: ['idempotency_key', /*#__PURE__*/string()],
  vendor: ['vendor', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  }))]
});

var searchVendorsRequestFilterSchema = /*#__PURE__*/object({
  name: ['name', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))],
  status: ['status', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/string()))]
});

var searchVendorsRequestSortSchema = /*#__PURE__*/object({
  field: ['field', /*#__PURE__*/optional( /*#__PURE__*/string())],
  order: ['order', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchVendorsRequestSchema = /*#__PURE__*/object({
  filter: ['filter', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchVendorsRequestFilterSchema;
  }))],
  sort: ['sort', /*#__PURE__*/optional( /*#__PURE__*/lazy(function () {
    return searchVendorsRequestSortSchema;
  }))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

var searchVendorsResponseSchema = /*#__PURE__*/object({
  errors: ['errors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return errorSchema;
  })))],
  vendors: ['vendors', /*#__PURE__*/optional( /*#__PURE__*/array( /*#__PURE__*/lazy(function () {
    return vendorSchema;
  })))],
  cursor: ['cursor', /*#__PURE__*/optional( /*#__PURE__*/string())]
});

function _templateObject2$m() {
  var data = _taggedTemplateLiteralLoose(["/v2/vendors/", ""]);

  _templateObject2$m = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$t() {
  var data = _taggedTemplateLiteralLoose(["/v2/vendors/", ""]);

  _templateObject$t = function _templateObject() {
    return data;
  };

  return data;
}
var VendorsApi = /*#__PURE__*/function (_BaseApi) {
  _inheritsLoose(VendorsApi, _BaseApi);

  function VendorsApi() {
    return _BaseApi.apply(this, arguments) || this;
  }

  var _proto = VendorsApi.prototype;

  /**
   * Creates one or more [Vendor]($m/Vendor) objects to represent suppliers to a seller.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                        See the corresponding object definition for field details.
   * @return Response from the API call
   */
  _proto.bulkCreateVendors =
  /*#__PURE__*/
  function () {
    var _bulkCreateVendors = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = this.createRequest('POST', '/v2/vendors/bulk-create');
              mapped = req.prepareArgs({
                body: [body, bulkCreateVendorsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context.abrupt("return", req.callAsJson(bulkCreateVendorsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function bulkCreateVendors(_x, _x2) {
      return _bulkCreateVendors.apply(this, arguments);
    }

    return bulkCreateVendors;
  }()
  /**
   * Retrieves one or more vendors of specified [Vendor]($m/Vendor) IDs.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                          See the corresponding object definition for field
   *                                                          details.
   * @return Response from the API call
   */
  ;

  _proto.bulkRetrieveVendors =
  /*#__PURE__*/
  function () {
    var _bulkRetrieveVendors = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = this.createRequest('POST', '/v2/vendors/bulk-retrieve');
              mapped = req.prepareArgs({
                body: [body, bulkRetrieveVendorsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context2.abrupt("return", req.callAsJson(bulkRetrieveVendorsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function bulkRetrieveVendors(_x3, _x4) {
      return _bulkRetrieveVendors.apply(this, arguments);
    }

    return bulkRetrieveVendors;
  }()
  /**
   * Updates one or more of existing [Vendor]($m/Vendor) objects as suppliers to a seller.
   *
   * @param body         An object containing the fields to POST for the request.
   *                                                        See the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.bulkUpdateVendors =
  /*#__PURE__*/
  function () {
    var _bulkUpdateVendors = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              req = this.createRequest('PUT', '/v2/vendors/bulk-update');
              mapped = req.prepareArgs({
                body: [body, bulkUpdateVendorsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context3.abrupt("return", req.callAsJson(bulkUpdateVendorsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function bulkUpdateVendors(_x5, _x6) {
      return _bulkUpdateVendors.apply(this, arguments);
    }

    return bulkUpdateVendors;
  }()
  /**
   * Creates a single [Vendor]($m/Vendor) object to represent a supplier to a seller.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                   the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.createVendor =
  /*#__PURE__*/
  function () {
    var _createVendor = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              req = this.createRequest('POST', '/v2/vendors/create');
              mapped = req.prepareArgs({
                body: [body, createVendorRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context4.abrupt("return", req.callAsJson(createVendorResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function createVendor(_x7, _x8) {
      return _createVendor.apply(this, arguments);
    }

    return createVendor;
  }()
  /**
   * Searches for vendors using a filter against supported [Vendor]($m/Vendor) properties and a supported
   * sorter.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                    the corresponding object definition for field details.
   * @return Response from the API call
   */
  ;

  _proto.searchVendors =
  /*#__PURE__*/
  function () {
    var _searchVendors = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(body, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              req = this.createRequest('POST', '/v2/vendors/search');
              mapped = req.prepareArgs({
                body: [body, searchVendorsRequestSchema]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              return _context5.abrupt("return", req.callAsJson(searchVendorsResponseSchema, requestOptions));

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function searchVendors(_x9, _x10) {
      return _searchVendors.apply(this, arguments);
    }

    return searchVendors;
  }()
  /**
   * Retrieves the vendor of a specified [Vendor]($m/Vendor) ID.
   *
   * @param vendorId  ID of the [Vendor]($m/Vendor) to retrieve.
   * @return Response from the API call
   */
  ;

  _proto.retrieveVendor =
  /*#__PURE__*/
  function () {
    var _retrieveVendor = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(vendorId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              req = this.createRequest('GET');
              mapped = req.prepareArgs({
                vendorId: [vendorId, string()]
              });
              req.appendTemplatePath(_templateObject$t(), mapped.vendorId);
              return _context6.abrupt("return", req.callAsJson(retrieveVendorResponseSchema, requestOptions));

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function retrieveVendor(_x11, _x12) {
      return _retrieveVendor.apply(this, arguments);
    }

    return retrieveVendor;
  }()
  /**
   * Updates an existing [Vendor]($m/Vendor) object as a supplier to a seller.
   *
   * @param body         An object containing the fields to POST for the request.  See
   *                                                   the corresponding object definition for field details.
   * @param vendorId
   * @return Response from the API call
   */
  ;

  _proto.updateVendor =
  /*#__PURE__*/
  function () {
    var _updateVendor = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(body, vendorId, requestOptions) {
      var req, mapped;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              req = this.createRequest('PUT');
              mapped = req.prepareArgs({
                body: [body, updateVendorRequestSchema],
                vendorId: [vendorId, string()]
              });
              req.header('Content-Type', 'application/json');
              req.json(mapped.body);
              req.appendTemplatePath(_templateObject2$m(), mapped.vendorId);
              return _context7.abrupt("return", req.callAsJson(updateVendorResponseSchema, requestOptions));

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function updateVendor(_x13, _x14, _x15) {
      return _updateVendor.apply(this, arguments);
    }

    return updateVendor;
  }();

  return VendorsApi;
}(BaseApi);

var accessTokenAuthenticationProvider = function accessTokenAuthenticationProvider(_ref) {
  var accessToken = _ref.accessToken;
  return function (requiresAuth) {
    if (!requiresAuth) {
      return passThroughInterceptor;
    }

    return function (request, options, next) {
      var _request$headers;

      request.headers = (_request$headers = request.headers) != null ? _request$headers : {};
      setHeader(request.headers, AUTHORIZATION_HEADER, "Bearer " + accessToken);
      return next(request, options);
    };
  };
};

/** Environments available for API */
var Environment;

(function (Environment) {
  Environment["Production"] = "production";
  Environment["Sandbox"] = "sandbox";
  Environment["Custom"] = "custom";
})(Environment || (Environment = {}));

/** Default values for the configuration parameters of the client. */

var DEFAULT_CONFIGURATION = {
  timeout: 60000,
  squareVersion: '2022-03-16',
  additionalHeaders: {},
  userAgentDetail: '',
  environment: Environment.Production,
  customUrl: 'https://connect.squareup.com',
  accessToken: ''
};
/** Default values for retry configuration parameters. */

var DEFAULT_RETRY_CONFIG = {
  maxNumberOfRetries: 0,
  retryOnTimeout: true,
  retryInterval: 1,
  maximumRetryWaitTime: 0,
  backoffFactor: 2,
  httpStatusCodesToRetry: [408, 413, 429, 500, 502, 503, 504, 521, 522, 524],
  httpMethodsToRetry: ['GET', 'PUT']
};

/**
 * Thrown when the HTTP status code is not okay.
 *
 * The ApiError extends the ApiResponse interface, so all ApiResponse
 * properties are available.
 */

var ApiError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(ApiError, _Error);

  function ApiError(context, message) {
    var _this;

    _this = _Error.call(this, message) || this;
    var request = context.request,
        response = context.response;
    _this.request = request;
    _this.statusCode = response.statusCode;
    _this.headers = response.headers;
    _this.body = response.body;

    if (typeof response.body === 'string' && response.body !== '') {
      var _JSON = JSONBig();

      try {
        _this.result = _JSON.parse(response.body);

        if (typeof _this.result === 'object') {
          var result = _this.result;

          if ('errors' in result) {
            _this.errors = result['errors'];
          } else {
            var _result$type;

            _this.errors = [{
              category: 'V1_ERROR',
              code: (_result$type = result['type']) != null ? _result$type : 'Unknown',
              detail: result['message'],
              field: result['field']
            }];
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          if (console) {
            console.warn("Unexpected error: Could not parse HTTP response body as JSON. " + error.message);
          }
        }
      }
    }

    return _this;
  }

  return ApiError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var XmlSerialization = /*#__PURE__*/function () {
  function XmlSerialization() {}

  var _proto = XmlSerialization.prototype;

  _proto.xmlSerialize = function xmlSerialize(_rootName, _value) {
    throw new Error('XML serialization is not available.');
  };

  _proto.xmlDeserialize = function xmlDeserialize(_rootName, _xmlString) {
    throw new Error('XML deserialization is not available.');
  };

  return XmlSerialization;
}();

function _templateObject$u() {
  var data = _taggedTemplateLiteralLoose(["", ""]);

  _templateObject$u = function _templateObject() {
    return data;
  };

  return data;
}
/** Current SDK version */

var SDK_VERSION = '17.3.0';
var Client = /*#__PURE__*/function () {
  function Client(config) {
    var _this$_config$httpCli,
        _this$_config$httpCli2,
        _this = this,
        _this$_config$httpCli3,
        _this$_config$httpCli4;

    this._config = _extends({}, DEFAULT_CONFIGURATION, config);
    this._retryConfig = _extends({}, DEFAULT_RETRY_CONFIG, (_this$_config$httpCli = this._config.httpClientOptions) == null ? void 0 : _this$_config$httpCli.retryConfig);
    this._timeout = typeof ((_this$_config$httpCli2 = this._config.httpClientOptions) == null ? void 0 : _this$_config$httpCli2.timeout) != 'undefined' ? this._config.httpClientOptions.timeout : this._config.timeout;
    this._userAgent = updateUserAgent('Square-TypeScript-SDK/17.3.0 ({api-version}) {engine}/{engine-version} ({os-info}) {detail}', this._config.squareVersion, this._config.userAgentDetail);
    this._requestBuilderFactory = createRequestHandlerFactory(function (server) {
      return getBaseUri(server, _this._config);
    }, accessTokenAuthenticationProvider(this._config), new HttpClient({
      timeout: this._timeout,
      clientConfigOverrides: this._config.unstable_httpClientOptions,
      httpAgent: (_this$_config$httpCli3 = this._config.httpClientOptions) == null ? void 0 : _this$_config$httpCli3.httpAgent,
      httpsAgent: (_this$_config$httpCli4 = this._config.httpClientOptions) == null ? void 0 : _this$_config$httpCli4.httpsAgent
    }), [withErrorHandlers, withUserAgent(this._userAgent), withAdditionalHeaders(this._config), withAuthenticationByDefault, withSquareVersion(this._config)], new XmlSerialization(), this._retryConfig);
    this.applePayApi = new ApplePayApi(this);
    this.bankAccountsApi = new BankAccountsApi(this);
    this.bookingsApi = new BookingsApi(this);
    this.cardsApi = new CardsApi(this);
    this.cashDrawersApi = new CashDrawersApi(this);
    this.catalogApi = new CatalogApi(this);
    this.checkoutApi = new CheckoutApi(this);
    this.customerGroupsApi = new CustomerGroupsApi(this);
    this.customersApi = new CustomersApi(this);
    this.customerSegmentsApi = new CustomerSegmentsApi(this);
    this.devicesApi = new DevicesApi(this);
    this.disputesApi = new DisputesApi(this);
    this.employeesApi = new EmployeesApi(this);
    this.giftCardActivitiesApi = new GiftCardActivitiesApi(this);
    this.giftCardsApi = new GiftCardsApi(this);
    this.inventoryApi = new InventoryApi(this);
    this.invoicesApi = new InvoicesApi(this);
    this.laborApi = new LaborApi(this);
    this.locationsApi = new LocationsApi(this);
    this.loyaltyApi = new LoyaltyApi(this);
    this.merchantsApi = new MerchantsApi(this);
    this.mobileAuthorizationApi = new MobileAuthorizationApi(this);
    this.oAuthApi = new OAuthApi(this);
    this.ordersApi = new OrdersApi(this);
    this.paymentsApi = new PaymentsApi(this);
    this.refundsApi = new RefundsApi(this);
    this.sitesApi = new SitesApi(this);
    this.snippetsApi = new SnippetsApi(this);
    this.subscriptionsApi = new SubscriptionsApi(this);
    this.teamApi = new TeamApi(this);
    this.terminalApi = new TerminalApi(this);
    this.transactionsApi = new TransactionsApi(this);
    this.v1TransactionsApi = new V1TransactionsApi(this);
    this.vendorsApi = new VendorsApi(this);
  }

  var _proto = Client.prototype;

  _proto.getRequestBuilderFactory = function getRequestBuilderFactory() {
    return this._requestBuilderFactory;
  }
  /**
   * Clone this client and override given configuration options
   */
  ;

  _proto.withConfiguration = function withConfiguration(config) {
    return new Client(_extends({}, this._config, config));
  };

  return Client;
}();

function createHttpClientAdapter(client) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(request, requestOptions) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return client.executeRequest(request, requestOptions);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

function getBaseUri(server, config) {
  if (server === void 0) {
    server = 'default';
  }

  if (config.environment === Environment.Production) {
    if (server === 'default') {
      return 'https://connect.squareup.com';
    }
  }

  if (config.environment === Environment.Sandbox) {
    if (server === 'default') {
      return 'https://connect.squareupsandbox.com';
    }
  }

  if (config.environment === Environment.Custom) {
    if (server === 'default') {
      return pathTemplate(_templateObject$u(), new SkipEncode(config.customUrl));
    }
  }

  throw new Error('Could not get Base URL. Invalid environment or server.');
}

function createRequestHandlerFactory(baseUrlProvider, authProvider, httpClient, addons, xmlSerializer, retryConfig) {
  var requestBuilderFactory = createRequestBuilderFactory(createHttpClientAdapter(httpClient), baseUrlProvider, ApiError, authProvider, xmlSerializer, retryConfig);
  return tap.apply(void 0, [requestBuilderFactory].concat(addons));
}

function tap(requestBuilderFactory) {
  for (var _len = arguments.length, callback = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    callback[_key - 1] = arguments[_key];
  }

  return function () {
    var requestBuilder = requestBuilderFactory.apply(void 0, arguments);
    callback.forEach(function (c) {
      return c(requestBuilder);
    });
    return requestBuilder;
  };
}

function withErrorHandlers(rb) {
  rb.defaultToError(ApiError);
}

function withAdditionalHeaders(_ref2) {
  var additionalHeaders = _ref2.additionalHeaders;

  var clone = _extends({}, additionalHeaders);

  assertHeaders(clone);
  return function (rb) {
    rb.interceptRequest(function (request) {
      var _request$headers;

      var headers = (_request$headers = request.headers) != null ? _request$headers : {};
      mergeHeaders(headers, clone);
      return _extends({}, request, {
        headers: headers
      });
    });
  };
}

function withUserAgent(userAgent) {
  return function (rb) {
    rb.interceptRequest(function (request) {
      var _request$headers2;

      var headers = (_request$headers2 = request.headers) != null ? _request$headers2 : {};
      setHeader(headers, 'user-agent', userAgent);
      return _extends({}, request, {
        headers: headers
      });
    });
  };
}

function withSquareVersion(_ref3) {
  var squareVersion = _ref3.squareVersion;
  return function (rb) {
    rb.interceptRequest(function (request) {
      var _request$headers3;

      var headers = (_request$headers3 = request.headers) != null ? _request$headers3 : {};
      setHeader(headers, 'Square-Version', squareVersion);
      return _extends({}, request, {
        headers: headers
      });
    });
  };
}

function withAuthenticationByDefault(rb) {
  rb.authenticate(true);
}

export { ApiError, ApplePayApi, BankAccountsApi, BookingsApi, CardsApi, CashDrawersApi, CatalogApi, CheckoutApi, Client, CustomerGroupsApi, CustomerSegmentsApi, CustomersApi, DEFAULT_CONFIGURATION, DEFAULT_RETRY_CONFIG, DevicesApi, DisputesApi, EmployeesApi, Environment, GiftCardActivitiesApi, GiftCardsApi, InventoryApi, InvoicesApi, LaborApi, LocationsApi, LoyaltyApi, MerchantsApi, MobileAuthorizationApi, OAuthApi, OrdersApi, PaymentsApi, RefundsApi, SDK_VERSION, SitesApi, SnippetsApi, SubscriptionsApi, TeamApi, TerminalApi, TransactionsApi, V1TransactionsApi, VendorsApi };
//# sourceMappingURL=square.esm.js.map
