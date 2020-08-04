/* globals Wsh: false */
/* globals process: false */

/* globals describe: false */
/* globals test: false */
/* globals expect: false */

// Shorthand
var util = Wsh.Util;
var http = Wsh.Http;

var isSolidString = util.isSolidString;
var isPlainObject = util.isPlainObject;

var _cb = function (fn/* , args */) {
  var args = Array.from(arguments).slice(1);
  return function () { fn.apply(null, args); };
};

describe('Http', function () {
  var testName;
  var noneStrVals = [true, false, undefined, null, 0, 1, NaN, Infinity, [], {}];

  var proxyOptions;
  if (isSolidString(process.env.PROXY_HOST)) {
    proxyOptions = {
      host: process.env.PROXY_HOST,
      port: process.env.PROXY_PORT,
      proxyAuth: process.env.PROXY_AUTH
    };
  }

  testName = 'request_ip';
  test(testName, function () {
    var url = 'https://httpbin.org/ip';
    var options = {
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    console.dir(res);
    expect(isPlainObject(res)).toBe(true);
    expect(isSolidString(res.origin)).toBe(true);

    noneStrVals.forEach(function (val) {
      expect(_cb(http.request, val)).toThrowError();
    });
  });

  testName = 'request_headers';
  test(testName, function () {
    var url = 'https://httpbin.org/headers';
    var options = {
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    // console.dir(res);
    expect(isPlainObject(res)).toBe(true);
    expect(isPlainObject(res.headers)).toBe(true);
    expect(res.headers.Accept).toBe('*/*');
    expect(isSolidString(res.headers['Accept-Language'])).toBe(true);
    // ja
    expect(res.headers.Host).toBe('httpbin.org');
    expect(isSolidString(res.headers['User-Agent'])).toBe(true);
    // Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)
    expect(isSolidString(res.headers['X-Amzn-Trace-Id'])).toBe(true);
    // Root=1-1234abcd-12345678abcdefg123456789
  });

  testName = 'request_UrlParameter';
  test(testName, function () {
    var url = 'https://httpbin.org/get?arg1=val1';
    var options = {
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    console.dir(res);
  });

  testName = 'request_proxy';
  test(testName, function () {
    // var url = 'https://httpbin.org/myUser/myPasswd';
    var url = 'https://httpbin.org/headers';
    var options = {
      // auth: 'myUser:myPasswd&',
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    console.dir(res);
  });

  testName = 'request_basicAuth';
  test(testName, function () {
    var url = 'https://httpbin.org/basic-auth/myUser/myPasswd';
    var options = {
      auth: 'myUser:myPasswd',
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    console.dir(res);
  });

  testName = 'request_api_basicauth';
  test(testName, function () {
    var url = 'https://httpbin.org/ip';
    var res = http.request(url);
    console.dir(res);
    console.log('------------------------');

    url = process.env.API_URL;
    res = http.request(url);
    console.dir(res);
    console.log('------------------------');

    var options = {
      auth: process.env.API_AUTH,
      proxy: proxyOptions
    };
    res = http.request(url, options);
    console.dir(res);
  });

  testName = 'request_post';
  test(testName, function () {
    var url = 'https://httpbin.org/post?argA=valA';
    var options = {
      method: 'POST',
      dataToSend: 'formB=' + encodeURIComponent('value B'),
      proxy: proxyOptions
    };

    var res = http.request(url, options);
    console.dir(res);
  });
});
