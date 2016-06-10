'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('amp-log-lib', function () {
  it('first direct call without init should fail', function () {
    var ok = false;
    try {
      _2.default.info("info level");
    } catch (e) {
      ok = true;
    }
    (0, _assert2.default)(ok);
  });

  it('should output some log', function () {
    _2.default.init({ name: "module-name" });
    _2.default.trace("trace level");
    _2.default.debug("debug level");
    _2.default.info("info level");
    _2.default.warn("warn level");
    _2.default.error("error level");
    _2.default.fatal("fatal level");
  });

  it('second call to init should fail', function () {
    var ok = false;
    try {
      _2.default.init({ name: "module-name2" });
    } catch (e) {
      ok = true;
    }
    (0, _assert2.default)(ok);
  });
});
//# sourceMappingURL=test.js.map