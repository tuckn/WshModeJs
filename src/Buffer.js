/* globals Wsh: false */

if (!Buffer) {
  /**
   * [W.I.P] This object is used to represent binary data in the form of a sequence of bytes.
   *
   * @global
   * @namespace
   * @type {object}
   * @requires {@link https://github.com/tuckn/WshUtil|tuckn/WshUtil}
   */
  var Buffer = {};
}

(function () {
  // Shorthands
  var util = Wsh.Util;

  var isNumber = util.isNumber;
  var isArray = util.isArray;
  var isString = util.isString;
  var hasContent = util.hasContent;
  var isSolidString = util.isSolidString;

  /** @constant {string} */
  var MODULE_TITLE = 'WshModeJs/Buffer.js';

  var throwErrNonStr = function (functionName, typeErrVal) {
    util.throwTypeError('string', MODULE_TITLE, functionName, typeErrVal);
  };

  // _buf {{{
  /**
   * [W.I.P]
   *
   * @private
   * @class _buf
   * @param {any} data
   * @param {string} [encoding] - If data is String, the encoding of string. Default: 'utf8'.
   * @param {number} [length]
   */
  function _buf (data, encoding, length) {
    // var functionName = '_buf';

    // constructor
    this.binValues;
    this.textEncoder;
    this.textEncoding = 'utf8';

    if (isArray(data)) {
      /** @todo W.I.P */
    } else if (isString(data)) {
      if (isSolidString(encoding)) this.textEncoding = encoding;

      if (this.textEncoding === 'utf8') {
        /**
         * {@link https://docs.microsoft.com/en-us/dotnet/api/system.text.asciiencoding|Microsoft Docs}
         */
        this.textEncoder = WScript.CreateObject('System.Text.UTF8Encoding');
        this.binValues = this.textEncoder.GetBytes_4(data); // 4 is "for"?
      }
    } else {
      this.textEncoding = 'byte';
      /**
       * {@link https://docs.microsoft.com/en-us/dotnet/api/system.text.asciiencoding|Microsoft Docs}
       */
      this.textEncoder = WScript.CreateObject('System.Text.ASCIIEncoding');
      console.log(this.textEncoder.GetString(data));
      this.binValues = data;
    }

    // toJSON {{{
    /**
     * [W.I.P]
     *
     * @memberof Buffer
     * @returns {Binary}
     */
    this.toJSON = function () {
      return this.values;
    }; // }}}

    // toString {{{
    /**
     * Decodes buf to a string according to the specified character encoding.
     *
     * @memberof Buffer
     * @param {string} [encoding='utf8'] - ascii, utf8, utf16le, ucs2, base64, latin1, binary, hex
     * @param {number} [start=0]
     * @param {number} [end] - Default: buf.length
     * @returns {string}
     */
    this.toString = function (encoding, start, end) {
      if (encoding === 'ascii') {
        /** @todo W.I.P */
        return;
      } else if (encoding === this.textEncoding) {
        return this.textEncoder.GetString(this.binValues);
      } else {
        // @todo utf16le, ucs2, latin1, binary
      }

      var domdocObj;
      try {
        domdocObj = WScript.CreateObject('Msxml2.DOMDocument.6.0');
      } catch (e) { // For Win7, WinXP
        domdocObj = WScript.CreateObject('Msxml2.DOMDocument');
      }

      /**
       * createElement {@link https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms757047%28v%3dvs.85%29|Microsoft Docs}
       */
      var domdoc = domdocObj.createElement('dummytag');

      /**
       * DOMDocument Members {@link https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms757878(v=vs.85)?redirectedfrom=MSDN|Microsoft Docs}
       */
      if (encoding === 'base64') {
        domdoc.dataType = 'bin.base64';
      } else if (encoding === 'hex') {
        domdoc.dataType = 'bin.hex';
      }

      domdoc.nodeTypedValue = this.binValues;

      return domdoc.text;
    }; // }}}

    // values {{{
    /**
     * @memberof Buffer
     * @returns {Binary}
     */
    this.values = function () {
      /** @todo W.I.P */
      return this.binValues;
    }; // }}}
  } // }}}

  // Buffer.from {{{
  /**
   * [W.I.P] Returns a new Buffer. Similar to {@link https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding|Node.js Buffer.from()}.
   *
   * @example
   * var buf = Buffer.from('012345XYZ');
   *
   * console.log(buf.toString('utf8')); // 012345XYZ
   * console.log(buf.toString('base64')); // MDEyMzQ1WFla
   * console.log(buf.toString('hex')); // 30313233343558595a
   * console.log(buf.values()); // <Buffer 30 31 32 32 ....>
   * @function from
   * @memberof Buffer
   * @constructor
   * @param {any} data
   * @param {string} [encoding] - If data is String, the encoding of string. Default: 'utf8'.
   * @param {number} [length]
   * @returns {_buf}
   */
  Buffer.from = function (data, encoding, length) {
    // var functionName = 'Buffer.from';
    return new _buf(data, encoding, length);
  }; // }}}

  // Buffer.byteLength {{{
  /**
   * [W.I.P]
   *
   * @name byteLength
   * @memberof Buffer
   * @constructor
   * @param {any} data
   * @param {string} [encoding] - If data is String, the encoding of string. Default: 'utf8'.
   * @returns {number}
   */
  Buffer.byteLength = function (data, encoding) {
    // var functionName = 'Buffer.byteLength';

    var buf;
    // @todo If Binary
    if (data instanceof _buf) {
      buf = data;
    } else {
      buf = new _buf(data, encoding);
    }

    return parseInt(buf.toString('hex').length / 2);
  }; // }}}
})();

// vim:set foldmethod=marker commentstring=//%s :
