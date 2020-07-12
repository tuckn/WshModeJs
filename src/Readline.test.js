/* globals Wsh: false */

/* globals describe: false */
/* globals test: false */
/* globals expect: false */

// Shorthand
var util = Wsh.Util;
var rl = Wsh.Readline;

var _cb = function (fn/* , args */) {
  var args = Array.from(arguments).slice(1);
  return function () { fn.apply(null, args); };
};

describe('Readline', function () {
  var testName;
  var noneStrVals = [true, false, undefined, null, 0, 1, NaN, Infinity, [], {}];

  testName = 'questionSync';
  test(testName, function () {
    expect('@TODO').toBe('tested');
  });
});
