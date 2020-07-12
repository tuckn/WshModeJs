/* globals Wsh: false */
/* globals Buffer: false */

/* globals describe: false */
/* globals test: false */
/* globals expect: false */

// shorthand
var fs = Wsh.FileSystem;

var _cb = function (fn/* , args */) {
  var args = Array.from(arguments).slice(1);
  return function () { fn.apply(null, args); };
};

// var binFile = 'C:\\tkn\\home\\tuckn\\src\\wsh\\WshModeJs\\src\\Sandbox\\02parts_100x60_title4.lpb';
//
// var readBin = fs.readFileSync(binFile);
// var buf = Buffer.from(readBin);
// console.log(buf.toString('hex'));

describe('Buffer', function () {
  var testName;

  testName = 'from_string';
  test(testName, function () {
    var str = '012345XYZ';
    var buf = Buffer.from(str);

    expect(buf.toString('utf8')).toBe('012345XYZ');
    expect(buf.toString('base64')).toBe('MDEyMzQ1WFla');
    expect(buf.toString('hex')).toBe('30313233343558595a');
    expect(buf.values()).toBe('@todo');

    var errVals = [true, false, undefined, null, NaN, Infinity, [], ''];
    errVals.forEach(function (val) {
      expect(_cb(Buffer.from, val)).toThrowError();
    });
  });

  testName = 'byteLength';
  test(testName, function () {
    expect('@TODO').toBe('tested');

    var len;

    console.log(Buffer.byteLength('1')); // 1
    console.log(Buffer.byteLength('2')); // 1
    console.log(Buffer.byteLength('A')); // 1
    console.log(Buffer.byteLength('10')); // 2
    console.log(Buffer.byteLength('FF')); // 2
    console.log(Buffer.byteLength('南無阿弥陀仏')); // 18
    console.log(Buffer.byteLength(16)); // Error
    console.log(Buffer.byteLength(255)); // Error
    console.log(Buffer.byteLength(256)); // Error

    expect(Buffer.byteLength('1')).toBe(1);
    expect(Buffer.byteLength('2')).toBe(1);
    expect(Buffer.byteLength('A')).toBe(1);
    expect(Buffer.byteLength('10')).toBe(1);

    // var errVals = [true, false, undefined, null, NaN, Infinity, [], ''];
    // errVals.forEach(function (val) {
    //   expect(_cb(Buffer.from, val)).toThrowError();
    // });
  });

  testName = 'binFile';
  test(testName, function () {
    expect('@TODO').toBe('tested');

    // console.log(Buffer.byteLength(readBin));
  });
});
