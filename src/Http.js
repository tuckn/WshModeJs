/* globals Wsh: false */
/* globals Buffer: false */

(function () {
  if (Wsh && Wsh.Http) return;

  /**
   * [W.I.P] HTTP handler module for WSH (Windows Script Host).
   *
   * @namespace Http
   * @memberof Wsh
   * @requires ./Buffer.js
   */
  Wsh.Http = {};

  // Shorthands
  var util = Wsh.Util;

  var obtain = util.obtainPropVal;
  var startsWith = util.startsWith;
  var isSolidString = util.isSolidString;
  var isPlainObject = util.isPlainObject;

  var http = Wsh.Http;

  /** @constant {string} */
  var MODULE_TITLE = 'WshModeJs/Http.js';

  var throwErrNonStr = function (functionName, typeErrVal) {
    util.throwTypeError('string', MODULE_TITLE, functionName, typeErrVal);
  };

  // http.request {{{
  /**
   * [W.I.P] Requests the URL. Similar to {@link https://nodejs.org/api/http.html#http_http_request_options_callback|Node.js http.request()}.
   *
   * @example
   * var http = Wsh.Http; // Shorthand
   *
   * // Ex 1. Auto JSON parsing
   * http.request('https://httpbin.org/ip');
   * // Returns: { origin: '111.222.333.444' }
   *
   * // Ex 2. Basic Auth
   * http.request('https://httpbin.org/basic-auth', { auth: 'myUser:myPasswd' });
   *
   * // Ex 3. Using proxy
   * http.request('https://httpbin.org/headers', {
   *   proxy: {
   *     host: '192.168.12.34',
   *     port: 8087,
   *     proxyAuth: 'proxyUser:proxyPassword'
   * });
   * // Returns:
   * // { headers: {
   * //     Accept: "\*\/*",
   * //     Accept-Language: "ja",
   * //     Host: "httpbin.org",
   * //     User-Agent: "Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)",
   * //     X-Amzn-Trace-Id: "Root=1-1234abcd-12345678abcdefg123456789"
   * //   }
   * // }
   *
   * // Ex 4. POST data
   * http.request('https://httpbin.org/post?argA=valA', {
   *   method: 'POST',
   *   dataToSend: 'formB=' + encodeURIComponent('value B')
   * });
   * // Returns:
   * // { args: { argA: "valA" },
   * //   data: "",
   * //   files: {},
   * //   form: { formB: "valB" },
   * //   headers: { ... },
   * //   json: null,
   * //   origin: "111.222.333.444",
   * //   url: "https://httpbin.org/post?%3FargA=valA" }
   * @function request
   * @memberof Wsh.Http
   * @param {string} url - The URL to requrest.
   * @param {object} [options] - Optional parameters.
   * @param {number} [options.port=80] - Port of remote server.
   * @param {string} [options.auth] - Basic authentication. e.g. `user:password` to compute an Authorization header
   * @param {string} [options.method='GET'] - The string specifying the HTTP request method.
   * @param {object} [options.dataToSend]
   * @param {object} [options.headers]
   * @param {number} [options.timeout=0] - The number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. Default: 0 is no timeout
   * @param {object} [options.proxy]
   * @param {string} [options.proxy.host] - 'yourproxy',
   * @param {number} [options.proxy.port] - 8087,
   * @param {string} [options.proxy.proxyAuth] - 'proxyUser:proxyPass'
   * @returns {(string|Object)}
   */
  http.request = function (url, options) {
    var functionName = 'http.request';
    if (!isSolidString(url)) throwErrNonStr(functionName, url);

    var dataToSend;
    var method = obtain(options, 'method', 'GET');
    var httpObj = WScript.CreateObject('Msxml2.ServerXMLHTTP');

    /**
     * @function open
     * @memberof Msxml2.ServerXMLHTTP
     * @param {string} Method
     * @param {string} URL
     * @param {boolean} Async
     * @param {string} [User]
     * @param {string} [Password]
     */
    httpObj.open(method, url, false);

    // Protocol
    if (startsWith(url) === 'https') {
      /**
       * @see https://qiita.com/tnakagawa/items/8d9d093b83cab48ae6c7
       * SXH_OPTION_IGNORE_SERVER_SSL_CERT_ERROR_FLAGS: 2
       * SXH_SERVER_CERT_IGNORE_ALL_SERVER_ERRORS: 13056
       */
      httpObj.setOption(2, 13056); // Ignore a SSH error
    }

    var headers = obtain(options, 'headers', null);
    if (isPlainObject(headers)) {
      Object.keys(headers).forEach(function (prop) {
        httpObj.setRequestHeader(prop, headers[prop]);
      });
    }

    // Method
    if (method === 'POST') {
      httpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      dataToSend = obtain(options, 'dataToSend', null);
    }

    // Basic Auth
    var auth = obtain(options, 'auth', null);
    if (auth) {
      var authBase64 = Buffer.from(auth).toString('base64');
      httpObj.setRequestHeader('Authorization', 'Basic ' + authBase64);
    }

    // Bypass a proxy
    var proxy = obtain(options, 'proxy', null);
    if (proxy) {
      /**
       * SetProxy {@link https://docs.microsoft.com/en-us/windows/win32/winhttp/iwinhttprequest-setproxy?redirectedfrom=MSDN|Microsoft Docs}
       *
       * @function setProxy
       * @memberof Msxml2.ServerXMLHTTP
       * @param {number} ProxySetting - 2: HTTPREQUEST_PROXYSETTING_PROXY
       * @param {string} [ProxyServer]
       * @param {string} [BypassList]
       */
      httpObj.setProxy(2, proxy.host + ':' + proxy.port);

      // Proxy Auth
      if (proxy.proxyAuth) {
        var pAuthStrs = proxy.proxyAuth.split(':');
        var pUserName = pAuthStrs[0];
        var pPassword = pAuthStrs[1];
        httpObj.setProxyCredentials(pUserName, pPassword);
      }
    }

    // Timeout
    /**
     * @function setTimeouts
     * @memberof Msxml2.ServerXMLHTTP
     * @param {number} ResolveTimeout=0
     * @param {number} connectTimeout=60000
     * @param {number} sendTimeout=30000
     * @param {number} receiveTimeout=30000
     */
    var timeout = obtain(options, 'timeout', 60000);
    httpObj.setTimeouts(0, timeout, 30000, 30000);

    // Send the request
    httpObj.send(dataToSend);

    // Get a response
    var res = httpObj.responseText;
    try {
      return JSON.parse(res);
    } catch (e) {
      return res;
    }
  }; // }}}
})();

// vim:set foldmethod=marker commentstring=//%s :
