(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	/*
	 * Copyright (c) 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	function normalizeColor(color) {
	  var match;

	  if (typeof color === 'number') {
	    if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
	      return color;
	    }
	    return null;
	  }

	  // Ordered based on occurrences on Facebook codebase
	  if ((match = matchers.hex6.exec(color))) {
	    return parseInt(match[1] + 'ff', 16) >>> 0;
	  }

	  if (names.hasOwnProperty(color)) {
	    return names[color];
	  }

	  if ((match = matchers.rgb.exec(color))) {
	    return (
	        parse255(match[1]) << 24 | // r
	        parse255(match[2]) << 16 | // g
	        parse255(match[3]) << 8 | // b
	        0x000000ff // a
	      ) >>> 0;
	  }

	  if ((match = matchers.rgba.exec(color))) {
	    return (
	        parse255(match[1]) << 24 | // r
	        parse255(match[2]) << 16 | // g
	        parse255(match[3]) << 8 | // b
	        parse1(match[4]) // a
	      ) >>> 0;
	  }

	  if ((match = matchers.hex3.exec(color))) {
	    return parseInt(
	        match[1] + match[1] + // r
	        match[2] + match[2] + // g
	        match[3] + match[3] + // b
	        'ff', // a
	        16
	      ) >>> 0;
	  }

	  // https://drafts.csswg.org/css-color-4/#hex-notation
	  if ((match = matchers.hex8.exec(color))) {
	    return parseInt(match[1], 16) >>> 0;
	  }

	  if ((match = matchers.hex4.exec(color))) {
	    return parseInt(
	        match[1] + match[1] + // r
	        match[2] + match[2] + // g
	        match[3] + match[3] + // b
	        match[4] + match[4], // a
	        16
	      ) >>> 0;
	  }

	  if ((match = matchers.hsl.exec(color))) {
	    return (
	        hslToRgb(
	          parse360(match[1]), // h
	          parsePercentage(match[2]), // s
	          parsePercentage(match[3]) // l
	        ) |
	        0x000000ff // a
	      ) >>> 0;
	  }

	  if ((match = matchers.hsla.exec(color))) {
	    return (
	        hslToRgb(
	          parse360(match[1]), // h
	          parsePercentage(match[2]), // s
	          parsePercentage(match[3]) // l
	        ) |
	        parse1(match[4]) // a
	      ) >>> 0;
	  }

	  return null;
	}

	function hue2rgb(p, q, t) {
	  if (t < 0) {
	    t += 1;
	  }
	  if (t > 1) {
	    t -= 1;
	  }
	  if (t < 1 / 6) {
	    return p + (q - p) * 6 * t;
	  }
	  if (t < 1 / 2) {
	    return q;
	  }
	  if (t < 2 / 3) {
	    return p + (q - p) * (2 / 3 - t) * 6;
	  }
	  return p;
	}

	function hslToRgb(h, s, l) {
	  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	  var p = 2 * l - q;
	  var r = hue2rgb(p, q, h + 1 / 3);
	  var g = hue2rgb(p, q, h);
	  var b = hue2rgb(p, q, h - 1 / 3);

	  return (
	    Math.round(r * 255) << 24 |
	    Math.round(g * 255) << 16 |
	    Math.round(b * 255) << 8
	  );
	}

	// var INTEGER = '[-+]?\\d+';
	var NUMBER = '[-+]?\\d*\\.?\\d+';
	var PERCENTAGE = NUMBER + '%';

	function toArray(arrayLike) {
	  return Array.prototype.slice.call(arrayLike, 0);
	}

	function call() {
	  return '\\(\\s*(' + toArray(arguments).join(')\\s*,\\s*(') + ')\\s*\\)';
	}

	var matchers = {
	  rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
	  rgba: new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER)),
	  hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
	  hsla: new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)),
	  hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	  hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	  hex6: /^#([0-9a-fA-F]{6})$/,
	  hex8: /^#([0-9a-fA-F]{8})$/,
	};

	function parse255(str) {
	  var int = parseInt(str, 10);
	  if (int < 0) {
	    return 0;
	  }
	  if (int > 255) {
	    return 255;
	  }
	  return int;
	}

	function parse360(str) {
	  var int = parseFloat(str);
	  return (((int % 360) + 360) % 360) / 360;
	}

	function parse1(str) {
	  var num = parseFloat(str);
	  if (num < 0) {
	    return 0;
	  }
	  if (num > 1) {
	    return 255;
	  }
	  return Math.round(num * 255);
	}

	function parsePercentage(str) {
	  // parseFloat conveniently ignores the final %
	  var int = parseFloat(str, 10);
	  if (int < 0) {
	    return 0;
	  }
	  if (int > 100) {
	    return 1;
	  }
	  return int / 100;
	}

	var names = {
	  transparent: 0x00000000,

	  // http://www.w3.org/TR/css3-color/#svg-color
	  aliceblue: 0xf0f8ffff,
	  antiquewhite: 0xfaebd7ff,
	  aqua: 0x00ffffff,
	  aquamarine: 0x7fffd4ff,
	  azure: 0xf0ffffff,
	  beige: 0xf5f5dcff,
	  bisque: 0xffe4c4ff,
	  black: 0x000000ff,
	  blanchedalmond: 0xffebcdff,
	  blue: 0x0000ffff,
	  blueviolet: 0x8a2be2ff,
	  brown: 0xa52a2aff,
	  burlywood: 0xdeb887ff,
	  burntsienna: 0xea7e5dff,
	  cadetblue: 0x5f9ea0ff,
	  chartreuse: 0x7fff00ff,
	  chocolate: 0xd2691eff,
	  coral: 0xff7f50ff,
	  cornflowerblue: 0x6495edff,
	  cornsilk: 0xfff8dcff,
	  crimson: 0xdc143cff,
	  cyan: 0x00ffffff,
	  darkblue: 0x00008bff,
	  darkcyan: 0x008b8bff,
	  darkgoldenrod: 0xb8860bff,
	  darkgray: 0xa9a9a9ff,
	  darkgreen: 0x006400ff,
	  darkgrey: 0xa9a9a9ff,
	  darkkhaki: 0xbdb76bff,
	  darkmagenta: 0x8b008bff,
	  darkolivegreen: 0x556b2fff,
	  darkorange: 0xff8c00ff,
	  darkorchid: 0x9932ccff,
	  darkred: 0x8b0000ff,
	  darksalmon: 0xe9967aff,
	  darkseagreen: 0x8fbc8fff,
	  darkslateblue: 0x483d8bff,
	  darkslategray: 0x2f4f4fff,
	  darkslategrey: 0x2f4f4fff,
	  darkturquoise: 0x00ced1ff,
	  darkviolet: 0x9400d3ff,
	  deeppink: 0xff1493ff,
	  deepskyblue: 0x00bfffff,
	  dimgray: 0x696969ff,
	  dimgrey: 0x696969ff,
	  dodgerblue: 0x1e90ffff,
	  firebrick: 0xb22222ff,
	  floralwhite: 0xfffaf0ff,
	  forestgreen: 0x228b22ff,
	  fuchsia: 0xff00ffff,
	  gainsboro: 0xdcdcdcff,
	  ghostwhite: 0xf8f8ffff,
	  gold: 0xffd700ff,
	  goldenrod: 0xdaa520ff,
	  gray: 0x808080ff,
	  green: 0x008000ff,
	  greenyellow: 0xadff2fff,
	  grey: 0x808080ff,
	  honeydew: 0xf0fff0ff,
	  hotpink: 0xff69b4ff,
	  indianred: 0xcd5c5cff,
	  indigo: 0x4b0082ff,
	  ivory: 0xfffff0ff,
	  khaki: 0xf0e68cff,
	  lavender: 0xe6e6faff,
	  lavenderblush: 0xfff0f5ff,
	  lawngreen: 0x7cfc00ff,
	  lemonchiffon: 0xfffacdff,
	  lightblue: 0xadd8e6ff,
	  lightcoral: 0xf08080ff,
	  lightcyan: 0xe0ffffff,
	  lightgoldenrodyellow: 0xfafad2ff,
	  lightgray: 0xd3d3d3ff,
	  lightgreen: 0x90ee90ff,
	  lightgrey: 0xd3d3d3ff,
	  lightpink: 0xffb6c1ff,
	  lightsalmon: 0xffa07aff,
	  lightseagreen: 0x20b2aaff,
	  lightskyblue: 0x87cefaff,
	  lightslategray: 0x778899ff,
	  lightslategrey: 0x778899ff,
	  lightsteelblue: 0xb0c4deff,
	  lightyellow: 0xffffe0ff,
	  lime: 0x00ff00ff,
	  limegreen: 0x32cd32ff,
	  linen: 0xfaf0e6ff,
	  magenta: 0xff00ffff,
	  maroon: 0x800000ff,
	  mediumaquamarine: 0x66cdaaff,
	  mediumblue: 0x0000cdff,
	  mediumorchid: 0xba55d3ff,
	  mediumpurple: 0x9370dbff,
	  mediumseagreen: 0x3cb371ff,
	  mediumslateblue: 0x7b68eeff,
	  mediumspringgreen: 0x00fa9aff,
	  mediumturquoise: 0x48d1ccff,
	  mediumvioletred: 0xc71585ff,
	  midnightblue: 0x191970ff,
	  mintcream: 0xf5fffaff,
	  mistyrose: 0xffe4e1ff,
	  moccasin: 0xffe4b5ff,
	  navajowhite: 0xffdeadff,
	  navy: 0x000080ff,
	  oldlace: 0xfdf5e6ff,
	  olive: 0x808000ff,
	  olivedrab: 0x6b8e23ff,
	  orange: 0xffa500ff,
	  orangered: 0xff4500ff,
	  orchid: 0xda70d6ff,
	  palegoldenrod: 0xeee8aaff,
	  palegreen: 0x98fb98ff,
	  paleturquoise: 0xafeeeeff,
	  palevioletred: 0xdb7093ff,
	  papayawhip: 0xffefd5ff,
	  peachpuff: 0xffdab9ff,
	  peru: 0xcd853fff,
	  pink: 0xffc0cbff,
	  plum: 0xdda0ddff,
	  powderblue: 0xb0e0e6ff,
	  purple: 0x800080ff,
	  rebeccapurple: 0x663399ff,
	  red: 0xff0000ff,
	  rosybrown: 0xbc8f8fff,
	  royalblue: 0x4169e1ff,
	  saddlebrown: 0x8b4513ff,
	  salmon: 0xfa8072ff,
	  sandybrown: 0xf4a460ff,
	  seagreen: 0x2e8b57ff,
	  seashell: 0xfff5eeff,
	  sienna: 0xa0522dff,
	  silver: 0xc0c0c0ff,
	  skyblue: 0x87ceebff,
	  slateblue: 0x6a5acdff,
	  slategray: 0x708090ff,
	  slategrey: 0x708090ff,
	  snow: 0xfffafaff,
	  springgreen: 0x00ff7fff,
	  steelblue: 0x4682b4ff,
	  tan: 0xd2b48cff,
	  teal: 0x008080ff,
	  thistle: 0xd8bfd8ff,
	  tomato: 0xff6347ff,
	  turquoise: 0x40e0d0ff,
	  violet: 0xee82eeff,
	  wheat: 0xf5deb3ff,
	  white: 0xffffffff,
	  whitesmoke: 0xf5f5f5ff,
	  yellow: 0xffff00ff,
	  yellowgreen: 0x9acd32ff,
	};

	function rgba(colorInt) {
	  var r = Math.round(((colorInt & 0xff000000) >>> 24));
	  var g = Math.round(((colorInt & 0x00ff0000) >>> 16));
	  var b = Math.round(((colorInt & 0x0000ff00) >>> 8));
	  var a = ((colorInt & 0x000000ff) >>> 0) / 255;
	  return {
	    r: r,
	    g: g,
	    b: b,
	    a: a,
	  };
	}
	normalizeColor.rgba = rgba;

	var normalizeCssColor = normalizeColor;

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var FillType = exports.FillType = {
	    Solid: 0,
	    Gradient: 1,
	    Pattern: 4,
	    Noise: 5
	};

	var GradientType = exports.GradientType = {
	    Linear: 0,
	    Radial: 1,
	    Circular: 2
	};

	var PatternFillType = exports.PatternFillType = {
	    Tile: 0,
	    Fill: 1,
	    Stretch: 2,
	    Fit: 3
	};

	var NoiseFillType = exports.NoiseFillType = {
	    Original: 0,
	    Black: 1,
	    White: 2,
	    Color: 3
	};

	var BorderLineCapsStyle = exports.BorderLineCapsStyle = {
	    Butt: 0,
	    Round: 1,
	    Square: 2
	};

	var BorderLineJoinStyle = exports.BorderLineJoinStyle = {
	    Miter: 0,
	    Round: 1,
	    Bevel: 2
	};

	var LineDecorationType = exports.LineDecorationType = {
	    None: 0,
	    OpenedArrow: 1,
	    ClosedArrow: 2,
	    Bar: 3
	};

	var BlurType = exports.BlurType = {
	    GaussianBlur: 0,
	    MotionBlur: 1,
	    ZoomBlur: 2,
	    BackgroundBlur: 3
	};

	var BorderPosition = exports.BorderPosition = {
	    Center: 0,
	    Inside: 1,
	    Outside: 2
	};

	var MaskMode = exports.MaskMode = {
	    Outline: 0,
	    Alpha: 1
	};

	var BooleanOperation = exports.BooleanOperation = {
	    None: -1,
	    Union: 0,
	    Subtract: 1,
	    Intersect: 2,
	    Difference: 3
	};

	var ExportOptionsFormat = exports.ExportOptionsFormat = {
	    PNG: 'png',
	    JPG: 'jpg',
	    TIFF: 'tiff',
	    PDF: 'pdf',
	    EPS: 'eps',
	    SVG: 'svg'
	};

	var BlendingMode = exports.BlendingMode = {
	    Normal: 0,
	    Darken: 1,
	    Multiply: 2,
	    ColorBurn: 3,
	    Lighten: 4,
	    Screen: 5,
	    ColorDodge: 6,
	    Overlay: 7,
	    SoftLight: 8,
	    HardLight: 9,
	    Difference: 10,
	    Exclusion: 11,
	    Hue: 12,
	    Saturation: 13,
	    Color: 14,
	    Luminosity: 15
	};

	var TextAlignment = exports.TextAlignment = {
	    Left: 0,
	    Right: 1,
	    Center: 2,
	    Justified: 3
	};

	var TextBehaviour = exports.TextBehaviour = {
	    Auto: 0,
	    Fixed: 1
	};

	var CurvePointMode = exports.CurvePointMode = {
	    Straight: 1,
	    Mirrored: 2,
	    Disconnected: 4,
	    Asymmetric: 3
	};
	});

	unwrapExports(lib);
	var lib_1 = lib.FillType;
	var lib_2 = lib.GradientType;
	var lib_3 = lib.PatternFillType;
	var lib_4 = lib.NoiseFillType;
	var lib_5 = lib.BorderLineCapsStyle;
	var lib_6 = lib.BorderLineJoinStyle;
	var lib_7 = lib.LineDecorationType;
	var lib_8 = lib.BlurType;
	var lib_9 = lib.BorderPosition;
	var lib_10 = lib.MaskMode;
	var lib_11 = lib.BooleanOperation;
	var lib_12 = lib.ExportOptionsFormat;
	var lib_13 = lib.BlendingMode;
	var lib_14 = lib.TextAlignment;
	var lib_15 = lib.TextBehaviour;
	var lib_16 = lib.CurvePointMode;

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateID = generateID;
	exports.getGroupLayout = exports.DEFAULT_GROUP_LAYOUT = exports.SMART_LAYOUT = exports.RESIZING_CONSTRAINTS = exports.calculateResizingConstraintValue = exports.makeImageFill = exports.makeColorFill = exports.makeColorFromCSS = void 0;

	var _normalizeCssColor = _interopRequireDefault(normalizeCssColor);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var lut = [];

	for (var i = 0; i < 256; i += 1) {
	  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
	} // http://stackoverflow.com/a/21963136


	function e7() {
	  var d0 = Math.random() * 0xffffffff | 0;
	  var d1 = Math.random() * 0xffffffff | 0;
	  var d2 = Math.random() * 0xffffffff | 0;
	  var d3 = Math.random() * 0xffffffff | 0;
	  return "".concat(lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff], "-").concat(lut[d1 & 0xff]).concat(lut[d1 >> 8 & 0xff], "-").concat(lut[d1 >> 16 & 0x0f | 0x40]).concat(lut[d1 >> 24 & 0xff], "-").concat(lut[d2 & 0x3f | 0x80]).concat(lut[d2 >> 8 & 0xff], "-").concat(lut[d2 >> 16 & 0xff]).concat(lut[d2 >> 24 & 0xff]).concat(lut[d3 & 0xff]).concat(lut[d3 >> 8 & 0xff]).concat(lut[d3 >> 16 & 0xff]).concat(lut[d3 >> 24 & 0xff]);
	}

	function generateID() {
	  return e7();
	}

	var safeToLower = function safeToLower(input) {
	  if (typeof input === 'string') {
	    return input.toLowerCase();
	  }

	  return input;
	}; // Takes colors as CSS hex, name, rgb, rgba, hsl or hsla


	var makeColorFromCSS = function makeColorFromCSS(input) {
	  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var nullableColor = (0, _normalizeCssColor["default"])(safeToLower(input));
	  var colorInt = nullableColor === null ? 0x00000000 : nullableColor;

	  var _normalizeColor$rgba = _normalizeCssColor["default"].rgba(colorInt),
	      r = _normalizeColor$rgba.r,
	      g = _normalizeColor$rgba.g,
	      b = _normalizeColor$rgba.b,
	      a = _normalizeColor$rgba.a;

	  return {
	    _class: 'color',
	    red: r / 255,
	    green: g / 255,
	    blue: b / 255,
	    alpha: a * alpha
	  };
	}; // Solid color fill


	exports.makeColorFromCSS = makeColorFromCSS;

	var makeColorFill = function makeColorFill(cssColor, alpha) {
	  return {
	    _class: 'fill',
	    isEnabled: true,
	    color: makeColorFromCSS(cssColor, alpha),
	    fillType: 0,
	    noiseIndex: 0,
	    noiseIntensity: 0,
	    patternFillType: 1,
	    patternTileScale: 1
	  };
	};

	exports.makeColorFill = makeColorFill;

	var ensureBase64DataURL = function ensureBase64DataURL(url) {
	  var imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

	  if (imageData && imageData[3] !== 'base64') {
	    // Solve for an NSURL bug that can't handle plaintext data: URLs
	    var type = imageData[1];
	    var data = decodeURIComponent(imageData[4]);
	    var encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
	    var buffer;

	    if (encodingMatch) {
	      buffer = Buffer.from(data, encodingMatch[1]);
	    } else {
	      buffer = Buffer.from(data);
	    }

	    return "data:".concat(type, ";base64,").concat(buffer.toString('base64'));
	  }

	  return url;
	}; // patternFillType - 0 1 2 3


	var makeImageFill = function makeImageFill(url) {
	  var patternFillType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  return {
	    _class: 'fill',
	    isEnabled: true,
	    fillType: lib.FillType.Pattern,
	    image: {
	      _class: 'MSJSONOriginalDataReference',
	      _ref_class: 'MSImageData',
	      _ref: "images/".concat(generateID()),
	      url: url.indexOf('data:') === 0 ? ensureBase64DataURL(url) : url
	    },
	    noiseIndex: 0,
	    noiseIntensity: 0,
	    patternFillType: patternFillType,
	    patternTileScale: 1
	  };
	};

	exports.makeImageFill = makeImageFill;

	var containsAllItems = function containsAllItems(needles, haystack) {
	  return needles.every(function (needle) {
	    return haystack.includes(needle);
	  });
	};

	var calculateResizingConstraintValue = function calculateResizingConstraintValue() {
	  var noHeight = [RESIZING_CONSTRAINTS.TOP, RESIZING_CONSTRAINTS.BOTTOM, RESIZING_CONSTRAINTS.HEIGHT];
	  var noWidth = [RESIZING_CONSTRAINTS.LEFT, RESIZING_CONSTRAINTS.RIGHT, RESIZING_CONSTRAINTS.WIDTH];
	  var validValues = Object.values(RESIZING_CONSTRAINTS);

	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (!args.every(function (arg) {
	    return validValues.includes(arg);
	  })) {
	    throw new Error('Unknown resizing constraint');
	  } else if (containsAllItems(noHeight, args)) {
	    throw new Error('Can\'t fix height when top & bottom are fixed');
	  } else if (containsAllItems(noWidth, args)) {
	    throw new Error('Can\'t fix width when left & right are fixed');
	  }

	  return args.length > 0 ? args.reduce(function (acc, item) {
	    return acc & item;
	  }, args[0]) : RESIZING_CONSTRAINTS.NONE;
	};

	exports.calculateResizingConstraintValue = calculateResizingConstraintValue;
	var RESIZING_CONSTRAINTS = {
	  TOP: 31,
	  RIGHT: 62,
	  BOTTOM: 55,
	  LEFT: 59,
	  WIDTH: 61,
	  HEIGHT: 47,
	  NONE: 63
	};
	exports.RESIZING_CONSTRAINTS = RESIZING_CONSTRAINTS;
	var SMART_LAYOUT = {
	  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
	  HORIZONTALLY_CENTER: 'HORIZONTALLY_CENTER',
	  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
	  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
	  VERTICALLY_CENTER: 'VERTICALLY_CENTER',
	  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP'
	};
	exports.SMART_LAYOUT = SMART_LAYOUT;
	var DEFAULT_GROUP_LAYOUT = {
	  _class: 'MSImmutableFreeformGroupLayout'
	};
	exports.DEFAULT_GROUP_LAYOUT = DEFAULT_GROUP_LAYOUT;
	var smartLayoutBase = {
	  _class: 'MSImmutableInferredGroupLayout'
	};
	var HORIZONTAL_AXIS = {
	  axis: 0
	};
	var VERTICAL_AXIS = {
	  axis: 1
	};

	var getGroupLayout = function getGroupLayout(layoutType) {
	  switch (layoutType) {
	    case SMART_LAYOUT.LEFT_TO_RIGHT:
	      {
	        return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
	          layoutAnchor: 0
	        });
	      }

	    case SMART_LAYOUT.HORIZONTALLY_CENTER:
	      {
	        return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
	          layoutAnchor: 1
	        });
	      }

	    case SMART_LAYOUT.RIGHT_TO_LEFT:
	      {
	        return Object.assign({}, smartLayoutBase, HORIZONTAL_AXIS, {
	          layoutAnchor: 2
	        });
	      }

	    case SMART_LAYOUT.TOP_TO_BOTTOM:
	      {
	        return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
	          layoutAnchor: 0
	        });
	      }

	    case SMART_LAYOUT.VERTICALLY_CENTER:
	      {
	        return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
	          layoutAnchor: 1
	        });
	      }

	    case SMART_LAYOUT.BOTTOM_TO_TOP:
	      {
	        return Object.assign({}, smartLayoutBase, VERTICAL_AXIS, {
	          layoutAnchor: 2
	        });
	      }

	    default:
	      return DEFAULT_GROUP_LAYOUT;
	  }
	};

	exports.getGroupLayout = getGroupLayout;
	});

	unwrapExports(utils);
	var utils_1 = utils.generateID;
	var utils_2 = utils.getGroupLayout;
	var utils_3 = utils.DEFAULT_GROUP_LAYOUT;
	var utils_4 = utils.SMART_LAYOUT;
	var utils_5 = utils.RESIZING_CONSTRAINTS;
	var utils_6 = utils.calculateResizingConstraintValue;
	var utils_7 = utils.makeImageFill;
	var utils_8 = utils.makeColorFill;
	var utils_9 = utils.makeColorFromCSS;

	var base = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;



	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	var DEFAULT_USER_INFO_SCOPE = 'html-sketchapp';

	var Base =
	/*#__PURE__*/
	function () {
	  function Base() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        id = _ref.id;

	    _classCallCheck(this, Base);

	    this._class = null;
	    this._layers = [];
	    this._style = null;
	    this._objectID = id || (0, utils.generateID)();
	    this._name = '';
	    this._userInfo = null;
	    this.setResizingConstraint(utils.RESIZING_CONSTRAINTS.NONE);
	    this.setHasClippingMask(false);
	    this.setIsLocked(false);
	  }

	  _createClass(Base, [{
	    key: "setFixedWidthAndHeight",
	    value: function setFixedWidthAndHeight() {
	      this.setResizingConstraint(utils.RESIZING_CONSTRAINTS.WIDTH, utils.RESIZING_CONSTRAINTS.HEIGHT);
	    }
	  }, {
	    key: "setResizingConstraint",
	    value: function setResizingConstraint() {
	      this._resizingConstraint = utils.calculateResizingConstraintValue.apply(void 0, arguments);
	    }
	  }, {
	    key: "getID",
	    value: function getID() {
	      return this._objectID;
	    }
	  }, {
	    key: "setObjectID",
	    value: function setObjectID(id) {
	      this._objectID = id;
	    } // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
	    // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
	    // by default however we use "html-sketchapp" here which won't work directly with any plugin
	    // but can still be accessed via native API: layer.userInfo()['html-sketchapp']

	  }, {
	    key: "setUserInfo",
	    value: function setUserInfo(key, value) {
	      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_USER_INFO_SCOPE;
	      this._userInfo = this._userInfo || {};
	      this._userInfo[scope] = this._userInfo[scope] || {};
	      this._userInfo[scope][key] = value;
	    }
	  }, {
	    key: "getUserInfo",
	    value: function getUserInfo(key) {
	      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_USER_INFO_SCOPE;
	      return this._userInfo && this._userInfo[scope] && this._userInfo[scope][key];
	    }
	  }, {
	    key: "setName",
	    value: function setName(name) {
	      this._name = name;
	    }
	  }, {
	    key: "addLayer",
	    value: function addLayer(layer) {
	      this._layers.push(layer);
	    }
	  }, {
	    key: "setStyle",
	    value: function setStyle(style) {
	      this._style = style;
	    }
	  }, {
	    key: "setHasClippingMask",
	    value: function setHasClippingMask(hasClippingMask) {
	      this._hasClippingMask = hasClippingMask;
	    }
	  }, {
	    key: "setIsLocked",
	    value: function setIsLocked(isLocked) {
	      this._isLocked = isLocked;
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      if (!this._class) {
	        throw new Error('Class not set.');
	      }

	      var result = {
	        '_class': this._class,
	        'do_objectID': this._objectID,
	        'exportOptions': {
	          '_class': 'exportOptions',
	          'exportFormats': [],
	          'includedLayerIds': [],
	          'layerOptions': 0,
	          'shouldTrim': false
	        },
	        'isFlippedHorizontal': false,
	        'isFlippedVertical': false,
	        'isLocked': this._isLocked,
	        'isVisible': true,
	        'layerListExpandedType': 0,
	        'name': this._name || this._class,
	        'nameIsFixed': false,
	        'resizingConstraint': this._resizingConstraint,
	        'resizingType': 0,
	        'rotation': 0,
	        'shouldBreakMaskChain': false,
	        'layers': this._layers.map(function (layer) {
	          return layer.toJSON();
	        }),
	        'clippingMaskMode': 0,
	        'hasClippingMask': this._hasClippingMask
	      };

	      if (this._userInfo) {
	        result.userInfo = this._userInfo;
	      }

	      if (this._style) {
	        result.style = this._style.toJSON();
	      }

	      return result;
	    }
	  }]);

	  return Base;
	}();

	var _default = Base;
	exports["default"] = _default;
	});

	unwrapExports(base);

	var rectangle = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Rectangle =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Rectangle, _Base);

	  function Rectangle(_ref) {
	    var _this;

	    var width = _ref.width,
	        height = _ref.height,
	        _ref$cornerRadius = _ref.cornerRadius,
	        cornerRadius = _ref$cornerRadius === void 0 ? {
	      topLeft: 0,
	      bottomLeft: 0,
	      topRight: 0,
	      bottomRight: 0
	    } : _ref$cornerRadius,
	        id = _ref.id;

	    _classCallCheck(this, Rectangle);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).call(this, {
	      id: id
	    }));
	    _this._class = 'rectangle';
	    _this._width = width;
	    _this._height = height;
	    _this._cornerRadius = cornerRadius;
	    return _this;
	  }

	  _createClass(Rectangle, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Rectangle.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': 0,
	        'y': 0
	      };
	      obj.path = {
	        '_class': 'path',
	        'isClosed': true,
	        'pointRadiusBehaviour': 1,
	        'points': [{
	          '_class': 'curvePoint',
	          'cornerRadius': this._cornerRadius.topLeft,
	          'curveFrom': '{0, 0}',
	          'curveMode': 1,
	          'curveTo': '{0, 0}',
	          'hasCurveFrom': false,
	          'hasCurveTo': false,
	          'point': '{0, 0}'
	        }, {
	          '_class': 'curvePoint',
	          'cornerRadius': this._cornerRadius.topRight,
	          'curveFrom': '{1, 0}',
	          'curveMode': 1,
	          'curveTo': '{1, 0}',
	          'hasCurveFrom': false,
	          'hasCurveTo': false,
	          'point': '{1, 0}'
	        }, {
	          '_class': 'curvePoint',
	          'cornerRadius': this._cornerRadius.bottomRight,
	          'curveFrom': '{1, 1}',
	          'curveMode': 1,
	          'curveTo': '{1, 1}',
	          'hasCurveFrom': false,
	          'hasCurveTo': false,
	          'point': '{1, 1}'
	        }, {
	          '_class': 'curvePoint',
	          'cornerRadius': this._cornerRadius.bottomLeft,
	          'curveFrom': '{0, 1}',
	          'curveMode': 1,
	          'curveTo': '{0, 1}',
	          'hasCurveFrom': false,
	          'hasCurveTo': false,
	          'point': '{0, 1}'
	        }]
	      };
	      obj.hasConvertedToNewRoundCorners = true;
	      obj.fixedRadius = 0;
	      obj.edited = false;
	      obj.booleanOperation = -1;
	      return obj;
	    }
	  }]);

	  return Rectangle;
	}(_base["default"]);

	var _default = Rectangle;
	exports["default"] = _default;
	});

	unwrapExports(rectangle);

	var bitmap = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Bitmap =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Bitmap, _Base);

	  function Bitmap(_ref) {
	    var _this;

	    var url = _ref.url,
	        x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        id = _ref.id;

	    _classCallCheck(this, Bitmap);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bitmap).call(this, {
	      id: id
	    }));
	    _this._class = 'bitmap';
	    _this._url = url;
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    return _this;
	  }

	  _createClass(Bitmap, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Bitmap.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'x': this._x,
	        'y': this._y,
	        'height': this._height,
	        'width': this._width
	      };
	      obj.image = {
	        _class: 'MSJSONOriginalDataReference',
	        _ref_class: 'MSImageData',
	        _ref: "images/".concat((0, utils.generateID)()),
	        url: this._url
	      };
	      return obj;
	    }
	  }]);

	  return Bitmap;
	}(_base["default"]);

	var _default = Bitmap;
	exports["default"] = _default;
	});

	unwrapExports(bitmap);

	var svg = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var SVG =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(SVG, _Base);

	  function SVG(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        rawSVGString = _ref.rawSVGString,
	        id = _ref.id;

	    _classCallCheck(this, SVG);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SVG).call(this, {
	      id: id
	    }));
	    _this._rawSVGString = rawSVGString;
	    _this._width = width;
	    _this._height = height;
	    _this._x = x;
	    _this._y = y;
	    return _this;
	  }

	  _createClass(SVG, [{
	    key: "toJSON",
	    value: function toJSON() {
	      // NOTE: this is a non-standard extension of the .sketch format
	      return {
	        _class: 'svg',
	        rawSVGString: this._rawSVGString,
	        width: this._width,
	        height: this._height,
	        x: this._x,
	        y: this._y,
	        resizingConstraint: this._resizingConstraint,
	        hasClippingMask: this._hasClippingMask
	      };
	    }
	  }]);

	  return SVG;
	}(_base["default"]);

	var _default = SVG;
	exports["default"] = _default;
	});

	unwrapExports(svg);

	var shapeGroup = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var ShapeGroup =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(ShapeGroup, _Base);

	  function ShapeGroup(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        id = _ref.id;

	    _classCallCheck(this, ShapeGroup);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShapeGroup).call(this, {
	      id: id
	    }));
	    _this._class = 'shapeGroup';
	    _this._width = width;
	    _this._height = height;

	    _this.setPosition({
	      x: x,
	      y: y
	    });

	    return _this;
	  }

	  _createClass(ShapeGroup, [{
	    key: "setPosition",
	    value: function setPosition(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y;
	      this._x = x;
	      this._y = y;
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(ShapeGroup.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.hasClickThrough = false;
	      obj.windingRule = 1;
	      return obj;
	    }
	  }]);

	  return ShapeGroup;
	}(_base["default"]);

	var _default = ShapeGroup;
	exports["default"] = _default;
	});

	unwrapExports(shapeGroup);

	var group = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Group =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Group, _Base);

	  function Group(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        id = _ref.id;

	    _classCallCheck(this, Group);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Group).call(this, {
	      id: id
	    }));
	    _this._class = 'group';
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    return _this;
	  }

	  _createClass(Group, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Group.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.hasClickThrough = false;
	      obj.clippingMaskMode = 0;
	      obj.hasClippingMask = false;
	      obj.windingRule = 1;
	      return obj;
	    }
	  }]);

	  return Group;
	}(_base["default"]);

	var _default = Group;
	exports["default"] = _default;
	});

	unwrapExports(group);

	var convertAngleToFromAndTo_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = convertAngleToFromAndTo;

	// Keep this pure for easy testing in the future.
	function convertAngleToFromAndTo(angle) {
	  // default 180deg
	  var from = {
	    x: 0.5,
	    y: 0
	  };
	  var to = {
	    x: 0.5,
	    y: 1
	  }; // Learn math or find someone smarter to figure this out correctly

	  switch (angle) {
	    case 'to top':
	    case '360deg':
	    case '0deg':
	      from.y = 1;
	      to.y = 0;
	      break;

	    case 'to right':
	    case '90deg':
	      from.x = 0;
	      from.y = 0.5;
	      to.x = 1;
	      to.y = 0.5;
	      break;

	    case 'to left':
	    case '270deg':
	      from.x = 1;
	      from.y = 0.5;
	      to.x = 0;
	      to.y = 0.5;
	      break;
	  }

	  return {
	    from: from,
	    to: to
	  };
	}
	});

	unwrapExports(convertAngleToFromAndTo_1);

	var style = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true,
	});
	exports["default"] = void 0;



	var _convertAngleToFromAndTo = _interopRequireDefault(
	  convertAngleToFromAndTo_1
	);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var Style =
	  /*#__PURE__*/
	  (function () {
	    function Style() {
	      _classCallCheck(this, Style);

	      this._fills = [];
	      this._borders = [];
	      this._shadows = [];
	      this._innerShadows = [];
	      this._opacity = "1";
	    }

	    _createClass(Style, [
	      {
	        key: "addColorFill",
	        value: function addColorFill(color, opacity) {
	          this._fills.push((0, utils.makeColorFill)(color, opacity));
	        },
	      },
	      {
	        key: "addGradientFill",
	        value: function addGradientFill(_ref) {
	          var angle = _ref.angle,
	            stops = _ref.stops;

	          var _convertAngleToFromAn = (0, _convertAngleToFromAndTo["default"])(
	              angle
	            ),
	            from = _convertAngleToFromAn.from,
	            to = _convertAngleToFromAn.to;

	          this._fills.push({
	            _class: "fill",
	            isEnabled: true,
	            // Not sure why there is a color here
	            color: {
	              _class: "color",
	              alpha: 1,
	              blue: 0.847,
	              green: 0.847,
	              red: 0.847,
	            },
	            fillType: 1,
	            gradient: {
	              _class: "gradient",
	              elipseLength: 0,
	              from: "{".concat(from.x, ", ").concat(from.y),
	              gradientType: 0,
	              shouldSmoothenOpacity: false,
	              stops: stops.map(function (stopColor, index) {
	                return {
	                  _class: "gradientStop",
	                  color: (0, utils.makeColorFromCSS)(stopColor),
	                  position: index,
	                };
	              }),
	              to: "{".concat(to.x, ", ").concat(to.y, "}"),
	            },
	            noiseIndex: 0,
	            noiseIntensity: 0,
	            patternFillType: 1,
	            patternTileScale: 1,
	          });
	        },
	      },
	      {
	        key: "addImageFill",
	        value: function addImageFill(image) {
	          var fill = (0, utils.makeImageFill)(image);

	          this._fills.push(fill);
	        },
	      },
	      {
	        key: "addBorder",
	        value: function addBorder(_ref2) {
	          var color = _ref2.color,
	            thickness = _ref2.thickness;

	          this._borders.push({
	            _class: "border",
	            isEnabled: true,
	            color: (0, utils.makeColorFromCSS)(color),
	            fillType: 0,
	            position: 1,
	            thickness: thickness,
	          });
	        },
	      },
	      {
	        key: "addShadow",
	        value: function addShadow(_ref3) {
	          var _ref3$color = _ref3.color,
	            color = _ref3$color === void 0 ? "#000" : _ref3$color,
	            _ref3$blur = _ref3.blur,
	            blur = _ref3$blur === void 0 ? 1 : _ref3$blur,
	            _ref3$offsetX = _ref3.offsetX,
	            offsetX = _ref3$offsetX === void 0 ? 0 : _ref3$offsetX,
	            _ref3$offsetY = _ref3.offsetY,
	            offsetY = _ref3$offsetY === void 0 ? 0 : _ref3$offsetY,
	            _ref3$spread = _ref3.spread,
	            spread = _ref3$spread === void 0 ? 0 : _ref3$spread;

	          this._shadows.push({
	            _class: "shadow",
	            isEnabled: true,
	            blurRadius: blur,
	            color: (0, utils.makeColorFromCSS)(color),
	            contextSettings: {
	              _class: "graphicsContextSettings",
	              blendMode: 0,
	              opacity: 1,
	            },
	            offsetX: offsetX,
	            offsetY: offsetY,
	            spread: spread,
	          });
	        },
	      },
	      {
	        key: "addInnerShadow",
	        value: function addInnerShadow(_ref4) {
	          var _ref4$color = _ref4.color,
	            color = _ref4$color === void 0 ? "#000" : _ref4$color,
	            _ref4$blur = _ref4.blur,
	            blur = _ref4$blur === void 0 ? 0 : _ref4$blur,
	            _ref4$offsetX = _ref4.offsetX,
	            offsetX = _ref4$offsetX === void 0 ? 0 : _ref4$offsetX,
	            _ref4$offsetY = _ref4.offsetY,
	            offsetY = _ref4$offsetY === void 0 ? 0 : _ref4$offsetY,
	            _ref4$spread = _ref4.spread,
	            spread = _ref4$spread === void 0 ? 0 : _ref4$spread;

	          this._innerShadows.push({
	            _class: "innerShadow",
	            isEnabled: true,
	            blurRadius: blur,
	            color: (0, utils.makeColorFromCSS)(color),
	            contextSettings: {
	              _class: "graphicsContextSettings",
	              blendMode: 0,
	              opacity: 1,
	            },
	            offsetX: offsetX,
	            offsetY: offsetY,
	            spread: spread,
	          });
	        },
	      },
	      {
	        key: "addOpacity",
	        value: function addOpacity(opacity) {
	          this._opacity = opacity;
	        },
	      },
	      {
	        key: "toJSON",
	        value: function toJSON() {
	          return {
	            _class: "style",
	            fills: this._fills,
	            borders: this._borders,
	            shadows: this._shadows,
	            innerShadows: this._innerShadows,
	            endDecorationType: 0,
	            miterLimit: 10,
	            startDecorationType: 0,
	            contextSettings: {
	              _class: "graphicsContextSettings",
	              blendMode: 0,
	              opacity: this._opacity,
	            },
	          };
	        },
	      },
	    ]);

	    return Style;
	  })();

	var _default = Style;
	exports["default"] = _default;
	});

	unwrapExports(style);

	var text = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Text =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Text, _Base);

	  function Text(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        text = _ref.text,
	        style = _ref.style,
	        multiline = _ref.multiline,
	        id = _ref.id;

	    _classCallCheck(this, Text);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, {
	      id: id
	    }));
	    _this._class = 'text';
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    _this._text = text;
	    _this._name = text;
	    _this._style = style;
	    _this._multiline = multiline;

	    _this.setResizingConstraint(utils.RESIZING_CONSTRAINTS.HEIGHT);

	    return _this;
	  }

	  _createClass(Text, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Text.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.text = this._text;
	      obj.style = this._style.toJSON(); // text nodes don't have child layers

	      delete obj.layers;
	      obj.automaticallyDrawOnUnderlyingPath = false;
	      obj.dontSynchroniseWithSymbol = false;
	      obj.lineSpacingBehaviour = 2; // 1 - width is set to Fixed
	      // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break

	      obj.textBehaviour = this._multiline ? 1 : 0;
	      return obj;
	    }
	  }]);

	  return Text;
	}(_base["default"]);

	var _default = Text;
	exports["default"] = _default;
	});

	unwrapExports(text);

	var textStyle = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	// Some websites or component libraries use font-family lists starting with OS-specific fonts.
	// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
	// Sketch is capable of.
	var SYSTEM_FONTS = [// Apple
	'-apple-system', 'BlinkMacSystemFont', // Microsoft
	'Segoe UI', // Android
	'Roboto']; // INPUT: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
	// OUTPUT: Helvetica Neue

	function getFirstFont(fonts, skipSystemFonts) {
	  var regularFont = undefined;
	  var systemFont = undefined;
	  fonts.split(',').forEach(function (font) {
	    font = font.trim().replace(/^["']+|["']+$/g, '');

	    if (font === '') {
	      return;
	    } // See above for a note on OS-specific fonts


	    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
	      regularFont = font;
	    }

	    if (!systemFont) {
	      systemFont = font;
	    }
	  });

	  if (regularFont) {
	    return regularFont;
	  }

	  if (systemFont) {
	    return systemFont;
	  }

	  return '-apple-system';
	}

	var TextStyle =
	/*#__PURE__*/
	function () {
	  function TextStyle(_ref) {
	    var color = _ref.color,
	        fontSize = _ref.fontSize,
	        fontFamily = _ref.fontFamily,
	        fontWeight = _ref.fontWeight,
	        lineHeight = _ref.lineHeight,
	        letterSpacing = _ref.letterSpacing,
	        textTransform = _ref.textTransform,
	        textDecoration = _ref.textDecoration,
	        textAlign = _ref.textAlign,
	        skipSystemFonts = _ref.skipSystemFonts;

	    _classCallCheck(this, TextStyle);

	    this._color = color;
	    this._fontSize = fontSize;
	    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
	    this._lineHeight = lineHeight;
	    this._letterSpacing = letterSpacing;
	    this._fontWeight = fontWeight;
	    this._textTransform = textTransform;
	    this._textDecoration = textDecoration;
	    this._textAlign = textAlign;
	  }

	  _createClass(TextStyle, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var result = {
	        'color': this._color,
	        'fontSize': this._fontSize,
	        'fontFamily': this._fontFamily,
	        'fontWeight': this._fontWeight,
	        'lineHeight': this._lineHeight,
	        'textDecoration': this._textDecoration,
	        'textAlign': this._textAlign
	      };

	      if (this._letterSpacing !== undefined) {
	        result.letterSpacing = this._letterSpacing;
	      }

	      if (this._textTransform !== undefined) {
	        result.textTransform = this._textTransform;
	      }

	      return result;
	    }
	  }]);

	  return TextStyle;
	}();

	var _default = TextStyle;
	exports["default"] = _default;
	});

	unwrapExports(textStyle);

	var createXPathFromElement_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = createXPathFromElement;

	//https://stackoverflow.com/a/5178132
	function createXPathFromElement(elm) {
	  var allNodes = document.getElementsByTagName('*');
	  var segs;

	  for (segs = []; elm && elm.nodeType === 1; elm = elm.parentNode) {
	    if (elm.hasAttribute('id')) {
	      var uniqueIdCount = 0;

	      for (var n = 0; n < allNodes.length; n++) {
	        if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id) {
	          uniqueIdCount++;
	        }

	        if (uniqueIdCount > 1) {
	          break;
	        }
	      }

	      if (uniqueIdCount === 1) {
	        segs.unshift("id(\"".concat(elm.getAttribute('id'), "\")"));
	        return segs.join('/');
	      } else {
	        segs.unshift("".concat(elm.localName.toLowerCase(), "[@id=\"").concat(elm.getAttribute('id'), "\"]"));
	      }
	    } else if (elm.hasAttribute('class')) {
	      segs.unshift("".concat(elm.localName.toLowerCase(), "[@class=\"").concat(elm.getAttribute('class'), "\"]"));
	    } else {
	      var i = 1;

	      for (var sib = elm.previousSibling; sib; sib = sib.previousSibling) {
	        if (sib.localName === elm.localName) {
	          i++;
	        }
	      }

	      segs.unshift("".concat(elm.localName.toLowerCase(), "[").concat(i, "]"));
	    }
	  }

	  return segs.length ? "/".concat(segs.join('/')) : null;
	}
	});

	unwrapExports(createXPathFromElement_1);

	var background = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getActualImageSize = exports.parseBackgroundImage = void 0;

	function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

	function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

	function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

	function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

	// Parses the background-image. The structure is as follows:
	// (Supports images and gradients)
	// ---
	// <background-image> = <bg-image> [ , <bg-image> ]*
	// <bg-image> = <image> | none
	// <image> = <url> | <image-list> | <element-reference> | <image-combination> | <gradient>
	// ---
	// Source: https://www.w3.org/TR/css-backgrounds-3/#the-background-image
	// ---
	// These functions should be pure to make it easy
	// to write test cases in the future.
	var parseBackgroundImage = function parseBackgroundImage(value) {
	  if (value === 'none') {
	    return;
	  }

	  var urlMatches = value.match(/^url\("(.+)"\)$/i);
	  var linearGradientMatches = value.match(/^linear-gradient\((.+)\)$/i);

	  if (urlMatches && urlMatches.length === 2) {
	    // Image
	    return {
	      type: 'Image',
	      value: urlMatches[1]
	    };
	  } else if (linearGradientMatches && linearGradientMatches.length === 2) {
	    // Linear gradient
	    var linearGradientConfig = parseLinearGradient(linearGradientMatches[1]);

	    if (linearGradientConfig) {
	      return {
	        type: 'LinearGradient',
	        value: linearGradientConfig
	      };
	    }
	  }
	}; // Parser for a linear gradient:
	// ---
	// <linear-gradient> = linear-gradient(
	//   [ [ <angle> | to <side-or-corner> ] ,]?
	//   <color-stop>[, <color-stop>]+
	// )
	//
	// <side-or-corner> = [left | right] || [top | bottom]
	// ---
	// Source: https://www.w3.org/TR/css3-images/#linear-gradients
	// ---
	// Example: "to top, rgba(67, 90, 111, 0.04), white"


	exports.parseBackgroundImage = parseBackgroundImage;

	var parseLinearGradient = function parseLinearGradient(value) {
	  var parts = [];
	  var currentPart = [];
	  var i = 0;
	  var skipComma = false; // There can be commas in colors, carefully break apart the value

	  while (i < value.length) {
	    var _char = value.substr(i, 1);

	    if (_char === '(') {
	      skipComma = true;
	    } else if (_char === ')') {
	      skipComma = false;
	    }

	    if (_char === ',' && !skipComma) {
	      parts.push(currentPart.join('').trim());
	      currentPart = [];
	    } else {
	      currentPart.push(_char);
	    }

	    if (i === value.length - 1) {
	      parts.push(currentPart.join('').trim());
	    }

	    i++;
	  }

	  if (parts.length === 2) {
	    // Assume 2 color stops
	    return {
	      angle: '180deg',
	      stops: [parts[0], parts[1]]
	    };
	  } else if (parts.length > 2) {
	    // angle + n stops
	    var angle = parts[0],
	        stops = parts.slice(1);
	    return {
	      angle: angle,
	      stops: stops
	    };
	  } // Syntax is wrong


	  return null;
	};
	/**
	 * @param {string} backgroundSize value of background-size CSS property
	 * @param {{width: number, height: number}} imageSize natural size of the image
	 * @param {{width: number, height: number}} containerSize size of the container
	 * @return {{width: number, height: number}} actual image size
	 */


	var getActualImageSize = function getActualImageSize(backgroundSize, imageSize, containerSize) {
	  var width, height; // sanity check

	  if (imageSize.width === 0 || imageSize.height === 0 || containerSize.width === 0 || containerSize.height === 0) {
	    width = 0;
	    height = 0;
	  } else if (backgroundSize === 'cover') {
	    if (imageSize.width > imageSize.height) {
	      height = containerSize.height;
	      width = height / imageSize.height * imageSize.width;
	    } else {
	      width = containerSize.width;
	      height = width / imageSize.width * imageSize.height;
	    }
	  } else if (backgroundSize === 'contain') {
	    if (imageSize.width > imageSize.height) {
	      width = containerSize.width;
	      height = width / imageSize.width * imageSize.height;
	    } else {
	      height = containerSize.height;
	      width = height / imageSize.height * imageSize.width;
	    }
	  } else if (backgroundSize === 'auto') {
	    width = imageSize.width;
	    height = imageSize.height;
	  } else {
	    // we currently don't support multiple backgrounds
	    var _backgroundSize$split = backgroundSize.split(','),
	        _backgroundSize$split2 = _slicedToArray(_backgroundSize$split, 1),
	        singleBackgroundSize = _backgroundSize$split2[0];

	    var _singleBackgroundSize = singleBackgroundSize.trim().split(' '),
	        _singleBackgroundSize2 = _slicedToArray(_singleBackgroundSize, 2),
	        backgroundSizeWidth = _singleBackgroundSize2[0],
	        backgroundSizeHeight = _singleBackgroundSize2[1];

	    if (backgroundSizeWidth === 'auto' || backgroundSizeWidth === undefined) {
	      backgroundSizeWidth = null;
	    } else if (backgroundSizeWidth.endsWith('%')) {
	      backgroundSizeWidth = parseFloat(backgroundSizeWidth) / 100 * containerSize.width;
	    } else if (backgroundSizeWidth.endsWith('px')) {
	      backgroundSizeWidth = parseFloat(backgroundSizeWidth);
	    }

	    if (backgroundSizeHeight === 'auto' || backgroundSizeHeight === undefined) {
	      backgroundSizeHeight = null;
	    } else if (backgroundSizeHeight.endsWith('%')) {
	      backgroundSizeHeight = parseFloat(backgroundSizeHeight) / 100 * containerSize.height;
	    } else if (backgroundSizeHeight.endsWith('px')) {
	      backgroundSizeHeight = parseFloat(backgroundSizeHeight);
	    }

	    if (backgroundSizeWidth !== null && backgroundSizeHeight === null) {
	      width = backgroundSizeWidth;
	      height = width / imageSize.width * imageSize.height;
	    } else if (backgroundSizeWidth === null && backgroundSizeHeight !== null) {
	      height = backgroundSizeHeight;
	      width = height / imageSize.height * imageSize.width;
	    } else if (backgroundSizeWidth !== null && backgroundSizeHeight !== null) {
	      width = backgroundSizeWidth;
	      height = backgroundSizeHeight;
	    }
	  }

	  return {
	    width: width,
	    height: height
	  };
	};

	exports.getActualImageSize = getActualImageSize;
	});

	unwrapExports(background);
	var background_1 = background.getActualImageSize;
	var background_2 = background.parseBackgroundImage;

	var shadow = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shadowStringToObject = exports.splitShadowString = void 0;

	var splitShadowString = function splitShadowString(boxShadow) {
	  var shadowStrings = boxShadow.split(/x, |t, /).map(function (str, i, array) {
	    if (i + 1 < array.length) {
	      if (str.match(/inse$/)) {
	        return "".concat(str, "t");
	      } else if (str.match(/p$/)) {
	        return "".concat(str, "x");
	      }
	    }

	    return str;
	  }).filter(function (shadow) {
	    return shadow.length > 0;
	  });
	  return shadowStrings;
	};

	exports.splitShadowString = splitShadowString;

	var shadowStringToObject = function shadowStringToObject(shadowString) {
	  var matches = shadowString.match(/^([a-z0-9#., ()]+) ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ?(inset)?$/i);

	  if (matches && matches.length === 7) {
	    return {
	      color: matches[1],
	      offsetX: parseFloat(matches[2]),
	      offsetY: parseFloat(matches[3]),
	      blur: parseFloat(matches[4]),
	      spread: parseFloat(matches[5]),
	      inset: matches[6] !== undefined
	    };
	  }
	};

	exports.shadowStringToObject = shadowStringToObject;
	});

	unwrapExports(shadow);
	var shadow_1 = shadow.shadowStringToObject;
	var shadow_2 = shadow.splitShadowString;

	var svg$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSVGString = getSVGString;
	// based on https://www.w3.org/TR/SVG2/styling.html and defaults taken from Chrome
	var SVG_STYLE_PROPERTIES = [//name, default value
	['cx', '0px'], ['cy', '0px'], ['height', 'auto'], ['width', 'auto'], ['x', '0px'], ['y', '0px'], ['r', '0px'], ['rx', 'auto'], ['ry', 'auto'], ['d', 'none'], ['fill', 'rgb(0, 0, 0)'], ['transform', 'none'], ['alignment-baseline', 'auto'], ['baseline-shift', '0px'], ['clip', 'auto'], ['clip-path', 'none'], ['clip-rule', 'nonzero'], ['color', 'rgb(0, 0, 0)'], ['color-interpolation', 'srgb'], ['color-interpolation-filters', 'linearrgb'], ['color-rendering', 'auto'], ['cursor', 'auto'], ['direction', 'ltr'], ['display', 'inline'], ['dominant-baseline', 'auto'], ['fill-opacity', '1'], ['fill-rule', 'nonzero'], ['filter', 'none'], ['flood-color', 'rgb(0, 0, 0)'], ['flood-opacity', '1'], ['font-family', 'Times'], ['font-size', '16px'], ['font-size-adjust', 'none'], ['font-stretch', '100%'], ['font-style', 'normal'], ['font-variant', 'normal'], ['font-weight', '400'], ['glyph-orientation-horizontal', undefined], ['glyph-orientation-vertical', undefined], ['image-rendering', 'auto'], ['letter-spacing', 'normal'], ['lighting-color', 'rgb(255, 255, 255)'], ['marker-end', 'none'], ['marker-mid', 'none'], ['marker-start', 'none'], ['mask', 'none'], ['opacity', '1'], ['overflow', 'visible'], ['pointer-events', 'auto'], ['shape-rendering', 'auto'], ['solid-color', undefined], ['solid-opacity', undefined], ['stop-color', 'rgb(0, 0, 0)'], ['stop-opacity', '1'], ['stroke', 'none'], ['stroke-dasharray', 'none'], ['stroke-dashoffset', '0px'], ['stroke-linecap', 'butt'], ['stroke-linejoin', 'miter'], ['stroke-miterlimit', '4'], ['stroke-opacity', '1'], ['stroke-width', '1px'], ['text-anchor', 'start'], ['text-decoration', 'none solid rgb(0, 0, 0)'], ['text-overflow', 'clip'], ['text-rendering', 'auto'], ['unicode-bidi', 'normal'], ['vector-effect', 'none'], ['visibility', 'visible'], ['white-space', 'normal'], ['word-spacing', '0px'], ['writing-mode', 'horizontal-tb']];

	function inlineStyles(node) {
	  var styles = getComputedStyle(node);
	  SVG_STYLE_PROPERTIES.forEach(function (prop) {
	    var propName = prop[0];
	    var propDefaultValue = prop[1];
	    var propCurrentValue = styles[propName];
	    var propAttributeValue = node.getAttribute(propName);

	    if (propCurrentValue !== propDefaultValue && propCurrentValue !== propAttributeValue) {
	      node.style[propName] = propCurrentValue;
	    }
	  });
	}

	function getUseReplacement(node) {
	  var href = node.href.baseVal; // TODO this will only work for internal references

	  var refNode = null;
	  var resultNode = null;

	  try {
	    refNode = document.querySelector(href);
	  } catch (e) {// ignore
	  }

	  if (refNode) {
	    if (refNode instanceof SVGSymbolElement) {
	      resultNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	      Array.from(refNode.attributes).forEach(function (attr) {
	        return resultNode.setAttribute(attr.name, attr.value);
	      });
	      Array.from(refNode.cloneNode(true).children).forEach(function (child) {
	        return resultNode.appendChild(child);
	      });
	    } else {
	      resultNode = refNode.cloneNode(true);
	    }
	  }

	  return resultNode;
	} // NOTE: this code modifies the original node by inlining all styles
	// this is not ideal and probably fixable


	function getSVGString(svgNode) {
	  var queue = Array.from(svgNode.children);

	  while (queue.length) {
	    var node = queue.pop();

	    if (!(node instanceof SVGElement) || node instanceof SVGDefsElement || node instanceof SVGTitleElement) {
	      continue;
	    }

	    if (node instanceof SVGUseElement) {
	      var replacement = getUseReplacement(node);

	      if (replacement) {
	        node.parentNode.replaceChild(replacement, node);
	        queue.push(replacement);
	      }

	      continue;
	    }

	    inlineStyles(node);
	    Array.from(node.children).forEach(function (child) {
	      return queue.push(child);
	    });
	  }

	  return svgNode.outerHTML;
	}
	});

	unwrapExports(svg$1);
	var svg_1 = svg$1.getSVGString;

	var bcr = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getGroupBCR = getGroupBCR;

	// TODO: should probably also take into account children of each node
	function getGroupBCR(nodes) {
	  var groupBCR = nodes.reduce(function (result, node) {
	    var bcr = node.getBoundingClientRect();
	    var left = bcr.left,
	        top = bcr.top,
	        right = bcr.right,
	        bottom = bcr.bottom;
	    var width = bcr.right - bcr.left;
	    var height = bcr.bottom - bcr.top;

	    if (width === 0 && height === 0) {
	      return result;
	    }

	    if (!result) {
	      return {
	        left: left,
	        top: top,
	        right: right,
	        bottom: bottom
	      };
	    }

	    if (left < result.left) {
	      result.left = left;
	    }

	    if (top < result.top) {
	      result.top = top;
	    }

	    if (right > result.right) {
	      result.right = right;
	    }

	    if (bottom > result.bottom) {
	      result.bottom = bottom;
	    }

	    return result;
	  }, null);

	  if (groupBCR === null) {
	    return {
	      left: 0,
	      top: 0,
	      right: 0,
	      bottom: 0,
	      width: 0,
	      height: 0
	    };
	  }

	  return {
	    left: groupBCR.left,
	    top: groupBCR.top,
	    right: groupBCR.right,
	    bottom: groupBCR.bottom,
	    width: groupBCR.right - groupBCR.left,
	    height: groupBCR.bottom - groupBCR.top
	  };
	}
	});

	unwrapExports(bcr);
	var bcr_1 = bcr.getGroupBCR;

	var text$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fixWhiteSpace = fixWhiteSpace;

	function fixWhiteSpace(text, whiteSpace) {
	  switch (whiteSpace) {
	    case 'normal':
	    case 'nowrap':
	      return text.trim().replace(/\n/g, ' ') // replace newline characters with space
	      .replace(/\s+/g, ' ');
	    // collapse whitespace

	    case 'pre-line':
	      return text.replace(/(^[^\S\n]+)|([^\S\n]+$)/g, '') // trim but leave \n
	      .replace(/[^\S\n]+/g, ' ') // collapse whitespace (except \n)
	      .replace(/[^\S\n]?\n[^\S\n]?/g, '\n');

	  }

	  return text;
	}
	});

	unwrapExports(text$1);
	var text_1 = text$1.fixWhiteSpace;

	var visibility = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isTextVisible = isTextVisible;
	exports.isNodeVisible = isNodeVisible;

	function isTextVisible(_ref) {
	  var textIndent = _ref.textIndent,
	      overflowX = _ref.overflowX,
	      overflowY = _ref.overflowY;

	  // NOTE overflow:hidden is not needed if text-indent is huge, but how to define 'huge'?
	  if (parseFloat(textIndent) < 0 && overflowX === 'hidden' && overflowY === 'hidden') {
	    return false;
	  }

	  return true;
	}

	function isNodeVisible(node) {
	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.getBoundingClientRect(),
	      width = _ref2.width,
	      height = _ref2.height;

	  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getComputedStyle(node),
	      position = _ref3.position,
	      overflowX = _ref3.overflowX,
	      overflowY = _ref3.overflowY,
	      opacity = _ref3.opacity,
	      visibility = _ref3.visibility,
	      display = _ref3.display,
	      clip = _ref3.clip;

	  // skip node when display is set to none for itself or an ancestor
	  // helps us catch things such as <noscript>
	  // HTMLSlotElement has a null offsetParent, but should still be visible
	  if (node.tagName !== 'BODY' && node.offsetParent === null && position !== 'fixed' && node.tagName.toLowerCase() !== 'slot') {
	    return false;
	  }

	  if ((width === 0 || height === 0) && overflowX === 'hidden' && overflowY === 'hidden') {
	    return false;
	  }

	  if (display === 'none' || visibility === 'hidden' || visibility === 'collapse' || parseFloat(opacity) < 0.1) {
	    return false;
	  }

	  if (clip === 'rect(0px, 0px, 0px, 0px)' && position === 'absolute') {
	    return false;
	  } // node is detached from the DOM


	  if (!node.isConnected) {
	    return false;
	  }

	  var parent = node.parentElement;

	  if (parent && parent.nodeName !== 'HTML' && !isNodeVisible(parent)) {
	    return false;
	  }

	  return true;
	}
	});

	unwrapExports(visibility);
	var visibility_1 = visibility.isTextVisible;
	var visibility_2 = visibility.isNodeVisible;

	var nodeToSketchLayers_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true,
	});
	exports["default"] = nodeToSketchLayers;

	var _rectangle = _interopRequireDefault(rectangle);

	var _bitmap = _interopRequireDefault(bitmap);

	var _svg = _interopRequireDefault(svg);

	var _shapeGroup = _interopRequireDefault(shapeGroup);

	var _group = _interopRequireDefault(group);

	var _style = _interopRequireDefault(style);

	var _text = _interopRequireDefault(text);

	var _textStyle = _interopRequireDefault(textStyle);

	var _createXPathFromElement = _interopRequireDefault(
	  createXPathFromElement_1
	);













	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var DEFAULT_VALUES = {
	  backgroundColor: "rgba(0, 0, 0, 0)",
	  backgroundImage: "none",
	  borderWidth: "0px",
	  boxShadow: "none",
	};

	function hasOnlyDefaultStyles(styles) {
	  return Object.keys(DEFAULT_VALUES).every(function (key) {
	    var defaultValue = DEFAULT_VALUES[key];
	    var value = styles[key];
	    return defaultValue === value;
	  });
	}

	function fixBorderRadius(borderRadius, width, height) {
	  var matches = borderRadius.match(/^([0-9.]+)(.+)$/); // Sketch uses 'px' units for border radius, so we need to convert % to px

	  if (matches && matches[2] === "%") {
	    var baseVal = Math.max(width, height);
	    var percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);
	    return Math.round(percentageApplied);
	  }

	  return parseInt(borderRadius, 10);
	}

	function isSVGDescendant(node) {
	  return node instanceof SVGElement && node.matches("svg *");
	}
	/**
	 * @param {string} fontWeight font weight as provided by the browser
	 * @return {number} normalized font weight
	 */

	function parseFontWeight(fontWeight) {
	  // Support 'bold' and 'normal' for Electron compatibility.
	  if (fontWeight === "bold") {
	    return 700;
	  } else if (fontWeight === "normal") {
	    return 400;
	  }

	  return parseInt(fontWeight, 10);
	}

	function nodeToSketchLayers(node, options) {
	  var layers = [];
	  var bcr$1 = node.getBoundingClientRect();
	  var left = bcr$1.left,
	    top = bcr$1.top;
	  var width = bcr$1.right - bcr$1.left;
	  var height = bcr$1.bottom - bcr$1.top;
	  var styles = getComputedStyle(node);
	  var backgroundColor = styles.backgroundColor,
	    backgroundImage = styles.backgroundImage,
	    backgroundPositionX = styles.backgroundPositionX,
	    backgroundPositionY = styles.backgroundPositionY,
	    backgroundSize = styles.backgroundSize,
	    borderColor = styles.borderColor,
	    borderWidth = styles.borderWidth,
	    borderTopWidth = styles.borderTopWidth,
	    borderRightWidth = styles.borderRightWidth,
	    borderBottomWidth = styles.borderBottomWidth,
	    borderLeftWidth = styles.borderLeftWidth,
	    borderTopColor = styles.borderTopColor,
	    borderRightColor = styles.borderRightColor,
	    borderBottomColor = styles.borderBottomColor,
	    borderLeftColor = styles.borderLeftColor,
	    borderTopLeftRadius = styles.borderTopLeftRadius,
	    borderTopRightRadius = styles.borderTopRightRadius,
	    borderBottomLeftRadius = styles.borderBottomLeftRadius,
	    borderBottomRightRadius = styles.borderBottomRightRadius,
	    fontFamily = styles.fontFamily,
	    fontWeight = styles.fontWeight,
	    fontSize = styles.fontSize,
	    lineHeight = styles.lineHeight,
	    letterSpacing = styles.letterSpacing,
	    color = styles.color,
	    textTransform = styles.textTransform,
	    textDecorationLine = styles.textDecorationLine,
	    textAlign = styles.textAlign,
	    justifyContent = styles.justifyContent,
	    display = styles.display,
	    boxShadow = styles.boxShadow,
	    opacity = styles.opacity,
	    whiteSpace = styles.whiteSpace; // skip SVG child nodes as they are already covered by `new SVG(…)`

	  if (isSVGDescendant(node)) {
	    return layers;
	  }

	  if (!(0, visibility.isNodeVisible)(node, bcr$1, styles)) {
	    return layers;
	  }

	  var shapeGroup = new _shapeGroup["default"]({
	    x: left,
	    y: top,
	    width: width,
	    height: height,
	  });

	  if (options && options.getRectangleName) {
	    shapeGroup.setName(options.getRectangleName(node));
	  } else {
	    shapeGroup.setName((0, _createXPathFromElement["default"])(node));
	  }

	  var isImage = node.nodeName === "IMG" && node.currentSrc;
	  var isSVG = node.nodeName === "svg"; // if layer has no background/shadow/border/etc. skip it

	  if (isImage || !hasOnlyDefaultStyles(styles)) {
	    var style = new _style["default"]();

	    if (backgroundColor) {
	      style.addColorFill(backgroundColor);
	    }

	    if (isImage) {
	      var absoluteUrl = new URL(node.currentSrc, location.href);
	      style.addImageFill(absoluteUrl.href);
	      shapeGroup.setFixedWidthAndHeight();
	    }

	    if (boxShadow !== DEFAULT_VALUES.boxShadow) {
	      var shadowStrings = (0, shadow.splitShadowString)(boxShadow);
	      shadowStrings.forEach(function (shadowString) {
	        var shadowObject = (0, shadow.shadowStringToObject)(shadowString);

	        if (shadowObject.inset) {
	          if (borderWidth.indexOf(" ") === -1) {
	            shadowObject.spread += parseFloat(borderWidth);
	          }

	          style.addInnerShadow(shadowObject);
	        } else {
	          style.addShadow(shadowObject);
	        }
	      });
	    } // support for one-side borders (using inner shadow because Sketch doesn't support that)

	    if (borderWidth.indexOf(" ") === -1) {
	      style.addBorder({
	        color: borderColor,
	        thickness: parseFloat(borderWidth),
	      });
	    } else {
	      var borderTopWidthFloat = parseFloat(borderTopWidth);
	      var borderRightWidthFloat = parseFloat(borderRightWidth);
	      var borderBottomWidthFloat = parseFloat(borderBottomWidth);
	      var borderLeftWidthFloat = parseFloat(borderLeftWidth);

	      if (borderTopWidthFloat) {
	        style.addInnerShadow({
	          color: borderTopColor,
	          offsetY: borderTopWidthFloat,
	        });
	      }

	      if (borderRightWidthFloat) {
	        style.addInnerShadow({
	          color: borderRightColor,
	          offsetX: -borderRightWidthFloat,
	        });
	      }

	      if (borderBottomWidthFloat) {
	        style.addInnerShadow({
	          color: borderBottomColor,
	          offsetY: -borderBottomWidthFloat,
	        });
	      }

	      if (borderLeftWidthFloat) {
	        style.addInnerShadow({
	          color: borderLeftColor,
	          offsetX: borderLeftWidthFloat,
	        });
	      }
	    }

	    if (!options || options.layerOpacity !== false) {
	      style.addOpacity(opacity);
	    }

	    shapeGroup.setStyle(style); //TODO borderRadius can be expressed in different formats and use various units - for simplicity we assume "X%"

	    var cornerRadius = {
	      topLeft: fixBorderRadius(borderTopLeftRadius, width, height),
	      topRight: fixBorderRadius(borderTopRightRadius, width, height),
	      bottomLeft: fixBorderRadius(borderBottomLeftRadius, width, height),
	      bottomRight: fixBorderRadius(borderBottomRightRadius, width, height),
	    };
	    var rectangle = new _rectangle["default"]({
	      width: width,
	      height: height,
	      cornerRadius: cornerRadius,
	    });
	    shapeGroup.addLayer(rectangle); // This should return a array once multiple background-images are supported

	    var backgroundImageResult = (0, background.parseBackgroundImage)(
	      backgroundImage
	    );
	    var layer = shapeGroup;

	    if (backgroundImageResult) {
	      switch (backgroundImageResult.type) {
	        case "Image": {
	          var img = new Image();
	          img.src = backgroundImageResult.value; // TODO add support for % values

	          var bitmapX = parseFloat(backgroundPositionX);
	          var bitmapY = parseFloat(backgroundPositionY);
	          var actualImgSize = (0, background.getActualImageSize)(
	            backgroundSize,
	            {
	              width: img.width,
	              height: img.height,
	            },
	            {
	              width: width,
	              height: height,
	            }
	          );

	          if (
	            bitmapX === 0 &&
	            bitmapY === 0 &&
	            actualImgSize.width === img.width &&
	            actualImgSize.height === img.height
	          ) {
	            // background image fits entirely inside the node, so we can represent it with a (cheaper) image fill
	            style.addImageFill(backgroundImageResult.value);
	          } else {
	            // use a Group(Shape + Bitmap) to correctly represent clipping of the background image
	            var bm = new _bitmap["default"]({
	              url: backgroundImageResult.value,
	              x: bitmapX,
	              y: bitmapY,
	              width: actualImgSize.width,
	              height: actualImgSize.height,
	            });
	            bm.setName("background-image");
	            shapeGroup.setHasClippingMask(true);
	            var group = new _group["default"]({
	              x: left,
	              y: top,
	              width: width,
	              height: height,
	            }); // position is relative to the group

	            shapeGroup.setPosition({
	              x: 0,
	              y: 0,
	            });
	            group.addLayer(shapeGroup);
	            group.addLayer(bm);
	            layer = group;
	          }

	          break;
	        }

	        case "LinearGradient":
	          style.addGradientFill(backgroundImageResult.value);
	          break;
	      }
	    }

	    layers.push(layer);
	  }

	  if (isSVG) {
	    // sketch ignores padding and centerging as defined by viewBox and preserveAspectRatio when
	    // importing SVG, so instead of using BCR of the SVG, we are using BCR of its children
	    var childrenBCR = (0, bcr.getGroupBCR)(Array.from(node.children));
	    var svgLayer = new _svg["default"]({
	      x: childrenBCR.left,
	      y: childrenBCR.top,
	      width: childrenBCR.width,
	      height: childrenBCR.height,
	      rawSVGString: (0, svg$1.getSVGString)(node),
	    });
	    layers.push(svgLayer);
	    return layers;
	  }

	  if (!(0, visibility.isTextVisible)(styles)) {
	    return layers;
	  }

	  var textStyle = new _textStyle["default"]({
	    fontFamily: fontFamily,
	    fontSize: parseInt(fontSize, 10),
	    lineHeight: lineHeight !== "normal" ? parseFloat(lineHeight) : undefined,
	    letterSpacing:
	      letterSpacing !== "normal" ? parseFloat(letterSpacing) : undefined,
	    fontWeight: parseFontWeight(fontWeight),
	    color: color,
	    textTransform: textTransform,
	    textDecoration: textDecorationLine,
	    textAlign:
	      display === "flex" || display === "inline-flex"
	        ? justifyContent
	        : textAlign,
	    skipSystemFonts: options && options.skipSystemFonts,
	  });
	  var rangeHelper = document.createRange(); // Text

	  Array.from(node.childNodes)
	    .filter(function (child) {
	      return child.nodeType === 3 && child.nodeValue.trim().length > 0;
	    })
	    .forEach(function (textNode) {
	      rangeHelper.selectNodeContents(textNode);
	      var textRanges = Array.from(rangeHelper.getClientRects());
	      var numberOfLines = textRanges.length;
	      var textBCR = rangeHelper.getBoundingClientRect();
	      var lineHeightInt = parseInt(lineHeight, 10);
	      var textBCRHeight = textBCR.bottom - textBCR.top;
	      var fixY = 0; // center text inside a box
	      // TODO it's possible now in sketch - fix it!

	      if (lineHeightInt && textBCRHeight !== lineHeightInt * numberOfLines) {
	        fixY = (textBCRHeight - lineHeightInt * numberOfLines) / 2;
	      }

	      var textValue = (0, text$1.fixWhiteSpace)(textNode.nodeValue, whiteSpace);
	      var text = new _text["default"]({
	        x: textBCR.left,
	        y: textBCR.top + fixY,
	        width: textBCR.right - textBCR.left,
	        height: textBCRHeight,
	        text: textValue,
	        style: textStyle,
	        multiline: numberOfLines > 1,
	      });

	      if (options && options.onTextGenerate) {
	        options.onTextGenerate({
	          layer: text,
	          node: textNode,
	        });
	      }

	      layers.push(text);
	    });
	  return layers;
	}
	});

	unwrapExports(nodeToSketchLayers_1);

	var nodeTreeToSketchGroup_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = nodeTreeToSketchGroup;

	var _group = _interopRequireDefault(group);

	var _style = _interopRequireDefault(style);

	var _nodeToSketchLayers = _interopRequireDefault(nodeToSketchLayers_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function nodeTreeToSketchGroup(node, options) {
	  var bcr = node.getBoundingClientRect();
	  var left = bcr.left,
	      top = bcr.top;
	  var width = bcr.right - bcr.left;
	  var height = bcr.bottom - bcr.top; // Collect layers for the node level itself

	  var layers = (0, _nodeToSketchLayers["default"])(node, _objectSpread({}, options, {
	    layerOpacity: false
	  })) || [];

	  if (node.nodeName !== 'svg') {
	    // Recursively collect child groups for child nodes
	    Array.from(node.children).filter(function (node) {
	      return (0, visibility.isNodeVisible)(node);
	    }) // sort the children by computed z-index so that nodes with lower z-indexes are added
	    // to the group first, "beneath" those with higher z-indexes
	    .sort(function (a, b) {
	      var computedA = getComputedStyle(a).zIndex,
	          computedB = getComputedStyle(b).zIndex,
	          zIndexA = isNaN(computedA) ? 0 : +computedA,
	          zIndexB = isNaN(computedB) ? 0 : +computedB;
	      return zIndexA - zIndexB;
	    }).forEach(function (childNode) {
	      layers.push(nodeTreeToSketchGroup(childNode, options)); // Traverse the shadow DOM if present

	      if (childNode.shadowRoot) {
	        Array.from(childNode.shadowRoot.children).filter(function (node) {
	          return (0, visibility.isNodeVisible)(node);
	        }).map(nodeTreeToSketchGroup).forEach(function (layer) {
	          return layers.push(layer);
	        });
	      }
	    });
	  } // Now build a group for all these children


	  var styles = getComputedStyle(node);
	  var opacity = styles.opacity;
	  var group = new _group["default"]({
	    x: left,
	    y: top,
	    width: width,
	    height: height
	  });
	  var groupStyle = new _style["default"]();
	  groupStyle.addOpacity(opacity);
	  group.setStyle(groupStyle);
	  layers.forEach(function (layer) {
	    // Layer positions are relative, and as we put the node position to the group,
	    // we have to shift back the layers by that distance.
	    layer._x -= left;
	    layer._y -= top;
	    group.addLayer(layer);
	  }); // Set the group name to the node's name, unless there is a name provider in the options

	  if (options && options.getGroupName) {
	    group.setName(options.getGroupName(node));
	  } else {
	    group.setName("(".concat(node.nodeName.toLowerCase(), ")"));
	  }

	  return group;
	}
	});

	unwrapExports(nodeTreeToSketchGroup_1);

	var artboard = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Artboard =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Artboard, _Base);

	  function Artboard(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        id = _ref.id;

	    _classCallCheck(this, Artboard);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Artboard).call(this, {
	      id: id
	    }));
	    _this._class = 'artboard';
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    return _this;
	  }

	  _createClass(Artboard, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Artboard.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.style = {
	        '_class': 'style',
	        'endDecorationType': 0,
	        'miterLimit': 10,
	        'startDecorationType': 0
	      };
	      obj.horizontalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.verticalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.hasClickThrough = true;
	      obj.includeInCloudUpload = true;
	      return obj;
	    }
	  }]);

	  return Artboard;
	}(_base["default"]);

	var _default = Artboard;
	exports["default"] = _default;
	});

	unwrapExports(artboard);

	var page = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var Page =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(Page, _Base);

	  function Page(_ref) {
	    var _this;

	    var width = _ref.width,
	        height = _ref.height,
	        id = _ref.id;

	    _classCallCheck(this, Page);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Page).call(this, {
	      id: id
	    }));
	    _this._class = 'page';
	    _this._width = width;
	    _this._height = height;
	    return _this;
	  }

	  _createClass(Page, [{
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(Page.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'height': this._height,
	        'width': this._width,
	        'x': 0,
	        'y': 0
	      };
	      obj.style = {
	        '_class': 'style',
	        'endDecorationType': 0,
	        'miterLimit': 10,
	        'startDecorationType': 0
	      };
	      obj.horizontalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.verticalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.hasClickThrough = true;
	      obj.includeInCloudUpload = true;
	      return obj;
	    }
	  }]);

	  return Page;
	}(_base["default"]);

	var _default = Page;
	exports["default"] = _default;
	});

	unwrapExports(page);

	var nodeTreeToSketchPage_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = nodeTreeToSketchPage;

	var _artboard = _interopRequireDefault(artboard);

	var _page = _interopRequireDefault(page);

	var _nodeTreeToSketchGroup = _interopRequireDefault(nodeTreeToSketchGroup_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function nodeTreeToSketchPage(node, options) {
	  var rootGroup = (0, _nodeTreeToSketchGroup["default"])(node, options);
	  var bcr = node.getBoundingClientRect();
	  var page = new _page["default"]({
	    width: bcr.right - bcr.left,
	    height: bcr.bottom - bcr.top
	  });

	  if (options && options.addArtboard) {
	    var artboard = new _artboard["default"]({
	      x: 0,
	      y: 0,
	      width: rootGroup._width,
	      height: rootGroup._height
	    });
	    artboard.addLayer(rootGroup);

	    if (options.artboardName) {
	      artboard.setName(options.artboardName);
	    }

	    page.addLayer(artboard);
	  } else {
	    page.addLayer(rootGroup);
	  }

	  if (options && options.pageName) {
	    page.setName(options.pageName);
	  }

	  return page;
	}
	});

	unwrapExports(nodeTreeToSketchPage_1);

	var document$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;



	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function pageToPageReference(page) {
	  return {
	    '_class': 'MSJSONFileReference',
	    '_ref_class': 'MSImmutablePage',
	    '_ref': "pages/".concat(page.getID())
	  };
	}

	function layerToSharedStyle(layer, id) {
	  return {
	    '_class': 'sharedStyle',
	    'do_objectID': id || (0, utils.generateID)(),
	    name: layer._name,
	    'style': layer._style.toJSON()
	  };
	}

	var Document =
	/*#__PURE__*/
	function () {
	  function Document() {
	    _classCallCheck(this, Document);

	    this._objectID = (0, utils.generateID)();
	    this._colors = [];
	    this._textStyles = [];
	    this._layerStyles = [];
	    this._pages = [];
	  }

	  _createClass(Document, [{
	    key: "setName",
	    value: function setName(name) {
	      this._name = name;
	    }
	  }, {
	    key: "setObjectID",
	    value: function setObjectID(id) {
	      this._objectID = id;
	    }
	  }, {
	    key: "addPage",
	    value: function addPage(page) {
	      this._pages.push(page);
	    }
	  }, {
	    key: "addTextStyle",
	    value: function addTextStyle(textLayer, id) {
	      this._textStyles.push(layerToSharedStyle(textLayer, id));
	    }
	  }, {
	    key: "addLayerStyle",
	    value: function addLayerStyle(layer, id) {
	      this._layerStyles.push(layerToSharedStyle(layer, id));
	    }
	  }, {
	    key: "addColor",
	    value: function addColor(color) {
	      this._colors.push((0, utils.makeColorFromCSS)(color));
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      return {
	        '_class': 'document',
	        'do_objectID': this._objectID,
	        'assets': {
	          '_class': 'assetCollection',
	          'colors': this._colors
	        },
	        'currentPageIndex': 0,
	        'enableLayerInteraction': true,
	        'enableSliceInteraction': true,
	        'foreignSymbols': [],
	        'layerStyles': {
	          '_class': 'sharedStyleContainer',
	          'objects': this._layerStyles
	        },
	        'layerSymbols': {
	          '_class': 'symbolContainer',
	          'objects': []
	        },
	        'layerTextStyles': {
	          '_class': 'sharedTextStyleContainer',
	          'objects': this._textStyles
	        },
	        'pages': this._pages.map(pageToPageReference)
	      };
	    }
	  }]);

	  return Document;
	}();

	var _default = Document;
	exports["default"] = _default;
	});

	unwrapExports(document$1);

	var symbolInstance = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _base = _interopRequireDefault(base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var SymbolInstance =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(SymbolInstance, _Base);

	  function SymbolInstance(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        width = _ref.width,
	        height = _ref.height,
	        symbolID = _ref.symbolID,
	        id = _ref.id;

	    _classCallCheck(this, SymbolInstance);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SymbolInstance).call(this, {
	      id: id
	    }));
	    _this._class = 'symbolInstance';
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    _this._symbolID = symbolID;
	    return _this;
	  }

	  _createClass(SymbolInstance, [{
	    key: "setId",
	    value: function setId(id) {
	      this._symbolID = id;
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(SymbolInstance.prototype), "toJSON", this).call(this);

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        'width': this._width,
	        'height': this._height,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.style = {
	        '_class': 'style',
	        'endDecorationType': 0,
	        'miterLimit': 10,
	        'startDecorationType': 0
	      };
	      obj.symbolID = this._symbolID;
	      return obj;
	    }
	  }]);

	  return SymbolInstance;
	}(_base["default"]);

	var _default = SymbolInstance;
	exports["default"] = _default;
	});

	unwrapExports(symbolInstance);

	var symbolMaster = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = exports.SYMBOL_SMART_LAYOUT = void 0;



	var _base = _interopRequireDefault(base);

	var _symbolInstance = _interopRequireDefault(symbolInstance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

	function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

	function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

	function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

	function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

	var SYMBOL_SMART_LAYOUT = utils.SMART_LAYOUT;
	exports.SYMBOL_SMART_LAYOUT = SYMBOL_SMART_LAYOUT;

	var SymbolMaster =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(SymbolMaster, _Base);

	  function SymbolMaster(_ref) {
	    var _this;

	    var x = _ref.x,
	        y = _ref.y,
	        _ref$width = _ref.width,
	        width = _ref$width === void 0 ? null : _ref$width,
	        _ref$height = _ref.height,
	        height = _ref$height === void 0 ? null : _ref$height,
	        id = _ref.id;

	    _classCallCheck(this, SymbolMaster);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(SymbolMaster).call(this, {
	      id: id
	    }));
	    _this._class = 'symbolMaster';
	    _this._x = x;
	    _this._y = y;
	    _this._width = width;
	    _this._height = height;
	    _this._symbolID = (0, utils.generateID)();
	    _this._groupLayout = (0, utils.getGroupLayout)();
	    return _this;
	  }

	  _createClass(SymbolMaster, [{
	    key: "setId",
	    value: function setId(id) {
	      this._symbolID = id;
	    }
	  }, {
	    key: "getSymbolInstance",
	    value: function getSymbolInstance(_ref2) {
	      var x = _ref2.x,
	          y = _ref2.y,
	          _ref2$width = _ref2.width,
	          width = _ref2$width === void 0 ? null : _ref2$width,
	          _ref2$height = _ref2.height,
	          height = _ref2$height === void 0 ? null : _ref2$height;

	      // if no size will be requested, use the size of the master symbol
	      var _this$getSize = this.getSize(),
	          masterWidth = _this$getSize.width,
	          masterHeight = _this$getSize.height;

	      width = width === null ? masterWidth : width;
	      height = height === null ? masterHeight : height;
	      return new _symbolInstance["default"]({
	        x: x,
	        y: y,
	        width: width,
	        height: height,
	        symbolID: this._symbolID
	      });
	    }
	  }, {
	    key: "addLayer",
	    value: function addLayer(layer) {
	      //position child layers relatively to the symbol layer
	      layer._x -= this._x;
	      layer._y -= this._y;

	      _get(_getPrototypeOf(SymbolMaster.prototype), "addLayer", this).call(this, layer);
	    }
	  }, {
	    key: "getSize",
	    value: function getSize() {
	      var width = this._width;
	      var height = this._height; // if width and height were not explicitly set, fit symbol size to its contents

	      if (this._width === null || this._height === null) {
	        this._layers.forEach(function (layer) {
	          var layerWidth = layer._x + layer._width;
	          var layerHeight = layer._y + layer._height;

	          if (width < layerWidth) {
	            width = layerWidth;
	          }

	          if (height < layerHeight) {
	            height = layerHeight;
	          }
	        });
	      }

	      return {
	        width: width,
	        height: height
	      };
	    }
	  }, {
	    key: "setGroupLayout",
	    value: function setGroupLayout(layoutType) {
	      this._groupLayout = (0, utils.getGroupLayout)(layoutType);
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      var obj = _get(_getPrototypeOf(SymbolMaster.prototype), "toJSON", this).call(this);

	      var _this$getSize2 = this.getSize(),
	          width = _this$getSize2.width,
	          height = _this$getSize2.height;

	      obj.frame = {
	        '_class': 'rect',
	        'constrainProportions': false,
	        width: width,
	        height: height,
	        'x': this._x,
	        'y': this._y
	      };
	      obj.style = {
	        '_class': 'style',
	        'endDecorationType': 0,
	        'miterLimit': 10,
	        'startDecorationType': 0
	      };
	      obj.horizontalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.verticalRulerData = {
	        '_class': 'rulerData',
	        'base': 0,
	        'guides': []
	      };
	      obj.backgroundColor = {
	        '_class': 'color',
	        'alpha': 1,
	        'blue': 1,
	        'green': 1,
	        'red': 1
	      };
	      obj.hasClickThrough = true;
	      obj.includeInCloudUpload = true;
	      obj.hasBackgroundColor = false;
	      obj.includeBackgroundColorInExport = true;
	      obj.resizesContent = false;
	      obj.includeBackgroundColorInInstance = false;
	      obj.symbolID = this._symbolID;
	      obj.changeIdentifier = 0;
	      obj.groupLayout = this._groupLayout;
	      return obj;
	    }
	  }]);

	  return SymbolMaster;
	}(_base["default"]);

	var _default = SymbolMaster;
	exports["default"] = _default;
	});

	unwrapExports(symbolMaster);
	var symbolMaster_1 = symbolMaster.SYMBOL_SMART_LAYOUT;

	var html2asketch = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "nodeToSketchLayers", {
	  enumerable: true,
	  get: function get() {
	    return _nodeToSketchLayers["default"];
	  }
	});
	Object.defineProperty(exports, "nodeTreeToSketchGroup", {
	  enumerable: true,
	  get: function get() {
	    return _nodeTreeToSketchGroup["default"];
	  }
	});
	Object.defineProperty(exports, "nodeTreeToSketchPage", {
	  enumerable: true,
	  get: function get() {
	    return _nodeTreeToSketchPage["default"];
	  }
	});
	Object.defineProperty(exports, "Document", {
	  enumerable: true,
	  get: function get() {
	    return _document["default"];
	  }
	});
	Object.defineProperty(exports, "Page", {
	  enumerable: true,
	  get: function get() {
	    return _page["default"];
	  }
	});
	Object.defineProperty(exports, "Group", {
	  enumerable: true,
	  get: function get() {
	    return _group["default"];
	  }
	});
	Object.defineProperty(exports, "Rectangle", {
	  enumerable: true,
	  get: function get() {
	    return _rectangle["default"];
	  }
	});
	Object.defineProperty(exports, "Bitmap", {
	  enumerable: true,
	  get: function get() {
	    return _bitmap["default"];
	  }
	});
	Object.defineProperty(exports, "Text", {
	  enumerable: true,
	  get: function get() {
	    return _text["default"];
	  }
	});
	Object.defineProperty(exports, "ShapeGroup", {
	  enumerable: true,
	  get: function get() {
	    return _shapeGroup["default"];
	  }
	});
	Object.defineProperty(exports, "SVG", {
	  enumerable: true,
	  get: function get() {
	    return _svg["default"];
	  }
	});
	Object.defineProperty(exports, "Artboard", {
	  enumerable: true,
	  get: function get() {
	    return _artboard["default"];
	  }
	});
	Object.defineProperty(exports, "SymbolMaster", {
	  enumerable: true,
	  get: function get() {
	    return _symbolMaster["default"];
	  }
	});
	Object.defineProperty(exports, "SymbolInstance", {
	  enumerable: true,
	  get: function get() {
	    return _symbolInstance["default"];
	  }
	});

	var _nodeToSketchLayers = _interopRequireDefault(nodeToSketchLayers_1);

	var _nodeTreeToSketchGroup = _interopRequireDefault(nodeTreeToSketchGroup_1);

	var _nodeTreeToSketchPage = _interopRequireDefault(nodeTreeToSketchPage_1);

	var _document = _interopRequireDefault(document$1);

	var _page = _interopRequireDefault(page);

	var _group = _interopRequireDefault(group);

	var _rectangle = _interopRequireDefault(rectangle);

	var _bitmap = _interopRequireDefault(bitmap);

	var _text = _interopRequireDefault(text);

	var _shapeGroup = _interopRequireDefault(shapeGroup);

	var _svg = _interopRequireDefault(svg);

	var _artboard = _interopRequireDefault(artboard);

	var _symbolMaster = _interopRequireDefault(symbolMaster);

	var _symbolInstance = _interopRequireDefault(symbolInstance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	});

	var htmlSketchApp = unwrapExports(html2asketch);

	const { nodeTreeToSketchPage } = htmlSketchApp;

	document.addEventListener("click", () => {
	  // node that we want to extract
	  const node = document.body;

	  // nodeTreeToSketchPage will traverse the DOM tree, call nodeToSketchLayers on each DOM node, and crate a whole Sketch page for you
	  const page = nodeTreeToSketchPage(node);

	  page.setName("DOM tree to a Sketch page");

	  // our page.asketch.json file that can be imported via Sketch plugin
	  console.log(page.toJSON());
	});

}());
