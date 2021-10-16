var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// .svelte-kit/netlify/entry.js
__markAsModule(exports);
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob2 = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob2) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob2([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob2.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob2;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack } = error3;
    serialized = try_serialize({ name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base2, path) {
  const baseparts = path[0] === "/" ? [] : base2.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler2) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler2({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = { ...headers, "content-type": "application/json" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var _map;
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
_map = new WeakMap();
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function is_promise(value) {
  return value && typeof value === "object" && typeof value.then === "function";
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
var tasks = new Set();
function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// node_modules/svelte/ssr.mjs
function onMount2() {
}
function afterUpdate() {
}

// .svelte-kit/output/server/app.js
var import_cookie = __toModule(require_cookie());

// node_modules/@lukeed/uuid/dist/index.mjs
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--)
      BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6)
      out += HEX[num & 15 | 64];
    else if (i == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i & 1 && i > 1 && i < 11)
      out += "-";
  }
  IDX++;
  return out;
}

// .svelte-kit/output/server/app.js
var css$6 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount2(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$6);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var handle = async ({ request, resolve: resolve2 }) => {
  const cookies = import_cookie.default.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve2(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
var template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-8556e442.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-8556e442.js", "/./_app/chunks/vendor-4941fb9b.js", "/./_app/chunks/preload-helper-9f12a5fd.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "backgrounds/circuit_animated.svg", "size": 20001, "type": "image/svg+xml" }, { "file": "backgrounds/decoration.svg", "size": 0, "type": "image/svg+xml" }, { "file": "backgrounds/Valley-day.mp4", "size": 2998557, "type": "video/mp4" }, { "file": "backgrounds/Valley-day.png", "size": 528517, "type": "image/png" }, { "file": "backgrounds/Valley-day.svg", "size": 166953, "type": "image/svg+xml" }, { "file": "backgrounds/valley-night.mp4", "size": 2441451, "type": "video/mp4" }, { "file": "backgrounds/valley-night.png", "size": 324845, "type": "image/png" }, { "file": "backgrounds/valley-night.svg", "size": 76693, "type": "image/svg+xml" }, { "file": "backgrounds/Valley-sunset.mp4", "size": 3739060, "type": "video/mp4" }, { "file": "backgrounds/Valley-sunset.png", "size": 540485, "type": "image/png" }, { "file": "backgrounds/Valley-sunset.svg", "size": 166957, "type": "image/svg+xml" }, { "file": "favicon.png", "size": 16214, "type": "image/png" }, { "file": "firefly-logo.svg", "size": 3785, "type": "image/svg+xml" }, { "file": "robots.txt", "size": 70, "type": "text/plain" }, { "file": "svelte-welcome.png", "size": 360807, "type": "image/png" }, { "file": "svelte-welcome.webp", "size": 115470, "type": "image/webp" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/pokemon-quiz\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/pokemon-quiz.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/todos\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json;
      })
    },
    {
      type: "page",
      pattern: /^\/todos\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/todos/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/todos\/([^/]+?)\.json$/,
      params: (m) => ({ uid: d(m[1]) }),
      load: () => Promise.resolve().then(function() {
        return _uid__json;
      })
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/pokemon-quiz.svelte": () => Promise.resolve().then(function() {
    return pokemonQuiz;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  }),
  "src/routes/todos/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-6fd5fb82.js", "css": ["/./_app/assets/pages/__layout.svelte-1fdb171b.css"], "js": ["/./_app/pages/__layout.svelte-6fd5fb82.js", "/./_app/chunks/vendor-4941fb9b.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-8f7d1519.js", "css": [], "js": ["/./_app/error.svelte-8f7d1519.js", "/./_app/chunks/vendor-4941fb9b.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-06a82b99.js", "css": [], "js": ["/./_app/pages/index.svelte-06a82b99.js", "/./_app/chunks/vendor-4941fb9b.js", "/./_app/chunks/preload-helper-9f12a5fd.js"], "styles": null }, "src/routes/pokemon-quiz.svelte": { "entry": "/./_app/pages/pokemon-quiz.svelte-096980a2.js", "css": ["/./_app/assets/pages/pokemon-quiz.svelte-dd59a519.css"], "js": ["/./_app/pages/pokemon-quiz.svelte-096980a2.js", "/./_app/chunks/vendor-4941fb9b.js"], "styles": null }, "src/routes/about.svelte": { "entry": "/./_app/pages/about.svelte-9042e17e.js", "css": ["/./_app/assets/pages/about.svelte-4db5be0d.css"], "js": ["/./_app/pages/about.svelte-9042e17e.js", "/./_app/chunks/vendor-4941fb9b.js"], "styles": null }, "src/routes/todos/index.svelte": { "entry": "/./_app/pages/todos/index.svelte-57b1e9a8.js", "css": ["/./_app/assets/pages/todos/index.svelte-ef0435f2.css"], "js": ["/./_app/pages/todos/index.svelte-57b1e9a8.js", "/./_app/chunks/vendor-4941fb9b.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({ paths: { "base": "", "assets": "/." } });
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender: prerender2 });
}
var base = "https://api.svelte.dev";
async function api(request, resource, data) {
  if (!request.locals.userid) {
    return { status: 401 };
  }
  const res = await fetch(`${base}/${resource}`, {
    method: request.method,
    headers: {
      "content-type": "application/json"
    },
    body: data && JSON.stringify(data)
  });
  if (res.ok && request.method !== "GET" && request.headers.accept !== "application/json") {
    return {
      status: 303,
      headers: {
        location: "/todos"
      }
    };
  }
  return {
    status: res.status,
    body: await res.json()
  };
}
var get = async (request) => {
  const response = await api(request, `todos/${request.locals.userid}`);
  if (response.status === 404) {
    return { body: [] };
  }
  return response;
};
var post = async (request) => {
  const response = await api(request, `todos/${request.locals.userid}`, {
    text: request.body.get("text")
  });
  return response;
};
var index_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get,
  post
});
var patch = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`, {
    text: request.body.get("text"),
    done: request.body.has("done") ? !!request.body.get("done") : void 0
  });
};
var del = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`);
};
var _uid__json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  patch,
  del
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"h-screen w-full bg-night"}">${slots.default ? slots.default({}) : ``}</main>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$1({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$1
});
var background = {
  color: {
    value: "#020411"
  },
  position: "50% 50%",
  repeat: "no-repeat",
  size: "20%"
};
var fullScreen = {
  enable: true,
  zIndex: 1
};
var interactivity = {
  events: {
    onClick: {
      enable: true,
      mode: "repulse"
    },
    onHover: {
      enable: true,
      mode: "bubble"
    }
  },
  modes: {
    bubble: {
      distance: 250,
      duration: 2,
      opacity: 0,
      size: 0
    },
    grab: {
      distance: 400
    },
    repulse: {
      distance: 400
    }
  }
};
var particles = {
  color: {
    value: "#d47736"
  },
  links: {
    color: {
      value: "#ffffff"
    },
    distance: 150,
    opacity: 0.4
  },
  move: {
    attract: {
      rotate: {
        x: 600,
        y: 600
      }
    },
    enable: true,
    path: {},
    outModes: {
      bottom: "out",
      left: "out",
      right: "out",
      top: "out"
    },
    random: true,
    speed: 1,
    spin: {}
  },
  number: {
    density: {
      enable: true
    },
    value: 160
  },
  opacity: {
    random: {
      enable: true
    },
    value: {
      min: 0,
      max: 1
    },
    animation: {
      enable: true,
      speed: 1,
      minimumValue: 0
    }
  },
  size: {
    random: {
      enable: true
    },
    value: {
      min: 1,
      max: 3
    },
    animation: {
      speed: 4,
      minimumValue: 0.3
    }
  }
};
var config = {
  background,
  fullScreen,
  interactivity,
  particles
};
var Particles$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ParticlesComponent;
  onMount2(async () => {
    const module2 = await Promise.resolve().then(function() {
      return index;
    });
    ParticlesComponent = module2.default;
  });
  let particlesConfig = config;
  return `${validate_component(ParticlesComponent || missing_component, "svelte:component").$$render($$result, {
    id: "tsparticles",
    options: particlesConfig
  }, {}, {})}`;
});
var prerender$1 = true;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Particles$2, "Particles").$$render($$result, {}, {}, {})}`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender: prerender$1
});
var POKEMON_ID_RANGE = [1, 450];
var QUIZ_SET_SIZE = 3;
var css$5 = {
  code: "button.svelte-ah9ckd{position:relative;text-transform:capitalize;font-size:3rem;margin:0.5rem;padding:0.5rem 1rem}@media(min-width: 800px){button.svelte-ah9ckd{padding:1rem 2rem;margin:2rem}}",
  map: `{"version":3,"file":"Question.svelte","sources":["Question.svelte"],"sourcesContent":["<script lang=\\"typescript\\">import { onMount } from 'svelte';\\r\\nexport let name;\\r\\nlet count;\\r\\n// Reset count on mount\\r\\nonMount(() => {\\r\\n    count = 0;\\r\\n});\\r\\nfunction handleClick() {\\r\\n    if ('speechSynthesis' in window) {\\r\\n        // Speech Synthesis supported \u{1F389}\\r\\n        var msg = new SpeechSynthesisUtterance();\\r\\n        msg.text = name;\\r\\n        if (isFirstClick()) {\\r\\n            msg.text = name[0];\\r\\n            count += 1;\\r\\n        }\\r\\n        window.speechSynthesis.speak(msg);\\r\\n    }\\r\\n    else {\\r\\n        // Speech Synthesis Not Supported \u{1F623}\\r\\n        alert(\\"Sorry, your browser doesn't support text to speech!\\");\\r\\n    }\\r\\n    function isFirstClick() {\\r\\n        return count === 0 ? true : false;\\r\\n    }\\r\\n}\\r\\n<\/script>\\r\\n\\r\\n<button on:click={handleClick}>{name}</button>\\r\\n\\r\\n<style>\\r\\n\\tbutton {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\ttext-transform: capitalize;\\r\\n\\t\\tfont-size: 3rem;\\r\\n\\t\\tmargin: 0.5rem;\\r\\n\\t\\tpadding: 0.5rem 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 800px) {\\r\\n\\t\\tbutton {\\r\\n\\t\\t\\tpadding: 1rem 2rem;\\r\\n\\t\\t\\tmargin: 2rem;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+BC,MAAM,cAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,cAAc,CAAE,UAAU,CAC1B,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,MAAM,CACd,OAAO,CAAE,MAAM,CAAC,IAAI,AACrB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,MAAM,cAAC,CAAC,AACP,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,MAAM,CAAE,IAAI,AACb,CAAC,AACF,CAAC"}`
};
var Question = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  onMount2(() => {
  });
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$5);
  return `<button class="${"svelte-ah9ckd"}">${escape2(name)}</button>`;
});
var css$4 = {
  code: ".shake.svelte-8fbhlr{animation:svelte-8fbhlr-shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both}@keyframes svelte-8fbhlr-shake{10%,90%{transform:translate3d(-1px, 0, 0)}20%,80%{transform:translate3d(2px, 0, 0)}30%,50%,70%{transform:translate3d(-4px, 0, 0)}40%,60%{transform:translate3d(4px, 0, 0)}}",
  map: `{"version":3,"file":"WrongChoice.svelte","sources":["WrongChoice.svelte"],"sourcesContent":["<script lang=\\"typescript\\">import { NEW_QUESTION_DELAY } from '$lib/constants';\\r\\nexport let handleChoice;\\r\\nexport let src;\\r\\nexport let name;\\r\\nlet clicked = false;\\r\\nfunction handleClick() {\\r\\n    clicked = true;\\r\\n    setTimeout(handleChoice, NEW_QUESTION_DELAY);\\r\\n}\\r\\n<\/script>\\r\\n\\r\\n<button\\r\\n\\ton:click={handleClick}\\r\\n\\tclass=\\"relative lg:w-50 lg:h-50 w-35 h-35 flex justify-center items-center capitalize text-5xl m-2 lg:p-8 {clicked\\r\\n\\t\\t? 'shake'\\r\\n\\t\\t: ''}\\"\\r\\n>\\r\\n\\t<img {src} alt={name} class=\\"w-30\\" />\\r\\n</button>\\r\\n\\r\\n<style>\\r\\n\\t.shake {\\r\\n\\t\\tanimation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\\r\\n\\t}\\r\\n\\t@keyframes shake {\\r\\n\\t\\t10%,\\r\\n\\t\\t90% {\\r\\n\\t\\t\\ttransform: translate3d(-1px, 0, 0);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t20%,\\r\\n\\t\\t80% {\\r\\n\\t\\t\\ttransform: translate3d(2px, 0, 0);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t30%,\\r\\n\\t\\t50%,\\r\\n\\t\\t70% {\\r\\n\\t\\t\\ttransform: translate3d(-4px, 0, 0);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t40%,\\r\\n\\t\\t60% {\\r\\n\\t\\t\\ttransform: translate3d(4px, 0, 0);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqBC,MAAM,cAAC,CAAC,AACP,SAAS,CAAE,mBAAK,CAAC,KAAK,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,AACjE,CAAC,AACD,WAAW,mBAAM,CAAC,AACjB,GAAG,CACH,GAAG,AAAC,CAAC,AACJ,SAAS,CAAE,YAAY,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACnC,CAAC,AAED,GAAG,CACH,GAAG,AAAC,CAAC,AACJ,SAAS,CAAE,YAAY,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AAClC,CAAC,AAED,GAAG,CACH,GAAG,CACH,GAAG,AAAC,CAAC,AACJ,SAAS,CAAE,YAAY,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AACnC,CAAC,AAED,GAAG,CACH,GAAG,AAAC,CAAC,AACJ,SAAS,CAAE,YAAY,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AAClC,CAAC,AACF,CAAC"}`
};
var WrongChoice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { handleChoice } = $$props;
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.handleChoice === void 0 && $$bindings.handleChoice && handleChoice !== void 0)
    $$bindings.handleChoice(handleChoice);
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css$4);
  return `<button class="${"relative lg:w-50 lg:h-50 w-35 h-35 flex justify-center items-center capitalize text-5xl m-2 lg:p-8 " + escape2("") + " svelte-8fbhlr"}"><img${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)} class="${"w-30"}">
</button>`;
});
var css$3 = {
  code: ".checkmark-container.svelte-s9tnn6{width:100%;display:flex;justify-content:center}.checkmark.svelte-s9tnn6{width:56px;height:56px;border-radius:50%;display:block;stroke-width:2;stroke:white;stroke-miterlimit:10;box-shadow:inset 0px 0px 0px green;animation:svelte-s9tnn6-fill 0.4s ease-in-out 0.4s forwards, svelte-s9tnn6-scale 0.3s ease-in-out 0.9s both}.checkmark__circle.svelte-s9tnn6{stroke-dasharray:166;stroke-dashoffset:166;stroke-width:2;stroke-miterlimit:10;stroke:green;fill:none;animation:svelte-s9tnn6-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards}.checkmark__check.svelte-s9tnn6{transform-origin:50% 50%;stroke-dasharray:48;stroke-dashoffset:48;animation:svelte-s9tnn6-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards}@keyframes svelte-s9tnn6-stroke{100%{stroke-dashoffset:0}}@keyframes svelte-s9tnn6-scale{0%,100%{transform:none}50%{transform:scale3d(1.5, 1.5, 1)}}@keyframes svelte-s9tnn6-fill{100%{box-shadow:inset 0px 0px 0px 30px green}}",
  map: '{"version":3,"file":"Checkmark.svelte","sources":["Checkmark.svelte"],"sourcesContent":["<!-- Checkmark.svelte -->\\r\\n\\r\\n<div class=\\"checkmark-container\\">\\r\\n\\t<svg class=\\"checkmark\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 52 52\\"\\r\\n\\t\\t><circle class=\\"checkmark__circle\\" cx=\\"26\\" cy=\\"26\\" r=\\"25\\" fill=\\"none\\" /><path\\r\\n\\t\\t\\tclass=\\"checkmark__check\\"\\r\\n\\t\\t\\tfill=\\"none\\"\\r\\n\\t\\t\\td=\\"M14.1 27.2l7.1 7.2 16.7-16.8\\"\\r\\n\\t\\t/></svg\\r\\n\\t>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.checkmark-container {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t}\\r\\n\\r\\n\\t.checkmark {\\r\\n\\t\\twidth: 56px;\\r\\n\\t\\theight: 56px;\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tstroke-width: 2;\\r\\n\\t\\tstroke: white;\\r\\n\\t\\tstroke-miterlimit: 10;\\r\\n\\t\\tbox-shadow: inset 0px 0px 0px green;\\r\\n\\t\\tanimation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;\\r\\n\\t}\\r\\n\\r\\n\\t.checkmark__circle {\\r\\n\\t\\tstroke-dasharray: 166;\\r\\n\\t\\tstroke-dashoffset: 166;\\r\\n\\t\\tstroke-width: 2;\\r\\n\\t\\tstroke-miterlimit: 10;\\r\\n\\t\\tstroke: green;\\r\\n\\t\\tfill: none;\\r\\n\\t\\tanimation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;\\r\\n\\t}\\r\\n\\r\\n\\t.checkmark__check {\\r\\n\\t\\ttransform-origin: 50% 50%;\\r\\n\\t\\tstroke-dasharray: 48;\\r\\n\\t\\tstroke-dashoffset: 48;\\r\\n\\t\\tanimation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes stroke {\\r\\n\\t\\t100% {\\r\\n\\t\\t\\tstroke-dashoffset: 0;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes scale {\\r\\n\\t\\t0%,\\r\\n\\t\\t100% {\\r\\n\\t\\t\\ttransform: none;\\r\\n\\t\\t}\\r\\n\\t\\t50% {\\r\\n\\t\\t\\ttransform: scale3d(1.5, 1.5, 1);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes fill {\\r\\n\\t\\t100% {\\r\\n\\t\\t\\tbox-shadow: inset 0px 0px 0px 30px green;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAaC,oBAAoB,cAAC,CAAC,AACrB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AACxB,CAAC,AAED,UAAU,cAAC,CAAC,AACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,KAAK,CACd,YAAY,CAAE,CAAC,CACf,MAAM,CAAE,KAAK,CACb,iBAAiB,CAAE,EAAE,CACrB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CACnC,SAAS,CAAE,kBAAI,CAAC,IAAI,CAAC,WAAW,CAAC,IAAI,CAAC,QAAQ,CAAC,CAAC,mBAAK,CAAC,IAAI,CAAC,WAAW,CAAC,IAAI,CAAC,IAAI,AACjF,CAAC,AAED,kBAAkB,cAAC,CAAC,AACnB,gBAAgB,CAAE,GAAG,CACrB,iBAAiB,CAAE,GAAG,CACtB,YAAY,CAAE,CAAC,CACf,iBAAiB,CAAE,EAAE,CACrB,MAAM,CAAE,KAAK,CACb,IAAI,CAAE,IAAI,CACV,SAAS,CAAE,oBAAM,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,AAC/D,CAAC,AAED,iBAAiB,cAAC,CAAC,AAClB,gBAAgB,CAAE,GAAG,CAAC,GAAG,CACzB,gBAAgB,CAAE,EAAE,CACpB,iBAAiB,CAAE,EAAE,CACrB,SAAS,CAAE,oBAAM,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,QAAQ,AACpE,CAAC,AAED,WAAW,oBAAO,CAAC,AAClB,IAAI,AAAC,CAAC,AACL,iBAAiB,CAAE,CAAC,AACrB,CAAC,AACF,CAAC,AAED,WAAW,mBAAM,CAAC,AACjB,EAAE,CACF,IAAI,AAAC,CAAC,AACL,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,GAAG,AAAC,CAAC,AACJ,SAAS,CAAE,QAAQ,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAChC,CAAC,AACF,CAAC,AAED,WAAW,kBAAK,CAAC,AAChB,IAAI,AAAC,CAAC,AACL,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,AACzC,CAAC,AACF,CAAC"}'
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `

<div class="${"checkmark-container svelte-s9tnn6"}"><svg class="${"checkmark svelte-s9tnn6"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 52 52"}"><circle class="${"checkmark__circle svelte-s9tnn6"}" cx="${"26"}" cy="${"26"}" r="${"25"}" fill="${"none"}"></circle><path class="${"checkmark__check svelte-s9tnn6"}" fill="${"none"}" d="${"M14.1 27.2l7.1 7.2 16.7-16.8"}"></path></svg>
</div>`;
});
var RightChoice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { handleChoice } = $$props;
  let { src: src2 } = $$props;
  let { name } = $$props;
  if ($$props.handleChoice === void 0 && $$bindings.handleChoice && handleChoice !== void 0)
    $$bindings.handleChoice(handleChoice);
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<button class="${"relative lg:w-50 lg:h-50 w-35 h-35 flex justify-center items-center capitalize text-5xl m-2 lg:p-8"}"><img${add_attribute("src", src2, 0)}${add_attribute("alt", name, 0)} class="${"w-30"}">
	${``}</button>`;
});
function isCorrect(id, answer) {
  return id === answer ? true : false;
}
var Quiz = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pokemonArray } = $$props;
  let { answer } = $$props;
  let { handleChoice } = $$props;
  if ($$props.pokemonArray === void 0 && $$bindings.pokemonArray && pokemonArray !== void 0)
    $$bindings.pokemonArray(pokemonArray);
  if ($$props.answer === void 0 && $$bindings.answer && answer !== void 0)
    $$bindings.answer(answer);
  if ($$props.handleChoice === void 0 && $$bindings.handleChoice && handleChoice !== void 0)
    $$bindings.handleChoice(handleChoice);
  return `<div class="${"flex flex-col justify-center items-center"}">${validate_component(Question, "Question").$$render($$result, { name: pokemonArray[answer].name }, {}, {})}
	<div class="${"flex flex-col sm:flex-row justify-center items-center"}">${each(pokemonArray, (pokemon, index2) => `${isCorrect(index2, answer) ? `${validate_component(RightChoice, "RightChoice").$$render($$result, {
    src: pokemon.sprites.front_default,
    handleChoice,
    name: pokemon.name
  }, {}, {})}` : `${validate_component(WrongChoice, "WrongChoice").$$render($$result, {
    src: pokemon.sprites.front_default,
    handleChoice,
    name: pokemon.name
  }, {}, {})}`}`)}</div></div>`;
});
var css$2 = {
  code: ".circle.svelte-xhmib1{width:100px;height:100px;border-radius:50%;background:red;position:relative;overflow:hidden}.circle.svelte-xhmib1:after{content:'';background:white;height:50px;display:block;bottom:0px;position:absolute;width:100%}.rotate.svelte-xhmib1{animation:svelte-xhmib1-rotation 2s infinite linear}@keyframes svelte-xhmib1-rotation{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}",
  map: `{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<script lang=\\"typescript\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { onMount } from 'svelte/internal';\\r\\nimport Checkmark from '$lib/Elements/Checkmark.svelte';\\r\\nimport { POKEMON_ID_RANGE, QUIZ_SET_SIZE } from '$lib/constants';\\r\\nlet idSet = [];\\r\\nlet answer;\\r\\nlet result;\\r\\nonMount(() => {\\r\\n    createNewQuestion();\\r\\n});\\r\\nfunction createNewQuestion() {\\r\\n    idSet = createSet(QUIZ_SET_SIZE);\\r\\n    answer = pickAnswer(QUIZ_SET_SIZE);\\r\\n    result = false;\\r\\n}\\r\\nfunction createSet(size) {\\r\\n    let set = [];\\r\\n    while (set.length < 3) {\\r\\n        let id = getRandomId(POKEMON_ID_RANGE);\\r\\n        // Ensures 3 unique pokemon\\r\\n        if (set.includes(id)) {\\r\\n            continue;\\r\\n        }\\r\\n        set.push(id);\\r\\n    }\\r\\n    return set;\\r\\n}\\r\\nfunction getRandomId([min, max]) {\\r\\n    return Math.floor(Math.random() * (max - min) + min);\\r\\n}\\r\\nfunction pickAnswer(size) {\\r\\n    return Math.floor(Math.random() * size);\\r\\n}\\r\\nfunction isCorrect(id, answer) {\\r\\n    return id === answer ? true : false;\\r\\n}\\r\\nfunction handleChoice(id) {\\r\\n    result = isCorrect(id, answer);\\r\\n    if (result) {\\r\\n        setTimeout(createNewQuestion, 1500);\\r\\n    }\\r\\n}\\r\\nfunction handleNameClick(name) {\\r\\n    if ('speechSynthesis' in window) {\\r\\n        // Speech Synthesis supported \u{1F389}\\r\\n        var msg = new SpeechSynthesisUtterance();\\r\\n        msg.text = name;\\r\\n        window.speechSynthesis.speak(msg);\\r\\n    }\\r\\n    else {\\r\\n        // Speech Synthesis Not Supported \u{1F623}\\r\\n        alert(\\"Sorry, your browser doesn't support text to speech!\\");\\r\\n    }\\r\\n}\\r\\n// Reactive api call when idSet changes\\r\\nlet promise;\\r\\n$: promise = apiRequestLoop(idSet);\\r\\nlet apiRequestLoop = function (idSet) {\\r\\n    let promiseArray = [];\\r\\n    idSet.forEach((id) => {\\r\\n        let promise = fetchPokemon(id);\\r\\n        promiseArray.push(promise);\\r\\n    });\\r\\n    return Promise.all(promiseArray);\\r\\n};\\r\\nfunction fetchPokemon(id) {\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        let api = 'https://pokeapi.co/api/v2/pokemon/';\\r\\n        const res = yield self.fetch(api + id);\\r\\n        const pokemon = yield res.json();\\r\\n        if (res.ok) {\\r\\n            return pokemon;\\r\\n        }\\r\\n        else {\\r\\n            throw new Error(pokemon);\\r\\n        }\\r\\n    });\\r\\n}\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"circle rotate\\" />\\r\\n\\r\\n<style>\\r\\n\\timg {\\r\\n\\t\\twidth: 200px;\\r\\n\\t}\\r\\n\\r\\n\\tbutton {\\r\\n\\t\\ttext-transform: capitalize;\\r\\n\\t\\tfont-size: 3rem;\\r\\n\\t\\tpadding: 1rem;\\r\\n\\t\\tmargin: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.quiz-container {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t.question-container {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t.pokemon-container {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t.circle {\\r\\n\\t\\twidth: 100px;\\r\\n\\t\\theight: 100px;\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tbackground: red;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\toverflow: hidden;\\r\\n\\t}\\r\\n\\t.circle:after {\\r\\n\\t\\tcontent: '';\\r\\n\\t\\tbackground: white;\\r\\n\\t\\theight: 50px;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tbottom: 0px;\\r\\n\\t\\tposition: absolute;\\r\\n\\r\\n\\t\\twidth: 100%;\\r\\n\\t}\\r\\n\\r\\n\\t.rotate {\\r\\n\\t\\tanimation: rotation 2s infinite linear;\\r\\n\\t}\\r\\n\\r\\n\\t@keyframes rotation {\\r\\n\\t\\tfrom {\\r\\n\\t\\t\\ttransform: rotate(0deg);\\r\\n\\t\\t}\\r\\n\\t\\tto {\\r\\n\\t\\t\\ttransform: rotate(359deg);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n\\r\\n\\t/* Checkmark  */\\r\\n\\r\\n\\t\\r\\n</style>\\r\\n\\r\\n"],"names":[],"mappings":"AA0HC,OAAO,cAAC,CAAC,AACR,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAAG,CACf,QAAQ,CAAE,QAAQ,CAClB,QAAQ,CAAE,MAAM,AACjB,CAAC,AACD,qBAAO,MAAM,AAAC,CAAC,AACd,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAElB,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,OAAO,cAAC,CAAC,AACR,SAAS,CAAE,sBAAQ,CAAC,EAAE,CAAC,QAAQ,CAAC,MAAM,AACvC,CAAC,AAED,WAAW,sBAAS,CAAC,AACpB,IAAI,AAAC,CAAC,AACL,SAAS,CAAE,OAAO,IAAI,CAAC,AACxB,CAAC,AACD,EAAE,AAAC,CAAC,AACH,SAAS,CAAE,OAAO,MAAM,CAAC,AAC1B,CAAC,AACF,CAAC"}`
};
function getRandomId$1([min, max]) {
  return Math.floor(Math.random() * (max - min) + min);
}
var Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  let idSet = [];
  onMount(() => {
    createNewQuestion();
  });
  function createNewQuestion() {
    idSet = createSet();
  }
  function createSet(size) {
    let set = [];
    while (set.length < 3) {
      let id = getRandomId$1(POKEMON_ID_RANGE);
      if (set.includes(id)) {
        continue;
      }
      set.push(id);
    }
    return set;
  }
  let apiRequestLoop = function(idSet2) {
    let promiseArray = [];
    idSet2.forEach((id) => {
      let promise = fetchPokemon(id);
      promiseArray.push(promise);
    });
    return Promise.all(promiseArray);
  };
  function fetchPokemon(id) {
    return __awaiter2(this, void 0, void 0, function* () {
      let api2 = "https://pokeapi.co/api/v2/pokemon/";
      const res = yield self.fetch(api2 + id);
      const pokemon = yield res.json();
      if (res.ok) {
        return pokemon;
      } else {
        throw new Error(pokemon);
      }
    });
  }
  $$result.css.add(css$2);
  apiRequestLoop(idSet);
  return `<div class="${"circle rotate svelte-xhmib1"}"></div>`;
});
function getRandomId([min, max]) {
  return Math.floor(Math.random() * (max - min) + min);
}
function pickAnswer(size) {
  return Math.floor(Math.random() * size);
}
var Pokemon_quiz = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  let idSet = [];
  let answer;
  onMount(() => {
    createNewQuestion();
  });
  function createNewQuestion() {
    idSet = createSet();
    answer = pickAnswer(QUIZ_SET_SIZE);
  }
  function createSet(size) {
    let set = [];
    while (set.length < 3) {
      let id = getRandomId(POKEMON_ID_RANGE);
      if (set.includes(id)) {
        continue;
      }
      set.push(id);
    }
    return set;
  }
  let promise;
  let fetchPokemonSet = function(idSet2) {
    let promiseArray = [];
    idSet2.forEach((id) => {
      let promise2 = fetchPokemonById(id);
      promiseArray.push(promise2);
    });
    return Promise.all(promiseArray);
  };
  function fetchPokemonById(id) {
    return __awaiter2(this, void 0, void 0, function* () {
      let api2 = "https://pokeapi.co/api/v2/pokemon/";
      const res = yield self.fetch(api2 + id);
      const pokemon = yield res.json();
      if (res.ok) {
        return pokemon;
      } else {
        throw new Error(pokemon);
      }
    });
  }
  promise = fetchPokemonSet(idSet);
  return `<section class="${"w-full py-4 px-4 text-center"}"><h1 class="${"text-2xl"}">Test your knowledge, Pokemon Trainer!</h1>
	<h3 class="${"text-xl"}">Which pokemon is named :</h3>
	<div class="${"w-full min-h-280 flex justify-center items-center"}">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop2);
      return `
			${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}
		`;
    }
    return function(pokemonArray) {
      return `
			${validate_component(Quiz, "Quiz").$$render($$result, {
        pokemonArray,
        answer,
        handleChoice: createNewQuestion
      }, {}, {})}
		`;
    }(__value);
  }(promise)}</div></section>`;
});
var pokemonQuiz = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Pokemon_quiz
});
var browser = false;
var dev = false;
var css$1 = {
  code: ".content.svelte-cf77e8{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}",
  map: `{"version":3,"file":"about.svelte","sources":["about.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\timport { browser, dev } from '$app/env';\\r\\n\\r\\n\\t// we don't need any JS on this page, though we'll load\\r\\n\\t// it in dev so that we get hot module replacement...\\r\\n\\texport const hydrate = dev;\\r\\n\\r\\n\\t// ...but if the client-side router is already loaded\\r\\n\\t// (i.e. we came here from elsewhere in the app), use it\\r\\n\\texport const router = browser;\\r\\n\\r\\n\\t// since there's no dynamic data here, we can prerender\\r\\n\\t// it so that it gets served as a static asset in prod\\r\\n\\texport const prerender = true;\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>About</title>\\r\\n</svelte:head>\\r\\n\\r\\n<div class=\\"content\\">\\r\\n\\t<h1>About this app</h1>\\r\\n\\r\\n\\t<p>\\r\\n\\t\\tThis is a <a href=\\"https://kit.svelte.dev\\">SvelteKit</a> app. You can make your own by typing the\\r\\n\\t\\tfollowing into your command line and following the prompts:\\r\\n\\t</p>\\r\\n\\r\\n\\t<!-- TODO lose the @next! -->\\r\\n\\t<pre>npm init svelte@next</pre>\\r\\n\\r\\n\\t<p>\\r\\n\\t\\tThe page you're looking at is purely static HTML, with no client-side interactivity needed.\\r\\n\\t\\tBecause of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\\r\\n\\t\\tthe devtools network panel and reloading.\\r\\n\\t</p>\\r\\n\\r\\n\\t<p>\\r\\n\\t\\tThe <a href=\\"/todos\\">TODOs</a> page illustrates SvelteKit's data loading and form handling. Try using\\r\\n\\t\\tit with JavaScript disabled!\\r\\n\\t</p>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.content {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmax-width: var(--column-width);\\r\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA4CC,QAAQ,cAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC7C,CAAC"}`
};
var hydrate = dev;
var router = browser;
var prerender = true;
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>About</title>`, ""}`, ""}

<div class="${"content svelte-cf77e8"}"><h1>About this app</h1>

	<p>This is a <a href="${"https://kit.svelte.dev"}">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	
	<pre>npm init svelte@next</pre>

	<p>The page you&#39;re looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don&#39;t need to load any JavaScript. Try viewing the page&#39;s source, or opening
		the devtools network panel and reloading.
	</p>

	<p>The <a href="${"/todos"}">TODOs</a> page illustrates SvelteKit&#39;s data loading and form handling. Try using
		it with JavaScript disabled!
	</p>
</div>`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About,
  hydrate,
  router,
  prerender
});
var css = {
  code: `.todos.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{margin:0 0 0.5rem 0}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid transparent}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));transform:translate(-1px, -1px);transition:filter 0.2s, transform 0.2s}.done.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{transform:none;opacity:0.4;filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-dmxqmd button.svelte-dmxqmd.svelte-dmxqmd{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-dmxqmd .toggle.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:hover,.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-dmxqmd input.svelte-dmxqmd:focus+.save.svelte-dmxqmd,.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}`,
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { enhance } from '$lib/form';\\r\\n;\\r\\n// see https://kit.svelte.dev/docs#loading\\r\\nexport const load = ({ fetch }) => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    const res = yield fetch('/todos.json');\\r\\n    if (res.ok) {\\r\\n        const todos = yield res.json();\\r\\n        return {\\r\\n            props: { todos }\\r\\n        };\\r\\n    }\\r\\n    const { message } = yield res.json();\\r\\n    return {\\r\\n        error: new Error(message)\\r\\n    };\\r\\n});\\r\\n<\/script>\\r\\n\\r\\n<script lang=\\"ts\\">var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { scale } from 'svelte/transition';\\r\\nimport { flip } from 'svelte/animate';\\r\\nexport let todos;\\r\\nfunction patch(res) {\\r\\n    return __awaiter(this, void 0, void 0, function* () {\\r\\n        const todo = yield res.json();\\r\\n        todos = todos.map((t) => {\\r\\n            if (t.uid === todo.uid)\\r\\n                return todo;\\r\\n            return t;\\r\\n        });\\r\\n    });\\r\\n}\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Todos</title>\\r\\n</svelte:head>\\r\\n\\r\\n<div class=\\"todos\\">\\r\\n\\t<h1>Todos</h1>\\r\\n\\r\\n\\t<form\\r\\n\\t\\tclass=\\"new\\"\\r\\n\\t\\taction=\\"/todos.json\\"\\r\\n\\t\\tmethod=\\"post\\"\\r\\n\\t\\tuse:enhance={{\\r\\n\\t\\t\\tresult: async (res, form) => {\\r\\n\\t\\t\\t\\tconst created = await res.json();\\r\\n\\t\\t\\t\\ttodos = [...todos, created];\\r\\n\\r\\n\\t\\t\\t\\tform.reset();\\r\\n\\t\\t\\t}\\r\\n\\t\\t}}\\r\\n\\t>\\r\\n\\t\\t<input name=\\"text\\" aria-label=\\"Add todo\\" placeholder=\\"+ tap to add a todo\\" />\\r\\n\\t</form>\\r\\n\\r\\n\\t{#each todos as todo (todo.uid)}\\r\\n\\t\\t<div\\r\\n\\t\\t\\tclass=\\"todo\\"\\r\\n\\t\\t\\tclass:done={todo.done}\\r\\n\\t\\t\\ttransition:scale|local={{ start: 0.7 }}\\r\\n\\t\\t\\tanimate:flip={{ duration: 200 }}\\r\\n\\t\\t>\\r\\n\\t\\t\\t<form\\r\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\r\\n\\t\\t\\t\\tmethod=\\"post\\"\\r\\n\\t\\t\\t\\tuse:enhance={{\\r\\n\\t\\t\\t\\t\\tpending: (data) => {\\r\\n\\t\\t\\t\\t\\t\\ttodo.done = !!data.get('done');\\r\\n\\t\\t\\t\\t\\t},\\r\\n\\t\\t\\t\\t\\tresult: patch\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<input type=\\"hidden\\" name=\\"done\\" value={todo.done ? '' : 'true'} />\\r\\n\\t\\t\\t\\t<button class=\\"toggle\\" aria-label=\\"Mark todo as {todo.done ? 'not done' : 'done'}\\" />\\r\\n\\t\\t\\t</form>\\r\\n\\r\\n\\t\\t\\t<form\\r\\n\\t\\t\\t\\tclass=\\"text\\"\\r\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\r\\n\\t\\t\\t\\tmethod=\\"post\\"\\r\\n\\t\\t\\t\\tuse:enhance={{\\r\\n\\t\\t\\t\\t\\tresult: patch\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<input aria-label=\\"Edit todo\\" type=\\"text\\" name=\\"text\\" value={todo.text} />\\r\\n\\t\\t\\t\\t<button class=\\"save\\" aria-label=\\"Save todo\\" />\\r\\n\\t\\t\\t</form>\\r\\n\\r\\n\\t\\t\\t<form\\r\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=delete\\"\\r\\n\\t\\t\\t\\tmethod=\\"post\\"\\r\\n\\t\\t\\t\\tuse:enhance={{\\r\\n\\t\\t\\t\\t\\tresult: () => {\\r\\n\\t\\t\\t\\t\\t\\ttodos = todos.filter((t) => t.uid !== todo.uid);\\r\\n\\t\\t\\t\\t\\t}\\r\\n\\t\\t\\t\\t}}\\r\\n\\t\\t\\t>\\r\\n\\t\\t\\t\\t<button class=\\"delete\\" aria-label=\\"Delete todo\\" />\\r\\n\\t\\t\\t</form>\\r\\n\\t\\t</div>\\r\\n\\t{/each}\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.todos {\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmax-width: var(--column-width);\\r\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\r\\n\\t\\tline-height: 1;\\r\\n\\t}\\r\\n\\r\\n\\t.new {\\r\\n\\t\\tmargin: 0 0 0.5rem 0;\\r\\n\\t}\\r\\n\\r\\n\\tinput {\\r\\n\\t\\tborder: 1px solid transparent;\\r\\n\\t}\\r\\n\\r\\n\\tinput:focus-visible {\\r\\n\\t\\tbox-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);\\r\\n\\t\\tborder: 1px solid #ff3e00 !important;\\r\\n\\t\\toutline: none;\\r\\n\\t}\\r\\n\\r\\n\\t.new input {\\r\\n\\t\\tfont-size: 28px;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tpadding: 0.5em 1em 0.3em 1em;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t\\tbackground: rgba(255, 255, 255, 0.05);\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t}\\r\\n\\r\\n\\t.todo {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 2rem 1fr 2rem;\\r\\n\\t\\tgrid-gap: 0.5rem;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tmargin: 0 0 0.5rem 0;\\r\\n\\t\\tpadding: 0.5rem;\\r\\n\\t\\tbackground-color: white;\\r\\n\\t\\tborder-radius: 8px;\\r\\n\\t\\tfilter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));\\r\\n\\t\\ttransform: translate(-1px, -1px);\\r\\n\\t\\ttransition: filter 0.2s, transform 0.2s;\\r\\n\\t}\\r\\n\\r\\n\\t.done {\\r\\n\\t\\ttransform: none;\\r\\n\\t\\topacity: 0.4;\\r\\n\\t\\tfilter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));\\r\\n\\t}\\r\\n\\r\\n\\tform.text {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tflex: 1;\\r\\n\\t}\\r\\n\\r\\n\\t.todo input {\\r\\n\\t\\tflex: 1;\\r\\n\\t\\tpadding: 0.5em 2em 0.5em 0.8em;\\r\\n\\t\\tborder-radius: 3px;\\r\\n\\t}\\r\\n\\r\\n\\t.todo button {\\r\\n\\t\\twidth: 2em;\\r\\n\\t\\theight: 2em;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tbackground-position: 50% 50%;\\r\\n\\t\\tbackground-repeat: no-repeat;\\r\\n\\t}\\r\\n\\r\\n\\tbutton.toggle {\\r\\n\\t\\tborder: 1px solid rgba(0, 0, 0, 0.2);\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t\\tbackground-size: 1em auto;\\r\\n\\t}\\r\\n\\r\\n\\t.done .toggle {\\r\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\\");\\r\\n\\t}\\r\\n\\r\\n\\t.delete {\\r\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A\\");\\r\\n\\t\\topacity: 0.2;\\r\\n\\t}\\r\\n\\r\\n\\t.delete:hover,\\r\\n\\t.delete:focus {\\r\\n\\t\\ttransition: opacity 0.2s;\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\t.save {\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\tright: 0;\\r\\n\\t\\topacity: 0;\\r\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A\\");\\r\\n\\t}\\r\\n\\r\\n\\t.todo input:focus + .save,\\r\\n\\t.save:focus {\\r\\n\\t\\ttransition: opacity 0.2s;\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA2HC,MAAM,0CAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,WAAW,CAAE,CAAC,AACf,CAAC,AAED,IAAI,0CAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,AAC9B,CAAC,AAED,+CAAK,cAAc,AAAC,CAAC,AACpB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAChD,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,OAAO,CAAE,IAAI,AACd,CAAC,AAED,kBAAI,CAAC,KAAK,4BAAC,CAAC,AACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,CAC5B,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACpC,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACpB,OAAO,CAAE,MAAM,CACf,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,AACxC,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACpD,CAAC,AAED,IAAI,KAAK,0CAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,CAAC,AACR,CAAC,AAED,mBAAK,CAAC,KAAK,4BAAC,CAAC,AACZ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,mBAAK,CAAC,MAAM,4BAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,CAC7B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,iBAAiB,CAAE,SAAS,AAC7B,CAAC,AAED,MAAM,OAAO,0CAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CACtB,eAAe,CAAE,GAAG,CAAC,IAAI,AAC1B,CAAC,AAED,mBAAK,CAAC,OAAO,4BAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,uQAAuQ,CAAC,AAC/R,CAAC,AAED,OAAO,0CAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,yrBAAyrB,CAAC,CAChtB,OAAO,CAAE,GAAG,AACb,CAAC,AAED,iDAAO,MAAM,CACb,iDAAO,MAAM,AAAC,CAAC,AACd,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,gpBAAgpB,CAAC,AACxqB,CAAC,AAED,mBAAK,CAAC,mBAAK,MAAM,CAAG,mBAAK,CACzB,+CAAK,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC"}`
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var load = ({ fetch: fetch22 }) => __awaiter(void 0, void 0, void 0, function* () {
  const res = yield fetch22("/todos.json");
  if (res.ok) {
    const todos = yield res.json();
    return { props: { todos } };
  }
  const { message } = yield res.json();
  return { error: new Error(message) };
});
var Todos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  (function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  });
  let { todos } = $$props;
  if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
    $$bindings.todos(todos);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Todos</title>`, ""}`, ""}

<div class="${"todos svelte-dmxqmd"}"><h1>Todos</h1>

	<form class="${"new svelte-dmxqmd"}" action="${"/todos.json"}" method="${"post"}"><input name="${"text"}" aria-label="${"Add todo"}" placeholder="${"+ tap to add a todo"}" class="${"svelte-dmxqmd"}"></form>

	${each(todos, (todo) => `<div class="${["todo svelte-dmxqmd", todo.done ? "done" : ""].join(" ").trim()}"><form action="${"/todos/" + escape2(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input type="${"hidden"}" name="${"done"}"${add_attribute("value", todo.done ? "" : "true", 0)} class="${"svelte-dmxqmd"}">
				<button class="${"toggle svelte-dmxqmd"}" aria-label="${"Mark todo as " + escape2(todo.done ? "not done" : "done")}"></button></form>

			<form class="${"text svelte-dmxqmd"}" action="${"/todos/" + escape2(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input aria-label="${"Edit todo"}" type="${"text"}" name="${"text"}"${add_attribute("value", todo.text, 0)} class="${"svelte-dmxqmd"}">
				<button class="${"save svelte-dmxqmd"}" aria-label="${"Save todo"}"></button></form>

			<form action="${"/todos/" + escape2(todo.uid) + ".json?_method=delete"}" method="${"post"}"><button class="${"delete svelte-dmxqmd"}" aria-label="${"Delete todo"}"></button></form>
		</div>`)}
</div>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Todos,
  load
});
var initPjs = (main) => {
  const particlesJS = (tagId, options2) => {
    return main.load(tagId, options2);
  };
  particlesJS.load = (tagId, pathConfigJson, callback) => {
    main.loadJSON(tagId, pathConfigJson).then((container) => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(void 0);
    });
  };
  particlesJS.setOnClickHandler = (callback) => {
    main.setOnClickHandler(callback);
  };
  const pJSDom = main.dom();
  return { particlesJS, pJSDom };
};
var MoveDirection;
(function(MoveDirection2) {
  MoveDirection2["bottom"] = "bottom";
  MoveDirection2["bottomLeft"] = "bottom-left";
  MoveDirection2["bottomRight"] = "bottom-right";
  MoveDirection2["left"] = "left";
  MoveDirection2["none"] = "none";
  MoveDirection2["right"] = "right";
  MoveDirection2["top"] = "top";
  MoveDirection2["topLeft"] = "top-left";
  MoveDirection2["topRight"] = "top-right";
})(MoveDirection || (MoveDirection = {}));
var RotateDirection;
(function(RotateDirection2) {
  RotateDirection2["clockwise"] = "clockwise";
  RotateDirection2["counterClockwise"] = "counter-clockwise";
  RotateDirection2["random"] = "random";
})(RotateDirection || (RotateDirection = {}));
var OutModeDirection;
(function(OutModeDirection2) {
  OutModeDirection2["bottom"] = "bottom";
  OutModeDirection2["left"] = "left";
  OutModeDirection2["right"] = "right";
  OutModeDirection2["top"] = "top";
})(OutModeDirection || (OutModeDirection = {}));
var TiltDirection;
(function(TiltDirection2) {
  TiltDirection2["clockwise"] = "clockwise";
  TiltDirection2["counterClockwise"] = "counter-clockwise";
  TiltDirection2["random"] = "random";
})(TiltDirection || (TiltDirection = {}));
var ClickMode;
(function(ClickMode2) {
  ClickMode2["attract"] = "attract";
  ClickMode2["bubble"] = "bubble";
  ClickMode2["push"] = "push";
  ClickMode2["remove"] = "remove";
  ClickMode2["repulse"] = "repulse";
  ClickMode2["pause"] = "pause";
  ClickMode2["trail"] = "trail";
})(ClickMode || (ClickMode = {}));
var DestroyMode;
(function(DestroyMode2) {
  DestroyMode2["none"] = "none";
  DestroyMode2["split"] = "split";
})(DestroyMode || (DestroyMode = {}));
var DivMode;
(function(DivMode2) {
  DivMode2["bounce"] = "bounce";
  DivMode2["bubble"] = "bubble";
  DivMode2["repulse"] = "repulse";
})(DivMode || (DivMode = {}));
var HoverMode;
(function(HoverMode2) {
  HoverMode2["attract"] = "attract";
  HoverMode2["bounce"] = "bounce";
  HoverMode2["bubble"] = "bubble";
  HoverMode2["connect"] = "connect";
  HoverMode2["grab"] = "grab";
  HoverMode2["light"] = "light";
  HoverMode2["repulse"] = "repulse";
  HoverMode2["slow"] = "slow";
  HoverMode2["trail"] = "trail";
})(HoverMode || (HoverMode = {}));
var CollisionMode;
(function(CollisionMode2) {
  CollisionMode2["absorb"] = "absorb";
  CollisionMode2["bounce"] = "bounce";
  CollisionMode2["destroy"] = "destroy";
})(CollisionMode || (CollisionMode = {}));
var OutMode;
(function(OutMode2) {
  OutMode2["bounce"] = "bounce";
  OutMode2["bounceHorizontal"] = "bounce-horizontal";
  OutMode2["bounceVertical"] = "bounce-vertical";
  OutMode2["none"] = "none";
  OutMode2["out"] = "out";
  OutMode2["destroy"] = "destroy";
  OutMode2["split"] = "split";
})(OutMode || (OutMode = {}));
var RollMode;
(function(RollMode2) {
  RollMode2["both"] = "both";
  RollMode2["horizontal"] = "horizontal";
  RollMode2["vertical"] = "vertical";
})(RollMode || (RollMode = {}));
var SizeMode;
(function(SizeMode2) {
  SizeMode2["precise"] = "precise";
  SizeMode2["percent"] = "percent";
})(SizeMode || (SizeMode = {}));
var ThemeMode;
(function(ThemeMode2) {
  ThemeMode2["any"] = "any";
  ThemeMode2["dark"] = "dark";
  ThemeMode2["light"] = "light";
})(ThemeMode || (ThemeMode = {}));
var AnimationStatus;
(function(AnimationStatus2) {
  AnimationStatus2[AnimationStatus2["increasing"] = 0] = "increasing";
  AnimationStatus2[AnimationStatus2["decreasing"] = 1] = "decreasing";
})(AnimationStatus || (AnimationStatus = {}));
var AlterType;
(function(AlterType2) {
  AlterType2["darken"] = "darken";
  AlterType2["enlighten"] = "enlighten";
})(AlterType || (AlterType = {}));
var DestroyType;
(function(DestroyType2) {
  DestroyType2["none"] = "none";
  DestroyType2["max"] = "max";
  DestroyType2["min"] = "min";
})(DestroyType || (DestroyType = {}));
var GradientType;
(function(GradientType2) {
  GradientType2["linear"] = "linear";
  GradientType2["radial"] = "radial";
  GradientType2["random"] = "random";
})(GradientType || (GradientType = {}));
var InteractorType;
(function(InteractorType2) {
  InteractorType2[InteractorType2["External"] = 0] = "External";
  InteractorType2[InteractorType2["Particles"] = 1] = "Particles";
})(InteractorType || (InteractorType = {}));
var ShapeType;
(function(ShapeType2) {
  ShapeType2["char"] = "char";
  ShapeType2["character"] = "character";
  ShapeType2["circle"] = "circle";
  ShapeType2["edge"] = "edge";
  ShapeType2["image"] = "image";
  ShapeType2["images"] = "images";
  ShapeType2["line"] = "line";
  ShapeType2["polygon"] = "polygon";
  ShapeType2["square"] = "square";
  ShapeType2["star"] = "star";
  ShapeType2["triangle"] = "triangle";
})(ShapeType || (ShapeType = {}));
var StartValueType;
(function(StartValueType2) {
  StartValueType2["max"] = "max";
  StartValueType2["min"] = "min";
  StartValueType2["random"] = "random";
})(StartValueType || (StartValueType = {}));
var DivType;
(function(DivType2) {
  DivType2["circle"] = "circle";
  DivType2["rectangle"] = "rectangle";
})(DivType || (DivType = {}));
var EasingType;
(function(EasingType2) {
  EasingType2["easeOutBack"] = "ease-out-back";
  EasingType2["easeOutCirc"] = "ease-out-circ";
  EasingType2["easeOutCubic"] = "ease-out-cubic";
  EasingType2["easeOutQuad"] = "ease-out-quad";
  EasingType2["easeOutQuart"] = "ease-out-quart";
  EasingType2["easeOutQuint"] = "ease-out-quint";
  EasingType2["easeOutExpo"] = "ease-out-expo";
  EasingType2["easeOutSine"] = "ease-out-sine";
})(EasingType || (EasingType = {}));
var OrbitType;
(function(OrbitType2) {
  OrbitType2["front"] = "front";
  OrbitType2["back"] = "back";
})(OrbitType || (OrbitType = {}));
var InteractivityDetect;
(function(InteractivityDetect2) {
  InteractivityDetect2["canvas"] = "canvas";
  InteractivityDetect2["parent"] = "parent";
  InteractivityDetect2["window"] = "window";
})(InteractivityDetect || (InteractivityDetect = {}));
var Vector = class {
  constructor(x, y) {
    let defX, defY;
    if (y === void 0) {
      if (typeof x === "number") {
        throw new Error("tsParticles - Vector not initialized correctly");
      }
      const coords = x;
      [defX, defY] = [coords.x, coords.y];
    } else {
      [defX, defY] = [x, y];
    }
    this.x = defX;
    this.y = defY;
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
  static get origin() {
    return Vector.create(0, 0);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this.updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  set length(length) {
    this.updateFromAngle(this.angle, length);
  }
  add(v) {
    return Vector.create(this.x + v.x, this.y + v.y);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }
  sub(v) {
    return Vector.create(this.x - v.x, this.y - v.y);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  mult(n) {
    return Vector.create(this.x * n, this.y * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
  }
  div(n) {
    return Vector.create(this.x / n, this.y / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }
  copy() {
    return Vector.clone(this);
  }
  setTo(velocity) {
    this.x = velocity.x;
    this.y = velocity.y;
  }
  rotate(angle) {
    return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }
  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
};
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);
  if (max === min) {
    min = 0;
  }
  return Math.random() * (max - min) + min;
}
function getRangeValue(value) {
  return typeof value === "number" ? value : randomInRange(value);
}
function getRangeMin(value) {
  return typeof value === "number" ? value : value.min;
}
function getRangeMax(value) {
  return typeof value === "number" ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === void 0 && typeof source === "number") {
    return source;
  }
  const min = getRangeMin(source), max = getRangeMax(source);
  return value !== void 0 ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getValue(options2) {
  const random = options2.random;
  const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;
  return enable ? getRangeValue(setRangeValue(options2.value, minimumValue)) : getRangeValue(options2.value);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return { dx, dy, distance: Math.sqrt(dx * dx + dy * dy) };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction) {
  if (typeof direction === "number") {
    return direction * Math.PI / 180;
  } else {
    switch (direction) {
      case MoveDirection.top:
        return -Math.PI / 2;
      case MoveDirection.topRight:
        return -Math.PI / 4;
      case MoveDirection.right:
        return 0;
      case MoveDirection.bottomRight:
        return Math.PI / 4;
      case MoveDirection.bottom:
        return Math.PI / 2;
      case MoveDirection.bottomLeft:
        return 3 * Math.PI / 4;
      case MoveDirection.left:
        return Math.PI;
      case MoveDirection.topLeft:
        return -3 * Math.PI / 4;
      case MoveDirection.none:
      default:
        return Math.random() * Math.PI * 2;
    }
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}
function calcEasing(value, type) {
  switch (type) {
    case EasingType.easeOutQuad:
      return 1 - (1 - value) ** 2;
    case EasingType.easeOutCubic:
      return 1 - (1 - value) ** 3;
    case EasingType.easeOutQuart:
      return 1 - (1 - value) ** 4;
    case EasingType.easeOutQuint:
      return 1 - (1 - value) ** 5;
    case EasingType.easeOutExpo:
      return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
    case EasingType.easeOutSine:
      return Math.sin(value * Math.PI / 2);
    case EasingType.easeOutBack: {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
    }
    case EasingType.easeOutCirc:
      return Math.sqrt(1 - Math.pow(value - 1, 2));
    default:
      return value;
  }
}
function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
  const res = { bounced: false };
  if (pOtherSide.min >= rectOtherSide.min && pOtherSide.min <= rectOtherSide.max && pOtherSide.max >= rectOtherSide.min && pOtherSide.max <= rectOtherSide.max) {
    if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
      res.velocity = velocity * -factor;
      res.bounced = true;
    }
  }
  return res;
}
function checkSelector(element, selectors) {
  if (selectors instanceof Array) {
    for (const selector of selectors) {
      if (element.matches(selector)) {
        return true;
      }
    }
    return false;
  } else {
    return element.matches(selectors);
  }
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function animate() {
  return isSsr() ? (callback) => setTimeout(callback) : (callback) => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
}
function cancelAnimation() {
  return isSsr() ? (handle2) => clearTimeout(handle2) : (handle2) => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle2);
}
function isInArray(value, array) {
  return value === array || array instanceof Array && array.indexOf(value) > -1;
}
async function loadFont(character) {
  var _a, _b;
  try {
    await document.fonts.load(`${(_a = character.weight) !== null && _a !== void 0 ? _a : "400"} 36px '${(_b = character.font) !== null && _b !== void 0 ? _b : "Verdana"}'`);
  } catch (_c) {
  }
}
function arrayRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
function itemFromArray(array, index2, useIndex = true) {
  const fixedIndex = index2 !== void 0 && useIndex ? index2 % array.length : arrayRandomIndex(array);
  return array[fixedIndex];
}
function isPointInside(point, size, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, direction);
}
function areBoundsInside(bounds, size, direction) {
  let inside = true;
  if (!direction || direction === OutModeDirection.bottom) {
    inside = bounds.top < size.height;
  }
  if (inside && (!direction || direction === OutModeDirection.left)) {
    inside = bounds.right > 0;
  }
  if (inside && (!direction || direction === OutModeDirection.right)) {
    inside = bounds.left < size.width;
  }
  if (inside && (!direction || direction === OutModeDirection.top)) {
    inside = bounds.bottom > 0;
  }
  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === void 0 || source === null) {
      continue;
    }
    if (typeof source !== "object") {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source;
      const value = sourceDict[key];
      const isObject = typeof value === "object";
      const destDict = destination;
      destDict[key] = isObject && Array.isArray(value) ? value.map((v) => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }
  return destination;
}
function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find((t) => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}
function divModeExecute(mode, divs, callback) {
  if (divs instanceof Array) {
    for (const div of divs) {
      const divMode2 = div.mode;
      const divEnabled = div.enable;
      if (divEnabled && isInArray(mode, divMode2)) {
        singleDivModeExecute(div, callback);
      }
    }
  } else {
    const divMode2 = divs.mode;
    const divEnabled = divs.enable;
    if (divEnabled && isInArray(mode, divMode2)) {
      singleDivModeExecute(divs, callback);
    }
  }
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  if (selectors instanceof Array) {
    for (const selector of selectors) {
      callback(selector, div);
    }
  } else {
    callback(selectors, div);
  }
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  if (divs instanceof Array) {
    return divs.find((d2) => checkSelector(element, d2.selectors));
  } else if (checkSelector(element, divs.selectors)) {
    return divs;
  }
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
  };
}
function circleBounce(p1, p2) {
  const xVelocityDiff = p1.velocity.x;
  const yVelocityDiff = p1.velocity.y;
  const pos1 = p1.position;
  const pos2 = p2.position;
  const xDist = pos2.x - pos1.x;
  const yDist = pos2.y - pos1.y;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    const m1 = p1.mass;
    const m2 = p2.mass;
    const u1 = p1.velocity.rotate(angle);
    const u2 = p2.velocity.rotate(angle);
    const v1 = collisionVelocity(u1, u2, m1, m2);
    const v2 = collisionVelocity(u2, u1, m1, m2);
    const vFinal1 = v1.rotate(-angle);
    const vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
  }
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition();
  const size = particle.getRadius();
  const bounds = calculateBounds(pPos, size);
  const resH = rectSideBounce({
    min: bounds.left,
    max: bounds.right
  }, {
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, particle.velocity.x, getValue(particle.options.bounce.horizontal));
  if (resH.bounced) {
    if (resH.velocity !== void 0) {
      particle.velocity.x = resH.velocity;
    }
  }
  const resV = rectSideBounce({
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: bounds.left,
    max: bounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, particle.velocity.y, getValue(particle.options.bounce.vertical));
  if (resV.bounced) {
    if (resV.velocity !== void 0) {
      particle.velocity.y = resV.velocity;
    }
  }
}
var Constants = class {
};
Constants.canvasClass = "tsparticles-canvas-el";
Constants.randomColorValue = "random";
Constants.midColorValue = "mid";
Constants.touchEndEvent = "touchend";
Constants.mouseDownEvent = "mousedown";
Constants.mouseUpEvent = "mouseup";
Constants.mouseMoveEvent = "mousemove";
Constants.touchStartEvent = "touchstart";
Constants.touchMoveEvent = "touchmove";
Constants.mouseLeaveEvent = "mouseleave";
Constants.mouseOutEvent = "mouseout";
Constants.touchCancelEvent = "touchcancel";
Constants.resizeEvent = "resize";
Constants.visibilityChangeEvent = "visibilitychange";
Constants.noPolygonDataLoaded = "No polygon data loaded.";
Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
function hue2rgb(p, q, t) {
  let tCalc = t;
  if (tCalc < 0) {
    tCalc += 1;
  }
  if (tCalc > 1) {
    tCalc -= 1;
  }
  if (tCalc < 1 / 6) {
    return p + (q - p) * 6 * tCalc;
  }
  if (tCalc < 1 / 2) {
    return q;
  }
  if (tCalc < 2 / 3) {
    return p + (q - p) * (2 / 3 - tCalc) * 6;
  }
  return p;
}
function stringToRgba(input) {
  if (input.startsWith("rgb")) {
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : void 0;
  } else if (input.startsWith("hsl")) {
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : void 0;
  } else if (input.startsWith("hsv")) {
    const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hsvaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      s: parseInt(result[2], 10),
      v: parseInt(result[3], 10)
    }) : void 0;
  } else {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== void 0 ? a + a : "");
    });
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = regex.exec(hexFixed);
    return result ? {
      a: result[4] !== void 0 ? parseInt(result[4], 16) / 255 : 1,
      b: parseInt(result[3], 16),
      g: parseInt(result[2], 16),
      r: parseInt(result[1], 16)
    } : void 0;
  }
}
function colorToRgb(input, index2, useIndex = true) {
  var _a, _b, _c;
  if (input === void 0) {
    return;
  }
  const color = typeof input === "string" ? { value: input } : input;
  let res;
  if (typeof color.value === "string") {
    if (color.value === Constants.randomColorValue) {
      res = getRandomRgbColor();
    } else {
      res = stringToRgb(color.value);
    }
  } else {
    if (color.value instanceof Array) {
      const colorSelected = itemFromArray(color.value, index2, useIndex);
      res = colorToRgb({ value: colorSelected });
    } else {
      const colorValue = color.value;
      const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
      if (rgbColor.r !== void 0) {
        res = rgbColor;
      } else {
        const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
        if (hslColor.h !== void 0 && hslColor.l !== void 0) {
          res = hslToRgb(hslColor);
        } else {
          const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
          if (hsvColor.h !== void 0 && hsvColor.v !== void 0) {
            res = hsvToRgb(hsvColor);
          }
        }
      }
    }
  }
  return res;
}
function colorToHsl(color, index2, useIndex = true) {
  const rgb = colorToRgb(color, index2, useIndex);
  return rgb !== void 0 ? rgbToHsl(rgb) : void 0;
}
function rgbToHsl(color) {
  const r1 = color.r / 255;
  const g1 = color.g / 255;
  const b1 = color.b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };
  if (max != min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2 + (b1 - r1) / (max - min) : 4 + (r1 - g1) / (max - min);
  }
  res.l *= 100;
  res.s *= 100;
  res.h *= 60;
  if (res.h < 0) {
    res.h += 360;
  }
  return res;
}
function stringToAlpha(input) {
  var _a;
  return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}
function stringToRgb(input) {
  return stringToRgba(input);
}
function hslToRgb(hsl) {
  const result = { b: 0, g: 0, r: 0 };
  const hslPercent = {
    h: hsl.h / 360,
    l: hsl.l / 100,
    s: hsl.s / 100
  };
  if (hslPercent.s === 0) {
    result.b = hslPercent.l;
    result.g = hslPercent.l;
    result.r = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
    const p = 2 * hslPercent.l - q;
    result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
    result.g = hue2rgb(p, q, hslPercent.h);
    result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
  }
  result.r = Math.floor(result.r * 255);
  result.g = Math.floor(result.g * 255);
  result.b = Math.floor(result.b * 255);
  return result;
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function hsvToRgb(hsv) {
  const result = { b: 0, g: 0, r: 0 };
  const hsvPercent = {
    h: hsv.h / 60,
    s: hsv.s / 100,
    v: hsv.v / 100
  };
  const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
  let tempRgb;
  if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
    tempRgb = {
      r: c,
      g: x,
      b: 0
    };
  } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
    tempRgb = {
      r: x,
      g: c,
      b: 0
    };
  } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
    tempRgb = {
      r: 0,
      g: c,
      b: x
    };
  } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
    tempRgb = {
      r: 0,
      g: x,
      b: c
    };
  } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
    tempRgb = {
      r: x,
      g: 0,
      b: c
    };
  } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
    tempRgb = {
      r: c,
      g: 0,
      b: x
    };
  }
  if (tempRgb) {
    const m = hsvPercent.v - c;
    result.r = Math.floor((tempRgb.r + m) * 255);
    result.g = Math.floor((tempRgb.g + m) * 255);
    result.b = Math.floor((tempRgb.b + m) * 255);
  }
  return result;
}
function hsvaToRgba(hsva) {
  const rgbResult = hsvToRgb(hsva);
  return {
    a: hsva.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function getRandomRgbColor(min) {
  const fixedMin = min !== null && min !== void 0 ? min : 0;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1;
  let rgb2 = color2;
  if (rgb1.r === void 0) {
    rgb1 = hslToRgb(color1);
  }
  if (rgb2.r === void 0) {
    rgb2 = hslToRgb(color2);
  }
  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function getLinkColor(p1, p2, linkColor) {
  var _a, _b;
  if (linkColor === Constants.randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === "mid") {
    const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor();
    const destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(optColor, blink, consent) {
  const color = typeof optColor === "string" ? optColor : optColor.value;
  if (color === Constants.randomColorValue) {
    if (consent) {
      return colorToRgb({
        value: color
      });
    } else if (blink) {
      return Constants.randomColorValue;
    } else {
      return Constants.midColorValue;
    }
  } else {
    return colorToRgb({
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== void 0 ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : void 0;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };
  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }
  return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;
  if (colorValue.enable) {
    colorValue.velocity = colorAnimation.speed / 100 * reduceFactor;
    if (colorAnimation.sync) {
      return;
    }
    colorValue.status = AnimationStatus.increasing;
    colorValue.velocity *= Math.random();
    if (colorValue.value) {
      colorValue.value *= Math.random();
    }
  } else {
    colorValue.velocity = 0;
  }
}
function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.save();
  context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
  context.restore();
}
function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
  let drawn = false;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);
    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = { x: 0, y: yi };
      pi2 = { x: canvasSize.width, y: yi };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);
      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = { x: xi, y: 0 };
        pi2 = { x: xi, y: canvasSize.height };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);
        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = { x: xi, y: yi };
          pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
        }
      }
    }
    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }
  if (!drawn) {
    return;
  }
  context.lineWidth = width;
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  if (shadow.enable) {
    const shadowColor = colorToRgb(shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function drawConnectLine(context, width, lineStyle, begin, end) {
  context.save();
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
  context.restore();
}
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
  const color1 = p1.getFillColor();
  const color2 = p2.getFillColor();
  if (!color1 || !color2) {
    return;
  }
  const sourcePos = p1.getPosition();
  const destPos = p2.getPosition();
  const midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius());
  const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}
function drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow, gradient2) {
  var _a, _b, _c, _d, _e, _f;
  const pos = particle.getPosition();
  const tiltOptions = particle.options.tilt;
  const rollOptions = particle.options.roll;
  context.save();
  if (tiltOptions.enable || rollOptions.enable) {
    const roll = rollOptions.enable && particle.roll;
    const tilt = tiltOptions.enable && particle.tilt;
    const rollHorizontal = roll && (rollOptions.mode === RollMode.horizontal || rollOptions.mode === RollMode.both);
    const rollVertical = roll && (rollOptions.mode === RollMode.vertical || rollOptions.mode === RollMode.both);
    context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }
  context.beginPath();
  const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);
  if (angle !== 0) {
    context.rotate(angle);
  }
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  const shadowColor = particle.shadowColor;
  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }
  if (gradient2) {
    const gradientAngle = gradient2.angle.value;
    const fillGradient = gradient2.type === GradientType.radial ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);
    for (const color of gradient2.colors) {
      fillGradient.addColorStop(color.stop, getStyleFromHsl({
        h: color.value.h.value,
        s: color.value.s.value,
        l: color.value.l.value
      }, (_d = (_c = color.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : opacity));
    }
    context.fillStyle = fillGradient;
  } else {
    if (fillColorValue) {
      context.fillStyle = fillColorValue;
    }
  }
  const stroke = particle.stroke;
  context.lineWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;
  if (strokeColorValue) {
    context.strokeStyle = strokeColorValue;
  }
  drawShape(container, context, particle, radius, opacity, delta);
  if (((_f = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _f !== void 0 ? _f : 0) > 0) {
    context.stroke();
  }
  if (particle.close) {
    context.closePath();
  }
  if (particle.fill) {
    context.fill();
  }
  context.restore();
  context.save();
  if (tiltOptions.enable && particle.tilt) {
    context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }
  if (angle !== 0) {
    context.rotate(angle);
  }
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.restore();
}
function drawShape(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }
  const drawer = container.drawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }
  const drawer = container.drawers.get(particle.shape);
  if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
    return;
  }
  drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }
  context.save();
  plugin.draw(context, delta);
  context.restore();
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (plugin.drawParticle !== void 0) {
    context.save();
    plugin.drawParticle(context, particle, delta);
    context.restore();
  }
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === AlterType.darken ? -1 : 1) * value
  };
}
var Range = class {
  constructor(x, y) {
    this.position = {
      x,
      y
    };
  }
};
var Circle = class extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const rect = range;
    const circle = range;
    const pos1 = this.position;
    const pos2 = range.position;
    const xDist = Math.abs(pos2.x - pos1.x);
    const yDist = Math.abs(pos2.y - pos1.y);
    const r = this.radius;
    if (circle.radius !== void 0) {
      const rSum = r + circle.radius;
      const dist = Math.sqrt(xDist * xDist + yDist + yDist);
      return rSum > dist;
    } else if (rect.size !== void 0) {
      const w = rect.size.width;
      const h = rect.size.height;
      const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
      if (xDist > r + w || yDist > r + h) {
        return false;
      }
      if (xDist <= w || yDist <= h) {
        return true;
      }
      return edges <= r * r;
    }
    return false;
  }
};
var Rectangle = class extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height,
      width
    };
  }
  contains(point) {
    const w = this.size.width;
    const h = this.size.height;
    const pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  intersects(range) {
    const rect = range;
    const circle = range;
    const w = this.size.width;
    const h = this.size.height;
    const pos1 = this.position;
    const pos2 = range.position;
    if (circle.radius !== void 0) {
      return circle.intersects(this);
    } else if (rect.size !== void 0) {
      const size2 = rect.size;
      const w2 = size2.width;
      const h2 = size2.height;
      return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
    return false;
  }
};
var CircleWarp = class extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      height: canvasSize.height,
      width: canvasSize.width
    };
  }
  contains(point) {
    if (super.contains(point)) {
      return true;
    }
    const posNE = {
      x: point.x - this.canvasSize.width,
      y: point.y
    };
    if (super.contains(posNE)) {
      return true;
    }
    const posSE = {
      x: point.x - this.canvasSize.width,
      y: point.y - this.canvasSize.height
    };
    if (super.contains(posSE)) {
      return true;
    }
    const posSW = {
      x: point.x,
      y: point.y - this.canvasSize.height
    };
    return super.contains(posSW);
  }
  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }
    const rect = range;
    const circle = range;
    const newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };
    if (circle.radius !== void 0) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== void 0) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }
    return false;
  }
};
function manageListener(element, event, handler2, add, options2) {
  if (add) {
    let addOptions = { passive: true };
    if (typeof options2 === "boolean") {
      addOptions.capture = options2;
    } else if (options2 !== void 0) {
      addOptions = options2;
    }
    element.addEventListener(event, handler2, addOptions);
  } else {
    const removeOptions = options2;
    element.removeEventListener(event, handler2, removeOptions);
  }
}
var EventListeners = class {
  constructor(container) {
    this.container = container;
    this.canPush = true;
    this.mouseMoveHandler = (e) => this.mouseTouchMove(e);
    this.touchStartHandler = (e) => this.mouseTouchMove(e);
    this.touchMoveHandler = (e) => this.mouseTouchMove(e);
    this.touchEndHandler = () => this.mouseTouchFinish();
    this.mouseLeaveHandler = () => this.mouseTouchFinish();
    this.touchCancelHandler = () => this.mouseTouchFinish();
    this.touchEndClickHandler = (e) => this.mouseTouchClick(e);
    this.mouseUpHandler = (e) => this.mouseTouchClick(e);
    this.mouseDownHandler = () => this.mouseDown();
    this.visibilityChangeHandler = () => this.handleVisibilityChange();
    this.themeChangeHandler = (e) => this.handleThemeChange(e);
    this.resizeHandler = () => this.handleWindowResize();
  }
  addListeners() {
    this.manageListeners(true);
  }
  removeListeners() {
    this.manageListeners(false);
  }
  manageListeners(add) {
    var _a;
    const container = this.container;
    const options2 = container.actualOptions;
    const detectType = options2.interactivity.detectsOn;
    let mouseLeaveEvent = Constants.mouseLeaveEvent;
    if (detectType === InteractivityDetect.window) {
      container.interactivity.element = window;
      mouseLeaveEvent = Constants.mouseOutEvent;
    } else if (detectType === InteractivityDetect.parent && container.canvas.element) {
      const canvasEl = container.canvas.element;
      container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
    } else {
      container.interactivity.element = container.canvas.element;
    }
    const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");
    if (mediaMatch) {
      manageListener(mediaMatch, "change", this.themeChangeHandler, add);
    }
    const interactivityEl = container.interactivity.element;
    if (!interactivityEl) {
      return;
    }
    const html = interactivityEl;
    if (options2.interactivity.events.onHover.enable || options2.interactivity.events.onClick.enable) {
      manageListener(interactivityEl, Constants.mouseMoveEvent, this.mouseMoveHandler, add);
      manageListener(interactivityEl, Constants.touchStartEvent, this.touchStartHandler, add);
      manageListener(interactivityEl, Constants.touchMoveEvent, this.touchMoveHandler, add);
      if (!options2.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndHandler, add);
      } else {
        manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndClickHandler, add);
        manageListener(interactivityEl, Constants.mouseUpEvent, this.mouseUpHandler, add);
        manageListener(interactivityEl, Constants.mouseDownEvent, this.mouseDownHandler, add);
      }
      manageListener(interactivityEl, mouseLeaveEvent, this.mouseLeaveHandler, add);
      manageListener(interactivityEl, Constants.touchCancelEvent, this.touchCancelHandler, add);
    }
    if (container.canvas.element) {
      container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
    }
    if (options2.interactivity.events.resize) {
      if (typeof ResizeObserver !== "undefined") {
        if (this.resizeObserver && !add) {
          if (container.canvas.element) {
            this.resizeObserver.unobserve(container.canvas.element);
          }
          this.resizeObserver.disconnect();
          delete this.resizeObserver;
        } else if (!this.resizeObserver && add && container.canvas.element) {
          this.resizeObserver = new ResizeObserver((entries) => {
            const entry = entries.find((e) => e.target === container.canvas.element);
            if (!entry) {
              return;
            }
            this.handleWindowResize();
          });
          this.resizeObserver.observe(container.canvas.element);
        }
      } else {
        manageListener(window, Constants.resizeEvent, this.resizeHandler, add);
      }
    }
    if (document) {
      manageListener(document, Constants.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
    }
  }
  handleWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      delete this.resizeTimeout;
    }
    this.resizeTimeout = setTimeout(() => {
      var _a;
      return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, 500);
  }
  handleVisibilityChange() {
    const container = this.container;
    const options2 = container.actualOptions;
    this.mouseTouchFinish();
    if (!options2.pauseOnBlur) {
      return;
    }
    if (document === null || document === void 0 ? void 0 : document.hidden) {
      container.pageHidden = true;
      container.pause();
    } else {
      container.pageHidden = false;
      if (container.getAnimationStatus()) {
        container.play(true);
      } else {
        container.draw(true);
      }
    }
  }
  mouseDown() {
    const interactivity2 = this.container.interactivity;
    if (interactivity2) {
      const mouse = interactivity2.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }
  mouseTouchMove(e) {
    var _a, _b, _c, _d, _e, _f, _g;
    const container = this.container;
    const options2 = container.actualOptions;
    if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === void 0) {
      return;
    }
    container.interactivity.mouse.inside = true;
    let pos;
    const canvas = container.canvas.element;
    if (e.type.startsWith("mouse")) {
      this.canPush = true;
      const mouseEvent = e;
      if (container.interactivity.element === window) {
        if (canvas) {
          const clientRect = canvas.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        }
      } else if (options2.interactivity.detectsOn === InteractivityDetect.parent) {
        const source = mouseEvent.target;
        const target = mouseEvent.currentTarget;
        const canvasEl = container.canvas.element;
        if (source && target && canvasEl) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
          };
        } else {
          pos = {
            x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
            y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY
          };
        }
      } else {
        if (mouseEvent.target === container.canvas.element) {
          pos = {
            x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
            y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
          };
        }
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e;
      const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
      const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
      pos = {
        x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
        y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0)
      };
    }
    const pxRatio = container.retina.pixelRatio;
    if (pos) {
      pos.x *= pxRatio;
      pos.y *= pxRatio;
    }
    container.interactivity.mouse.position = pos;
    container.interactivity.status = Constants.mouseMoveEvent;
  }
  mouseTouchFinish() {
    const interactivity2 = this.container.interactivity;
    if (interactivity2 === void 0) {
      return;
    }
    const mouse = interactivity2.mouse;
    delete mouse.position;
    delete mouse.clickPosition;
    delete mouse.downPosition;
    interactivity2.status = Constants.mouseLeaveEvent;
    mouse.inside = false;
    mouse.clicking = false;
  }
  mouseTouchClick(e) {
    const container = this.container;
    const options2 = container.actualOptions;
    const mouse = container.interactivity.mouse;
    mouse.inside = true;
    let handled = false;
    const mousePosition = mouse.position;
    if (mousePosition === void 0 || !options2.interactivity.events.onClick.enable) {
      return;
    }
    for (const [, plugin] of container.plugins) {
      if (plugin.clickPositionValid !== void 0) {
        handled = plugin.clickPositionValid(mousePosition);
        if (handled) {
          break;
        }
      }
    }
    if (!handled) {
      this.doMouseTouchClick(e);
    }
    mouse.clicking = false;
  }
  doMouseTouchClick(e) {
    const container = this.container;
    const options2 = container.actualOptions;
    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;
      if (mousePos) {
        container.interactivity.mouse.clickPosition = {
          x: mousePos.x,
          y: mousePos.y
        };
      } else {
        return;
      }
      container.interactivity.mouse.clickTime = new Date().getTime();
      const onClick = options2.interactivity.events.onClick;
      if (onClick.mode instanceof Array) {
        for (const mode of onClick.mode) {
          this.handleClickMode(mode);
        }
      } else {
        this.handleClickMode(onClick.mode);
      }
    }
    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }
  handleThemeChange(e) {
    const mediaEvent = e;
    const themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme;
    const theme = this.container.options.themes.find((theme2) => theme2.name === themeName);
    if (theme && theme.default.auto) {
      this.container.loadTheme(themeName);
    }
  }
  handleClickMode(mode) {
    const container = this.container;
    const options2 = container.actualOptions;
    const pushNb = options2.interactivity.modes.push.quantity;
    const removeNb = options2.interactivity.modes.remove.quantity;
    switch (mode) {
      case ClickMode.push: {
        if (pushNb > 0) {
          const pushOptions = options2.interactivity.modes.push;
          const group = itemFromArray([void 0, ...pushOptions.groups]);
          const groupOptions = group !== void 0 ? container.actualOptions.particles.groups[group] : void 0;
          container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
        }
        break;
      }
      case ClickMode.remove:
        container.particles.removeQuantity(removeNb);
        break;
      case ClickMode.bubble:
        container.bubble.clicking = true;
        break;
      case ClickMode.repulse:
        container.repulse.clicking = true;
        container.repulse.count = 0;
        for (const particle of container.repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        container.repulse.particles = [];
        container.repulse.finish = false;
        setTimeout(() => {
          if (!container.destroyed) {
            container.repulse.clicking = false;
          }
        }, options2.interactivity.modes.repulse.duration * 1e3);
        break;
      case ClickMode.attract:
        container.attract.clicking = true;
        container.attract.count = 0;
        for (const particle of container.attract.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        container.attract.particles = [];
        container.attract.finish = false;
        setTimeout(() => {
          if (!container.destroyed) {
            container.attract.clicking = false;
          }
        }, options2.interactivity.modes.attract.duration * 1e3);
        break;
      case ClickMode.pause:
        if (container.getAnimationStatus()) {
          container.pause();
        } else {
          container.play();
        }
        break;
    }
    for (const [, plugin] of container.plugins) {
      if (plugin.handleClickMode) {
        plugin.handleClickMode(mode);
      }
    }
  }
};
var plugins = [];
var interactorsInitializers = new Map();
var updatersInitializers = new Map();
var interactors = new Map();
var updaters = new Map();
var presets = new Map();
var drawers = new Map();
var pathGenerators = new Map();
var Plugins = class {
  static getPlugin(plugin) {
    return plugins.find((t) => t.id === plugin);
  }
  static addPlugin(plugin) {
    if (!Plugins.getPlugin(plugin.id)) {
      plugins.push(plugin);
    }
  }
  static getAvailablePlugins(container) {
    const res = new Map();
    for (const plugin of plugins) {
      if (!plugin.needsPlugin(container.actualOptions)) {
        continue;
      }
      res.set(plugin.id, plugin.getPlugin(container));
    }
    return res;
  }
  static loadOptions(options2, sourceOptions) {
    for (const plugin of plugins) {
      plugin.loadOptions(options2, sourceOptions);
    }
  }
  static getPreset(preset) {
    return presets.get(preset);
  }
  static addPreset(presetKey, options2, override = false) {
    if (override || !Plugins.getPreset(presetKey)) {
      presets.set(presetKey, options2);
    }
  }
  static addShapeDrawer(type, drawer) {
    if (!Plugins.getShapeDrawer(type)) {
      drawers.set(type, drawer);
    }
  }
  static getShapeDrawer(type) {
    return drawers.get(type);
  }
  static getSupportedShapes() {
    return drawers.keys();
  }
  static getPathGenerator(type) {
    return pathGenerators.get(type);
  }
  static addPathGenerator(type, pathGenerator) {
    if (!Plugins.getPathGenerator(type)) {
      pathGenerators.set(type, pathGenerator);
    }
  }
  static getInteractors(container) {
    let res = interactors.get(container);
    if (!res) {
      res = [...interactorsInitializers.values()].map((t) => t(container));
      interactors.set(container, res);
    }
    return res;
  }
  static addInteractor(name, initInteractor) {
    interactorsInitializers.set(name, initInteractor);
  }
  static getUpdaters(container) {
    let res = updaters.get(container);
    if (!res) {
      res = [...updatersInitializers.values()].map((t) => t(container));
      updaters.set(container, res);
    }
    return res;
  }
  static addParticleUpdater(name, initUpdater) {
    updatersInitializers.set(name, initUpdater);
  }
};
var Point = class {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
};
var QuadTree = class {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }
  subdivide() {
    const x = this.rectangle.position.x;
    const y = this.rectangle.position.y;
    const w = this.rectangle.size.width;
    const h = this.rectangle.size.height;
    const capacity = this.capacity;
    this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }
  insert(point) {
    var _a, _b, _c, _d, _e;
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }
  queryCircle(position, radius) {
    return this.query(new Circle(position.x, position.y, radius));
  }
  queryCircleWarp(position, radius, containerOrSize) {
    const container = containerOrSize;
    const size = containerOrSize;
    return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== void 0 ? container.canvas.size : size));
  }
  queryRectangle(position, size) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height));
  }
  query(range, found) {
    var _a, _b, _c, _d;
    const res = found !== null && found !== void 0 ? found : [];
    if (!range.intersects(this.rectangle)) {
      return [];
    } else {
      for (const p of this.points) {
        if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius()) {
          continue;
        }
        res.push(p.particle);
      }
      if (this.divided) {
        (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
        (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
        (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
        (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
      }
    }
    return res;
  }
};
var Canvas = class {
  constructor(container) {
    this.container = container;
    this.size = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }
  init() {
    this.resize();
    this.initStyle();
    this.initCover();
    this.initTrail();
    this.initBackground();
    this.paint();
  }
  loadCanvas(canvas, generatedCanvas) {
    var _a;
    if (!canvas.className) {
      canvas.className = Constants.canvasClass;
    }
    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }
    this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : this.generatedCanvas;
    this.element = canvas;
    this.originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this.context = this.element.getContext("2d");
    this.container.retina.init();
    this.initBackground();
  }
  destroy() {
    var _a;
    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }
    this.draw((ctx) => {
      clear(ctx, this.size);
    });
  }
  paint() {
    const options2 = this.container.actualOptions;
    this.draw((ctx) => {
      if (options2.backgroundMask.enable && options2.backgroundMask.cover && this.coverColor) {
        clear(ctx, this.size);
        this.paintBase(getStyleFromRgb(this.coverColor, this.coverColor.a));
      } else {
        this.paintBase();
      }
    });
  }
  clear() {
    const options2 = this.container.actualOptions;
    const trail = options2.particles.move.trail;
    if (options2.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
      this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
    } else {
      this.draw((ctx) => {
        clear(ctx, this.size);
      });
    }
  }
  windowResize() {
    if (!this.element) {
      return;
    }
    const container = this.container;
    this.resize();
    const needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    for (const [, plugin] of container.plugins) {
      if (plugin.resize !== void 0) {
        plugin.resize();
      }
    }
    if (needsRefresh) {
      container.refresh();
    }
  }
  resize() {
    if (!this.element) {
      return;
    }
    const container = this.container;
    const pxRatio = container.retina.pixelRatio;
    const size = container.canvas.size;
    const oldSize = {
      width: size.width,
      height: size.height
    };
    size.width = this.element.offsetWidth * pxRatio;
    size.height = this.element.offsetHeight * pxRatio;
    this.element.width = size.width;
    this.element.height = size.height;
    if (this.container.started) {
      this.resizeFactor = {
        width: size.width / oldSize.width,
        height: size.height / oldSize.height
      };
    }
  }
  drawConnectLine(p1, p2) {
    this.draw((ctx) => {
      var _a;
      const lineStyle = this.lineStyle(p1, p2);
      if (!lineStyle) {
        return;
      }
      const pos1 = p1.getPosition();
      const pos2 = p2.getPosition();
      drawConnectLine(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
    });
  }
  drawGrabLine(particle, lineColor, opacity, mousePos) {
    const container = this.container;
    this.draw((ctx) => {
      var _a;
      const beginPos = particle.getPosition();
      drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
    });
  }
  drawParticle(particle, delta) {
    var _a, _b, _c, _d, _e, _f;
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const pfColor = particle.getFillColor();
    const psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
    if (!pfColor && !psColor) {
      return;
    }
    let [fColor, sColor] = this.getPluginParticleColors(particle);
    const pOptions = particle.options;
    const twinkle = pOptions.twinkle.particles;
    const twinkling = twinkle.enable && Math.random() < twinkle.frequency;
    if (!fColor || !sColor) {
      const twinkleRgb = colorToHsl(twinkle.color);
      if (!fColor) {
        fColor = twinkling && twinkleRgb !== void 0 ? twinkleRgb : pfColor ? pfColor : void 0;
      }
      if (!sColor) {
        sColor = twinkling && twinkleRgb !== void 0 ? twinkleRgb : psColor ? psColor : void 0;
      }
    }
    const options2 = this.container.actualOptions;
    const zIndexOptions = particle.options.zIndex;
    const zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate;
    const radius = particle.getRadius();
    const opacity = twinkling ? twinkle.opacity : (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1;
    const strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity;
    const zOpacity = opacity * zOpacityFactor;
    const fillColorValue = fColor ? getStyleFromHsl(fColor, zOpacity) : void 0;
    if (!fillColorValue && !sColor) {
      return;
    }
    this.draw((ctx) => {
      const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate;
      const zStrokeOpacity = strokeOpacity * zOpacityFactor;
      const strokeColorValue = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : fillColorValue;
      if (radius <= 0) {
        return;
      }
      const container = this.container;
      for (const updater of container.particles.updaters) {
        if (updater.beforeDraw) {
          updater.beforeDraw(particle);
        }
      }
      drawParticle(this.container, ctx, particle, delta, fillColorValue, strokeColorValue, options2.backgroundMask.enable, options2.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow, particle.gradient);
      for (const updater of container.particles.updaters) {
        if (updater.afterDraw) {
          updater.afterDraw(particle);
        }
      }
    });
  }
  drawPlugin(plugin, delta) {
    this.draw((ctx) => {
      drawPlugin(ctx, plugin, delta);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw((ctx) => {
      drawParticlePlugin(ctx, plugin, particle, delta);
    });
  }
  initBackground() {
    const options2 = this.container.actualOptions;
    const background2 = options2.background;
    const element = this.element;
    const elementStyle = element === null || element === void 0 ? void 0 : element.style;
    if (!elementStyle) {
      return;
    }
    if (background2.color) {
      const color = colorToRgb(background2.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background2.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }
    elementStyle.backgroundImage = background2.image || "";
    elementStyle.backgroundPosition = background2.position || "";
    elementStyle.backgroundRepeat = background2.repeat || "";
    elementStyle.backgroundSize = background2.size || "";
  }
  draw(cb) {
    if (!this.context) {
      return;
    }
    return cb(this.context);
  }
  initCover() {
    const options2 = this.container.actualOptions;
    const cover = options2.backgroundMask.cover;
    const color = cover.color;
    const coverRgb = colorToRgb(color);
    if (coverRgb) {
      this.coverColor = {
        r: coverRgb.r,
        g: coverRgb.g,
        b: coverRgb.b,
        a: cover.opacity
      };
    }
  }
  initTrail() {
    const options2 = this.container.actualOptions;
    const trail = options2.particles.move.trail;
    const fillColor = colorToRgb(trail.fillColor);
    if (fillColor) {
      const trail2 = options2.particles.move.trail;
      this.trailFillColor = {
        r: fillColor.r,
        g: fillColor.g,
        b: fillColor.b,
        a: 1 / trail2.length
      };
    }
  }
  getPluginParticleColors(particle) {
    let fColor;
    let sColor;
    for (const [, plugin] of this.container.plugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = colorToHsl(plugin.particleFillColor(particle));
      }
      if (!sColor && plugin.particleStrokeColor) {
        sColor = colorToHsl(plugin.particleStrokeColor(particle));
      }
      if (fColor && sColor) {
        break;
      }
    }
    return [fColor, sColor];
  }
  initStyle() {
    const element = this.element, options2 = this.container.actualOptions;
    if (!element) {
      return;
    }
    const originalStyle = this.originalStyle;
    if (options2.fullScreen.enable) {
      this.originalStyle = deepExtend({}, element.style);
      element.style.position = "fixed";
      element.style.zIndex = options2.fullScreen.zIndex.toString(10);
      element.style.top = "0";
      element.style.left = "0";
      element.style.width = "100%";
      element.style.height = "100%";
    } else if (originalStyle) {
      element.style.position = originalStyle.position;
      element.style.zIndex = originalStyle.zIndex;
      element.style.top = originalStyle.top;
      element.style.left = originalStyle.left;
      element.style.width = originalStyle.width;
      element.style.height = originalStyle.height;
    }
  }
  paintBase(baseColor) {
    this.draw((ctx) => {
      paintBase(ctx, this.size, baseColor);
    });
  }
  lineStyle(p1, p2) {
    return this.draw((ctx) => {
      const options2 = this.container.actualOptions;
      const connectOptions = options2.interactivity.modes.connect;
      return gradient(ctx, p1, p2, connectOptions.links.opacity);
    });
  }
};
var OptionsColor = class {
  constructor() {
    this.value = "#fff";
  }
  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);
    if (data !== void 0) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    if ((data === null || data === void 0 ? void 0 : data.value) === void 0) {
      return;
    }
    this.value = data.value;
  }
};
var LinksShadow = class {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.enable = false;
    this.color.value = "#00ff00";
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};
var LinksTriangle = class {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var Links = class {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.id !== void 0) {
      this.id = data.id;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
};
var Attract$1 = class {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3e3,
      y: 3e3
    };
  }
  get rotateX() {
    return this.rotate.x;
  }
  set rotateX(value) {
    this.rotate.x = value;
  }
  get rotateY() {
    return this.rotate.y;
  }
  set rotateY(value) {
    this.rotate.y = value;
  }
  load(data) {
    var _a, _b, _c, _d;
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
    if (rotateX !== void 0) {
      this.rotate.x = rotateX;
    }
    const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
    if (rotateY !== void 0) {
      this.rotate.y = rotateY;
    }
  }
};
var Trail$1 = class {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fillColor = new OptionsColor();
    this.fillColor.value = "#000000";
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
    if (data.length !== void 0) {
      this.length = data.length;
    }
  }
};
var Random = class {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.minimumValue !== void 0) {
      this.minimumValue = data.minimumValue;
    }
  }
};
var ValueWithRandom = class {
  constructor() {
    this.random = new Random();
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (typeof data.random === "boolean") {
      this.random.enable = data.random;
    } else {
      this.random.load(data.random);
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : void 0);
    }
  }
};
var PathDelay = class extends ValueWithRandom {
  constructor() {
    super();
  }
};
var Path = class {
  constructor() {
    this.clamp = true;
    this.delay = new PathDelay();
    this.enable = false;
    this.options = {};
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.clamp !== void 0) {
      this.clamp = data.clamp;
    }
    this.delay.load(data.delay);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.generator = data.generator;
    if (data.options) {
      this.options = deepExtend(this.options, data.options);
    }
  }
};
var MoveAngle = class {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = data.offset;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};
var MoveGravity = class {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = data.acceleration;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.inverse !== void 0) {
      this.inverse = data.inverse;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
  }
};
var OutModes = class {
  constructor() {
    this.default = OutMode.out;
  }
  load(data) {
    var _a, _b, _c, _d;
    if (!data) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
    this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
    this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
    this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
  }
};
var Spin = class {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.position = data.position ? deepExtend({}, data.position) : void 0;
  }
};
var Move$1 = class {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new Attract$1();
    this.decay = 0;
    this.distance = {};
    this.direction = MoveDirection.none;
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity();
    this.path = new Path();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new Trail$1();
    this.vibrate = false;
    this.warp = false;
  }
  get collisions() {
    return false;
  }
  set collisions(value) {
  }
  get bounce() {
    return this.collisions;
  }
  set bounce(value) {
    this.collisions = value;
  }
  get out_mode() {
    return this.outMode;
  }
  set out_mode(value) {
    this.outMode = value;
  }
  get outMode() {
    return this.outModes.default;
  }
  set outMode(value) {
    this.outModes.default = value;
  }
  get noise() {
    return this.path;
  }
  set noise(value) {
    this.path = value;
  }
  load(data) {
    var _a, _b, _c;
    if (data === void 0) {
      return;
    }
    if (data.angle !== void 0) {
      if (typeof data.angle === "number") {
        this.angle.value = data.angle;
      } else {
        this.angle.load(data.angle);
      }
    }
    this.attract.load(data.attract);
    if (data.decay !== void 0) {
      this.decay = data.decay;
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.distance !== void 0) {
      this.distance = typeof data.distance === "number" ? {
        horizontal: data.distance,
        vertical: data.distance
      } : deepExtend({}, data.distance);
    }
    if (data.drift !== void 0) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
    if (data.outModes !== void 0 || outMode !== void 0) {
      if (typeof data.outModes === "string" || data.outModes === void 0 && outMode !== void 0) {
        this.outModes.load({
          default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode
        });
      } else {
        this.outModes.load(data.outModes);
      }
    }
    this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
    if (data.random !== void 0) {
      this.random = data.random;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    this.spin.load(data.spin);
    if (data.straight !== void 0) {
      this.straight = data.straight;
    }
    this.trail.load(data.trail);
    if (data.vibrate !== void 0) {
      this.vibrate = data.vibrate;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
};
var Density = class {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1e3;
  }
  get value_area() {
    return this.area;
  }
  set value_area(value) {
    this.area = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
    if (area !== void 0) {
      this.area = area;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
  }
};
var ParticlesNumber = class {
  constructor() {
    this.density = new Density();
    this.limit = 0;
    this.value = 100;
  }
  get max() {
    return this.limit;
  }
  set max(value) {
    this.limit = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    this.density.load(data.density);
    const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
    if (limit !== void 0) {
      this.limit = limit;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};
var AnimationOptions = class {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var OpacityAnimation = class extends AnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.enable = false;
    this.speed = 2;
    this.startValue = StartValueType.random;
    this.sync = false;
  }
  get opacity_min() {
    return this.minimumValue;
  }
  set opacity_min(value) {
    this.minimumValue = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    super.load(data);
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var Opacity = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }
  get anim() {
    return this.animation;
  }
  set anim(value) {
    this.animation = value;
  }
  load(data) {
    var _a;
    if (!data) {
      return;
    }
    super.load(data);
    const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
    if (animation !== void 0) {
      this.animation.load(animation);
      this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : void 0);
    }
  }
};
var Shape = class {
  constructor() {
    this.options = {};
    this.type = ShapeType.circle;
  }
  get image() {
    var _a;
    return (_a = this.options[ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[ShapeType.images];
  }
  set image(value) {
    this.options[ShapeType.image] = value;
    this.options[ShapeType.images] = value;
  }
  get custom() {
    return this.options;
  }
  set custom(value) {
    this.options = value;
  }
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
  get stroke() {
    return [];
  }
  set stroke(_value) {
  }
  get character() {
    var _a;
    return (_a = this.options[ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[ShapeType.char];
  }
  set character(value) {
    this.options[ShapeType.character] = value;
    this.options[ShapeType.char] = value;
  }
  get polygon() {
    var _a;
    return (_a = this.options[ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[ShapeType.star];
  }
  set polygon(value) {
    this.options[ShapeType.polygon] = value;
    this.options[ShapeType.star] = value;
  }
  load(data) {
    var _a, _b, _c;
    if (data === void 0) {
      return;
    }
    const options2 = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
    if (options2 !== void 0) {
      for (const shape in options2) {
        const item = options2[shape];
        if (item !== void 0) {
          this.options[shape] = deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
        }
      }
    }
    this.loadShape(data.character, ShapeType.character, ShapeType.char, true);
    this.loadShape(data.polygon, ShapeType.polygon, ShapeType.star, false);
    this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, ShapeType.image, ShapeType.images, true);
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
  loadShape(item, mainKey, altKey, altOverride) {
    var _a, _b, _c, _d;
    if (item === void 0) {
      return;
    }
    if (item instanceof Array) {
      if (!(this.options[mainKey] instanceof Array)) {
        this.options[mainKey] = [];
        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = [];
        }
      }
      this.options[mainKey] = deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);
      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
      }
    } else {
      if (this.options[mainKey] instanceof Array) {
        this.options[mainKey] = {};
        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = {};
        }
      }
      this.options[mainKey] = deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);
      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
      }
    }
  }
};
var SizeAnimation = class extends AnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.enable = false;
    this.speed = 5;
    this.startValue = StartValueType.random;
    this.sync = false;
  }
  get size_min() {
    return this.minimumValue;
  }
  set size_min(value) {
    this.minimumValue = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    super.load(data);
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var Size = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.random.minimumValue = 1;
    this.value = 3;
  }
  get anim() {
    return this.animation;
  }
  set anim(value) {
    this.animation = value;
  }
  load(data) {
    var _a;
    if (!data) {
      return;
    }
    super.load(data);
    const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
    if (animation !== void 0) {
      this.animation.load(animation);
      this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : void 0);
    }
  }
};
var RotateAnimation = class {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var Rotate = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = RotateDirection.clockwise;
    this.path = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    this.animation.load(data.animation);
    if (data.path !== void 0) {
      this.path = data.path;
    }
  }
};
var Shadow = class {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000000";
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.offset === void 0) {
      return;
    }
    if (data.offset.x !== void 0) {
      this.offset.x = data.offset.x;
    }
    if (data.offset.y !== void 0) {
      this.offset.y = data.offset.y;
    }
  }
};
var ColorAnimation = class {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
    this.sync = true;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var HslAnimation = class {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
};
var AnimatableColor = class extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);
    if (data !== void 0) {
      if (typeof data === "string" || data instanceof Array) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const colorAnimation = data.animation;
    if (colorAnimation !== void 0) {
      if (colorAnimation.enable !== void 0) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }
};
var Stroke = class {
  constructor() {
    this.width = 0;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = AnimatableColor.create(this.color, data.color);
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var BounceFactor = class extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }
};
var Bounce$1 = class {
  constructor() {
    this.horizontal = new BounceFactor();
    this.vertical = new BounceFactor();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
};
var CollisionsOverlap = class {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.retries !== void 0) {
      this.retries = data.retries;
    }
  }
};
var Collisions = class {
  constructor() {
    this.bounce = new Bounce$1();
    this.enable = false;
    this.mode = CollisionMode.bounce;
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.bounce.load(data.bounce);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
};
var TwinkleValues = class {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var Twinkle = class {
  constructor() {
    this.lines = new TwinkleValues();
    this.particles = new TwinkleValues();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }
};
var LifeDelay = class extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var LifeDuration = class extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 1e-4;
    this.sync = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var Life = class {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
};
var SplitFactor = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }
};
var SplitRate = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = { min: 4, max: 9 };
  }
};
var Split = class {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
    this.sizeOffset = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.factor.load(data.factor);
    this.rate.load(data.rate);
    if (data.particles !== void 0) {
      this.particles = deepExtend({}, data.particles);
    }
    if (data.sizeOffset !== void 0) {
      this.sizeOffset = data.sizeOffset;
    }
  }
};
var Destroy = class {
  constructor() {
    this.mode = DestroyMode.none;
    this.split = new Split();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.split.load(data.split);
  }
};
var Wobble = class {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = 50;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
  }
};
var TiltAnimation = class {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var Tilt = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = TiltDirection.clockwise;
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    this.animation.load(data.animation);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};
var RollLight = class {
  constructor() {
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};
var Roll = class {
  constructor() {
    this.darken = new RollLight();
    this.enable = false;
    this.enlighten = new RollLight();
    this.mode = RollMode.vertical;
    this.speed = 25;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.backColor !== void 0) {
      this.backColor = OptionsColor.create(this.backColor, data.backColor);
    }
    this.darken.load(data.darken);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.enlighten.load(data.enlighten);
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
  }
};
var ZIndex = class extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.opacityRate !== void 0) {
      this.opacityRate = data.opacityRate;
    }
    if (data.sizeRate !== void 0) {
      this.sizeRate = data.sizeRate;
    }
    if (data.velocityRate !== void 0) {
      this.velocityRate = data.velocityRate;
    }
  }
};
var OrbitRotation = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    super.load(data);
  }
};
var Orbit = class {
  constructor() {
    this.animation = new AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.animation.load(data.animation);
    this.rotation.load(data.rotation);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }
};
var Repulse$1 = class extends ValueWithRandom {
  constructor() {
    super();
    this.enabled = false;
    this.distance = 1;
    this.duration = 1;
    this.factor = 1;
    this.speed = 1;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.enabled !== void 0) {
      this.enabled = data.enabled;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
};
var AnimatableGradient = class {
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = GradientType.random;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(data.angle);
    if (data.colors !== void 0) {
      this.colors = data.colors.map((s2) => {
        const tmp = new AnimatableGradientColor();
        tmp.load(s2);
        return tmp;
      });
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};
var GradientAngle = class {
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
    this.direction = RotateDirection.clockwise;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== void 0) {
      this.value = data.value;
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
  }
};
var GradientColorOpacity = class {
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
};
var AnimatableGradientColor = class {
  constructor() {
    this.stop = 0;
    this.value = new AnimatableColor();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.stop !== void 0) {
      this.stop = data.stop;
    }
    this.value = AnimatableColor.create(this.value, data.value);
    if (data.opacity !== void 0) {
      this.opacity = new GradientColorOpacity();
      if (typeof data.opacity === "number") {
        this.opacity.value = data.opacity;
      } else {
        this.opacity.load(data.opacity);
      }
    }
  }
};
var GradientAngleAnimation = class {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var GradientColorOpacityAnimation = class {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.sync = false;
    this.startValue = StartValueType.random;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
  }
};
var ParticlesOptions = class {
  constructor() {
    this.bounce = new Bounce$1();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.destroy = new Destroy();
    this.gradient = [];
    this.groups = {};
    this.life = new Life();
    this.links = new Links();
    this.move = new Move$1();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.orbit = new Orbit();
    this.reduceDuplicates = false;
    this.repulse = new Repulse$1();
    this.roll = new Roll();
    this.rotate = new Rotate();
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.tilt = new Tilt();
    this.twinkle = new Twinkle();
    this.wobble = new Wobble();
    this.zIndex = new ZIndex();
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  load(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (data === void 0) {
      return;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.destroy.load(data.destroy);
    this.life.load(data.life);
    const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;
    if (links !== void 0) {
      this.links.load(links);
    }
    if (data.groups !== void 0) {
      for (const group in data.groups) {
        const item = data.groups[group];
        if (item !== void 0) {
          this.groups[group] = deepExtend((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
        }
      }
    }
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.orbit.load(data.orbit);
    if (data.reduceDuplicates !== void 0) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.repulse.load(data.repulse);
    this.roll.load(data.roll);
    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.tilt.load(data.tilt);
    this.twinkle.load(data.twinkle);
    this.wobble.load(data.wobble);
    this.zIndex.load(data.zIndex);
    const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;
    if (collisions !== void 0) {
      this.collisions.enable = collisions;
    }
    this.collisions.load(data.collisions);
    const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;
    if (strokeToLoad) {
      if (strokeToLoad instanceof Array) {
        this.stroke = strokeToLoad.map((s2) => {
          const tmp = new Stroke();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.stroke instanceof Array) {
          this.stroke = new Stroke();
        }
        this.stroke.load(strokeToLoad);
      }
    }
    const gradientToLoad = data.gradient;
    if (gradientToLoad) {
      if (gradientToLoad instanceof Array) {
        this.gradient = gradientToLoad.map((s2) => {
          const tmp = new AnimatableGradient();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.gradient instanceof Array) {
          this.gradient = new AnimatableGradient();
        }
        this.gradient.load(gradientToLoad);
      }
    }
  }
};
var Vector3d = class extends Vector {
  constructor(x, y, z) {
    super(x, y);
    this.z = z === void 0 ? x.z : z;
  }
  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  add(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
  }
  addTo(v) {
    super.addTo(v);
    if (v instanceof Vector3d) {
      this.z += v.z;
    }
  }
  sub(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
  }
  subFrom(v) {
    super.subFrom(v);
    if (v instanceof Vector3d) {
      this.z -= v.z;
    }
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    super.multTo(n);
    this.z *= n;
  }
  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    super.divTo(n);
    this.z /= n;
  }
  copy() {
    return Vector3d.clone(this);
  }
  setTo(v) {
    super.setTo(v);
    if (v instanceof Vector3d) {
      this.z = v.z;
    }
  }
};
var fixOutMode = (data) => {
  if (isInArray(data.outMode, data.checkModes) || isInArray(data.outMode, data.checkModes)) {
    if (data.coord > data.maxCoord - data.radius * 2) {
      data.setCb(-data.radius);
    } else if (data.coord < data.radius * 2) {
      data.setCb(data.radius);
    }
  }
};
var Particle = class {
  constructor(id, container, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    this.id = id;
    this.container = container;
    this.group = group;
    this.fill = true;
    this.close = true;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.splitCount = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    const pxRatio = container.retina.pixelRatio;
    const mainOptions = container.actualOptions;
    const particlesOptions = new ParticlesOptions();
    particlesOptions.load(mainOptions.particles);
    const shapeType = particlesOptions.shape.type;
    const reduceDuplicates = particlesOptions.reduceDuplicates;
    this.shape = shapeType instanceof Array ? itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;
    if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
      if (overrideOptions.shape.type) {
        const overrideShapeType = overrideOptions.shape.type;
        this.shape = overrideShapeType instanceof Array ? itemFromArray(overrideShapeType, this.id, reduceDuplicates) : overrideShapeType;
      }
      const shapeOptions = new Shape();
      shapeOptions.load(overrideOptions.shape);
      if (this.shape) {
        this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
      }
    } else {
      this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
    }
    if (overrideOptions !== void 0) {
      particlesOptions.load(overrideOptions);
    }
    if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== void 0) {
      particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
    }
    this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
    this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
    this.options = particlesOptions;
    this.pathDelay = getValue(this.options.move.path.delay) * 1e3;
    const zIndexValue = getRangeValue(this.options.zIndex.value);
    container.retina.initParticle(this);
    const sizeOptions = this.options.size, sizeRange = sizeOptions.value;
    this.size = {
      enable: sizeOptions.animation.enable,
      value: getValue(sizeOptions) * container.retina.pixelRatio,
      max: getRangeMax(sizeRange) * pxRatio,
      min: getRangeMin(sizeRange) * pxRatio,
      loops: 0,
      maxLoops: sizeOptions.animation.count
    };
    const sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      this.size.status = AnimationStatus.increasing;
      switch (sizeAnimation.startValue) {
        case StartValueType.min:
          this.size.value = this.size.min;
          this.size.status = AnimationStatus.increasing;
          break;
        case StartValueType.random:
          this.size.value = randomInRange(this.size) * pxRatio;
          this.size.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;
          break;
        case StartValueType.max:
        default:
          this.size.value = this.size.max;
          this.size.status = AnimationStatus.decreasing;
          break;
      }
      this.size.velocity = ((_g = this.retina.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        this.size.velocity *= Math.random();
      }
    }
    this.direction = getParticleDirectionAngle(this.options.move.direction);
    this.bubble = {
      inRange: false
    };
    this.initialVelocity = this.calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = 1 - getRangeValue(this.options.move.decay);
    this.position = this.calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
    this.initialPosition = this.position.copy();
    this.offset = Vector.origin;
    const particles2 = container.particles;
    particles2.needsSort = particles2.needsSort || particles2.lastZIndex < this.position.z;
    particles2.lastZIndex = this.position.z;
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let drawer = container.drawers.get(this.shape);
    if (!drawer) {
      drawer = Plugins.getShapeDrawer(this.shape);
      if (drawer) {
        container.drawers.set(this.shape, drawer);
      }
    }
    if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
      drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
    }
    const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.life = this.loadLife();
    this.spawning = this.life.delay > 0;
    if (this.options.move.spin.enable) {
      const spinPos = (_h = this.options.move.spin.position) !== null && _h !== void 0 ? _h : { x: 50, y: 50 };
      const spinCenter = {
        x: spinPos.x / 100 * container.canvas.size.width,
        y: spinPos.y / 100 * container.canvas.size.height
      };
      const pos = this.getPosition();
      const distance = getDistance(pos, spinCenter);
      this.spin = {
        center: spinCenter,
        direction: this.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise,
        angle: this.velocity.angle,
        radius: distance,
        acceleration: (_j = this.retina.spinAcceleration) !== null && _j !== void 0 ? _j : getRangeValue(this.options.move.spin.acceleration)
      };
    }
    this.shadowColor = colorToRgb(this.options.shadow.color);
    for (const updater of container.particles.updaters) {
      if (updater.init) {
        updater.init(this);
      }
    }
    if (drawer && drawer.particleInit) {
      drawer.particleInit(container, this);
    }
    for (const [, plugin] of container.plugins) {
      if (plugin.particleCreated) {
        plugin.particleCreated(this);
      }
    }
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  isInsideCanvas() {
    const radius = this.getRadius();
    const canvasSize = this.container.canvas.size;
    return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
  }
  draw(delta) {
    const container = this.container;
    for (const [, plugin] of container.plugins) {
      container.canvas.drawParticlePlugin(plugin, this, delta);
    }
    container.canvas.drawParticle(this, delta);
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    var _a;
    return (_a = this.bubble.radius) !== null && _a !== void 0 ? _a : this.size.value;
  }
  getMass() {
    return this.getRadius() ** 2 * Math.PI / 2;
  }
  getFillColor() {
    var _a, _b, _c;
    const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.color);
    if (color && this.roll && (this.backColor || this.roll.alter)) {
      const rolled = Math.floor(((_c = (_b = this.roll) === null || _b === void 0 ? void 0 : _b.angle) !== null && _c !== void 0 ? _c : 0) / (Math.PI / 2)) % 2;
      if (rolled) {
        if (this.backColor) {
          return this.backColor;
        }
        if (this.roll.alter) {
          return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
        }
      }
    }
    return color;
  }
  getStrokeColor() {
    var _a, _b;
    return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
  }
  destroy(override) {
    this.destroyed = true;
    this.bubble.inRange = false;
    if (this.unbreakable) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    for (const [, plugin] of this.container.plugins) {
      if (plugin.particleDestroyed) {
        plugin.particleDestroyed(this, override);
      }
    }
    if (override) {
      return;
    }
    const destroyOptions = this.options.destroy;
    if (destroyOptions.mode === DestroyMode.split) {
      this.split();
    }
  }
  reset() {
    if (this.opacity) {
      this.opacity.loops = 0;
    }
    this.size.loops = 0;
  }
  split() {
    const splitOptions = this.options.destroy.split;
    if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
      return;
    }
    const rate = getRangeValue(splitOptions.rate.value);
    for (let i = 0; i < rate; i++) {
      this.container.particles.addSplitParticle(this);
    }
  }
  calcPosition(container, position, zIndex, tryCount = 0) {
    var _a, _b, _c, _d, _e, _f;
    for (const [, plugin] of container.plugins) {
      const pluginPos = plugin.particlePosition !== void 0 ? plugin.particlePosition(position, this) : void 0;
      if (pluginPos !== void 0) {
        return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
      }
    }
    const canvasSize = container.canvas.size;
    const pos = Vector3d.create((_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width, (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height, zIndex);
    const radius = this.getRadius();
    const outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
      fixOutMode({
        outMode,
        checkModes: [OutMode.bounce, OutMode.bounceHorizontal],
        coord: pos.x,
        maxCoord: container.canvas.size.width,
        setCb: (value) => pos.x += value,
        radius
      });
    }, fixVertical = (outMode) => {
      fixOutMode({
        outMode,
        checkModes: [OutMode.bounce, OutMode.bounceVertical],
        coord: pos.y,
        maxCoord: container.canvas.size.height,
        setCb: (value) => pos.y += value,
        radius
      });
    };
    fixHorizontal((_c = outModes.left) !== null && _c !== void 0 ? _c : outModes.default);
    fixHorizontal((_d = outModes.right) !== null && _d !== void 0 ? _d : outModes.default);
    fixVertical((_e = outModes.top) !== null && _e !== void 0 ? _e : outModes.default);
    fixVertical((_f = outModes.bottom) !== null && _f !== void 0 ? _f : outModes.default);
    if (this.checkOverlap(pos, tryCount)) {
      return this.calcPosition(container, void 0, zIndex, tryCount + 1);
    }
    return pos;
  }
  checkOverlap(pos, tryCount = 0) {
    const collisionsOptions = this.options.collisions;
    const radius = this.getRadius();
    if (!collisionsOptions.enable) {
      return false;
    }
    const overlapOptions = collisionsOptions.overlap;
    if (overlapOptions.enable) {
      return false;
    }
    const retries = overlapOptions.retries;
    if (retries >= 0 && tryCount > retries) {
      throw new Error("Particle is overlapping and can't be placed");
    }
    let overlaps = false;
    for (const particle of this.container.particles.array) {
      if (getDistance(pos, particle.position) < radius + particle.getRadius()) {
        overlaps = true;
        break;
      }
    }
    return overlaps;
  }
  calculateVelocity() {
    const baseVelocity = getParticleBaseVelocity(this.direction);
    const res = baseVelocity.copy();
    const moveOptions = this.options.move;
    const rad = Math.PI / 180 * moveOptions.angle.value;
    const radOffset = Math.PI / 180 * moveOptions.angle.offset;
    const range = {
      left: radOffset - rad / 2,
      right: radOffset + rad / 2
    };
    if (!moveOptions.straight) {
      res.angle += randomInRange(setRangeValue(range.left, range.right));
    }
    if (moveOptions.random && typeof moveOptions.speed === "number") {
      res.length *= Math.random();
    }
    return res;
  }
  loadShapeData(shapeOptions, reduceDuplicates) {
    const shapeData = shapeOptions.options[this.shape];
    if (shapeData) {
      return deepExtend({}, shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
    }
  }
  loadLife() {
    const container = this.container;
    const particlesOptions = this.options;
    const lifeOptions = particlesOptions.life;
    const life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1e3 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1e3 : 0,
      time: 0,
      count: particlesOptions.life.count
    };
    if (life.duration <= 0) {
      life.duration = -1;
    }
    if (life.count <= 0) {
      life.count = -1;
    }
    return life;
  }
};
var InteractionManager = class {
  constructor(container) {
    this.container = container;
    const interactors2 = Plugins.getInteractors(container);
    this.externalInteractors = [];
    this.particleInteractors = [];
    for (const interactor of interactors2) {
      switch (interactor.type) {
        case InteractorType.External:
          this.externalInteractors.push(interactor);
          break;
        case InteractorType.Particles:
          this.particleInteractors.push(interactor);
          break;
      }
    }
  }
  externalInteract(delta) {
    for (const interactor of this.externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }
  particlesInteract(particle, delta) {
    for (const interactor of this.externalInteractors) {
      interactor.reset(particle);
    }
    for (const interactor of this.particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.interact(particle, delta);
      }
    }
  }
};
function applyDistance(particle) {
  const initialPosition = particle.initialPosition;
  const { dx, dy } = getDistances(initialPosition, particle.position);
  const dxFixed = Math.abs(dx), dyFixed = Math.abs(dy);
  const hDistance = particle.retina.maxDistance.horizontal;
  const vDistance = particle.retina.maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position, vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -Math.random();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -Math.random();
    }
  }
}
var Mover = class {
  constructor(container) {
    this.container = container;
  }
  move(particle, delta) {
    if (particle.destroyed) {
      return;
    }
    this.moveParticle(particle, delta);
    this.moveParallax(particle);
  }
  moveParticle(particle, delta) {
    var _a, _b, _c;
    var _d, _e;
    const particleOptions = particle.options;
    const moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = this.container, slowFactor = this.getProximitySpeedFactor(particle), baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : _d.moveSpeed = getRangeValue(moveOptions.speed) * container.retina.pixelRatio) * container.retina.reduceFactor, moveDrift = (_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : _e.moveDrift = getRangeValue(particle.options.move.drift) * container.retina.pixelRatio, maxSize = getRangeMax(particleOptions.size.value) * container.retina.pixelRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1, diffFactor = 2, speedFactor = sizeFactor * slowFactor * (delta.factor || 1) / diffFactor, moveSpeed = baseSpeed * speedFactor;
    this.applyPath(particle, delta);
    const gravityOptions = moveOptions.gravity;
    const gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;
    if (gravityOptions.enable && moveSpeed) {
      particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
    }
    if (moveDrift && moveSpeed) {
      particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
    }
    const decay = particle.moveDecay;
    if (decay != 1) {
      particle.velocity.multTo(decay);
    }
    const velocity = particle.velocity.mult(moveSpeed);
    const maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;
    if (gravityOptions.enable && gravityOptions.maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
      velocity.y = gravityFactor * maxSpeed;
      if (moveSpeed) {
        particle.velocity.y = velocity.y / moveSpeed;
      }
    }
    const zIndexOptions = particle.options.zIndex, zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
    if (moveOptions.spin.enable) {
      this.spin(particle, moveSpeed);
    } else {
      if (zVelocityFactor != 1) {
        velocity.multTo(zVelocityFactor);
      }
      particle.position.addTo(velocity);
      if (moveOptions.vibrate) {
        particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
        particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
      }
    }
    applyDistance(particle);
  }
  spin(particle, moveSpeed) {
    const container = this.container;
    if (!particle.spin) {
      return;
    }
    const updateFunc = {
      x: particle.spin.direction === RotateDirection.clockwise ? Math.cos : Math.sin,
      y: particle.spin.direction === RotateDirection.clockwise ? Math.sin : Math.cos
    };
    particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
    particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
    particle.spin.radius += particle.spin.acceleration;
    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);
    if (particle.spin.radius > maxCanvasSize / 2) {
      particle.spin.radius = maxCanvasSize / 2;
      particle.spin.acceleration *= -1;
    } else if (particle.spin.radius < 0) {
      particle.spin.radius = 0;
      particle.spin.acceleration *= -1;
    }
    particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
  }
  applyPath(particle, delta) {
    const particlesOptions = particle.options;
    const pathOptions = particlesOptions.move.path;
    const pathEnabled = pathOptions.enable;
    if (!pathEnabled) {
      return;
    }
    const container = this.container;
    if (particle.lastPathTime <= particle.pathDelay) {
      particle.lastPathTime += delta.value;
      return;
    }
    const path = container.pathGenerator.generate(particle);
    particle.velocity.addTo(path);
    if (pathOptions.clamp) {
      particle.velocity.x = clamp(particle.velocity.x, -1, 1);
      particle.velocity.y = clamp(particle.velocity.y, -1, 1);
    }
    particle.lastPathTime -= particle.pathDelay;
  }
  moveParallax(particle) {
    const container = this.container;
    const options2 = container.actualOptions;
    if (isSsr() || !options2.interactivity.events.onHover.parallax.enable) {
      return;
    }
    const parallaxForce = options2.interactivity.events.onHover.parallax.force;
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasCenter = {
      x: container.canvas.size.width / 2,
      y: container.canvas.size.height / 2
    };
    const parallaxSmooth = options2.interactivity.events.onHover.parallax.smooth;
    const factor = particle.getRadius() / parallaxForce;
    const tmp = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    };
    particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
    particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
  }
  getProximitySpeedFactor(particle) {
    const container = this.container;
    const options2 = container.actualOptions;
    const active = isInArray(HoverMode.slow, options2.interactivity.events.onHover.mode);
    if (!active) {
      return 1;
    }
    const mousePos = this.container.interactivity.mouse.position;
    if (!mousePos) {
      return 1;
    }
    const particlePos = particle.getPosition();
    const dist = getDistance(mousePos, particlePos);
    const radius = container.retina.slowModeRadius;
    if (dist > radius) {
      return 1;
    }
    const proximityFactor = dist / radius || 0;
    const slowFactor = options2.interactivity.modes.slow.factor;
    return proximityFactor / slowFactor;
  }
};
var Particles$1 = class {
  constructor(container) {
    this.container = container;
    this.nextId = 0;
    this.array = [];
    this.zArray = [];
    this.mover = new Mover(container);
    this.limit = 0;
    this.needsSort = false;
    this.lastZIndex = 0;
    this.freqs = {
      links: new Map(),
      triangles: new Map()
    };
    this.interactionManager = new InteractionManager(container);
    const canvasSize = this.container.canvas.size;
    this.linksColors = new Map();
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.updaters = Plugins.getUpdaters(container);
  }
  get count() {
    return this.array.length;
  }
  init() {
    var _a;
    const container = this.container;
    const options2 = container.actualOptions;
    this.lastZIndex = 0;
    this.needsSort = false;
    this.freqs.links = new Map();
    this.freqs.triangles = new Map();
    let handled = false;
    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== void 0) {
        handled = plugin.particlesInitialization();
      }
      if (handled) {
        break;
      }
    }
    this.addManualParticles();
    if (!handled) {
      for (const group in options2.particles.groups) {
        const groupOptions = options2.particles.groups[group];
        for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options2.particles.number.value; i++, j++) {
          this.addParticle(void 0, groupOptions, group);
        }
      }
      for (let i = this.count; i < options2.particles.number.value; i++) {
        this.addParticle();
      }
    }
    container.pathGenerator.init(container);
  }
  redraw() {
    this.clear();
    this.init();
    this.draw({ value: 0, factor: 0 });
  }
  removeAt(index2, quantity = 1, group, override) {
    if (!(index2 >= 0 && index2 <= this.count)) {
      return;
    }
    let deleted = 0;
    for (let i = index2; deleted < quantity && i < this.count; i++) {
      const particle = this.array[i];
      if (!particle || particle.group !== group) {
        continue;
      }
      particle.destroy(override);
      this.array.splice(i--, 1);
      const zIdx = this.zArray.indexOf(particle);
      this.zArray.splice(zIdx, 1);
      deleted++;
    }
  }
  remove(particle, group, override) {
    this.removeAt(this.array.indexOf(particle), void 0, group, override);
  }
  update(delta) {
    const container = this.container;
    const particlesToDelete = [];
    container.pathGenerator.update();
    for (const [, plugin] of container.plugins) {
      if (plugin.update !== void 0) {
        plugin.update(delta);
      }
    }
    for (const particle of this.array) {
      const resizeFactor = container.canvas.resizeFactor;
      if (resizeFactor) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
      }
      particle.bubble.inRange = false;
      for (const [, plugin] of this.container.plugins) {
        if (particle.destroyed) {
          break;
        }
        if (plugin.particleUpdate) {
          plugin.particleUpdate(particle, delta);
        }
      }
      this.mover.move(particle, delta);
      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    for (const particle of particlesToDelete) {
      this.remove(particle);
    }
    this.interactionManager.externalInteract(delta);
    for (const particle of container.particles.array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        this.interactionManager.particlesInteract(particle, delta);
      }
    }
    delete container.canvas.resizeFactor;
  }
  draw(delta) {
    const container = this.container;
    container.canvas.clear();
    const canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.update(delta);
    if (this.needsSort) {
      this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
      this.needsSort = false;
    }
    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }
    for (const p of this.zArray) {
      p.draw(delta);
    }
  }
  clear() {
    this.array = [];
    this.zArray = [];
  }
  push(nb, mouse, overrideOptions, group) {
    this.pushing = true;
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
    }
    this.pushing = false;
  }
  addParticle(position, overrideOptions, group) {
    const container = this.container;
    const options2 = container.actualOptions;
    const limit = options2.particles.number.limit * container.density;
    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;
      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }
    return this.pushParticle(position, overrideOptions, group);
  }
  addSplitParticle(parent) {
    const splitOptions = parent.options.destroy.split;
    const options2 = new ParticlesOptions();
    options2.load(parent.options);
    const factor = getRangeValue(splitOptions.factor.value);
    options2.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });
    if (typeof options2.size.value === "number") {
      options2.size.value /= factor;
    } else {
      options2.size.value.min /= factor;
      options2.size.value.max /= factor;
    }
    options2.load(splitOptions.particles);
    const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0;
    const position = {
      x: parent.position.x + randomInRange(offset),
      y: parent.position.y + randomInRange(offset)
    };
    return this.pushParticle(position, options2, parent.group, (particle) => {
      if (particle.size.value < 0.5) {
        return false;
      }
      particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
      particle.splitCount = parent.splitCount + 1;
      particle.unbreakable = true;
      setTimeout(() => {
        particle.unbreakable = false;
      }, 500);
      return true;
    });
  }
  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }
  getLinkFrequency(p1, p2) {
    const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;
    let res = this.freqs.links.get(key);
    if (res === void 0) {
      res = Math.random();
      this.freqs.links.set(key, res);
    }
    return res;
  }
  getTriangleFrequency(p1, p2, p3) {
    let [id1, id2, id3] = [p1.id, p2.id, p3.id];
    if (id1 > id2) {
      [id2, id1] = [id1, id2];
    }
    if (id2 > id3) {
      [id3, id2] = [id2, id3];
    }
    if (id1 > id3) {
      [id3, id1] = [id1, id3];
    }
    const key = `${id1}_${id2}_${id3}`;
    let res = this.freqs.triangles.get(key);
    if (res === void 0) {
      res = Math.random();
      this.freqs.triangles.set(key, res);
    }
    return res;
  }
  addManualParticles() {
    const container = this.container;
    const options2 = container.actualOptions;
    for (const particle of options2.manualParticles) {
      const pos = particle.position ? {
        x: particle.position.x * container.canvas.size.width / 100,
        y: particle.position.y * container.canvas.size.height / 100
      } : void 0;
      this.addParticle(pos, particle.options);
    }
  }
  setDensity() {
    const options2 = this.container.actualOptions;
    for (const group in options2.particles.groups) {
      this.applyDensity(options2.particles.groups[group], 0, group);
    }
    this.applyDensity(options2.particles, options2.manualParticles.length);
  }
  applyDensity(options2, manualCount, group) {
    var _a;
    if (!((_a = options2.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
      return;
    }
    const numberOptions = options2.number;
    const densityFactor = this.initDensityFactor(numberOptions.density);
    const optParticlesNumber = numberOptions.value;
    const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
    const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount;
    const particlesCount = Math.min(this.count, this.array.filter((t) => t.group === group).length);
    this.limit = numberOptions.limit * densityFactor;
    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), void 0, options2, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  }
  initDensityFactor(densityOptions) {
    const container = this.container;
    if (!container.canvas.element || !densityOptions.enable) {
      return 1;
    }
    const canvas = container.canvas.element;
    const pxRatio = container.retina.pixelRatio;
    return canvas.width * canvas.height / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
  }
  pushParticle(position, overrideOptions, group, initializer) {
    try {
      const particle = new Particle(this.nextId, this.container, position, overrideOptions, group);
      let canAdd = true;
      if (initializer) {
        canAdd = initializer(particle);
      }
      if (!canAdd) {
        return;
      }
      this.array.push(particle);
      this.zArray.push(particle);
      this.nextId++;
      return particle;
    } catch (e) {
      console.warn(`error adding particle: ${e}`);
      return;
    }
  }
};
var Retina = class {
  constructor(container) {
    this.container = container;
  }
  init() {
    const container = this.container;
    const options2 = container.actualOptions;
    this.pixelRatio = !options2.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
    const motionOptions = this.container.actualOptions.motion;
    if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
      if (isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
        this.reduceFactor = 1;
      } else {
        const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery) {
          this.handleMotionChange(mediaQuery);
          const handleChange = () => {
            this.handleMotionChange(mediaQuery);
            container.refresh().catch(() => {
            });
          };
          if (mediaQuery.addEventListener !== void 0) {
            mediaQuery.addEventListener("change", handleChange);
          } else if (mediaQuery.addListener !== void 0) {
            mediaQuery.addListener(handleChange);
          }
        }
      }
    } else {
      this.reduceFactor = 1;
    }
    const ratio = this.pixelRatio;
    if (container.canvas.element) {
      const element = container.canvas.element;
      container.canvas.size.width = element.offsetWidth * ratio;
      container.canvas.size.height = element.offsetHeight * ratio;
    }
    const particles2 = options2.particles;
    this.attractDistance = particles2.move.attract.distance * ratio;
    this.linksDistance = particles2.links.distance * ratio;
    this.linksWidth = particles2.links.width * ratio;
    this.sizeAnimationSpeed = particles2.size.animation.speed * ratio;
    this.maxSpeed = particles2.move.gravity.maxSpeed * ratio;
    if (particles2.orbit.radius !== void 0) {
      this.orbitRadius = particles2.orbit.radius * this.container.retina.pixelRatio;
    }
    const modes = options2.interactivity.modes;
    this.connectModeDistance = modes.connect.distance * ratio;
    this.connectModeRadius = modes.connect.radius * ratio;
    this.grabModeDistance = modes.grab.distance * ratio;
    this.repulseModeDistance = modes.repulse.distance * ratio;
    this.bounceModeDistance = modes.bounce.distance * ratio;
    this.attractModeDistance = modes.attract.distance * ratio;
    this.slowModeRadius = modes.slow.radius * ratio;
    this.bubbleModeDistance = modes.bubble.distance * ratio;
    if (modes.bubble.size) {
      this.bubbleModeSize = modes.bubble.size * ratio;
    }
  }
  initParticle(particle) {
    const options2 = particle.options;
    const ratio = this.pixelRatio;
    const moveDistance = options2.move.distance;
    const props = particle.retina;
    props.attractDistance = options2.move.attract.distance * ratio;
    props.linksDistance = options2.links.distance * ratio;
    props.linksWidth = options2.links.width * ratio;
    props.moveDrift = getRangeValue(options2.move.drift) * ratio;
    props.moveSpeed = getRangeValue(options2.move.speed) * ratio;
    props.sizeAnimationSpeed = options2.size.animation.speed * ratio;
    if (particle.spin) {
      props.spinAcceleration = getRangeValue(options2.move.spin.acceleration) * ratio;
    }
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== void 0 ? moveDistance.horizontal * ratio : void 0;
    maxDistance.vertical = moveDistance.vertical !== void 0 ? moveDistance.vertical * ratio : void 0;
    props.maxSpeed = options2.move.gravity.maxSpeed * ratio;
  }
  handleMotionChange(mediaQuery) {
    const options2 = this.container.actualOptions;
    if (mediaQuery.matches) {
      const motion = options2.motion;
      this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
    } else {
      this.reduceFactor = 1;
    }
  }
};
var FrameManager = class {
  constructor(container) {
    this.container = container;
  }
  nextFrame(timestamp) {
    var _a;
    try {
      const container = this.container;
      if (container.lastFrameTime !== void 0 && timestamp < container.lastFrameTime + 1e3 / container.fpsLimit) {
        container.draw(false);
        return;
      }
      (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : container.lastFrameTime = timestamp;
      const deltaValue = timestamp - container.lastFrameTime;
      const delta = {
        value: deltaValue,
        factor: 60 * deltaValue / 1e3
      };
      container.lifeTime += delta.value;
      container.lastFrameTime = timestamp;
      if (deltaValue > 1e3) {
        container.draw(false);
        return;
      }
      container.particles.draw(delta);
      if (container.duration > 0 && container.lifeTime > container.duration) {
        container.destroy();
        return;
      }
      if (container.getAnimationStatus()) {
        container.draw(false);
      }
    } catch (e) {
      console.error("tsParticles error in animation loop", e);
    }
  }
};
var ClickEvent = class {
  constructor() {
    this.enable = false;
    this.mode = [];
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
  }
};
var DivEvent = class {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = DivType.circle;
  }
  get elementId() {
    return this.ids;
  }
  set elementId(value) {
    this.ids = value;
  }
  get el() {
    return this.elementId;
  }
  set el(value) {
    this.elementId = value;
  }
  get ids() {
    return this.selectors instanceof Array ? this.selectors.map((t) => t.replace("#", "")) : this.selectors.replace("#", "");
  }
  set ids(value) {
    this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
  }
  load(data) {
    var _a, _b;
    if (data === void 0) {
      return;
    }
    const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
    if (ids !== void 0) {
      this.ids = ids;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};
var Parallax = class {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.force !== void 0) {
      this.force = data.force;
    }
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
  }
};
var HoverEvent = class {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.parallax.load(data.parallax);
  }
};
var Events = class {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = true;
  }
  get onclick() {
    return this.onClick;
  }
  set onclick(value) {
    this.onClick = value;
  }
  get ondiv() {
    return this.onDiv;
  }
  set ondiv(value) {
    this.onDiv = value;
  }
  get onhover() {
    return this.onHover;
  }
  set onhover(value) {
    this.onHover = value;
  }
  load(data) {
    var _a, _b, _c;
    if (data === void 0) {
      return;
    }
    this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
    const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
    if (onDiv !== void 0) {
      if (onDiv instanceof Array) {
        this.onDiv = onDiv.map((div) => {
          const tmp = new DivEvent();
          tmp.load(div);
          return tmp;
        });
      } else {
        this.onDiv = new DivEvent();
        this.onDiv.load(onDiv);
      }
    }
    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
    if (data.resize !== void 0) {
      this.resize = data.resize;
    }
  }
};
var BubbleBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.mix !== void 0) {
      this.mix = data.mix;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.color !== void 0) {
      if (data.color instanceof Array) {
        this.color = data.color.map((s2) => OptionsColor.create(void 0, s2));
      } else {
        if (this.color instanceof Array) {
          this.color = new OptionsColor();
        }
        this.color = OptionsColor.create(this.color, data.color);
      }
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
  }
};
var BubbleDiv = class extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return this.selectors instanceof Array ? this.selectors.map((t) => t.replace("#", "")) : this.selectors.replace("#", "");
  }
  set ids(value) {
    this.selectors = value instanceof Array ? value.map((t) => `#${t}`) : `#${value}`;
  }
  load(data) {
    super.load(data);
    if (data === void 0) {
      return;
    }
    if (data.ids !== void 0) {
      this.ids = data.ids;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};
var Bubble = class extends BubbleBase {
  load(data) {
    super.load(data);
    if (!(data !== void 0 && data.divs !== void 0)) {
      return;
    }
    if (data.divs instanceof Array) {
      this.divs = data.divs.map((s2) => {
        const tmp = new BubbleDiv();
        tmp.load(s2);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new BubbleDiv();
      }
      this.divs.load(data.divs);
    }
  }
};
var ConnectLinks = class {
  constructor() {
    this.opacity = 0.5;
  }
  load(data) {
    if (!(data !== void 0 && data.opacity !== void 0)) {
      return;
    }
    this.opacity = data.opacity;
  }
};
var Connect = class {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  load(data) {
    var _a, _b;
    if (data === void 0) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};
var GrabLinks = class {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var Grab = class {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  get line_linked() {
    return this.links;
  }
  set line_linked(value) {
    this.links = value;
  }
  get lineLinked() {
    return this.links;
  }
  set lineLinked(value) {
    this.links = value;
  }
  load(data) {
    var _a, _b;
    if (data === void 0) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
  }
};
var Remove = class {
  constructor() {
    this.quantity = 2;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
    if (quantity !== void 0) {
      this.quantity = quantity;
    }
  }
};
var Push = class {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  get particles_nb() {
    return this.quantity;
  }
  set particles_nb(value) {
    this.quantity = value;
  }
  load(data) {
    var _a;
    if (data === void 0) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    if (data.groups !== void 0) {
      this.groups = data.groups.map((t) => t);
    }
    if (!this.groups.length) {
      this.default = true;
    }
    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
    if (quantity !== void 0) {
      this.quantity = quantity;
    }
  }
};
var RepulseBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = EasingType.easeOutQuad;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
  }
};
var RepulseDiv = class extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map((t) => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }
  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(() => `#${value}`);
    } else {
      this.selectors = `#${value}`;
    }
  }
  load(data) {
    super.load(data);
    if (data === void 0) {
      return;
    }
    if (data.ids !== void 0) {
      this.ids = data.ids;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};
var Repulse = class extends RepulseBase {
  load(data) {
    super.load(data);
    if ((data === null || data === void 0 ? void 0 : data.divs) === void 0) {
      return;
    }
    if (data.divs instanceof Array) {
      this.divs = data.divs.map((s2) => {
        const tmp = new RepulseDiv();
        tmp.load(s2);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new RepulseDiv();
      }
      this.divs.load(data.divs);
    }
  }
};
var Slow = class {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }
  get active() {
    return false;
  }
  set active(_value) {
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};
var Trail = class {
  constructor() {
    this.delay = 1;
    this.pauseOnStop = false;
    this.quantity = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.quantity !== void 0) {
      this.quantity = data.quantity;
    }
    if (data.particles !== void 0) {
      this.particles = deepExtend({}, data.particles);
    }
    if (data.pauseOnStop !== void 0) {
      this.pauseOnStop = data.pauseOnStop;
    }
  }
};
var Attract = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = EasingType.easeOutQuad;
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
};
var LightGradient = class {
  constructor() {
    this.start = new OptionsColor();
    this.stop = new OptionsColor();
    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.start = OptionsColor.create(this.start, data.start);
    this.stop = OptionsColor.create(this.stop, data.stop);
  }
};
var LightArea = class {
  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1e3;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.gradient.load(data.gradient);
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};
var LightShadow = class {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.length = 2e3;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.length !== void 0) {
      this.length = data.length;
    }
  }
};
var Light = class {
  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }
};
var Bounce = class {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
  }
};
var Modes = class {
  constructor() {
    this.attract = new Attract();
    this.bounce = new Bounce();
    this.bubble = new Bubble();
    this.connect = new Connect();
    this.grab = new Grab();
    this.light = new Light();
    this.push = new Push();
    this.remove = new Remove();
    this.repulse = new Repulse();
    this.slow = new Slow();
    this.trail = new Trail();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    this.attract.load(data.attract);
    this.bubble.load(data.bubble);
    this.connect.load(data.connect);
    this.grab.load(data.grab);
    this.light.load(data.light);
    this.push.load(data.push);
    this.remove.load(data.remove);
    this.repulse.load(data.repulse);
    this.slow.load(data.slow);
    this.trail.load(data.trail);
  }
};
var Interactivity = class {
  constructor() {
    this.detectsOn = InteractivityDetect.canvas;
    this.events = new Events();
    this.modes = new Modes();
  }
  get detect_on() {
    return this.detectsOn;
  }
  set detect_on(value) {
    this.detectsOn = value;
  }
  load(data) {
    var _a, _b, _c;
    if (data === void 0) {
      return;
    }
    const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
    if (detectsOn !== void 0) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
    if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
      if (this.events.onHover.mode instanceof Array) {
        if (this.events.onHover.mode.indexOf(HoverMode.slow) < 0) {
          this.events.onHover.mode.push(HoverMode.slow);
        }
      } else if (this.events.onHover.mode !== HoverMode.slow) {
        this.events.onHover.mode = [this.events.onHover.mode, HoverMode.slow];
      }
    }
  }
};
var BackgroundMaskCover = class {
  constructor() {
    this.color = new OptionsColor();
    this.opacity = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var BackgroundMask = class {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.composite !== void 0) {
      this.composite = data.composite;
    }
    if (data.cover !== void 0) {
      const cover = data.cover;
      const color = typeof data.cover === "string" ? { color: data.cover } : data.cover;
      this.cover.load(cover.color !== void 0 ? cover : { color });
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};
var Background = class {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.position !== void 0) {
      this.position = data.position;
    }
    if (data.repeat !== void 0) {
      this.repeat = data.repeat;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};
var ThemeDefault = class {
  constructor() {
    this.auto = false;
    this.mode = ThemeMode.any;
    this.value = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.auto !== void 0) {
      this.auto = data.auto;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};
var Theme = class {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    this.default.load(data.default);
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
};
var FullScreen = class {
  constructor() {
    this.enable = false;
    this.zIndex = -1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.zIndex !== void 0) {
      this.zIndex = data.zIndex;
    }
  }
};
var MotionReduce = class {
  constructor() {
    this.factor = 4;
    this.value = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};
var Motion = class {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.disable !== void 0) {
      this.disable = data.disable;
    }
    this.reduce.load(data.reduce);
  }
};
var ManualParticle = class {
  load(data) {
    var _a, _b;
    if (!data) {
      return;
    }
    if (data.position !== void 0) {
      this.position = {
        x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
        y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50
      };
    }
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
};
var Responsive = class {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.maxWidth !== void 0) {
      this.maxWidth = data.maxWidth;
    }
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
};
var __classPrivateFieldGet$3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Options_instances;
var _Options_findDefaultTheme;
var Options = class {
  constructor() {
    _Options_instances.add(this);
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 60;
    this.interactivity = new Interactivity();
    this.manualParticles = [];
    this.motion = new Motion();
    this.particles = new ParticlesOptions();
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.themes = [];
    this.zLayers = 100;
  }
  get fps_limit() {
    return this.fpsLimit;
  }
  set fps_limit(value) {
    this.fpsLimit = value;
  }
  get retina_detect() {
    return this.detectRetina;
  }
  set retina_detect(value) {
    this.detectRetina = value;
  }
  get backgroundMode() {
    return this.fullScreen;
  }
  set backgroundMode(value) {
    this.fullScreen.load(value);
  }
  load(data) {
    var _a, _b, _c, _d, _e;
    if (data === void 0) {
      return;
    }
    if (data.preset !== void 0) {
      if (data.preset instanceof Array) {
        for (const preset of data.preset) {
          this.importPreset(preset);
        }
      } else {
        this.importPreset(data.preset);
      }
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
    if (detectRetina !== void 0) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
    if (fpsLimit !== void 0) {
      this.fpsLimit = fpsLimit;
    }
    if (data.pauseOnBlur !== void 0) {
      this.pauseOnBlur = data.pauseOnBlur;
    }
    if (data.pauseOnOutsideViewport !== void 0) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }
    if (data.zLayers !== void 0) {
      this.zLayers = data.zLayers;
    }
    this.background.load(data.background);
    const fullScreen2 = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;
    if (typeof fullScreen2 === "boolean") {
      this.fullScreen.enable = fullScreen2;
    } else {
      this.fullScreen.load(fullScreen2);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles !== void 0) {
      this.manualParticles = data.manualParticles.map((t) => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.motion.load(data.motion);
    this.particles.load(data.particles);
    Plugins.loadOptions(this, data);
    if (data.responsive !== void 0) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }
    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
    if (data.themes !== void 0) {
      for (const theme of data.themes) {
        const optTheme = new Theme();
        optTheme.load(theme);
        this.themes.push(optTheme);
      }
    }
    this.defaultDarkTheme = (_d = __classPrivateFieldGet$3(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, ThemeMode.dark)) === null || _d === void 0 ? void 0 : _d.name;
    this.defaultLightTheme = (_e = __classPrivateFieldGet$3(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, ThemeMode.light)) === null || _e === void 0 ? void 0 : _e.name;
  }
  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find((theme) => theme.name === name);
      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = __classPrivateFieldGet$3(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? ThemeMode.dark : ThemeMode.light);
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find((t) => t.maxWidth * pxRatio > width);
    this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
    return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
  }
  importPreset(preset) {
    this.load(Plugins.getPreset(preset));
  }
};
_Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme2(mode) {
  var _a;
  return (_a = this.themes.find((theme) => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any);
};
var Container = class {
  constructor(id, sourceOptions, ...presets2) {
    this.id = id;
    this.fpsLimit = 60;
    this.duration = 0;
    this.lifeTime = 0;
    this.firstStart = true;
    this.started = false;
    this.destroyed = false;
    this.paused = true;
    this.lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles$1(this);
    this.drawer = new FrameManager(this);
    this.pathGenerator = {
      generate: () => {
        const v = Vector.create(0, 0);
        v.length = Math.random();
        v.angle = Math.random() * Math.PI * 2;
        return v;
      },
      init: () => {
      },
      update: () => {
      }
    };
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.bubble = {};
    this.repulse = { particles: [] };
    this.attract = { particles: [] };
    this.plugins = new Map();
    this.drawers = new Map();
    this.density = 1;
    this._options = new Options();
    this.actualOptions = new Options();
    for (const preset of presets2) {
      this._options.load(Plugins.getPreset(preset));
    }
    const shapes2 = Plugins.getSupportedShapes();
    for (const type of shapes2) {
      const drawer = Plugins.getShapeDrawer(type);
      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }
    this._options.load(this._sourceOptions);
    this.eventListeners = new EventListeners(this);
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver((entries) => this.intersectionManager(entries));
    }
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  play(force) {
    const needsUpdate = this.paused || force;
    if (this.firstStart && !this.actualOptions.autoPlay) {
      this.firstStart = false;
      return;
    }
    if (this.paused) {
      this.paused = false;
    }
    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this.draw(needsUpdate || false);
  }
  pause() {
    if (this.drawAnimationFrame !== void 0) {
      cancelAnimation()(this.drawAnimationFrame);
      delete this.drawAnimationFrame;
    }
    if (this.paused) {
      return;
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.pause) {
        plugin.pause();
      }
    }
    if (!this.pageHidden) {
      this.paused = true;
    }
  }
  draw(force) {
    let refreshTime = force;
    this.drawAnimationFrame = animate()((timestamp) => {
      if (refreshTime) {
        this.lastFrameTime = void 0;
        refreshTime = false;
      }
      this.drawer.nextFrame(timestamp);
    });
  }
  getAnimationStatus() {
    return !this.paused && !this.pageHidden;
  }
  setNoise(noiseOrGenerator, init2, update) {
    this.setPath(noiseOrGenerator, init2, update);
  }
  setPath(pathOrGenerator, init2, update) {
    if (!pathOrGenerator) {
      return;
    }
    if (typeof pathOrGenerator === "function") {
      this.pathGenerator.generate = pathOrGenerator;
      if (init2) {
        this.pathGenerator.init = init2;
      }
      if (update) {
        this.pathGenerator.update = update;
      }
    } else {
      if (pathOrGenerator.generate) {
        this.pathGenerator.generate = pathOrGenerator.generate;
      }
      if (pathOrGenerator.init) {
        this.pathGenerator.init = pathOrGenerator.init;
      }
      if (pathOrGenerator.update) {
        this.pathGenerator.update = pathOrGenerator.update;
      }
    }
  }
  destroy() {
    this.stop();
    this.canvas.destroy();
    for (const [, drawer] of this.drawers) {
      if (drawer.destroy) {
        drawer.destroy(this);
      }
    }
    for (const key of this.drawers.keys()) {
      this.drawers.delete(key);
    }
    this.destroyed = true;
  }
  exportImg(callback) {
    this.exportImage(callback);
  }
  exportImage(callback, type, quality) {
    var _a;
    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }
  exportConfiguration() {
    return JSON.stringify(this.actualOptions, void 0, 2);
  }
  refresh() {
    this.stop();
    return this.start();
  }
  reset() {
    this._options = new Options();
    return this.refresh();
  }
  stop() {
    if (!this.started) {
      return;
    }
    this.firstStart = true;
    this.started = false;
    this.eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.clear();
    if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
      this.intersectionObserver.observe(this.interactivity.element);
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.stop) {
        plugin.stop();
      }
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this.particles.linksColors = new Map();
    delete this.particles.grabLineColor;
    delete this.particles.linksColor;
  }
  async loadTheme(name) {
    this.currentTheme = name;
    await this.refresh();
  }
  async start() {
    if (this.started) {
      return;
    }
    await this.init();
    this.started = true;
    this.eventListeners.addListeners();
    if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
      this.intersectionObserver.observe(this.interactivity.element);
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.startAsync !== void 0) {
        await plugin.startAsync();
      } else if (plugin.start !== void 0) {
        plugin.start();
      }
    }
    this.play();
  }
  addClickHandler(callback) {
    const el = this.interactivity.element;
    if (!el) {
      return;
    }
    const clickOrTouchHandler = (e, pos, radius) => {
      if (this.destroyed) {
        return;
      }
      const pxRatio = this.retina.pixelRatio, posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      }, particles2 = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles2);
    };
    const clickHandler = (e) => {
      if (this.destroyed) {
        return;
      }
      const mouseEvent = e;
      const pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, 1);
    };
    const touchStartHandler = () => {
      if (this.destroyed) {
        return;
      }
      touched = true;
      touchMoved = false;
    };
    const touchMoveHandler = () => {
      if (this.destroyed) {
        return;
      }
      touchMoved = true;
    };
    const touchEndHandler = (e) => {
      var _a, _b, _c;
      if (this.destroyed) {
        return;
      }
      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
          if (!lastTouch) {
            return;
          }
        }
        const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const pos = {
          x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
          y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }
      touched = false;
      touchMoved = false;
    };
    const touchCancelHandler = () => {
      if (this.destroyed) {
        return;
      }
      touched = false;
      touchMoved = false;
    };
    let touched = false;
    let touchMoved = false;
    el.addEventListener("click", clickHandler);
    el.addEventListener("touchstart", touchStartHandler);
    el.addEventListener("touchmove", touchMoveHandler);
    el.addEventListener("touchend", touchEndHandler);
    el.addEventListener("touchcancel", touchCancelHandler);
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this.currentTheme);
    if (this.responsiveMaxWidth != newMaxWidth) {
      this.responsiveMaxWidth = newMaxWidth;
      return true;
    }
    return false;
  }
  async init() {
    this.actualOptions = new Options();
    this.actualOptions.load(this._options);
    this.retina.init();
    this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this.duration = getRangeValue(this.actualOptions.duration);
    this.lifeTime = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 60;
    const availablePlugins = Plugins.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    for (const [, drawer] of this.drawers) {
      if (drawer.init) {
        await drawer.init(this);
      }
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.init) {
        plugin.init(this.actualOptions);
      } else if (plugin.initAsync !== void 0) {
        await plugin.initAsync(this.actualOptions);
      }
    }
    const pathOptions = this.actualOptions.particles.move.path;
    if (pathOptions.generator) {
      const customGenerator = Plugins.getPathGenerator(pathOptions.generator);
      if (customGenerator) {
        if (customGenerator.init) {
          this.pathGenerator.init = customGenerator.init;
        }
        if (customGenerator.generate) {
          this.pathGenerator.generate = customGenerator.generate;
        }
        if (customGenerator.update) {
          this.pathGenerator.update = customGenerator.update;
        }
      }
    }
    this.particles.init();
    this.particles.setDensity();
    for (const [, plugin] of this.plugins) {
      if (plugin.particlesSetup !== void 0) {
        plugin.particlesSetup();
      }
    }
  }
  intersectionManager(entries) {
    if (!this.actualOptions.pauseOnOutsideViewport) {
      return;
    }
    for (const entry of entries) {
      if (entry.target !== this.interactivity.element) {
        continue;
      }
      if (entry.isIntersecting) {
        this.play();
      } else {
        this.pause();
      }
    }
  }
};
var tsParticlesDom = [];
function fetchError(statusCode) {
  console.error(`Error tsParticles - fetch status: ${statusCode}`);
  console.error("Error tsParticles - File config not found");
}
var Loader = class {
  static dom() {
    return tsParticlesDom;
  }
  static domItem(index2) {
    const dom = Loader.dom();
    const item = dom[index2];
    if (item && !item.destroyed) {
      return item;
    }
    dom.splice(index2, 1);
  }
  static async loadOptions(params) {
    var _a, _b, _c;
    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 1e4)}`;
    const { options: options2, index: index2 } = params;
    let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = tagId;
      (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
    }
    const currentOptions = options2 instanceof Array ? itemFromArray(options2, index2) : options2;
    const dom = Loader.dom();
    const oldIndex = dom.findIndex((v) => v.id === tagId);
    if (oldIndex >= 0) {
      const old = Loader.domItem(oldIndex);
      if (old && !old.destroyed) {
        old.destroy();
        dom.splice(oldIndex, 1);
      }
    }
    let canvasEl;
    let generatedCanvas;
    if (domContainer.tagName.toLowerCase() === "canvas") {
      canvasEl = domContainer;
      generatedCanvas = false;
    } else {
      const existingCanvases = domContainer.getElementsByTagName("canvas");
      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];
        if (!canvasEl.className) {
          canvasEl.className = Constants.canvasClass;
        }
        generatedCanvas = false;
      } else {
        generatedCanvas = true;
        canvasEl = document.createElement("canvas");
        canvasEl.className = Constants.canvasClass;
        canvasEl.style.width = "100%";
        canvasEl.style.height = "100%";
        domContainer.appendChild(canvasEl);
      }
    }
    const newItem = new Container(tagId, currentOptions);
    if (oldIndex >= 0) {
      dom.splice(oldIndex, 0, newItem);
    } else {
      dom.push(newItem);
    }
    newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
    await newItem.start();
    return newItem;
  }
  static async loadRemoteOptions(params) {
    const { url: jsonUrl, index: index2 } = params;
    const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index2) : jsonUrl;
    if (!url) {
      return;
    }
    const response = await fetch(url);
    if (!response.ok) {
      fetchError(response.status);
      return;
    }
    const data = await response.json();
    return await Loader.loadOptions({
      tagId: params.tagId,
      element: params.element,
      index: index2,
      options: data
    });
  }
  static load(tagId, options2, index2) {
    const params = { index: index2 };
    if (typeof tagId === "string") {
      params.tagId = tagId;
    } else {
      params.options = tagId;
    }
    if (typeof options2 === "number") {
      params.index = options2 !== null && options2 !== void 0 ? options2 : params.index;
    } else {
      params.options = options2 !== null && options2 !== void 0 ? options2 : params.options;
    }
    return this.loadOptions(params);
  }
  static async set(id, domContainer, options2, index2) {
    const params = { index: index2 };
    if (typeof id === "string") {
      params.tagId = id;
    } else {
      params.element = id;
    }
    if (domContainer instanceof HTMLElement) {
      params.element = domContainer;
    } else {
      params.options = domContainer;
    }
    if (typeof options2 === "number") {
      params.index = options2;
    } else {
      params.options = options2 !== null && options2 !== void 0 ? options2 : params.options;
    }
    return this.loadOptions(params);
  }
  static async loadJSON(tagId, jsonUrl, index2) {
    let url, id;
    if (typeof jsonUrl === "number" || jsonUrl === void 0) {
      url = tagId;
    } else {
      id = tagId;
      url = jsonUrl;
    }
    return await Loader.loadRemoteOptions({ tagId: id, url, index: index2 });
  }
  static async setJSON(id, domContainer, jsonUrl, index2) {
    let url, newId, newIndex, element;
    if (id instanceof HTMLElement) {
      element = id;
      url = domContainer;
      newIndex = jsonUrl;
    } else {
      newId = id;
      element = domContainer;
      url = jsonUrl;
      newIndex = index2;
    }
    return await Loader.loadRemoteOptions({ tagId: newId, url, index: newIndex, element });
  }
  static setOnClickHandler(callback) {
    const dom = Loader.dom();
    if (dom.length === 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }
    for (const domItem of dom) {
      domItem.addClickHandler(callback);
    }
  }
};
var __classPrivateFieldSet$2 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet$2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Main_initialized;
var Main = class {
  constructor() {
    _Main_initialized.set(this, void 0);
    __classPrivateFieldSet$2(this, _Main_initialized, false, "f");
  }
  init() {
    if (!__classPrivateFieldGet$2(this, _Main_initialized, "f")) {
      __classPrivateFieldSet$2(this, _Main_initialized, true, "f");
    }
  }
  async loadFromArray(tagId, options2, index2) {
    return Loader.load(tagId, options2, index2);
  }
  async load(tagId, options2) {
    return Loader.load(tagId, options2);
  }
  async set(id, element, options2) {
    return Loader.set(id, element, options2);
  }
  async loadJSON(tagId, pathConfigJson, index2) {
    return Loader.loadJSON(tagId, pathConfigJson, index2);
  }
  async setJSON(id, element, pathConfigJson, index2) {
    return Loader.setJSON(id, element, pathConfigJson, index2);
  }
  setOnClickHandler(callback) {
    Loader.setOnClickHandler(callback);
  }
  dom() {
    return Loader.dom();
  }
  domItem(index2) {
    return Loader.domItem(index2);
  }
  addShape(shape, drawer, init2, afterEffect, destroy2) {
    let customDrawer;
    if (typeof drawer === "function") {
      customDrawer = {
        afterEffect,
        destroy: destroy2,
        draw: drawer,
        init: init2
      };
    } else {
      customDrawer = drawer;
    }
    Plugins.addShapeDrawer(shape, customDrawer);
  }
  addPreset(preset, options2, override = false) {
    Plugins.addPreset(preset, options2, override);
  }
  addPlugin(plugin) {
    Plugins.addPlugin(plugin);
  }
  addPathGenerator(name, generator) {
    Plugins.addPathGenerator(name, generator);
  }
  addInteractor(name, interactorInitializer) {
    Plugins.addInteractor(name, interactorInitializer);
  }
  addParticleUpdater(name, updaterInitializer) {
    Plugins.addParticleUpdater(name, updaterInitializer);
  }
};
_Main_initialized = new WeakMap();
var CircleDrawer = class {
  getSidesCount() {
    return 12;
  }
  draw(context, particle, radius) {
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
  }
};
function loadCircleShape(tsParticles2) {
  tsParticles2.addShape("circle", new CircleDrawer());
}
var LifeUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init() {
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    const life = particle.life;
    let justSpawned = false;
    if (particle.spawning) {
      life.delayTime += delta.value;
      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }
    if (life.duration === -1) {
      return;
    }
    if (particle.spawning) {
      return;
    }
    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }
    if (life.time < life.duration) {
      return;
    }
    life.time = 0;
    if (particle.life.count > 0) {
      particle.life.count--;
    }
    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }
    const canvasSize = this.container.canvas.size, widthRange = setRangeValue(0, canvasSize.width), heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    life.delay = getRangeValue(lifeOptions.delay.value) * 1e3;
    life.duration = getRangeValue(lifeOptions.duration.value) * 1e3;
  }
};
function loadLifeUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("life", (container) => new LifeUpdater(container));
}
var ExternalInteractorBase = class {
  constructor(container) {
    this.container = container;
    this.type = InteractorType.External;
  }
};
var Connector = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray(HoverMode.connect, events.onHover.mode);
  }
  reset() {
  }
  interact() {
    const container = this.container, options2 = container.actualOptions;
    if (options2.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
      const mousePos = container.interactivity.mouse.position;
      if (!mousePos) {
        return;
      }
      const distance = Math.abs(container.retina.connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance);
      let i = 0;
      for (const p1 of query) {
        const pos1 = p1.getPosition();
        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(), distMax = Math.abs(container.retina.connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            container.canvas.drawConnectLine(p1, p2);
          }
        }
        ++i;
      }
    }
  }
};
function loadExternalConnectInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalConnect", (container) => new Connector(container));
}
function checkDestroy$1(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateOpacity(particle, delta) {
  var _a, _b, _c, _d, _e;
  if (!particle.opacity) {
    return;
  }
  const minValue = particle.opacity.min;
  const maxValue = particle.opacity.max;
  if (!(!particle.destroyed && particle.opacity.enable && (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.opacity.loops) !== null && _b !== void 0 ? _b : 0) < ((_c = particle.opacity.maxLoops) !== null && _c !== void 0 ? _c : 0)))) {
    return;
  }
  switch (particle.opacity.status) {
    case AnimationStatus.increasing:
      if (particle.opacity.value >= maxValue) {
        particle.opacity.status = AnimationStatus.decreasing;
        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }
        particle.opacity.loops++;
      } else {
        particle.opacity.value += ((_d = particle.opacity.velocity) !== null && _d !== void 0 ? _d : 0) * delta.factor;
      }
      break;
    case AnimationStatus.decreasing:
      if (particle.opacity.value <= minValue) {
        particle.opacity.status = AnimationStatus.increasing;
        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }
        particle.opacity.loops++;
      } else {
        particle.opacity.value -= ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
      }
      break;
  }
  checkDestroy$1(particle, particle.opacity.value, minValue, maxValue);
  if (!particle.destroyed) {
    particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
  }
}
var OpacityUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity;
    particle.opacity = {
      enable: opacityOptions.animation.enable,
      max: getRangeMax(opacityOptions.value),
      min: getRangeMin(opacityOptions.value),
      value: getRangeValue(opacityOptions.value),
      loops: 0,
      maxLoops: opacityOptions.animation.count
    };
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.status = AnimationStatus.increasing;
      const opacityRange = opacityOptions.value;
      particle.opacity.min = getRangeMin(opacityRange);
      particle.opacity.max = getRangeMax(opacityRange);
      switch (opacityAnimation.startValue) {
        case StartValueType.min:
          particle.opacity.value = particle.opacity.min;
          particle.opacity.status = AnimationStatus.increasing;
          break;
        case StartValueType.random:
          particle.opacity.value = randomInRange(particle.opacity);
          particle.opacity.status = Math.random() >= 0.5 ? AnimationStatus.increasing : AnimationStatus.decreasing;
          break;
        case StartValueType.max:
        default:
          particle.opacity.value = particle.opacity.max;
          particle.opacity.status = AnimationStatus.decreasing;
          break;
      }
      particle.opacity.velocity = opacityAnimation.speed / 100 * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= Math.random();
      }
    }
  }
  isEnabled(particle) {
    var _a, _b, _c;
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.opacity.loops) !== null && _b !== void 0 ? _b : 0) < ((_c = particle.opacity.maxLoops) !== null && _c !== void 0 ? _c : 0));
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateOpacity(particle, delta);
  }
};
function loadOpacityUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
function loadImage(source) {
  return new Promise((resolve2, reject) => {
    if (!source) {
      reject("Error tsParticles - No image.src");
      return;
    }
    const image = {
      source,
      type: source.substr(source.length - 3)
    };
    const img = new Image();
    img.addEventListener("load", () => {
      image.element = img;
      resolve2(image);
    });
    img.addEventListener("error", () => {
      reject(`Error tsParticles - loading image: ${source}`);
    });
    img.src = source;
  });
}
async function downloadSvgImage(source) {
  if (!source) {
    throw new Error("Error tsParticles - No image.src");
  }
  const image = {
    source,
    type: source.substr(source.length - 3)
  };
  if (image.type !== "svg") {
    return loadImage(source);
  }
  const response = await fetch(image.source);
  if (!response.ok) {
    throw new Error("Error tsParticles - Image not found");
  }
  image.svgData = await response.text();
  return image;
}
function replaceColorSvg(imageShape, color, opacity) {
  const { svgData } = imageShape;
  if (!svgData) {
    return "";
  }
  if (svgData.includes("fill")) {
    const currentColor = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
    return svgData.replace(currentColor, () => getStyleFromHsl(color, opacity));
  }
  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${getStyleFromHsl(color, opacity)}"${svgData.substring(preFillIndex)}`;
}
var __classPrivateFieldSet$1 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet$1 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ImageDrawer_images;
var ImageDrawer = class {
  constructor() {
    _ImageDrawer_images.set(this, void 0);
    __classPrivateFieldSet$1(this, _ImageDrawer_images, [], "f");
  }
  getSidesCount() {
    return 12;
  }
  getImages(container) {
    const containerImages = __classPrivateFieldGet$1(this, _ImageDrawer_images, "f").find((t) => t.id === container.id);
    if (!containerImages) {
      __classPrivateFieldGet$1(this, _ImageDrawer_images, "f").push({
        id: container.id,
        images: []
      });
      return this.getImages(container);
    } else {
      return containerImages;
    }
  }
  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }
  async init(container) {
    await this.loadImagesFromParticlesOptions(container, container.actualOptions.particles);
    await this.loadImagesFromParticlesOptions(container, container.actualOptions.interactivity.modes.trail.particles);
    for (const manualParticle of container.actualOptions.manualParticles) {
      await this.loadImagesFromParticlesOptions(container, manualParticle.options);
    }
    const emitterOptions = container.actualOptions;
    if (emitterOptions.emitters) {
      if (emitterOptions.emitters instanceof Array) {
        for (const emitter of emitterOptions.emitters) {
          await this.loadImagesFromParticlesOptions(container, emitter.particles);
        }
      } else {
        await this.loadImagesFromParticlesOptions(container, emitterOptions.emitters.particles);
      }
    }
    const interactiveEmitters = emitterOptions.interactivity.modes.emitters;
    if (interactiveEmitters) {
      if (interactiveEmitters instanceof Array) {
        for (const emitter of interactiveEmitters) {
          await this.loadImagesFromParticlesOptions(container, emitter.particles);
        }
      } else {
        await this.loadImagesFromParticlesOptions(container, interactiveEmitters.particles);
      }
    }
  }
  destroy() {
    __classPrivateFieldSet$1(this, _ImageDrawer_images, [], "f");
  }
  async loadImagesFromParticlesOptions(container, options2) {
    var _a, _b, _c;
    const shapeOptions = options2 === null || options2 === void 0 ? void 0 : options2.shape;
    if (!(shapeOptions === null || shapeOptions === void 0 ? void 0 : shapeOptions.type) || !shapeOptions.options || !isInArray(ShapeType.image, shapeOptions.type) && !isInArray(ShapeType.images, shapeOptions.type)) {
      return;
    }
    const idx = __classPrivateFieldGet$1(this, _ImageDrawer_images, "f").findIndex((t) => t.id === container.id);
    if (idx >= 0) {
      __classPrivateFieldGet$1(this, _ImageDrawer_images, "f").splice(idx, 1);
    }
    const imageOptions = (_a = shapeOptions.options[ShapeType.images]) !== null && _a !== void 0 ? _a : shapeOptions.options[ShapeType.image];
    if (imageOptions instanceof Array) {
      for (const optionsImage of imageOptions) {
        await this.loadImageShape(container, optionsImage);
      }
    } else {
      await this.loadImageShape(container, imageOptions);
    }
    if (options2 === null || options2 === void 0 ? void 0 : options2.groups) {
      for (const groupName in options2.groups) {
        const group = options2.groups[groupName];
        await this.loadImagesFromParticlesOptions(container, group);
      }
    }
    if ((_c = (_b = options2 === null || options2 === void 0 ? void 0 : options2.destroy) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.particles) {
      await this.loadImagesFromParticlesOptions(container, options2 === null || options2 === void 0 ? void 0 : options2.destroy.split.particles);
    }
  }
  async loadImageShape(container, imageShape) {
    try {
      const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
      const image = await imageFunc(imageShape.src);
      if (image) {
        this.addImage(container, image);
      }
    } catch (_a) {
      console.warn(`tsParticles error - ${imageShape.src} not found`);
    }
  }
  draw(context, particle, radius, opacity) {
    var _a, _b;
    if (!context) {
      return;
    }
    const image = particle.image;
    const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;
    if (!element) {
      return;
    }
    const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
    const pos = {
      x: -radius,
      y: -radius
    };
    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = opacity;
    }
    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = 1;
    }
  }
  loadShape(particle) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    const images = this.getImages(particle.container).images;
    const imageData = particle.shapeData;
    const image = (_a = images.find((t) => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
    const color = particle.getFillColor();
    let imageRes;
    if (!image) {
      return;
    }
    if (image.svgData !== void 0 && imageData.replaceColor && color) {
      const svgColoredData = replaceColorSvg(image, color, (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1);
      const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
      const domUrl = URL || window.URL || window.webkitURL || window;
      const url = domUrl.createObjectURL(svg);
      const img = new Image();
      imageRes = {
        data: Object.assign(Object.assign({}, image), { svgData: svgColoredData }),
        ratio: imageData.width / imageData.height,
        replaceColor: (_d = imageData.replaceColor) !== null && _d !== void 0 ? _d : imageData.replace_color,
        source: imageData.src
      };
      img.addEventListener("load", () => {
        const pImage = particle.image;
        if (pImage) {
          pImage.loaded = true;
          image.element = img;
        }
        domUrl.revokeObjectURL(url);
      });
      img.addEventListener("error", () => {
        domUrl.revokeObjectURL(url);
        loadImage(imageData.src).then((img2) => {
          const pImage = particle.image;
          if (pImage) {
            image.element = img2 === null || img2 === void 0 ? void 0 : img2.element;
            pImage.loaded = true;
          }
        });
      });
      img.src = url;
    } else {
      imageRes = {
        data: image,
        loaded: true,
        ratio: imageData.width / imageData.height,
        replaceColor: (_e = imageData.replaceColor) !== null && _e !== void 0 ? _e : imageData.replace_color,
        source: imageData.src
      };
    }
    if (!imageRes.ratio) {
      imageRes.ratio = 1;
    }
    const fill = (_f = imageData.fill) !== null && _f !== void 0 ? _f : particle.fill;
    const close = (_g = imageData.close) !== null && _g !== void 0 ? _g : particle.close;
    const imageShape = {
      image: imageRes,
      fill,
      close
    };
    particle.image = imageShape.image;
    particle.fill = imageShape.fill;
    particle.close = imageShape.close;
  }
};
_ImageDrawer_images = new WeakMap();
function loadImageShape(tsParticles2) {
  const imageDrawer = new ImageDrawer();
  tsParticles2.addShape("image", imageDrawer);
  tsParticles2.addShape("images", imageDrawer);
}
var PolygonDrawerBase = class {
  getSidesCount(particle) {
    var _a, _b;
    const polygon = particle.shapeData;
    return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
  }
  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius);
    const side = this.getSidesData(particle, radius);
    const sideCount = side.count.numerator * side.count.denominator;
    const decimalSides = side.count.numerator / side.count.denominator;
    const interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
    const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
    if (!context) {
      return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);
    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }
};
var PolygonDrawer = class extends PolygonDrawerBase {
  getSidesData(particle, radius) {
    var _a, _b;
    const polygon = particle.shapeData;
    const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }
  getCenter(particle, radius) {
    const sides = this.getSidesCount(particle);
    return {
      x: -radius / (sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }
};
var TriangleDrawer = class extends PolygonDrawerBase {
  getSidesCount() {
    return 3;
  }
  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }
};
function loadGenericPolygonShape(tsParticles2) {
  tsParticles2.addShape("polygon", new PolygonDrawer());
}
function loadTriangleShape(tsParticles2) {
  tsParticles2.addShape("triangle", new TriangleDrawer());
}
function loadPolygonShape(tsParticles2) {
  loadGenericPolygonShape(tsParticles2);
  loadTriangleShape(tsParticles2);
}
var ProcessBubbleType;
(function(ProcessBubbleType2) {
  ProcessBubbleType2["color"] = "color";
  ProcessBubbleType2["opacity"] = "opacity";
  ProcessBubbleType2["size"] = "size";
})(ProcessBubbleType || (ProcessBubbleType = {}));
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}
var Bubbler = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, options2 = container.actualOptions, mouse = container.interactivity.mouse, events = options2.interactivity.events, divs = events.onDiv, divBubble = isDivModeEnabled(DivMode.bubble, divs);
    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray(HoverMode.bubble, hoverMode) || isInArray(ClickMode.bubble, clickMode) || divBubble;
  }
  reset(particle, force) {
    if (!(!particle.bubble.inRange || force)) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  interact() {
    const options2 = this.container.actualOptions, events = options2.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
    if (hoverEnabled && isInArray(HoverMode.bubble, hoverMode)) {
      this.hoverBubble();
    } else if (clickEnabled && isInArray(ClickMode.bubble, clickMode)) {
      this.clickBubble();
    } else {
      divModeExecute(DivMode.bubble, divs, (selector, div) => this.singleSelectorHover(selector, div));
    }
  }
  singleSelectorHover(selector, div) {
    const container = this.container, selectors = document.querySelectorAll(selector);
    if (!selectors.length) {
      return;
    }
    selectors.forEach((item) => {
      const elem = item, pxRatio = container.retina.pixelRatio, pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container.particles.quadTree.query(area);
      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }
        particle.bubble.inRange = true;
        const divs = container.actualOptions.interactivity.modes.bubble.divs;
        const divBubble = divMode(divs, elem);
        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.reset(particle, true);
          particle.bubble.div = elem;
        }
        this.hoverBubbleSize(particle, 1, divBubble);
        this.hoverBubbleOpacity(particle, 1, divBubble);
        this.hoverBubbleColor(particle, 1, divBubble);
      }
    });
  }
  process(particle, distMouse, timeSpent, data) {
    const container = this.container, bubbleParam = data.bubbleObj.optValue;
    if (bubbleParam === void 0) {
      return;
    }
    const options2 = container.actualOptions, bubbleDuration = options2.interactivity.modes.bubble.duration, bubbleDistance = container.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
    if (bubbleParam === particlesParam) {
      return;
    }
    if (!container.bubble.durationEnd) {
      if (distMouse <= bubbleDistance) {
        const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
        if (obj !== bubbleParam) {
          const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
          if (type === ProcessBubbleType.size) {
            particle.bubble.radius = value;
          }
          if (type === ProcessBubbleType.opacity) {
            particle.bubble.opacity = value;
          }
        }
      } else {
        if (type === ProcessBubbleType.size) {
          delete particle.bubble.radius;
        }
        if (type === ProcessBubbleType.opacity) {
          delete particle.bubble.opacity;
        }
      }
    } else if (pObjBubble) {
      if (type === ProcessBubbleType.size) {
        delete particle.bubble.radius;
      }
      if (type === ProcessBubbleType.opacity) {
        delete particle.bubble.opacity;
      }
    }
  }
  clickBubble() {
    var _a, _b;
    const container = this.container, options2 = container.actualOptions, mouseClickPos = container.interactivity.mouse.clickPosition;
    if (!mouseClickPos) {
      return;
    }
    const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mouseClickPos, distance);
    for (const particle of query) {
      if (!container.bubble.clicking) {
        continue;
      }
      particle.bubble.inRange = !container.bubble.durationEnd;
      const pos = particle.getPosition(), distMouse = getDistance(pos, mouseClickPos), timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1e3;
      if (timeSpent > options2.interactivity.modes.bubble.duration) {
        container.bubble.durationEnd = true;
      }
      if (timeSpent > options2.interactivity.modes.bubble.duration * 2) {
        container.bubble.clicking = false;
        container.bubble.durationEnd = false;
      }
      const sizeData = {
        bubbleObj: {
          optValue: container.retina.bubbleModeSize,
          value: particle.bubble.radius
        },
        particlesObj: {
          optValue: getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
          value: particle.size.value
        },
        type: ProcessBubbleType.size
      };
      this.process(particle, distMouse, timeSpent, sizeData);
      const opacityData = {
        bubbleObj: {
          optValue: options2.interactivity.modes.bubble.opacity,
          value: particle.bubble.opacity
        },
        particlesObj: {
          optValue: getRangeMax(particle.options.opacity.value),
          value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1
        },
        type: ProcessBubbleType.opacity
      };
      this.process(particle, distMouse, timeSpent, opacityData);
      if (!container.bubble.durationEnd) {
        if (distMouse <= container.retina.bubbleModeDistance) {
          this.hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      } else {
        delete particle.bubble.color;
      }
    }
  }
  hoverBubble() {
    const container = this.container, mousePos = container.interactivity.mouse.position;
    if (mousePos === void 0) {
      return;
    }
    const distance = container.retina.bubbleModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos), ratio = 1 - pointDistance / distance;
      if (pointDistance <= distance) {
        if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
          this.hoverBubbleSize(particle, ratio);
          this.hoverBubbleOpacity(particle, ratio);
          this.hoverBubbleColor(particle, ratio);
        }
      } else {
        this.reset(particle);
      }
      if (container.interactivity.status === Constants.mouseLeaveEvent) {
        this.reset(particle);
      }
    }
  }
  hoverBubbleSize(particle, ratio, divBubble) {
    const container = this.container, modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
    if (modeSize === void 0) {
      return;
    }
    const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
    const pSize = particle.size.value;
    const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
    if (size !== void 0) {
      particle.bubble.radius = size;
    }
  }
  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a, _b, _c;
    const container = this.container, options2 = container.actualOptions, modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options2.interactivity.modes.bubble.opacity;
    if (!modeOpacity) {
      return;
    }
    const optOpacity = particle.options.opacity.value;
    const pOpacity = (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1;
    const opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
    if (opacity !== void 0) {
      particle.bubble.opacity = opacity;
    }
  }
  hoverBubbleColor(particle, ratio, divBubble) {
    const options2 = this.container.actualOptions;
    const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options2.interactivity.modes.bubble;
    if (!particle.bubble.finalColor) {
      const modeColor = bubbleOptions.color;
      if (!modeColor) {
        return;
      }
      const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;
      particle.bubble.finalColor = colorToHsl(bubbleColor);
    }
    if (!particle.bubble.finalColor) {
      return;
    }
    if (bubbleOptions.mix) {
      particle.bubble.color = void 0;
      const pColor = particle.getFillColor();
      particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
    } else {
      particle.bubble.color = particle.bubble.finalColor;
    }
  }
};
function loadExternalBubbleInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalBubble", (container) => new Bubbler(container));
}
var Attractor$1 = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, options2 = container.actualOptions, mouse = container.interactivity.mouse, events = options2.interactivity.events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
    return isInArray(HoverMode.attract, hoverMode) || isInArray(ClickMode.attract, clickMode);
  }
  reset() {
  }
  interact() {
    const container = this.container, options2 = container.actualOptions, mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent, events = options2.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
    if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.attract, hoverMode)) {
      this.hoverAttract();
    } else if (clickEnabled && isInArray(ClickMode.attract, clickMode)) {
      this.clickAttract();
    }
  }
  hoverAttract() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const attractRadius = container.retina.attractModeDistance;
    this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
  }
  processAttract(position, attractRadius, area) {
    const container = this.container;
    const attractOptions = container.actualOptions.interactivity.modes.attract;
    const query = container.particles.quadTree.query(area);
    for (const particle of query) {
      const { dx, dy, distance } = getDistances(particle.position, position);
      const velocity = attractOptions.speed * attractOptions.factor;
      const attractFactor = clamp(calcEasing(1 - distance / attractRadius, attractOptions.easing) * velocity, 0, attractOptions.maxSpeed);
      const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
      particle.position.subFrom(normVec);
    }
  }
  clickAttract() {
    const container = this.container;
    if (!container.attract.finish) {
      if (!container.attract.count) {
        container.attract.count = 0;
      }
      container.attract.count++;
      if (container.attract.count === container.particles.count) {
        container.attract.finish = true;
      }
    }
    if (container.attract.clicking) {
      const mousePos = container.interactivity.mouse.clickPosition;
      if (!mousePos) {
        return;
      }
      const attractRadius = container.retina.attractModeDistance;
      this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    } else if (container.attract.clicking === false) {
      container.attract.particles = [];
    }
    return;
  }
};
function loadExternalAttractInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalAttract", (container) => new Attractor$1(container));
}
var Grabber = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
    return events.onHover.enable && !!mouse.position && isInArray(HoverMode.grab, events.onHover.mode);
  }
  reset() {
  }
  interact() {
    var _a;
    const container = this.container, options2 = container.actualOptions, interactivity2 = options2.interactivity;
    if (interactivity2.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
      const mousePos = container.interactivity.mouse.position;
      if (!mousePos) {
        return;
      }
      const distance = container.retina.grabModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
      for (const particle of query) {
        const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos);
        if (pointDistance <= distance) {
          const grabLineOptions = interactivity2.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
          if (opacityLine <= 0) {
            continue;
          }
          const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;
          if (!container.particles.grabLineColor) {
            const linksOptions = options2.interactivity.modes.grab.links;
            container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
          }
          const colorLine = getLinkColor(particle, void 0, container.particles.grabLineColor);
          if (!colorLine) {
            return;
          }
          container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
        }
      }
    }
  }
};
function loadExternalGrabInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalGrab", (container) => new Grabber(container));
}
var StarDrawer = class {
  getSidesCount(particle) {
    var _a, _b;
    const star = particle.shapeData;
    return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
  }
  draw(context, particle, radius) {
    var _a;
    const star = particle.shapeData;
    const sides = this.getSidesCount(particle);
    const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
    context.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }
};
function loadStarShape(tsParticles2) {
  tsParticles2.addShape("star", new StarDrawer());
}
var ParticlesInteractorBase = class {
  constructor(container) {
    this.container = container;
    this.type = InteractorType.Particles;
  }
};
var Attractor = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  interact(p1) {
    var _a;
    const container = this.container, distance = (_a = p1.retina.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), { dx, dy } = getDistances(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1e3), ay = dy / (rotate.y * 1e3), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {
  }
};
function loadParticlesAttractInteraction(tsParticles2) {
  tsParticles2.addInteractor("particlesAttract", (container) => new Attractor(container));
}
var fixFactor = Math.sqrt(2);
var SquareDrawer = class {
  getSidesCount() {
    return 4;
  }
  draw(context, particle, radius) {
    context.rect(-radius / fixFactor, -radius / fixFactor, radius * 2 / fixFactor, radius * 2 / fixFactor);
  }
};
function loadSquareShape(tsParticles2) {
  const drawer = new SquareDrawer();
  tsParticles2.addShape("edge", drawer);
  tsParticles2.addShape("square", drawer);
}
function updateColorValue$1(delta, value, valueAnimation, max, decrease) {
  var _a;
  const colorValue = value;
  if (!colorValue || !colorValue.enable) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset);
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;
  if (!decrease || colorValue.status === AnimationStatus.increasing) {
    colorValue.value += velocity;
    if (decrease && colorValue.value > max) {
      colorValue.status = AnimationStatus.decreasing;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      colorValue.status = AnimationStatus.increasing;
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateStrokeColor(particle, delta) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
  if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
    return;
  }
  const animationOptions = particle.stroke.color.animation;
  const h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;
  if (h) {
    updateColorValue$1(delta, h, animationOptions.h, 360, false);
  }
  const s2 = (_f = (_e = particle.strokeColor) === null || _e === void 0 ? void 0 : _e.s) !== null && _f !== void 0 ? _f : (_g = particle.color) === null || _g === void 0 ? void 0 : _g.s;
  if (s2) {
    updateColorValue$1(delta, s2, animationOptions.s, 100, true);
  }
  const l = (_j = (_h = particle.strokeColor) === null || _h === void 0 ? void 0 : _h.l) !== null && _j !== void 0 ? _j : (_k = particle.color) === null || _k === void 0 ? void 0 : _k.l;
  if (l) {
    updateColorValue$1(delta, l, animationOptions.l, 100, true);
  }
}
var StrokeColorUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    var _a, _b;
    const container = this.container;
    particle.stroke = particle.options.stroke instanceof Array ? itemFromArray(particle.options.stroke, particle.id, particle.options.reduceDuplicates) : particle.options.stroke;
    particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
    const strokeHslColor = (_a = colorToHsl(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, (_b = particle.stroke.color) === null || _b === void 0 ? void 0 : _b.animation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    var _a, _b, _c, _d;
    const color = (_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color;
    return !particle.destroyed && !particle.spawning && !!color && (((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h.value) !== void 0 && color.animation.h.enable || ((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.s.value) !== void 0 && color.animation.s.enable || ((_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.l.value) !== void 0 && color.animation.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateStrokeColor(particle, delta);
  }
};
function loadStrokeColorUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
function updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a;
  const colorValue = value;
  if (!colorValue || !valueAnimation.enable) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset);
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;
  if (!decrease || colorValue.status === AnimationStatus.increasing) {
    colorValue.value += velocity;
    if (decrease && colorValue.value > max) {
      colorValue.status = AnimationStatus.decreasing;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      colorValue.status = AnimationStatus.increasing;
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  var _a, _b, _c;
  const animationOptions = particle.options.color.animation;
  if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== void 0) {
    updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
  }
  if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== void 0) {
    updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
  }
  if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== void 0) {
    updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
  }
}
var ColorUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = colorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    var _a, _b, _c;
    const animationOptions = particle.options.color.animation;
    return !particle.destroyed && !particle.spawning && (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== void 0 && animationOptions.h.enable || ((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== void 0 && animationOptions.s.enable || ((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== void 0 && animationOptions.l.enable);
  }
  update(particle, delta) {
    updateColor(particle, delta);
  }
};
function loadColorUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
}
function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === void 0 && p2.getRadius() !== void 0) {
    p1.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() === void 0) {
    p2.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() !== void 0) {
    if (p1.getRadius() >= p2.getRadius()) {
      p2.destroy();
    } else {
      p1.destroy();
    }
  }
}
var Collider = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {
  }
  interact(p1) {
    const container = this.container;
    const pos1 = p1.getPosition();
    const radius1 = p1.getRadius();
    const query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (Math.round(pos1.z) !== Math.round(pos2.z)) {
        continue;
      }
      const dist = getDistance(pos1, pos2);
      const radius2 = p2.getRadius();
      const distP = radius1 + radius2;
      if (dist <= distP) {
        this.resolveCollision(p1, p2);
      }
    }
  }
  resolveCollision(p1, p2) {
    switch (p1.options.collisions.mode) {
      case CollisionMode.absorb: {
        this.absorb(p1, p2);
        break;
      }
      case CollisionMode.bounce: {
        bounce(p1, p2);
        break;
      }
      case CollisionMode.destroy: {
        destroy(p1, p2);
        break;
      }
    }
  }
  absorb(p1, p2) {
    const container = this.container;
    const fps = container.fpsLimit / 1e3;
    if (p1.getRadius() === void 0 && p2.getRadius() !== void 0) {
      p1.destroy();
    } else if (p1.getRadius() !== void 0 && p2.getRadius() === void 0) {
      p2.destroy();
    } else if (p1.getRadius() !== void 0 && p2.getRadius() !== void 0) {
      if (p1.getRadius() >= p2.getRadius()) {
        const factor = clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
        p1.size.value += factor;
        p2.size.value -= factor;
        if (p2.getRadius() <= container.retina.pixelRatio) {
          p2.size.value = 0;
          p2.destroy();
        }
      } else {
        const factor = clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
        p1.size.value -= factor;
        p2.size.value += factor;
        if (p1.getRadius() <= container.retina.pixelRatio) {
          p1.size.value = 0;
          p1.destroy();
        }
      }
    }
  }
};
function loadParticlesCollisionsInteraction(tsParticles2) {
  tsParticles2.addInteractor("particlesCollisions", (container) => new Collider(container));
}
function updateAngle(particle, delta) {
  var _a;
  const rotate = particle.rotate;
  if (!rotate) {
    return;
  }
  const rotateOptions = particle.options.rotate;
  const rotateAnimation = rotateOptions.animation;
  const speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;
  if (!rotateAnimation.enable) {
    return;
  }
  switch (rotate.status) {
    case AnimationStatus.increasing:
      rotate.value += speed;
      if (rotate.value > max) {
        rotate.value -= max;
      }
      break;
    case AnimationStatus.decreasing:
    default:
      rotate.value -= speed;
      if (rotate.value < 0) {
        rotate.value += max;
      }
      break;
  }
}
var AngleUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === RotateDirection.random) {
      const index2 = Math.floor(Math.random() * 2);
      rotateDirection = index2 > 0 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
    }
    switch (rotateDirection) {
      case RotateDirection.counterClockwise:
      case "counterClockwise":
        particle.rotate.status = AnimationStatus.decreasing;
        break;
      case RotateDirection.clockwise:
        particle.rotate.status = AnimationStatus.increasing;
        break;
    }
    const rotateAnimation = particle.options.rotate.animation;
    if (rotateAnimation.enable) {
      particle.rotate.velocity = rotateAnimation.speed / 360 * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= Math.random();
      }
    }
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    const rotateAnimation = rotate.animation;
    return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateAngle(particle, delta);
  }
};
function loadAngleUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("angle", (container) => new AngleUpdater(container));
}
function bounceHorizontal(data) {
  if (!(data.outMode === OutMode.bounce || data.outMode === OutMode.bounceHorizontal || data.outMode === "bounceHorizontal" || data.outMode === OutMode.split)) {
    return;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === OutModeDirection.left && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0) {
    data.particle.position.x = minPos;
  }
  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode === OutMode.bounce || data.outMode === OutMode.bounceVertical || data.outMode === "bounceVertical" || data.outMode === OutMode.split) {
    const velocity = data.particle.velocity.y;
    let bounced = false;
    if (data.direction === OutModeDirection.bottom && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === OutModeDirection.top && data.bounds.top <= 0 && velocity < 0) {
      const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
      data.particle.velocity.y *= -newVelocity;
      bounced = true;
    }
    if (!bounced) {
      return;
    }
    const minPos = data.offset.y + data.size;
    if (data.bounds.bottom >= data.canvasSize.height) {
      data.particle.position.y = data.canvasSize.height - minPos;
    } else if (data.bounds.top <= 0) {
      data.particle.position.y = minPos;
    }
    if (data.outMode === OutMode.split) {
      data.particle.destroy();
    }
  }
}
var OutOfCanvasUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init() {
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    var _a, _b, _c, _d;
    const outModes = particle.options.move.outModes;
    this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, OutModeDirection.bottom);
    this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, OutModeDirection.left);
    this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, OutModeDirection.right);
    this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, OutModeDirection.top);
  }
  updateOutMode(particle, delta, outMode, direction) {
    switch (outMode) {
      case OutMode.bounce:
      case OutMode.bounceVertical:
      case OutMode.bounceHorizontal:
      case "bounceVertical":
      case "bounceHorizontal":
      case OutMode.split:
        this.bounce(particle, delta, direction, outMode);
        break;
      case OutMode.destroy:
        this.destroy(particle, direction);
        break;
      case OutMode.out:
        this.out(particle, direction);
        break;
      case OutMode.none:
      default:
        this.none(particle, direction);
        break;
    }
  }
  destroy(particle, direction) {
    const container = this.container;
    if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
      return;
    }
    container.particles.remove(particle, void 0, true);
  }
  out(particle, direction) {
    const container = this.container;
    if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
      return;
    }
    const wrap = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
      bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
      left: -particle.getRadius() - particle.offset.x,
      right: canvasSize.width + particle.getRadius() + particle.offset.x,
      top: -particle.getRadius() - particle.offset.y
    }, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
    if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width + particle.offset.x) {
      particle.position.x = newPos.left;
      particle.initialPosition.x = particle.position.x;
      if (!wrap) {
        particle.position.y = Math.random() * canvasSize.height;
        particle.initialPosition.y = particle.position.y;
      }
    } else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
      particle.position.x = newPos.right;
      particle.initialPosition.x = particle.position.x;
      if (!wrap) {
        particle.position.y = Math.random() * canvasSize.height;
        particle.initialPosition.y = particle.position.y;
      }
    }
    if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height + particle.offset.y) {
      if (!wrap) {
        particle.position.x = Math.random() * canvasSize.width;
        particle.initialPosition.x = particle.position.x;
      }
      particle.position.y = newPos.top;
      particle.initialPosition.y = particle.position.y;
    } else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
      if (!wrap) {
        particle.position.x = Math.random() * canvasSize.width;
        particle.initialPosition.x = particle.position.x;
      }
      particle.position.y = newPos.bottom;
      particle.initialPosition.y = particle.position.y;
    }
  }
  bounce(particle, delta, direction, outMode) {
    const container = this.container;
    let handled = false;
    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== void 0) {
        handled = plugin.particleBounce(particle, delta, direction);
      }
      if (handled) {
        break;
      }
    }
    if (handled) {
      return;
    }
    const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
    bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
    bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
  }
  none(particle, direction) {
    if (particle.options.move.distance.horizontal && (direction === OutModeDirection.left || direction === OutModeDirection.right) || particle.options.move.distance.vertical && (direction === OutModeDirection.top || direction === OutModeDirection.bottom)) {
      return;
    }
    const gravityOptions = particle.options.move.gravity, container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }
      if (!isPointInside(particle.position, container.canvas.size, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;
      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === OutModeDirection.bottom || gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top) {
        container.particles.remove(particle);
      }
    }
  }
};
function loadOutModesUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("outModes", (container) => new OutOfCanvasUpdater(container));
}
var Repulser = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, options2 = container.actualOptions, mouse = container.interactivity.mouse, events = options2.interactivity.events, divs = events.onDiv, divRepulse = isDivModeEnabled(DivMode.repulse, divs);
    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
    return isInArray(HoverMode.repulse, hoverMode) || isInArray(ClickMode.repulse, clickMode) || divRepulse;
  }
  reset() {
  }
  interact() {
    const container = this.container, options2 = container.actualOptions, mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent, events = options2.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.repulse, hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && isInArray(ClickMode.repulse, clickMode)) {
      this.clickRepulse();
    } else {
      divModeExecute(DivMode.repulse, divs, (selector, div) => this.singleSelectorRepulse(selector, div));
    }
  }
  singleSelectorRepulse(selector, div) {
    const container = this.container, query = document.querySelectorAll(selector);
    if (!query.length) {
      return;
    }
    query.forEach((item) => {
      const elem = item, pxRatio = container.retina.pixelRatio, pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      }, repulseRadius = elem.offsetWidth / 2 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = container.actualOptions.interactivity.modes.repulse.divs, divRepulse = divMode(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }
  hoverRepulse() {
    const container = this.container, mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const repulseRadius = container.retina.repulseModeDistance;
    this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
  }
  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;
    const container = this.container, query = container.particles.quadTree.query(area), repulseOptions = container.actualOptions.interactivity.modes.repulse;
    for (const particle of query) {
      const { dx, dy, distance } = getDistances(particle.position, position), velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor, repulseFactor = clamp(calcEasing(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed), normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }
  clickRepulse() {
    const container = this.container;
    if (!container.repulse.finish) {
      if (!container.repulse.count) {
        container.repulse.count = 0;
      }
      container.repulse.count++;
      if (container.repulse.count === container.particles.count) {
        container.repulse.finish = true;
      }
    }
    if (container.repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance, repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container.interactivity.mouse.clickPosition;
      if (mouseClickPos === void 0) {
        return;
      }
      const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range);
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d2 = distance ** 2, velocity = container.actualOptions.interactivity.modes.repulse.speed, force = -repulseRadius * velocity / d2;
        if (d2 <= repulseRadius) {
          container.repulse.particles.push(particle);
          const vect = Vector.create(dx, dy);
          vect.length = force;
          particle.velocity.setTo(vect);
        }
      }
    } else if (container.repulse.clicking === false) {
      for (const particle of container.repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.repulse.particles = [];
    }
  }
};
function loadExternalRepulseInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalRepulse", (container) => new Repulser(container));
}
var LineDrawer = class {
  getSidesCount() {
    return 1;
  }
  draw(context, particle, radius) {
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
  }
};
function loadLineShape(tsParticles2) {
  tsParticles2.addShape("line", new LineDrawer());
}
var Bouncer = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled() {
    const container = this.container, options2 = container.actualOptions, mouse = container.interactivity.mouse, events = options2.interactivity.events, divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray(HoverMode.bounce, events.onHover.mode) || isDivModeEnabled(DivMode.bounce, divs);
  }
  interact() {
    const container = this.container, options2 = container.actualOptions, events = options2.interactivity.events, mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.bounce, hoverMode)) {
      this.processMouseBounce();
    } else {
      divModeExecute(DivMode.bounce, divs, (selector, div) => this.singleSelectorBounce(selector, div));
    }
  }
  reset() {
  }
  processMouseBounce() {
    const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
    if (mousePos) {
      this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    }
  }
  singleSelectorBounce(selector, div) {
    const container = this.container;
    const query = document.querySelectorAll(selector);
    if (!query.length) {
      return;
    }
    query.forEach((item) => {
      const elem = item, pxRatio = container.retina.pixelRatio, pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      }, radius = elem.offsetWidth / 2 * pxRatio, tolerance = 10 * pxRatio;
      const area = div.type === DivType.circle ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
      this.processBounce(pos, radius, area);
    });
  }
  processBounce(position, radius, area) {
    const query = this.container.particles.quadTree.query(area);
    for (const particle of query) {
      if (area instanceof Circle) {
        circleBounce(circleBounceDataFromParticle(particle), {
          position,
          radius,
          mass: radius ** 2 * Math.PI / 2,
          velocity: Vector.origin,
          factor: Vector.origin
        });
      } else if (area instanceof Rectangle) {
        rectBounce(particle, calculateBounds(position, radius));
      }
    }
  }
};
function loadExternalBounceInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalBounce", (container) => new Bouncer(container));
}
var validTypes = ["text", "character", "char"];
var TextDrawer = class {
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options2 = container.actualOptions;
    if (validTypes.find((t) => isInArray(t, options2.particles.shape.type))) {
      const shapeOptions = validTypes.map((t) => options2.particles.shape.options[t]).find((t) => !!t);
      if (shapeOptions instanceof Array) {
        const promises = [];
        for (const character of shapeOptions) {
          promises.push(loadFont(character));
        }
        await Promise.allSettled(promises);
      } else {
        if (shapeOptions !== void 0) {
          await loadFont(shapeOptions);
        }
      }
    }
  }
  draw(context, particle, radius, opacity) {
    var _a, _b, _c;
    const character = particle.shapeData;
    if (character === void 0) {
      return;
    }
    const textData = character.value;
    if (textData === void 0) {
      return;
    }
    const textParticle = particle;
    if (textParticle.text === void 0) {
      textParticle.text = textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
    }
    const text = textParticle.text;
    const style = (_a = character.style) !== null && _a !== void 0 ? _a : "";
    const weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400";
    const size = Math.round(radius) * 2;
    const font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana";
    const fill = particle.fill;
    const offsetX = text.length * radius / 2;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -offsetX,
      y: radius / 2
    };
    context.globalAlpha = opacity;
    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }
    context.globalAlpha = 1;
  }
};
function loadTextShape(tsParticles2) {
  const drawer = new TextDrawer();
  for (const type of validTypes) {
    tsParticles2.addShape(type, drawer);
  }
}
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  let distance = getDistance(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const pos2NE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y
  };
  distance = getDistance(pos1, pos2NE);
  if (distance <= optDistance) {
    return distance;
  }
  const pos2SE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y - canvasSize.height
  };
  distance = getDistance(pos1, pos2SE);
  if (distance <= optDistance) {
    return distance;
  }
  const pos2SW = {
    x: pos2.x,
    y: pos2.y - canvasSize.height
  };
  distance = getDistance(pos1, pos2SW);
  return distance;
}
var Linker = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  isEnabled(particle) {
    return particle.options.links.enable;
  }
  reset() {
  }
  interact(p1) {
    var _a;
    p1.links = [];
    const pos1 = p1.getPosition();
    const container = this.container;
    const canvasSize = container.canvas.size;
    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links;
    const optOpacity = linkOpt1.opacity;
    const optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
    const warp = linkOpt1.warp;
    const range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance);
    const query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || p1.links.map((t) => t.destination).indexOf(p2) !== -1 || p2.links.map((t) => t.destination).indexOf(p1) !== -1) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        return;
      }
      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this.setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }
  setColor(p1) {
    const container = this.container;
    const linksOptions = p1.options.links;
    let linkColor = linksOptions.id === void 0 ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);
    if (!linkColor) {
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      if (linksOptions.id === void 0) {
        container.particles.linksColor = linkColor;
      } else {
        container.particles.linksColors.set(linksOptions.id, linkColor);
      }
    }
  }
};
var LinkInstance = class {
  constructor(container) {
    this.container = container;
  }
  particleCreated(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }
  particleDestroyed(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }
  drawParticle(context, particle) {
    const linkParticle = particle;
    const container = this.container;
    const particles2 = container.particles;
    const pOptions = particle.options;
    if (linkParticle.links.length > 0) {
      context.save();
      const p1Links = linkParticle.links.filter((l) => {
        const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);
        return linkFreq <= pOptions.links.frequency;
      });
      for (const link of p1Links) {
        const p2 = link.destination;
        if (pOptions.links.triangles.enable) {
          const links = p1Links.map((l) => l.destination);
          const vertices = p2.links.filter((t) => {
            const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
            return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
          });
          if (vertices.length) {
            for (const vertex of vertices) {
              const p3 = vertex.destination;
              const triangleFreq = particles2.getTriangleFrequency(linkParticle, p2, p3);
              if (triangleFreq > pOptions.links.triangles.frequency) {
                continue;
              }
              this.drawLinkTriangle(linkParticle, link, vertex);
            }
          }
        }
        if (link.opacity > 0 && container.retina.linksWidth > 0) {
          this.drawLinkLine(linkParticle, link);
        }
      }
      context.restore();
    }
  }
  drawLinkTriangle(p1, link1, link2) {
    var _a;
    const container = this.container;
    const options2 = container.actualOptions;
    const p2 = link1.destination;
    const p3 = link2.destination;
    const triangleOptions = p1.options.links.triangles;
    const opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
    if (opacityTriangle <= 0) {
      return;
    }
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const pos3 = p3.getPosition();
    container.canvas.draw((ctx) => {
      if (getDistance(pos1, pos2) > container.retina.linksDistance || getDistance(pos3, pos2) > container.retina.linksDistance || getDistance(pos3, pos1) > container.retina.linksDistance) {
        return;
      }
      let colorTriangle = colorToRgb(triangleOptions.color);
      if (!colorTriangle) {
        const linksOptions = p1.options.links;
        const linkColor = linksOptions.id !== void 0 ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorTriangle = getLinkColor(p1, p2, linkColor);
      }
      if (!colorTriangle) {
        return;
      }
      drawLinkTriangle(ctx, pos1, pos2, pos3, options2.backgroundMask.enable, options2.backgroundMask.composite, colorTriangle, opacityTriangle);
    });
  }
  drawLinkLine(p1, link) {
    const container = this.container;
    const options2 = container.actualOptions;
    const p2 = link.destination;
    let opacity = link.opacity;
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    container.canvas.draw((ctx) => {
      var _a, _b;
      let colorLine;
      const twinkle = p1.options.twinkle.lines;
      if (twinkle.enable) {
        const twinkleFreq = twinkle.frequency;
        const twinkleRgb = colorToRgb(twinkle.color);
        const twinkling = Math.random() < twinkleFreq;
        if (twinkling && twinkleRgb !== void 0) {
          colorLine = twinkleRgb;
          opacity = twinkle.opacity;
        }
      }
      if (!colorLine) {
        const linksOptions = p1.options.links;
        const linkColor = linksOptions.id !== void 0 ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorLine = getLinkColor(p1, p2, linkColor);
      }
      if (!colorLine) {
        return;
      }
      const width = (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth;
      const maxDistance = (_b = p1.retina.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
      drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options2.backgroundMask.enable, options2.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
    });
  }
};
var Plugin$2 = class {
  constructor() {
    this.id = "links";
  }
  getPlugin(container) {
    return new LinkInstance(container);
  }
  needsPlugin() {
    return true;
  }
  loadOptions() {
  }
};
function loadPlugin(tsParticles2) {
  const plugin = new Plugin$2();
  tsParticles2.addPlugin(plugin);
}
function loadInteraction(tsParticles2) {
  tsParticles2.addInteractor("particlesLinks", (container) => new Linker(container));
}
function loadParticlesLinksInteraction(tsParticles2) {
  loadInteraction(tsParticles2);
  loadPlugin(tsParticles2);
}
function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.size.animation.destroy) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateSize(particle, delta) {
  var _a, _b, _c, _d;
  const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const minValue = particle.size.min;
  const maxValue = particle.size.max;
  if (!(!particle.destroyed && particle.size.enable && (((_b = particle.size.loops) !== null && _b !== void 0 ? _b : 0) <= 0 || ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0)))) {
    return;
  }
  switch (particle.size.status) {
    case AnimationStatus.increasing:
      if (particle.size.value >= maxValue) {
        particle.size.status = AnimationStatus.decreasing;
        if (!particle.size.loops) {
          particle.size.loops = 0;
        }
        particle.size.loops++;
      } else {
        particle.size.value += sizeVelocity;
      }
      break;
    case AnimationStatus.decreasing:
      if (particle.size.value <= minValue) {
        particle.size.status = AnimationStatus.increasing;
        if (!particle.size.loops) {
          particle.size.loops = 0;
        }
        particle.size.loops++;
      } else {
        particle.size.value -= sizeVelocity;
      }
  }
  checkDestroy(particle, particle.size.value, minValue, maxValue);
  if (!particle.destroyed) {
    particle.size.value = clamp(particle.size.value, minValue, maxValue);
  }
}
var SizeUpdater = class {
  init() {
  }
  isEnabled(particle) {
    var _a, _b, _c;
    return !particle.destroyed && !particle.spawning && particle.size.enable && (((_a = particle.size.loops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.size.loops) !== null && _b !== void 0 ? _b : 0) < ((_c = particle.size.maxLoops) !== null && _c !== void 0 ? _c : 0));
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateSize(particle, delta);
  }
};
function loadSizeUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("size", () => new SizeUpdater());
}
function loadSlim(tsParticles2) {
  loadExternalAttractInteraction(tsParticles2);
  loadExternalBounceInteraction(tsParticles2);
  loadExternalBubbleInteraction(tsParticles2);
  loadExternalConnectInteraction(tsParticles2);
  loadExternalGrabInteraction(tsParticles2);
  loadExternalRepulseInteraction(tsParticles2);
  loadParticlesAttractInteraction(tsParticles2);
  loadParticlesCollisionsInteraction(tsParticles2);
  loadParticlesLinksInteraction(tsParticles2);
  loadCircleShape(tsParticles2);
  loadImageShape(tsParticles2);
  loadLineShape(tsParticles2);
  loadPolygonShape(tsParticles2);
  loadSquareShape(tsParticles2);
  loadStarShape(tsParticles2);
  loadTextShape(tsParticles2);
  loadLifeUpdater(tsParticles2);
  loadOpacityUpdater(tsParticles2);
  loadSizeUpdater(tsParticles2);
  loadAngleUpdater(tsParticles2);
  loadColorUpdater(tsParticles2);
  loadStrokeColorUpdater(tsParticles2);
  loadOutModesUpdater(tsParticles2);
}
var TrailMaker = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.delay = 0;
  }
  interact(delta) {
    var _a, _b, _c, _d;
    if (!this.container.retina.reduceFactor) {
      return;
    }
    const container = this.container, options2 = container.actualOptions, trailOptions = options2.interactivity.modes.trail, optDelay = trailOptions.delay * 1e3 / this.container.retina.reduceFactor;
    if (this.delay < optDelay) {
      this.delay += delta.value;
    }
    if (this.delay < optDelay) {
      return;
    }
    let canEmit = true;
    if (trailOptions.pauseOnStop) {
      if (container.interactivity.mouse.position === this.lastPosition || ((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.lastPosition) === null || _b === void 0 ? void 0 : _b.x) && ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this.lastPosition) === null || _d === void 0 ? void 0 : _d.y)) {
        canEmit = false;
      }
    }
    if (container.interactivity.mouse.position) {
      this.lastPosition = {
        x: container.interactivity.mouse.position.x,
        y: container.interactivity.mouse.position.y
      };
    } else {
      delete this.lastPosition;
    }
    if (canEmit) {
      container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
    }
    this.delay -= optDelay;
  }
  isEnabled() {
    const container = this.container, options2 = container.actualOptions, mouse = container.interactivity.mouse, events = options2.interactivity.events;
    return mouse.clicking && mouse.inside && !!mouse.position && isInArray(ClickMode.trail, events.onClick.mode) || mouse.inside && !!mouse.position && isInArray(HoverMode.trail, events.onHover.mode);
  }
  reset() {
  }
};
function loadExternalTrailInteraction(tsParticles2) {
  tsParticles2.addInteractor("externalTrail", (container) => new TrailMaker(container));
}
function updateTilt(particle, delta) {
  var _a;
  if (!particle.tilt) {
    return;
  }
  const tilt = particle.options.tilt;
  const tiltAnimation = tilt.animation;
  const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;
  if (!tiltAnimation.enable) {
    return;
  }
  switch (particle.tilt.status) {
    case AnimationStatus.increasing:
      particle.tilt.value += speed;
      if (particle.tilt.value > max) {
        particle.tilt.value -= max;
      }
      break;
    case AnimationStatus.decreasing:
    default:
      particle.tilt.value -= speed;
      if (particle.tilt.value < 0) {
        particle.tilt.value += max;
      }
      break;
  }
}
var TiltUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const tiltOptions = particle.options.tilt;
    particle.tilt = {
      enable: tiltOptions.enable,
      value: getRangeValue(tiltOptions.value) * Math.PI / 180,
      sinDirection: Math.random() >= 0.5 ? 1 : -1,
      cosDirection: Math.random() >= 0.5 ? 1 : -1
    };
    let tiltDirection = tiltOptions.direction;
    if (tiltDirection === TiltDirection.random) {
      const index2 = Math.floor(Math.random() * 2);
      tiltDirection = index2 > 0 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
    }
    switch (tiltDirection) {
      case TiltDirection.counterClockwise:
      case "counterClockwise":
        particle.tilt.status = AnimationStatus.decreasing;
        break;
      case TiltDirection.clockwise:
        particle.tilt.status = AnimationStatus.increasing;
        break;
    }
    const tiltAnimation = particle.options.tilt.animation;
    if (tiltAnimation.enable) {
      particle.tilt.velocity = tiltAnimation.speed / 360 * this.container.retina.reduceFactor;
      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= Math.random();
      }
    }
  }
  isEnabled(particle) {
    const tilt = particle.options.tilt;
    const tiltAnimation = tilt.animation;
    return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateTilt(particle, delta);
  }
};
function loadTiltUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("tilt", (container) => new TiltUpdater(container));
}
function updateWobble(particle, delta) {
  var _a;
  const wobble = particle.options.wobble;
  if (!wobble.enable || !particle.wobble) {
    return;
  }
  const speed = particle.wobble.speed * delta.factor;
  const distance = ((_a = particle.retina.wobbleDistance) !== null && _a !== void 0 ? _a : 0) * delta.factor / (1e3 / 60);
  const max = 2 * Math.PI;
  particle.wobble.angle += speed;
  if (particle.wobble.angle > max) {
    particle.wobble.angle -= max;
  }
  particle.position.x += distance * Math.cos(particle.wobble.angle);
  particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}
var WobbleUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const wobbleOpt = particle.options.wobble;
    if (wobbleOpt.enable) {
      particle.wobble = {
        angle: Math.random() * Math.PI * 2,
        speed: getRangeValue(wobbleOpt.speed) / 360
      };
    } else {
      particle.wobble = {
        angle: 0,
        speed: 0
      };
    }
    particle.retina.wobbleDistance = getRangeValue(wobbleOpt.distance) * this.container.retina.pixelRatio;
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.options.wobble.enable;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateWobble(particle, delta);
  }
};
function loadWobbleUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
var AbsorberInstance = class {
  constructor(absorbers, container, options2, position) {
    var _a, _b, _c;
    this.absorbers = absorbers;
    this.container = container;
    this.initialPosition = position ? Vector.create(position.x, position.y) : void 0;
    this.options = options2;
    this.dragging = false;
    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = getRangeValue(options2.size.value) * container.retina.pixelRatio;
    this.mass = this.size * options2.size.density * container.retina.reduceFactor;
    const limit = options2.size.limit;
    this.limit = limit !== void 0 ? limit * container.retina.pixelRatio * container.retina.reduceFactor : limit;
    const color = typeof options2.color === "string" ? { value: options2.color } : options2.color;
    this.color = (_a = colorToRgb(color)) !== null && _a !== void 0 ? _a : {
      b: 0,
      g: 0,
      r: 0
    };
    this.position = (_c = (_b = this.initialPosition) === null || _b === void 0 ? void 0 : _b.copy()) !== null && _c !== void 0 ? _c : this.calcPosition();
  }
  attract(particle) {
    const container = this.container;
    const options2 = this.options;
    if (options2.draggable) {
      const mouse = container.interactivity.mouse;
      if (mouse.clicking && mouse.downPosition) {
        const mouseDist = getDistance(this.position, mouse.downPosition);
        if (mouseDist <= this.size) {
          this.dragging = true;
        }
      } else {
        this.dragging = false;
      }
      if (this.dragging && mouse.position) {
        this.position.x = mouse.position.x;
        this.position.y = mouse.position.y;
      }
    }
    const pos = particle.getPosition();
    const { dx, dy, distance } = getDistances(this.position, pos);
    const v = Vector.create(dx, dy);
    v.length = this.mass / Math.pow(distance, 2) * container.retina.reduceFactor;
    if (distance < this.size + particle.getRadius()) {
      const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;
      if (this.size > particle.getRadius() && distance < this.size - particle.getRadius() || particle.absorberOrbit !== void 0 && particle.absorberOrbit.length < 0) {
        if (options2.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;
          this.updateParticlePosition(particle, v);
        }
      } else {
        if (options2.destroy) {
          particle.size.value -= sizeFactor;
        }
        this.updateParticlePosition(particle, v);
      }
      if (this.limit === void 0 || this.size < this.limit) {
        this.size += sizeFactor;
      }
      this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
    } else {
      this.updateParticlePosition(particle, v);
    }
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size) ? initialPosition : this.calcPosition();
  }
  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = getStyleFromRgb(this.color, this.opacity);
    context.fill();
  }
  calcPosition() {
    var _a, _b;
    const container = this.container;
    const percentPosition = this.options.position;
    return Vector.create(((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100 * container.canvas.size.width, ((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100 * container.canvas.size.height);
  }
  updateParticlePosition(particle, v) {
    var _a;
    if (particle.destroyed) {
      return;
    }
    const container = this.container;
    const canvasSize = container.canvas.size;
    if (particle.needsNewPosition) {
      const pSize = particle.getRadius();
      particle.position.x = (canvasSize.width - pSize * 2) * (1 + (Math.random() * 0.2 - 0.1)) + pSize;
      particle.position.y = (canvasSize.height - pSize * 2) * (1 + (Math.random() * 0.2 - 0.1)) + pSize;
      particle.needsNewPosition = false;
    }
    if (this.options.orbits) {
      if (particle.absorberOrbit === void 0) {
        particle.absorberOrbit = Vector.create(0, 0);
        particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
        particle.absorberOrbit.angle = Math.random() * Math.PI * 2;
      }
      if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
        const minSize = Math.min(canvasSize.width, canvasSize.height);
        particle.absorberOrbit.length = minSize * (1 + (Math.random() * 0.2 - 0.1));
      }
      if (particle.absorberOrbitDirection === void 0) {
        particle.absorberOrbitDirection = particle.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
      }
      const orbitRadius = particle.absorberOrbit.length;
      const orbitAngle = particle.absorberOrbit.angle;
      const orbitDirection = particle.absorberOrbitDirection;
      particle.velocity.x = 0;
      particle.velocity.y = 0;
      const updateFunc = {
        x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
        y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos
      };
      particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
      particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
      particle.absorberOrbit.length -= v.length;
      particle.absorberOrbit.angle += ((_a = particle.retina.moveSpeed) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio / 100 * container.retina.reduceFactor;
    } else {
      const addV = Vector.origin;
      addV.length = v.length;
      addV.angle = v.angle;
      particle.velocity.addTo(addV);
    }
  }
};
var AbsorberSize = class extends ValueWithRandom {
  constructor() {
    super();
    this.density = 5;
    this.random.minimumValue = 1;
    this.value = 50;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.density !== void 0) {
      this.density = data.density;
    }
    if (data.limit !== void 0) {
      this.limit = data.limit;
    }
    if (data.limit !== void 0) {
      this.limit = data.limit;
    }
  }
};
var Absorber = class {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.size = new AbsorberSize();
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.draggable !== void 0) {
      this.draggable = data.draggable;
    }
    this.name = data.name;
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.position !== void 0) {
      this.position = {
        x: data.position.x,
        y: data.position.y
      };
    }
    if (data.size !== void 0) {
      this.size.load(data.size);
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
    if (data.orbits !== void 0) {
      this.orbits = data.orbits;
    }
  }
};
var AbsorberClickMode;
(function(AbsorberClickMode2) {
  AbsorberClickMode2["absorber"] = "absorber";
})(AbsorberClickMode || (AbsorberClickMode = {}));
var Absorbers = class {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];
    const overridableContainer = container;
    overridableContainer.getAbsorber = (idxOrName) => idxOrName === void 0 || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find((t) => t.name === idxOrName);
    overridableContainer.addAbsorber = (options2, position) => this.addAbsorber(options2, position);
  }
  init(options2) {
    var _a, _b;
    if (!options2) {
      return;
    }
    if (options2.absorbers) {
      if (options2.absorbers instanceof Array) {
        this.absorbers = options2.absorbers.map((s2) => {
          const tmp = new Absorber();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.absorbers instanceof Array) {
          this.absorbers = new Absorber();
        }
        this.absorbers.load(options2.absorbers);
      }
    }
    const interactivityAbsorbers = (_b = (_a = options2.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
    if (interactivityAbsorbers) {
      if (interactivityAbsorbers instanceof Array) {
        this.interactivityAbsorbers = interactivityAbsorbers.map((s2) => {
          const tmp = new Absorber();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.interactivityAbsorbers instanceof Array) {
          this.interactivityAbsorbers = new Absorber();
        }
        this.interactivityAbsorbers.load(interactivityAbsorbers);
      }
    }
    if (this.absorbers instanceof Array) {
      for (const absorberOptions of this.absorbers) {
        this.addAbsorber(absorberOptions);
      }
    } else {
      this.addAbsorber(this.absorbers);
    }
  }
  particleUpdate(particle) {
    for (const absorber of this.array) {
      absorber.attract(particle);
      if (particle.destroyed) {
        break;
      }
    }
  }
  draw(context) {
    for (const absorber of this.array) {
      context.save();
      absorber.draw(context);
      context.restore();
    }
  }
  stop() {
    this.array = [];
  }
  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }
  handleClickMode(mode) {
    const container = this.container;
    const absorberOptions = this.absorbers;
    const modeAbsorbers = this.interactivityAbsorbers;
    if (mode === AbsorberClickMode.absorber) {
      let absorbersModeOptions;
      if (modeAbsorbers instanceof Array) {
        if (modeAbsorbers.length > 0) {
          absorbersModeOptions = itemFromArray(modeAbsorbers);
        }
      } else {
        absorbersModeOptions = modeAbsorbers;
      }
      const absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : absorberOptions instanceof Array ? itemFromArray(absorberOptions) : absorberOptions;
      const aPosition = container.interactivity.mouse.clickPosition;
      this.addAbsorber(absorbersOptions, aPosition);
    }
  }
  addAbsorber(options2, position) {
    const absorber = new AbsorberInstance(this, this.container, options2, position);
    this.array.push(absorber);
    return absorber;
  }
  removeAbsorber(absorber) {
    const index2 = this.array.indexOf(absorber);
    if (index2 >= 0) {
      this.array.splice(index2, 1);
    }
  }
};
var Plugin$1 = class {
  constructor() {
    this.id = "absorbers";
  }
  getPlugin(container) {
    return new Absorbers(container);
  }
  needsPlugin(options2) {
    var _a, _b, _c;
    if (options2 === void 0) {
      return false;
    }
    const absorbers = options2.absorbers;
    let loadAbsorbers = false;
    if (absorbers instanceof Array) {
      if (absorbers.length) {
        loadAbsorbers = true;
      }
    } else if (absorbers !== void 0) {
      loadAbsorbers = true;
    } else if (((_c = (_b = (_a = options2.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && isInArray(AbsorberClickMode.absorber, options2.interactivity.events.onClick.mode)) {
      loadAbsorbers = true;
    }
    return loadAbsorbers;
  }
  loadOptions(options2, source) {
    var _a, _b;
    if (!this.needsPlugin(options2) && !this.needsPlugin(source)) {
      return;
    }
    const optionsCast = options2;
    if (source === null || source === void 0 ? void 0 : source.absorbers) {
      if ((source === null || source === void 0 ? void 0 : source.absorbers) instanceof Array) {
        optionsCast.absorbers = source === null || source === void 0 ? void 0 : source.absorbers.map((s2) => {
          const tmp = new Absorber();
          tmp.load(s2);
          return tmp;
        });
      } else {
        let absorberOptions = optionsCast.absorbers;
        if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === void 0) {
          optionsCast.absorbers = absorberOptions = new Absorber();
        }
        absorberOptions.load(source === null || source === void 0 ? void 0 : source.absorbers);
      }
    }
    const interactivityAbsorbers = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers;
    if (interactivityAbsorbers) {
      if (interactivityAbsorbers instanceof Array) {
        optionsCast.interactivity.modes.absorbers = interactivityAbsorbers.map((s2) => {
          const tmp = new Absorber();
          tmp.load(s2);
          return tmp;
        });
      } else {
        let absorberOptions = optionsCast.interactivity.modes.absorbers;
        if ((absorberOptions === null || absorberOptions === void 0 ? void 0 : absorberOptions.load) === void 0) {
          optionsCast.interactivity.modes.absorbers = absorberOptions = new Absorber();
        }
        absorberOptions.load(interactivityAbsorbers);
      }
    }
  }
};
function loadAbsorbersPlugin(tsParticles2) {
  const plugin = new Plugin$1();
  tsParticles2.addPlugin(plugin);
}
var EmitterSize = class {
  constructor() {
    this.mode = SizeMode.percent;
    this.height = 0;
    this.width = 0;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.height !== void 0) {
      this.height = data.height;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
  }
};
var shapes = new Map();
var ShapeManager = class {
  static addShape(name, drawer) {
    if (!ShapeManager.getShape(name)) {
      shapes.set(name, drawer);
    }
  }
  static getShape(name) {
    return shapes.get(name);
  }
  static getSupportedShapes() {
    return shapes.keys();
  }
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmitterInstance_firstSpawn;
var _EmitterInstance_startParticlesAdded;
var EmitterInstance = class {
  constructor(emitters, container, emitterOptions, position) {
    var _a, _b, _c, _d, _e, _f;
    var _g;
    this.emitters = emitters;
    this.container = container;
    _EmitterInstance_firstSpawn.set(this, void 0);
    _EmitterInstance_startParticlesAdded.set(this, void 0);
    this.currentDuration = 0;
    this.currentEmitDelay = 0;
    this.currentSpawnDelay = 0;
    this.initialPosition = position;
    this.emitterOptions = deepExtend({}, emitterOptions);
    this.spawnDelay = ((_a = this.emitterOptions.life.delay) !== null && _a !== void 0 ? _a : 0) * 1e3 / this.container.retina.reduceFactor;
    this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
    this.name = emitterOptions.name;
    this.shape = ShapeManager.getShape(emitterOptions.shape);
    this.fill = emitterOptions.fill;
    __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.emitterOptions.life.wait, "f");
    __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");
    let particlesOptions = deepExtend({}, this.emitterOptions.particles);
    particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : particlesOptions = {};
    (_c = particlesOptions.move) !== null && _c !== void 0 ? _c : particlesOptions.move = {};
    (_d = (_g = particlesOptions.move).direction) !== null && _d !== void 0 ? _d : _g.direction = this.emitterOptions.direction;
    if (this.emitterOptions.spawnColor !== void 0) {
      this.spawnColor = colorToHsl(this.emitterOptions.spawnColor);
    }
    this.paused = !this.emitterOptions.autoPlay;
    this.particlesOptions = particlesOptions;
    this.size = (_e = this.emitterOptions.size) !== null && _e !== void 0 ? _e : (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: SizeMode.percent,
        width: 0
      });
      return size;
    })();
    this.lifeCount = (_f = this.emitterOptions.life.count) !== null && _f !== void 0 ? _f : -1;
    this.immortal = this.lifeCount <= 0;
    this.play();
  }
  externalPlay() {
    this.paused = false;
    this.play();
  }
  externalPause() {
    this.paused = true;
    this.pause();
  }
  play() {
    var _a;
    if (this.paused) {
      return;
    }
    if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal || !this.emitterOptions.life.count) && (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0))) {
      if (this.emitDelay === void 0) {
        const delay = getRangeValue(this.emitterOptions.rate.delay);
        this.emitDelay = 1e3 * delay / this.container.retina.reduceFactor;
      }
      if (this.lifeCount > 0 || this.immortal) {
        this.prepareToDie();
      }
    }
  }
  pause() {
    if (this.paused) {
      return;
    }
    delete this.emitDelay;
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size) ? initialPosition : this.calcPosition();
  }
  update(delta) {
    var _a, _b, _c;
    if (this.paused) {
      return;
    }
    if (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f")) {
      __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, false, "f");
      this.currentSpawnDelay = (_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0;
      this.currentEmitDelay = (_b = this.emitDelay) !== null && _b !== void 0 ? _b : 0;
    }
    if (!__classPrivateFieldGet(this, _EmitterInstance_startParticlesAdded, "f")) {
      __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, true, "f");
      this.emitParticles(this.emitterOptions.startCount);
    }
    if (this.duration !== void 0) {
      this.currentDuration += delta.value;
      if (this.currentDuration >= this.duration) {
        this.pause();
        if (this.spawnDelay !== void 0) {
          delete this.spawnDelay;
        }
        if (!this.immortal) {
          this.lifeCount--;
        }
        if (this.lifeCount > 0 || this.immortal) {
          this.position = this.calcPosition();
          this.spawnDelay = ((_c = this.emitterOptions.life.delay) !== null && _c !== void 0 ? _c : 0) * 1e3 / this.container.retina.reduceFactor;
        } else {
          this.destroy();
        }
        this.currentDuration -= this.duration;
        delete this.duration;
      }
    }
    if (this.spawnDelay !== void 0) {
      this.currentSpawnDelay += delta.value;
      if (this.currentSpawnDelay >= this.spawnDelay) {
        this.play();
        this.currentSpawnDelay -= this.currentSpawnDelay;
        delete this.spawnDelay;
      }
    }
    if (this.emitDelay !== void 0) {
      this.currentEmitDelay += delta.value;
      if (this.currentEmitDelay >= this.emitDelay) {
        this.emit();
        this.currentEmitDelay -= this.emitDelay;
      }
    }
  }
  prepareToDie() {
    var _a;
    if (this.paused) {
      return;
    }
    const duration = (_a = this.emitterOptions.life) === null || _a === void 0 ? void 0 : _a.duration;
    if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal) && duration !== void 0 && duration > 0) {
      this.duration = duration * 1e3;
    }
  }
  destroy() {
    this.emitters.removeEmitter(this);
  }
  calcPosition() {
    var _a, _b;
    const container = this.container;
    const percentPosition = this.emitterOptions.position;
    return {
      x: ((_a = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.x) !== null && _a !== void 0 ? _a : Math.random() * 100) / 100 * container.canvas.size.width,
      y: ((_b = percentPosition === null || percentPosition === void 0 ? void 0 : percentPosition.y) !== null && _b !== void 0 ? _b : Math.random() * 100) / 100 * container.canvas.size.height
    };
  }
  emit() {
    if (this.paused) {
      return;
    }
    const quantity = getRangeValue(this.emitterOptions.rate.quantity);
    this.emitParticles(quantity);
  }
  emitParticles(quantity) {
    var _a, _b, _c;
    const container = this.container;
    const position = this.position;
    const offset = {
      x: this.size.mode === SizeMode.percent ? container.canvas.size.width * this.size.width / 100 : this.size.width,
      y: this.size.mode === SizeMode.percent ? container.canvas.size.height * this.size.height / 100 : this.size.height
    };
    for (let i = 0; i < quantity; i++) {
      const particlesOptions = deepExtend({}, this.particlesOptions);
      if (this.spawnColor) {
        const colorAnimation = (_a = this.emitterOptions.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
        if (colorAnimation) {
          const hueAnimation = colorAnimation;
          if (hueAnimation.enable) {
            this.spawnColor.h = this.setColorAnimation(hueAnimation, this.spawnColor.h, 360);
          } else {
            const hslAnimation = colorAnimation;
            this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
            this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
            this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
          }
        }
        if (!particlesOptions.color) {
          particlesOptions.color = {
            value: this.spawnColor
          };
        } else {
          particlesOptions.color.value = this.spawnColor;
        }
      }
      const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, offset, this.fill)) !== null && _c !== void 0 ? _c : position;
      container.particles.addParticle(pPosition, particlesOptions);
    }
  }
  setColorAnimation(animation, initValue, maxValue) {
    var _a;
    const container = this.container;
    if (!animation.enable) {
      return initValue;
    }
    const colorOffset = randomInRange(animation.offset);
    const delay = getRangeValue(this.emitterOptions.rate.delay);
    const emitFactor = 1e3 * delay / container.retina.reduceFactor;
    const colorSpeed = (_a = animation.speed) !== null && _a !== void 0 ? _a : 0;
    return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * 3.6) % maxValue;
  }
};
_EmitterInstance_firstSpawn = new WeakMap(), _EmitterInstance_startParticlesAdded = new WeakMap();
var EmitterRate = class {
  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.quantity !== void 0) {
      this.quantity = setRangeValue(data.quantity);
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
  }
};
var EmitterLife = class {
  constructor() {
    this.wait = false;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.wait !== void 0) {
      this.wait = data.wait;
    }
  }
};
var EmitterClickMode;
(function(EmitterClickMode2) {
  EmitterClickMode2["emitter"] = "emitter";
})(EmitterClickMode || (EmitterClickMode = {}));
var EmitterShapeType;
(function(EmitterShapeType2) {
  EmitterShapeType2["circle"] = "circle";
  EmitterShapeType2["square"] = "square";
})(EmitterShapeType || (EmitterShapeType = {}));
var Emitter = class {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = EmitterShapeType.square;
    this.startCount = 0;
  }
  load(data) {
    if (data === void 0) {
      return;
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    if (data.size !== void 0) {
      if (this.size === void 0) {
        this.size = new EmitterSize();
      }
      this.size.load(data.size);
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    this.life.load(data.life);
    this.name = data.name;
    if (data.particles !== void 0) {
      this.particles = deepExtend({}, data.particles);
    }
    this.rate.load(data.rate);
    if (data.shape !== void 0) {
      this.shape = data.shape;
    }
    if (data.position !== void 0) {
      this.position = {
        x: data.position.x,
        y: data.position.y
      };
    }
    if (data.spawnColor !== void 0) {
      if (this.spawnColor === void 0) {
        this.spawnColor = new AnimatableColor();
      }
      this.spawnColor.load(data.spawnColor);
    }
    if (data.startCount !== void 0) {
      this.startCount = data.startCount;
    }
  }
};
var Emitters = class {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = [];
    const overridableContainer = container;
    overridableContainer.getEmitter = (idxOrName) => idxOrName === void 0 || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find((t) => t.name === idxOrName);
    overridableContainer.addEmitter = (options2, position) => this.addEmitter(options2, position);
    overridableContainer.playEmitter = (idxOrName) => {
      const emitter = overridableContainer.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPlay();
      }
    };
    overridableContainer.pauseEmitter = (idxOrName) => {
      const emitter = overridableContainer.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPause();
      }
    };
  }
  init(options2) {
    var _a, _b;
    if (!options2) {
      return;
    }
    if (options2.emitters) {
      if (options2.emitters instanceof Array) {
        this.emitters = options2.emitters.map((s2) => {
          const tmp = new Emitter();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.emitters instanceof Array) {
          this.emitters = new Emitter();
        }
        this.emitters.load(options2.emitters);
      }
    }
    const interactivityEmitters = (_b = (_a = options2.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        this.interactivityEmitters = interactivityEmitters.map((s2) => {
          const tmp = new Emitter();
          tmp.load(s2);
          return tmp;
        });
      } else {
        if (this.interactivityEmitters instanceof Array) {
          this.interactivityEmitters = new Emitter();
        }
        this.interactivityEmitters.load(interactivityEmitters);
      }
    }
    if (this.emitters instanceof Array) {
      for (const emitterOptions of this.emitters) {
        this.addEmitter(emitterOptions);
      }
    } else {
      this.addEmitter(this.emitters);
    }
  }
  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }
  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }
  stop() {
    this.array = [];
  }
  update(delta) {
    for (const emitter of this.array) {
      emitter.update(delta);
    }
  }
  handleClickMode(mode) {
    const container = this.container;
    const emitterOptions = this.emitters;
    const modeEmitters = this.interactivityEmitters;
    if (mode === EmitterClickMode.emitter) {
      let emitterModeOptions;
      if (modeEmitters instanceof Array) {
        if (modeEmitters.length > 0) {
          emitterModeOptions = itemFromArray(modeEmitters);
        }
      } else {
        emitterModeOptions = modeEmitters;
      }
      const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : emitterOptions instanceof Array ? itemFromArray(emitterOptions) : emitterOptions;
      const ePosition = container.interactivity.mouse.clickPosition;
      this.addEmitter(deepExtend({}, emittersOptions), ePosition);
    }
  }
  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }
  addEmitter(options2, position) {
    const emitter = new EmitterInstance(this, this.container, options2, position);
    this.array.push(emitter);
    return emitter;
  }
  removeEmitter(emitter) {
    const index2 = this.array.indexOf(emitter);
    if (index2 >= 0) {
      this.array.splice(index2, 1);
    }
  }
};
var CircleShape = class {
  randomPosition(position, offset, fill) {
    const generateTheta = (x, y) => {
      const u = Math.random() / 4;
      const theta = Math.atan(y / x * Math.tan(2 * Math.PI * u));
      const v = Math.random();
      if (v < 0.25) {
        return theta;
      } else if (v < 0.5) {
        return Math.PI - theta;
      } else if (v < 0.75) {
        return Math.PI + theta;
      } else {
        return -theta;
      }
    };
    const radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2);
    const [a, b] = [offset.x / 2, offset.y / 2];
    const randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;
    return {
      x: position.x + randomRadius * Math.cos(randomTheta),
      y: position.y + randomRadius * Math.sin(randomTheta)
    };
  }
};
function randomSquareCoordinate(position, offset) {
  return position + offset * (Math.random() - 0.5);
}
var SquareShape = class {
  randomPosition(position, offset, fill) {
    if (fill) {
      return {
        x: randomSquareCoordinate(position.x, offset.x),
        y: randomSquareCoordinate(position.y, offset.y)
      };
    } else {
      const halfW = offset.x / 2, halfH = offset.y / 2, side = Math.floor(Math.random() * 4), v = (Math.random() - 0.5) * 2;
      switch (side) {
        case 0:
          return {
            x: position.x + v * halfW,
            y: position.y - halfH
          };
        case 1:
          return {
            x: position.x - halfW,
            y: position.y + v * halfH
          };
        case 2:
          return {
            x: position.x + v * halfW,
            y: position.y + halfH
          };
        case 3:
        default:
          return {
            x: position.x + halfW,
            y: position.y + v * halfH
          };
      }
    }
  }
};
var EmittersPlugin = class {
  constructor() {
    this.id = "emitters";
  }
  getPlugin(container) {
    return new Emitters(container);
  }
  needsPlugin(options2) {
    var _a, _b, _c;
    if (options2 === void 0) {
      return false;
    }
    const emitters = options2.emitters;
    return emitters instanceof Array && !!emitters.length || emitters !== void 0 || !!((_c = (_b = (_a = options2.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && isInArray(EmitterClickMode.emitter, options2.interactivity.events.onClick.mode);
  }
  loadOptions(options2, source) {
    var _a, _b;
    if (!this.needsPlugin(options2) && !this.needsPlugin(source)) {
      return;
    }
    const optionsCast = options2;
    if (source === null || source === void 0 ? void 0 : source.emitters) {
      if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
        optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s2) => {
          const tmp = new Emitter();
          tmp.load(s2);
          return tmp;
        });
      } else {
        let emitterOptions = optionsCast.emitters;
        if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === void 0) {
          optionsCast.emitters = emitterOptions = new Emitter();
        }
        emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
      }
    }
    const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
    if (interactivityEmitters) {
      if (interactivityEmitters instanceof Array) {
        optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s2) => {
          const tmp = new Emitter();
          tmp.load(s2);
          return tmp;
        });
      } else {
        let emitterOptions = optionsCast.interactivity.modes.emitters;
        if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === void 0) {
          optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter();
        }
        emitterOptions.load(interactivityEmitters);
      }
    }
  }
};
function loadEmittersPlugin(tsParticles2) {
  const plugin = new EmittersPlugin();
  tsParticles2.addPlugin(plugin);
  if (!tsParticles2.addEmitterShape) {
    tsParticles2.addEmitterShape = (name, shape) => {
      ShapeManager.addShape(name, shape);
    };
  }
  tsParticles2.addEmitterShape(EmitterShapeType.circle, new CircleShape());
  tsParticles2.addEmitterShape(EmitterShapeType.square, new SquareShape());
}
var InlineArrangement;
(function(InlineArrangement2) {
  InlineArrangement2["equidistant"] = "equidistant";
  InlineArrangement2["onePerPoint"] = "one-per-point";
  InlineArrangement2["perPoint"] = "per-point";
  InlineArrangement2["randomLength"] = "random-length";
  InlineArrangement2["randomPoint"] = "random-point";
})(InlineArrangement || (InlineArrangement = {}));
var MoveType;
(function(MoveType2) {
  MoveType2["path"] = "path";
  MoveType2["radius"] = "radius";
})(MoveType || (MoveType = {}));
var Type;
(function(Type2) {
  Type2["inline"] = "inline";
  Type2["inside"] = "inside";
  Type2["outside"] = "outside";
  Type2["none"] = "none";
})(Type || (Type = {}));
var DrawStroke = class {
  constructor() {
    this.color = new OptionsColor();
    this.width = 0.5;
    this.opacity = 1;
  }
  load(data) {
    var _a;
    if (data !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
      if (typeof this.color.value === "string") {
        this.opacity = (_a = stringToAlpha(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
      }
      if (data.opacity !== void 0) {
        this.opacity = data.opacity;
      }
      if (data.width !== void 0) {
        this.width = data.width;
      }
    }
  }
};
var Draw = class {
  constructor() {
    this.enable = false;
    this.stroke = new DrawStroke();
  }
  get lineWidth() {
    return this.stroke.width;
  }
  set lineWidth(value) {
    this.stroke.width = value;
  }
  get lineColor() {
    return this.stroke.color;
  }
  set lineColor(value) {
    this.stroke.color = OptionsColor.create(this.stroke.color, value);
  }
  load(data) {
    var _a;
    if (data !== void 0) {
      if (data.enable !== void 0) {
        this.enable = data.enable;
      }
      const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
        color: data.lineColor,
        width: data.lineWidth
      };
      this.stroke.load(stroke);
    }
  }
};
var Move = class {
  constructor() {
    this.radius = 10;
    this.type = MoveType.path;
  }
  load(data) {
    if (data !== void 0) {
      if (data.radius !== void 0) {
        this.radius = data.radius;
      }
      if (data.type !== void 0) {
        this.type = data.type;
      }
    }
  }
};
var Inline = class {
  constructor() {
    this.arrangement = InlineArrangement.onePerPoint;
  }
  load(data) {
    if (data !== void 0) {
      if (data.arrangement !== void 0) {
        this.arrangement = data.arrangement;
      }
    }
  }
};
var LocalSvg = class {
  constructor() {
    this.path = [];
    this.size = {
      height: 0,
      width: 0
    };
  }
  load(data) {
    if (data !== void 0) {
      if (data.path !== void 0) {
        this.path = data.path;
      }
      if (data.size !== void 0) {
        if (data.size.width !== void 0) {
          this.size.width = data.size.width;
        }
        if (data.size.height !== void 0) {
          this.size.height = data.size.height;
        }
      }
    }
  }
};
var PolygonMask = class {
  constructor() {
    this.draw = new Draw();
    this.enable = false;
    this.inline = new Inline();
    this.move = new Move();
    this.scale = 1;
    this.type = Type.none;
  }
  get inlineArrangement() {
    return this.inline.arrangement;
  }
  set inlineArrangement(value) {
    this.inline.arrangement = value;
  }
  load(data) {
    var _a;
    if (data !== void 0) {
      this.draw.load(data.draw);
      const inline = (_a = data.inline) !== null && _a !== void 0 ? _a : {
        arrangement: data.inlineArrangement
      };
      if (inline !== void 0) {
        this.inline.load(inline);
      }
      this.move.load(data.move);
      if (data.scale !== void 0) {
        this.scale = data.scale;
      }
      if (data.type !== void 0) {
        this.type = data.type;
      }
      if (data.enable !== void 0) {
        this.enable = data.enable;
      } else {
        this.enable = this.type !== Type.none;
      }
      if (data.url !== void 0) {
        this.url = data.url;
      }
      if (data.data !== void 0) {
        if (typeof data.data === "string") {
          this.data = data.data;
        } else {
          this.data = new LocalSvg();
          this.data.load(data.data);
        }
      }
      if (data.position !== void 0) {
        this.position = deepExtend({}, data.position);
      }
    }
  }
};
function drawPolygonMask(context, rawData, stroke) {
  const color = colorToRgb(stroke.color);
  if (!color) {
    return;
  }
  context.beginPath();
  context.moveTo(rawData[0].x, rawData[0].y);
  for (const item of rawData) {
    context.lineTo(item.x, item.y);
  }
  context.closePath();
  context.strokeStyle = getStyleFromRgb(color);
  context.lineWidth = stroke.width;
  context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
  context.translate(position.x, position.y);
  const color = colorToRgb(stroke.color);
  if (!color) {
    return;
  }
  context.strokeStyle = getStyleFromRgb(color, stroke.opacity);
  context.lineWidth = stroke.width;
  context.stroke(path);
}
function parsePaths(paths, scale, offset) {
  var _a;
  const res = [];
  for (const path of paths) {
    const segments = path.element.pathSegList;
    const len = (_a = segments === null || segments === void 0 ? void 0 : segments.numberOfItems) !== null && _a !== void 0 ? _a : 0;
    const p = {
      x: 0,
      y: 0
    };
    for (let i = 0; i < len; i++) {
      const segment = segments === null || segments === void 0 ? void 0 : segments.getItem(i);
      const svgPathSeg = window.SVGPathSeg;
      switch (segment === null || segment === void 0 ? void 0 : segment.pathSegType) {
        case svgPathSeg.PATHSEG_MOVETO_ABS:
        case svgPathSeg.PATHSEG_LINETO_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
        case svgPathSeg.PATHSEG_ARC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
          const absSeg = segment;
          p.x = absSeg.x;
          p.y = absSeg.y;
          break;
        }
        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
          p.x = segment.x;
          break;
        case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
          p.y = segment.y;
          break;
        case svgPathSeg.PATHSEG_LINETO_REL:
        case svgPathSeg.PATHSEG_MOVETO_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
        case svgPathSeg.PATHSEG_ARC_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
          const relSeg = segment;
          p.x += relSeg.x;
          p.y += relSeg.y;
          break;
        }
        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
          p.x += segment.x;
          break;
        case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
          p.y += segment.y;
          break;
        case svgPathSeg.PATHSEG_UNKNOWN:
        case svgPathSeg.PATHSEG_CLOSEPATH:
          continue;
      }
      res.push({
        x: p.x * scale + offset.x,
        y: p.y * scale + offset.y
      });
    }
  }
  return res;
}
function calcClosestPtOnSegment(s1, s2, pos) {
  const { dx, dy } = getDistances(pos, s1);
  const { dx: dxx, dy: dyy } = getDistances(s2, s1);
  const t = (dx * dxx + dy * dyy) / (dxx ** 2 + dyy ** 2);
  let x = s1.x + dxx * t;
  let y = s1.y + dyy * t;
  if (t < 0) {
    x = s1.x;
    y = s1.y;
  } else if (t > 1) {
    x = s2.x;
    y = s2.y;
  }
  return { x, y, isOnSegment: t >= 0 && t <= 1 };
}
function segmentBounce(start, stop, velocity) {
  const { dx, dy } = getDistances(start, stop);
  const wallAngle = Math.atan2(dy, dx);
  const wallNormalX = Math.sin(wallAngle);
  const wallNormalY = -Math.cos(wallAngle);
  const d2 = 2 * (velocity.x * wallNormalX + velocity.y * wallNormalY);
  velocity.x -= d2 * wallNormalX;
  velocity.y -= d2 * wallNormalY;
}
var PolygonMaskInstance = class {
  constructor(container) {
    this.container = container;
    this.dimension = {
      height: 0,
      width: 0
    };
    this.path2DSupported = !!window.Path2D;
    this.options = new PolygonMask();
    this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
  }
  async initAsync(options2) {
    this.options.load(options2 === null || options2 === void 0 ? void 0 : options2.polygon);
    const polygonMaskOptions = this.options;
    this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
    if (polygonMaskOptions.enable) {
      await this.initRawData();
    }
  }
  resize() {
    const container = this.container;
    const options2 = this.options;
    if (!(options2.enable && options2.type !== Type.none)) {
      return;
    }
    if (this.redrawTimeout) {
      clearTimeout(this.redrawTimeout);
    }
    this.redrawTimeout = window.setTimeout(async () => {
      await this.initRawData(true);
      container.particles.redraw();
    }, 250);
  }
  stop() {
    delete this.raw;
    delete this.paths;
  }
  particlesInitialization() {
    const options2 = this.options;
    if (options2.enable && options2.type === Type.inline && (options2.inline.arrangement === InlineArrangement.onePerPoint || options2.inline.arrangement === InlineArrangement.perPoint)) {
      this.drawPoints();
      return true;
    }
    return false;
  }
  particlePosition(position) {
    var _a, _b;
    const options2 = this.options;
    if (!(options2.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0)) {
      return;
    }
    return deepExtend({}, position ? position : this.randomPoint());
  }
  particleBounce(particle, delta, direction) {
    return this.polygonBounce(particle, delta, direction);
  }
  clickPositionValid(position) {
    const options2 = this.options;
    return options2.enable && options2.type !== Type.none && options2.type !== Type.inline && this.checkInsidePolygon(position);
  }
  draw(context) {
    var _a;
    if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }
    const options2 = this.options;
    const polygonDraw = options2.draw;
    if (!(options2.enable && polygonDraw.enable)) {
      return;
    }
    const rawData = this.raw;
    for (const path of this.paths) {
      const path2d = path.path2d;
      const path2dSupported = this.path2DSupported;
      if (!context) {
        continue;
      }
      if (path2dSupported && path2d && this.offset) {
        drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
      } else if (rawData) {
        drawPolygonMask(context, rawData, polygonDraw.stroke);
      }
    }
  }
  polygonBounce(particle, _delta, direction) {
    const options2 = this.options;
    if (!this.raw || !options2.enable || direction !== OutModeDirection.top) {
      return false;
    }
    if (options2.type === Type.inside || options2.type === Type.outside) {
      let closest, dx, dy;
      const pos = particle.getPosition(), radius = particle.getRadius();
      for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
        const pi = this.raw[i], pj = this.raw[j];
        closest = calcClosestPtOnSegment(pi, pj, pos);
        const dist = getDistances(pos, closest);
        [dx, dy] = [dist.dx, dist.dy];
        if (dist.distance < radius) {
          segmentBounce(pi, pj, particle.velocity);
          return true;
        }
      }
      if (closest && dx !== void 0 && dy !== void 0 && !this.checkInsidePolygon(pos)) {
        const factor = { x: 1, y: 1 };
        if (particle.position.x >= closest.x) {
          factor.x = -1;
        }
        if (particle.position.y >= closest.y) {
          factor.y = -1;
        }
        particle.position.x = closest.x + radius * 2 * factor.x;
        particle.position.y = closest.y + radius * 2 * factor.y;
        particle.velocity.mult(-1);
        return true;
      }
    } else if (options2.type === Type.inline && particle.initialPosition) {
      const dist = getDistance(particle.initialPosition, particle.getPosition());
      if (dist > this.polygonMaskMoveRadius) {
        particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        return true;
      }
    }
    return false;
  }
  checkInsidePolygon(position) {
    var _a, _b;
    const container = this.container;
    const options2 = this.options;
    if (!options2.enable || options2.type === Type.none || options2.type === Type.inline) {
      return true;
    }
    if (!this.raw) {
      throw new Error(Constants.noPolygonFound);
    }
    const canvasSize = container.canvas.size;
    const x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width;
    const y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height;
    let inside = false;
    for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
      const pi = this.raw[i];
      const pj = this.raw[j];
      const intersect = pi.y > y !== pj.y > y && x < (pj.x - pi.x) * (y - pi.y) / (pj.y - pi.y) + pi.x;
      if (intersect) {
        inside = !inside;
      }
    }
    return options2.type === Type.inside ? inside : options2.type === Type.outside ? !inside : false;
  }
  parseSvgPath(xml, force) {
    var _a, _b, _c;
    const forceDownload = force !== null && force !== void 0 ? force : false;
    if (this.paths !== void 0 && !forceDownload) {
      return this.raw;
    }
    const container = this.container;
    const options2 = this.options;
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "image/svg+xml");
    const svg = doc.getElementsByTagName("svg")[0];
    let svgPaths = svg.getElementsByTagName("path");
    if (!svgPaths.length) {
      svgPaths = doc.getElementsByTagName("path");
    }
    this.paths = [];
    for (let i = 0; i < svgPaths.length; i++) {
      const path = svgPaths.item(i);
      if (path) {
        this.paths.push({
          element: path,
          length: path.getTotalLength()
        });
      }
    }
    const pxRatio = container.retina.pixelRatio;
    const scale = options2.scale / pxRatio;
    this.dimension.width = parseFloat((_a = svg.getAttribute("width")) !== null && _a !== void 0 ? _a : "0") * scale;
    this.dimension.height = parseFloat((_b = svg.getAttribute("height")) !== null && _b !== void 0 ? _b : "0") * scale;
    const position = (_c = options2.position) !== null && _c !== void 0 ? _c : {
      x: 50,
      y: 50
    };
    this.offset = {
      x: container.canvas.size.width * position.x / (100 * pxRatio) - this.dimension.width / 2,
      y: container.canvas.size.height * position.y / (100 * pxRatio) - this.dimension.height / 2
    };
    return parsePaths(this.paths, scale, this.offset);
  }
  async downloadSvgPath(svgUrl, force) {
    const options2 = this.options;
    const url = svgUrl || options2.url;
    const forceDownload = force !== null && force !== void 0 ? force : false;
    if (!url || this.paths !== void 0 && !forceDownload) {
      return this.raw;
    }
    const req = await fetch(url);
    if (!req.ok) {
      throw new Error("tsParticles Error - Error occurred during polygon mask download");
    }
    return this.parseSvgPath(await req.text(), force);
  }
  drawPoints() {
    if (!this.raw) {
      return;
    }
    for (const item of this.raw) {
      this.container.particles.addParticle({
        x: item.x,
        y: item.y
      });
    }
  }
  randomPoint() {
    const container = this.container;
    const options2 = this.options;
    let position;
    if (options2.type === Type.inline) {
      switch (options2.inline.arrangement) {
        case InlineArrangement.randomPoint:
          position = this.getRandomPoint();
          break;
        case InlineArrangement.randomLength:
          position = this.getRandomPointByLength();
          break;
        case InlineArrangement.equidistant:
          position = this.getEquidistantPointByIndex(container.particles.count);
          break;
        case InlineArrangement.onePerPoint:
        case InlineArrangement.perPoint:
        default:
          position = this.getPointByIndex(container.particles.count);
      }
    } else {
      position = {
        x: Math.random() * container.canvas.size.width,
        y: Math.random() * container.canvas.size.height
      };
    }
    if (this.checkInsidePolygon(position)) {
      return position;
    } else {
      return this.randomPoint();
    }
  }
  getRandomPoint() {
    if (!this.raw || !this.raw.length) {
      throw new Error(Constants.noPolygonDataLoaded);
    }
    const coords = itemFromArray(this.raw);
    return {
      x: coords.x,
      y: coords.y
    };
  }
  getRandomPointByLength() {
    var _a, _b, _c;
    const options2 = this.options;
    if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      throw new Error(Constants.noPolygonDataLoaded);
    }
    const path = itemFromArray(this.paths);
    const distance = Math.floor(Math.random() * path.length) + 1;
    const point = path.element.getPointAtLength(distance);
    return {
      x: point.x * options2.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
      y: point.y * options2.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0)
    };
  }
  getEquidistantPointByIndex(index2) {
    var _a, _b, _c, _d, _e, _f, _g;
    const options2 = this.container.actualOptions;
    const polygonMaskOptions = this.options;
    if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length))
      throw new Error(Constants.noPolygonDataLoaded);
    let offset = 0;
    let point;
    const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0);
    const distance = totalLength / options2.particles.number.value;
    for (const path of this.paths) {
      const pathDistance = distance * index2 - offset;
      if (pathDistance <= path.length) {
        point = path.element.getPointAtLength(pathDistance);
        break;
      } else {
        offset += path.length;
      }
    }
    return {
      x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
      y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0)
    };
  }
  getPointByIndex(index2) {
    if (!this.raw || !this.raw.length) {
      throw new Error(Constants.noPolygonDataLoaded);
    }
    const coords = this.raw[index2 % this.raw.length];
    return {
      x: coords.x,
      y: coords.y
    };
  }
  createPath2D() {
    var _a, _b;
    const options2 = this.options;
    if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }
    for (const path of this.paths) {
      const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");
      if (pathData) {
        const path2d = new Path2D(pathData);
        const matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
        const finalPath = new Path2D();
        const transform = matrix.scale(options2.scale);
        if (finalPath.addPath) {
          finalPath.addPath(path2d, transform);
          path.path2d = finalPath;
        } else {
          delete path.path2d;
        }
      } else {
        delete path.path2d;
      }
      if (path.path2d || !this.raw) {
        continue;
      }
      path.path2d = new Path2D();
      path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
      this.raw.forEach((pos, i) => {
        var _a2;
        if (i > 0) {
          (_a2 = path.path2d) === null || _a2 === void 0 ? void 0 : _a2.lineTo(pos.x, pos.y);
        }
      });
      path.path2d.closePath();
    }
  }
  async initRawData(force) {
    const options2 = this.options;
    if (options2.url) {
      this.raw = await this.downloadSvgPath(options2.url, force);
    } else if (options2.data) {
      const data = options2.data;
      let svg;
      if (typeof data !== "string") {
        const path = data.path instanceof Array ? data.path.map((t) => `<path d="${t}" />`).join("") : `<path d="${data.path}" />`;
        const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
        svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
      } else {
        svg = data;
      }
      this.raw = this.parseSvgPath(svg, force);
    }
    this.createPath2D();
  }
};
var Plugin = class {
  constructor() {
    this.id = "polygonMask";
  }
  getPlugin(container) {
    return new PolygonMaskInstance(container);
  }
  needsPlugin(options2) {
    var _a, _b, _c;
    return (_b = (_a = options2 === null || options2 === void 0 ? void 0 : options2.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : ((_c = options2 === null || options2 === void 0 ? void 0 : options2.polygon) === null || _c === void 0 ? void 0 : _c.type) !== void 0 && options2.polygon.type !== Type.none;
  }
  loadOptions(options2, source) {
    if (!this.needsPlugin(source)) {
      return;
    }
    const optionsCast = options2;
    let polygonOptions = optionsCast.polygon;
    if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === void 0) {
      optionsCast.polygon = polygonOptions = new PolygonMask();
    }
    polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
  }
};
async function loadPolygonMaskPlugin(tsParticles2) {
  if (!isSsr() && !window.SVGPathSeg) {
    await Promise.resolve().then(function() {
      return pathseg;
    });
  }
  const plugin = new Plugin();
  tsParticles2.addPlugin(plugin);
}
function updateRoll(particle, delta) {
  const roll = particle.options.roll;
  if (!particle.roll || !roll.enable) {
    return;
  }
  const speed = particle.roll.speed * delta.factor;
  const max = 2 * Math.PI;
  particle.roll.angle += speed;
  if (particle.roll.angle > max) {
    particle.roll.angle -= max;
  }
}
var RollUpdater = class {
  init(particle) {
    const rollOpt = particle.options.roll;
    if (rollOpt.enable) {
      particle.roll = {
        angle: Math.random() * Math.PI * 2,
        speed: getRangeValue(rollOpt.speed) / 360
      };
      if (rollOpt.backColor) {
        particle.backColor = colorToHsl(rollOpt.backColor);
      } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
        const alterType = Math.random() >= 0.5 ? AlterType.darken : AlterType.enlighten;
        particle.roll.alter = {
          type: alterType,
          value: alterType === AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value
        };
      } else if (rollOpt.darken.enable) {
        particle.roll.alter = {
          type: AlterType.darken,
          value: rollOpt.darken.value
        };
      } else if (rollOpt.enlighten.enable) {
        particle.roll.alter = {
          type: AlterType.enlighten,
          value: rollOpt.enlighten.value
        };
      }
    } else {
      particle.roll = { angle: 0, speed: 0 };
    }
  }
  isEnabled(particle) {
    const roll = particle.options.roll;
    return !particle.destroyed && !particle.spawning && roll.enable;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRoll(particle, delta);
  }
};
function loadRollUpdater(tsParticles2) {
  tsParticles2.addParticleUpdater("roll", () => new RollUpdater());
}
function loadFull(tsParticles2) {
  loadSlim(tsParticles2);
  loadExternalTrailInteraction(tsParticles2);
  loadRollUpdater(tsParticles2);
  loadTiltUpdater(tsParticles2);
  loadWobbleUpdater(tsParticles2);
  loadAbsorbersPlugin(tsParticles2);
  loadEmittersPlugin(tsParticles2);
  loadPolygonMaskPlugin(tsParticles2);
}
var tsParticles = new Main();
tsParticles.init();
loadFull(tsParticles);
initPjs(tsParticles);
var particlesInitEvent = "particlesInit";
var particlesLoadedEvent = "particlesLoaded";
var Particles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options: options2 = {} } = $$props;
  let { url = "" } = $$props;
  let { id = "tsparticles" } = $$props;
  const dispatch = createEventDispatcher();
  let oldId = id;
  afterUpdate(() => {
    tsParticles.init();
    dispatch(particlesInitEvent, tsParticles);
    if (oldId) {
      const oldContainer = tsParticles.dom().find((c) => c.id === oldId);
      if (oldContainer) {
        oldContainer.destroy();
      }
    }
    if (id) {
      const cb = (container) => {
        dispatch(particlesLoadedEvent, { particles: container });
        oldId = id;
      };
      if (url) {
        tsParticles.loadJSON(id, url).then(cb);
      } else if (options2) {
        tsParticles.load(id, options2).then(cb);
      } else {
        console.error("You must specify options or url to load tsParticles");
      }
    } else {
      dispatch(particlesLoadedEvent, { particles: void 0 });
    }
  });
  if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
    $$bindings.options(options2);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `

<div${add_attribute("id", id, 0)}></div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Particles
});
(function() {
  try {
    if (typeof window === "undefined")
      return;
    if (!("SVGPathSeg" in window)) {
      window.SVGPathSeg = function(type, typeAsLetter, owningPathSegList) {
        this.pathSegType = type;
        this.pathSegTypeAsLetter = typeAsLetter;
        this._owningPathSegList = owningPathSegList;
      };
      window.SVGPathSeg.prototype.classname = "SVGPathSeg";
      window.SVGPathSeg.PATHSEG_UNKNOWN = 0;
      window.SVGPathSeg.PATHSEG_CLOSEPATH = 1;
      window.SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
      window.SVGPathSeg.PATHSEG_MOVETO_REL = 3;
      window.SVGPathSeg.PATHSEG_LINETO_ABS = 4;
      window.SVGPathSeg.PATHSEG_LINETO_REL = 5;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
      window.SVGPathSeg.PATHSEG_ARC_ABS = 10;
      window.SVGPathSeg.PATHSEG_ARC_REL = 11;
      window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
      window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
      window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
      window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
      window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
      window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;
      window.SVGPathSeg.prototype._segmentChanged = function() {
        if (this._owningPathSegList)
          this._owningPathSegList.segmentChanged(this);
      };
      window.SVGPathSegClosePath = function(owningPathSegList) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CLOSEPATH, "z", owningPathSegList);
      };
      window.SVGPathSegClosePath.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegClosePath.prototype.toString = function() {
        return "[object SVGPathSegClosePath]";
      };
      window.SVGPathSegClosePath.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter;
      };
      window.SVGPathSegClosePath.prototype.clone = function() {
        return new window.SVGPathSegClosePath(void 0);
      };
      window.SVGPathSegMovetoAbs = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_ABS, "M", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegMovetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegMovetoAbs.prototype.toString = function() {
        return "[object SVGPathSegMovetoAbs]";
      };
      window.SVGPathSegMovetoAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegMovetoAbs.prototype.clone = function() {
        return new window.SVGPathSegMovetoAbs(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegMovetoAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegMovetoRel = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_MOVETO_REL, "m", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegMovetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegMovetoRel.prototype.toString = function() {
        return "[object SVGPathSegMovetoRel]";
      };
      window.SVGPathSegMovetoRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegMovetoRel.prototype.clone = function() {
        return new window.SVGPathSegMovetoRel(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegMovetoRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoAbs = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_ABS, "L", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegLinetoAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoAbs]";
      };
      window.SVGPathSegLinetoAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegLinetoAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoAbs(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegLinetoAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoRel = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_REL, "l", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegLinetoRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoRel]";
      };
      window.SVGPathSegLinetoRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegLinetoRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoRel(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegLinetoRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicAbs = function(owningPathSegList, x, y, x1, y1, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS, "C", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicAbs]";
      };
      window.SVGPathSegCurvetoCubicAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoCubicAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicAbs(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x1", {
        get: function() {
          return this._x1;
        },
        set: function(x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y1", {
        get: function() {
          return this._y1;
        },
        set: function(y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "x2", {
        get: function() {
          return this._x2;
        },
        set: function(x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicAbs.prototype, "y2", {
        get: function() {
          return this._y2;
        },
        set: function(y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicRel = function(owningPathSegList, x, y, x1, y1, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL, "c", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicRel]";
      };
      window.SVGPathSegCurvetoCubicRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoCubicRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicRel(void 0, this._x, this._y, this._x1, this._y1, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x1", {
        get: function() {
          return this._x1;
        },
        set: function(x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y1", {
        get: function() {
          return this._y1;
        },
        set: function(y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "x2", {
        get: function() {
          return this._x2;
        },
        set: function(x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicRel.prototype, "y2", {
        get: function() {
          return this._y2;
        },
        set: function(y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticAbs = function(owningPathSegList, x, y, x1, y1) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS, "Q", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticAbs]";
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoQuadraticAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticAbs(void 0, this._x, this._y, this._x1, this._y1);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "x1", {
        get: function() {
          return this._x1;
        },
        set: function(x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticAbs.prototype, "y1", {
        get: function() {
          return this._y1;
        },
        set: function(y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticRel = function(owningPathSegList, x, y, x1, y1) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL, "q", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x1 = x1;
        this._y1 = y1;
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticRel]";
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x1 + " " + this._y1 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoQuadraticRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticRel(void 0, this._x, this._y, this._x1, this._y1);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "x1", {
        get: function() {
          return this._x1;
        },
        set: function(x1) {
          this._x1 = x1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticRel.prototype, "y1", {
        get: function() {
          return this._y1;
        },
        set: function(y1) {
          this._y1 = y1;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegArcAbs = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_ABS, "A", owningPathSegList);
        this._x = x;
        this._y = y;
        this._r1 = r1;
        this._r2 = r2;
        this._angle = angle;
        this._largeArcFlag = largeArcFlag;
        this._sweepFlag = sweepFlag;
      };
      window.SVGPathSegArcAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegArcAbs.prototype.toString = function() {
        return "[object SVGPathSegArcAbs]";
      };
      window.SVGPathSegArcAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
      };
      window.SVGPathSegArcAbs.prototype.clone = function() {
        return new window.SVGPathSegArcAbs(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
      };
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r1", {
        get: function() {
          return this._r1;
        },
        set: function(r1) {
          this._r1 = r1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "r2", {
        get: function() {
          return this._r2;
        },
        set: function(r2) {
          this._r2 = r2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "angle", {
        get: function() {
          return this._angle;
        },
        set: function(angle) {
          this._angle = angle;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "largeArcFlag", {
        get: function() {
          return this._largeArcFlag;
        },
        set: function(largeArcFlag) {
          this._largeArcFlag = largeArcFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcAbs.prototype, "sweepFlag", {
        get: function() {
          return this._sweepFlag;
        },
        set: function(sweepFlag) {
          this._sweepFlag = sweepFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegArcRel = function(owningPathSegList, x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_ARC_REL, "a", owningPathSegList);
        this._x = x;
        this._y = y;
        this._r1 = r1;
        this._r2 = r2;
        this._angle = angle;
        this._largeArcFlag = largeArcFlag;
        this._sweepFlag = sweepFlag;
      };
      window.SVGPathSegArcRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegArcRel.prototype.toString = function() {
        return "[object SVGPathSegArcRel]";
      };
      window.SVGPathSegArcRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._r1 + " " + this._r2 + " " + this._angle + " " + (this._largeArcFlag ? "1" : "0") + " " + (this._sweepFlag ? "1" : "0") + " " + this._x + " " + this._y;
      };
      window.SVGPathSegArcRel.prototype.clone = function() {
        return new window.SVGPathSegArcRel(void 0, this._x, this._y, this._r1, this._r2, this._angle, this._largeArcFlag, this._sweepFlag);
      };
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r1", {
        get: function() {
          return this._r1;
        },
        set: function(r1) {
          this._r1 = r1;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "r2", {
        get: function() {
          return this._r2;
        },
        set: function(r2) {
          this._r2 = r2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "angle", {
        get: function() {
          return this._angle;
        },
        set: function(angle) {
          this._angle = angle;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "largeArcFlag", {
        get: function() {
          return this._largeArcFlag;
        },
        set: function(largeArcFlag) {
          this._largeArcFlag = largeArcFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegArcRel.prototype, "sweepFlag", {
        get: function() {
          return this._sweepFlag;
        },
        set: function(sweepFlag) {
          this._sweepFlag = sweepFlag;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoHorizontalAbs = function(owningPathSegList, x) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS, "H", owningPathSegList);
        this._x = x;
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoHorizontalAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoHorizontalAbs]";
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x;
      };
      window.SVGPathSegLinetoHorizontalAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoHorizontalAbs(void 0, this._x);
      };
      Object.defineProperty(window.SVGPathSegLinetoHorizontalAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoHorizontalRel = function(owningPathSegList, x) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL, "h", owningPathSegList);
        this._x = x;
      };
      window.SVGPathSegLinetoHorizontalRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoHorizontalRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoHorizontalRel]";
      };
      window.SVGPathSegLinetoHorizontalRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x;
      };
      window.SVGPathSegLinetoHorizontalRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoHorizontalRel(void 0, this._x);
      };
      Object.defineProperty(window.SVGPathSegLinetoHorizontalRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoVerticalAbs = function(owningPathSegList, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS, "V", owningPathSegList);
        this._y = y;
      };
      window.SVGPathSegLinetoVerticalAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoVerticalAbs.prototype.toString = function() {
        return "[object SVGPathSegLinetoVerticalAbs]";
      };
      window.SVGPathSegLinetoVerticalAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._y;
      };
      window.SVGPathSegLinetoVerticalAbs.prototype.clone = function() {
        return new window.SVGPathSegLinetoVerticalAbs(void 0, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoVerticalAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegLinetoVerticalRel = function(owningPathSegList, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL, "v", owningPathSegList);
        this._y = y;
      };
      window.SVGPathSegLinetoVerticalRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegLinetoVerticalRel.prototype.toString = function() {
        return "[object SVGPathSegLinetoVerticalRel]";
      };
      window.SVGPathSegLinetoVerticalRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._y;
      };
      window.SVGPathSegLinetoVerticalRel.prototype.clone = function() {
        return new window.SVGPathSegLinetoVerticalRel(void 0, this._y);
      };
      Object.defineProperty(window.SVGPathSegLinetoVerticalRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicSmoothAbs = function(owningPathSegList, x, y, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS, "S", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicSmoothAbs]";
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoCubicSmoothAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, this._x, this._y, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "x2", {
        get: function() {
          return this._x2;
        },
        set: function(x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothAbs.prototype, "y2", {
        get: function() {
          return this._y2;
        },
        set: function(y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoCubicSmoothRel = function(owningPathSegList, x, y, x2, y2) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL, "s", owningPathSegList);
        this._x = x;
        this._y = y;
        this._x2 = x2;
        this._y2 = y2;
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoCubicSmoothRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoCubicSmoothRel]";
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x2 + " " + this._y2 + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoCubicSmoothRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, this._x, this._y, this._x2, this._y2);
      };
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "x2", {
        get: function() {
          return this._x2;
        },
        set: function(x2) {
          this._x2 = x2;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoCubicSmoothRel.prototype, "y2", {
        get: function() {
          return this._y2;
        },
        set: function(y2) {
          this._y2 = y2;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticSmoothAbs = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS, "T", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticSmoothAbs]";
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothAbs.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathSegCurvetoQuadraticSmoothRel = function(owningPathSegList, x, y) {
        window.SVGPathSeg.call(this, window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL, "t", owningPathSegList);
        this._x = x;
        this._y = y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype = Object.create(window.SVGPathSeg.prototype);
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.toString = function() {
        return "[object SVGPathSegCurvetoQuadraticSmoothRel]";
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype._asPathString = function() {
        return this.pathSegTypeAsLetter + " " + this._x + " " + this._y;
      };
      window.SVGPathSegCurvetoQuadraticSmoothRel.prototype.clone = function() {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, this._x, this._y);
      };
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "x", {
        get: function() {
          return this._x;
        },
        set: function(x) {
          this._x = x;
          this._segmentChanged();
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegCurvetoQuadraticSmoothRel.prototype, "y", {
        get: function() {
          return this._y;
        },
        set: function(y) {
          this._y = y;
          this._segmentChanged();
        },
        enumerable: true
      });
      window.SVGPathElement.prototype.createSVGPathSegClosePath = function() {
        return new window.SVGPathSegClosePath(void 0);
      };
      window.SVGPathElement.prototype.createSVGPathSegMovetoAbs = function(x, y) {
        return new window.SVGPathSegMovetoAbs(void 0, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegMovetoRel = function(x, y) {
        return new window.SVGPathSegMovetoRel(void 0, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoAbs = function(x, y) {
        return new window.SVGPathSegLinetoAbs(void 0, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoRel = function(x, y) {
        return new window.SVGPathSegLinetoRel(void 0, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) {
        return new window.SVGPathSegCurvetoCubicAbs(void 0, x, y, x1, y1, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) {
        return new window.SVGPathSegCurvetoCubicRel(void 0, x, y, x1, y1, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) {
        return new window.SVGPathSegCurvetoQuadraticAbs(void 0, x, y, x1, y1);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) {
        return new window.SVGPathSegCurvetoQuadraticRel(void 0, x, y, x1, y1);
      };
      window.SVGPathElement.prototype.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new window.SVGPathSegArcAbs(void 0, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
      };
      window.SVGPathElement.prototype.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) {
        return new window.SVGPathSegArcRel(void 0, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalAbs = function(x) {
        return new window.SVGPathSegLinetoHorizontalAbs(void 0, x);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoHorizontalRel = function(x) {
        return new window.SVGPathSegLinetoHorizontalRel(void 0, x);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalAbs = function(y) {
        return new window.SVGPathSegLinetoVerticalAbs(void 0, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegLinetoVerticalRel = function(y) {
        return new window.SVGPathSegLinetoVerticalRel(void 0, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) {
        return new window.SVGPathSegCurvetoCubicSmoothAbs(void 0, x, y, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) {
        return new window.SVGPathSegCurvetoCubicSmoothRel(void 0, x, y, x2, y2);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) {
        return new window.SVGPathSegCurvetoQuadraticSmoothAbs(void 0, x, y);
      };
      window.SVGPathElement.prototype.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) {
        return new window.SVGPathSegCurvetoQuadraticSmoothRel(void 0, x, y);
      };
      if (!("getPathSegAtLength" in window.SVGPathElement.prototype)) {
        window.SVGPathElement.prototype.getPathSegAtLength = function(distance) {
          if (distance === void 0 || !isFinite(distance))
            throw "Invalid arguments.";
          var measurementElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
          measurementElement.setAttribute("d", this.getAttribute("d"));
          var lastPathSegment = measurementElement.pathSegList.numberOfItems - 1;
          if (lastPathSegment <= 0)
            return 0;
          do {
            measurementElement.pathSegList.removeItem(lastPathSegment);
            if (distance > measurementElement.getTotalLength())
              break;
            lastPathSegment--;
          } while (lastPathSegment > 0);
          return lastPathSegment;
        };
      }
    }
    if (!("SVGPathSegList" in window) || !("appendItem" in window.SVGPathSegList.prototype)) {
      window.SVGPathSegList = function(pathElement) {
        this._pathElement = pathElement;
        this._list = this._parsePath(this._pathElement.getAttribute("d"));
        this._mutationObserverConfig = { attributes: true, attributeFilter: ["d"] };
        this._pathElementMutationObserver = new MutationObserver(this._updateListFromPathMutations.bind(this));
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
      };
      window.SVGPathSegList.prototype.classname = "SVGPathSegList";
      Object.defineProperty(window.SVGPathSegList.prototype, "numberOfItems", {
        get: function() {
          this._checkPathSynchronizedToList();
          return this._list.length;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathSegList.prototype, "length", {
        get: function() {
          this._checkPathSynchronizedToList();
          return this._list.length;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "pathSegList", {
        get: function() {
          if (!this._pathSegList)
            this._pathSegList = new window.SVGPathSegList(this);
          return this._pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "normalizedPathSegList", {
        get: function() {
          return this.pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "animatedPathSegList", {
        get: function() {
          return this.pathSegList;
        },
        enumerable: true
      });
      Object.defineProperty(window.SVGPathElement.prototype, "animatedNormalizedPathSegList", {
        get: function() {
          return this.pathSegList;
        },
        enumerable: true
      });
      window.SVGPathSegList.prototype._checkPathSynchronizedToList = function() {
        this._updateListFromPathMutations(this._pathElementMutationObserver.takeRecords());
      };
      window.SVGPathSegList.prototype._updateListFromPathMutations = function(mutationRecords) {
        if (!this._pathElement)
          return;
        var hasPathMutations = false;
        mutationRecords.forEach(function(record) {
          if (record.attributeName == "d")
            hasPathMutations = true;
        });
        if (hasPathMutations)
          this._list = this._parsePath(this._pathElement.getAttribute("d"));
      };
      window.SVGPathSegList.prototype._writeListToPath = function() {
        this._pathElementMutationObserver.disconnect();
        this._pathElement.setAttribute("d", window.SVGPathSegList._pathSegArrayAsString(this._list));
        this._pathElementMutationObserver.observe(this._pathElement, this._mutationObserverConfig);
      };
      window.SVGPathSegList.prototype.segmentChanged = function(pathSeg) {
        this._writeListToPath();
      };
      window.SVGPathSegList.prototype.clear = function() {
        this._checkPathSynchronizedToList();
        this._list.forEach(function(pathSeg) {
          pathSeg._owningPathSegList = null;
        });
        this._list = [];
        this._writeListToPath();
      };
      window.SVGPathSegList.prototype.initialize = function(newItem) {
        this._checkPathSynchronizedToList();
        this._list = [newItem];
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype._checkValidIndex = function(index2) {
        if (isNaN(index2) || index2 < 0 || index2 >= this.numberOfItems)
          throw "INDEX_SIZE_ERR";
      };
      window.SVGPathSegList.prototype.getItem = function(index2) {
        this._checkPathSynchronizedToList();
        this._checkValidIndex(index2);
        return this._list[index2];
      };
      window.SVGPathSegList.prototype.insertItemBefore = function(newItem, index2) {
        this._checkPathSynchronizedToList();
        if (index2 > this.numberOfItems)
          index2 = this.numberOfItems;
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._list.splice(index2, 0, newItem);
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype.replaceItem = function(newItem, index2) {
        this._checkPathSynchronizedToList();
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._checkValidIndex(index2);
        this._list[index2] = newItem;
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList.prototype.removeItem = function(index2) {
        this._checkPathSynchronizedToList();
        this._checkValidIndex(index2);
        var item = this._list[index2];
        this._list.splice(index2, 1);
        this._writeListToPath();
        return item;
      };
      window.SVGPathSegList.prototype.appendItem = function(newItem) {
        this._checkPathSynchronizedToList();
        if (newItem._owningPathSegList) {
          newItem = newItem.clone();
        }
        this._list.push(newItem);
        newItem._owningPathSegList = this;
        this._writeListToPath();
        return newItem;
      };
      window.SVGPathSegList._pathSegArrayAsString = function(pathSegArray) {
        var string = "";
        var first = true;
        pathSegArray.forEach(function(pathSeg) {
          if (first) {
            first = false;
            string += pathSeg._asPathString();
          } else {
            string += " " + pathSeg._asPathString();
          }
        });
        return string;
      };
      window.SVGPathSegList.prototype._parsePath = function(string) {
        if (!string || string.length == 0)
          return [];
        var owningPathSegList = this;
        var Builder = function() {
          this.pathSegList = [];
        };
        Builder.prototype.appendSegment = function(pathSeg2) {
          this.pathSegList.push(pathSeg2);
        };
        var Source = function(string2) {
          this._string = string2;
          this._currentIndex = 0;
          this._endIndex = this._string.length;
          this._previousCommand = window.SVGPathSeg.PATHSEG_UNKNOWN;
          this._skipOptionalSpaces();
        };
        Source.prototype._isCurrentSpace = function() {
          var character = this._string[this._currentIndex];
          return character <= " " && (character == " " || character == "\n" || character == "	" || character == "\r" || character == "\f");
        };
        Source.prototype._skipOptionalSpaces = function() {
          while (this._currentIndex < this._endIndex && this._isCurrentSpace())
            this._currentIndex++;
          return this._currentIndex < this._endIndex;
        };
        Source.prototype._skipOptionalSpacesOrDelimiter = function() {
          if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string.charAt(this._currentIndex) != ",")
            return false;
          if (this._skipOptionalSpaces()) {
            if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ",") {
              this._currentIndex++;
              this._skipOptionalSpaces();
            }
          }
          return this._currentIndex < this._endIndex;
        };
        Source.prototype.hasMoreData = function() {
          return this._currentIndex < this._endIndex;
        };
        Source.prototype.peekSegmentType = function() {
          var lookahead = this._string[this._currentIndex];
          return this._pathSegTypeFromChar(lookahead);
        };
        Source.prototype._pathSegTypeFromChar = function(lookahead) {
          switch (lookahead) {
            case "Z":
            case "z":
              return window.SVGPathSeg.PATHSEG_CLOSEPATH;
            case "M":
              return window.SVGPathSeg.PATHSEG_MOVETO_ABS;
            case "m":
              return window.SVGPathSeg.PATHSEG_MOVETO_REL;
            case "L":
              return window.SVGPathSeg.PATHSEG_LINETO_ABS;
            case "l":
              return window.SVGPathSeg.PATHSEG_LINETO_REL;
            case "C":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS;
            case "c":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL;
            case "Q":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS;
            case "q":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL;
            case "A":
              return window.SVGPathSeg.PATHSEG_ARC_ABS;
            case "a":
              return window.SVGPathSeg.PATHSEG_ARC_REL;
            case "H":
              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS;
            case "h":
              return window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL;
            case "V":
              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS;
            case "v":
              return window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL;
            case "S":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS;
            case "s":
              return window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL;
            case "T":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS;
            case "t":
              return window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL;
            default:
              return window.SVGPathSeg.PATHSEG_UNKNOWN;
          }
        };
        Source.prototype._nextCommandHelper = function(lookahead, previousCommand) {
          if ((lookahead == "+" || lookahead == "-" || lookahead == "." || lookahead >= "0" && lookahead <= "9") && previousCommand != window.SVGPathSeg.PATHSEG_CLOSEPATH) {
            if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_ABS)
              return window.SVGPathSeg.PATHSEG_LINETO_ABS;
            if (previousCommand == window.SVGPathSeg.PATHSEG_MOVETO_REL)
              return window.SVGPathSeg.PATHSEG_LINETO_REL;
            return previousCommand;
          }
          return window.SVGPathSeg.PATHSEG_UNKNOWN;
        };
        Source.prototype.initialCommandIsMoveTo = function() {
          if (!this.hasMoreData())
            return true;
          var command = this.peekSegmentType();
          return command == window.SVGPathSeg.PATHSEG_MOVETO_ABS || command == window.SVGPathSeg.PATHSEG_MOVETO_REL;
        };
        Source.prototype._parseNumber = function() {
          var exponent = 0;
          var integer = 0;
          var frac = 1;
          var decimal = 0;
          var sign = 1;
          var expsign = 1;
          var startIndex = this._currentIndex;
          this._skipOptionalSpaces();
          if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "+")
            this._currentIndex++;
          else if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == "-") {
            this._currentIndex++;
            sign = -1;
          }
          if (this._currentIndex == this._endIndex || (this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9") && this._string.charAt(this._currentIndex) != ".")
            return void 0;
          var startIntPartIndex = this._currentIndex;
          while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9")
            this._currentIndex++;
          if (this._currentIndex != startIntPartIndex) {
            var scanIntPartIndex = this._currentIndex - 1;
            var multiplier = 1;
            while (scanIntPartIndex >= startIntPartIndex) {
              integer += multiplier * (this._string.charAt(scanIntPartIndex--) - "0");
              multiplier *= 10;
            }
          }
          if (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) == ".") {
            this._currentIndex++;
            if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
              return void 0;
            while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
              frac *= 10;
              decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
              this._currentIndex += 1;
            }
          }
          if (this._currentIndex != startIndex && this._currentIndex + 1 < this._endIndex && (this._string.charAt(this._currentIndex) == "e" || this._string.charAt(this._currentIndex) == "E") && this._string.charAt(this._currentIndex + 1) != "x" && this._string.charAt(this._currentIndex + 1) != "m") {
            this._currentIndex++;
            if (this._string.charAt(this._currentIndex) == "+") {
              this._currentIndex++;
            } else if (this._string.charAt(this._currentIndex) == "-") {
              this._currentIndex++;
              expsign = -1;
            }
            if (this._currentIndex >= this._endIndex || this._string.charAt(this._currentIndex) < "0" || this._string.charAt(this._currentIndex) > "9")
              return void 0;
            while (this._currentIndex < this._endIndex && this._string.charAt(this._currentIndex) >= "0" && this._string.charAt(this._currentIndex) <= "9") {
              exponent *= 10;
              exponent += this._string.charAt(this._currentIndex) - "0";
              this._currentIndex++;
            }
          }
          var number = integer + decimal;
          number *= sign;
          if (exponent)
            number *= Math.pow(10, expsign * exponent);
          if (startIndex == this._currentIndex)
            return void 0;
          this._skipOptionalSpacesOrDelimiter();
          return number;
        };
        Source.prototype._parseArcFlag = function() {
          if (this._currentIndex >= this._endIndex)
            return void 0;
          var flag = false;
          var flagChar = this._string.charAt(this._currentIndex++);
          if (flagChar == "0")
            flag = false;
          else if (flagChar == "1")
            flag = true;
          else
            return void 0;
          this._skipOptionalSpacesOrDelimiter();
          return flag;
        };
        Source.prototype.parseSegment = function() {
          var lookahead = this._string[this._currentIndex];
          var command = this._pathSegTypeFromChar(lookahead);
          if (command == window.SVGPathSeg.PATHSEG_UNKNOWN) {
            if (this._previousCommand == window.SVGPathSeg.PATHSEG_UNKNOWN)
              return null;
            command = this._nextCommandHelper(lookahead, this._previousCommand);
            if (command == window.SVGPathSeg.PATHSEG_UNKNOWN)
              return null;
          } else {
            this._currentIndex++;
          }
          this._previousCommand = command;
          switch (command) {
            case window.SVGPathSeg.PATHSEG_MOVETO_REL:
              return new window.SVGPathSegMovetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_MOVETO_ABS:
              return new window.SVGPathSegMovetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_REL:
              return new window.SVGPathSegLinetoRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_ABS:
              return new window.SVGPathSegLinetoAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
              return new window.SVGPathSegLinetoHorizontalRel(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
              return new window.SVGPathSegLinetoHorizontalAbs(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
              return new window.SVGPathSegLinetoVerticalRel(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
              return new window.SVGPathSegLinetoVerticalAbs(owningPathSegList, this._parseNumber());
            case window.SVGPathSeg.PATHSEG_CLOSEPATH:
              this._skipOptionalSpaces();
              return new window.SVGPathSegClosePath(owningPathSegList);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
              var points = {
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicSmoothRel(owningPathSegList, points.x, points.y, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
              var points = {
                x2: this._parseNumber(),
                y2: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoCubicSmoothAbs(owningPathSegList, points.x, points.y, points.x2, points.y2);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoQuadraticRel(owningPathSegList, points.x, points.y, points.x1, points.y1);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegCurvetoQuadraticAbs(owningPathSegList, points.x, points.y, points.x1, points.y1);
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
              return new window.SVGPathSegCurvetoQuadraticSmoothRel(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
              return new window.SVGPathSegCurvetoQuadraticSmoothAbs(owningPathSegList, this._parseNumber(), this._parseNumber());
            case window.SVGPathSeg.PATHSEG_ARC_REL:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                arcAngle: this._parseNumber(),
                arcLarge: this._parseArcFlag(),
                arcSweep: this._parseArcFlag(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegArcRel(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
            case window.SVGPathSeg.PATHSEG_ARC_ABS:
              var points = {
                x1: this._parseNumber(),
                y1: this._parseNumber(),
                arcAngle: this._parseNumber(),
                arcLarge: this._parseArcFlag(),
                arcSweep: this._parseArcFlag(),
                x: this._parseNumber(),
                y: this._parseNumber()
              };
              return new window.SVGPathSegArcAbs(owningPathSegList, points.x, points.y, points.x1, points.y1, points.arcAngle, points.arcLarge, points.arcSweep);
            default:
              throw "Unknown path seg type.";
          }
        };
        var builder = new Builder();
        var source = new Source(string);
        if (!source.initialCommandIsMoveTo())
          return [];
        while (source.hasMoreData()) {
          var pathSeg = source.parseSegment();
          if (!pathSeg)
            return [];
          builder.appendSegment(pathSeg);
        }
        return builder.pathSegList;
      };
    }
  } catch (e) {
    console.warn("An error occurred in tsParticles pathseg polyfill. If the Polygon Mask is not working, please open an issue here: https://github.com/matteobruni/tsparticles", e);
  }
})();
var pathseg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});

// .svelte-kit/netlify/entry.js
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const rawBody = headers["content-type"] === "application/octet-stream" ? new TextEncoder("base64").encode(body) : isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      headers: rendered.headers,
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
