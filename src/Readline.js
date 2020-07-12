/* globals Wsh: false */

(function () {
  if (Wsh && Wsh.Readline) return;

  /**
   * [W.I.P] ReadLine functions for WSH (Windows Script Host).
   *
   * @namespace Readline
   * @memberof Wsh
   * @requires {@link https://github.com/tuckn/WshUtil|tuckn/WshUtil}
   */
  Wsh.Readline = {};

  // Shorthands
  var util = Wsh.Util;

  var isString = util.isString;

  var rl = Wsh.Readline;

  /** @constant {string} */
  var MODULE_TITLE = 'WshModeJs/Readline.js';

  var throwErrNonStr = function (functionName, typeErrVal) {
    util.throwTypeError('string', MODULE_TITLE, functionName, typeErrVal);
  };

  // rl.questionSync {{{
  /**
   * [W.I.P] Requests the URL. Similar to {@link https://nodejs.org/api/http.html#http_http_request_options_callback|Node.js http.request()}.
   *
   * @example
   * var rl = Wsh.Readline; // Shorthand
   *
   * var answer = rl.questionSync('Are you an engineer?/y or Not');
   *
   * if (answer.toUpperCase() !== 'Y') return false;
   * @function questionSync
   * @memberof Wsh.Readline
   * @param {string} [query] The query to question.
   * @returns {string} - The input string.
   */
  rl.questionSync = function (query) {
    var functionName = 'rl.questionSync';
    if (!isString(query)) throwErrNonStr(functionName, query);

    WScript.Echo(query);

    var strStdIn = WScript.StdIn.ReadLine();

    return strStdIn;
  }; // }}}

  // @TODO rl.write

  // @TODO rl.pause
})();

// vim:set foldmethod=marker commentstring=//%s :
