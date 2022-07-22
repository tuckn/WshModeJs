/* globals Wsh: false */

/* globals describe: false */
/* globals test: false */
/* globals expect: false */

// shorthand
var fs = Wsh.FileSystem;
var zlib = Wsh.ZLIB;

var _cb = function (fn/* , args */) {
  var args = Array.from(arguments).slice(1);
  return function () { fn.apply(null, args); };
};

describe('ZLIB', function () {
  var testName;

  testName = 'deflateSyncIntoRar_many_options';
  test(testName, function () {
    var rtn = zlib.deflateSyncIntoRar('D:\\My data', null, {
      dateCode: 'yyyyMMdd-HHmmss',
      compressLv: 0,
      password: 'This is mY&p@ss ^_<',
      excludingFiles: [
        'D:\\My data\\icons\\foo bar.ico',
        'settings.json',
        '*utf16*',
        '*\\20000101T010103_Text-UTF8.txt'
      ],
      excludesEmptyDir: true,
      excludesSubDirWildcard: true,
      isDryRun: true
    });

    console.dir(rtn);
    expect('@TODO').toBe('Tested');
  });
});
