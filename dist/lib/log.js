'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyStream = function prettyStream(args) {
  args = args || ['-o', 'short'];
  var bin = _path2.default.resolve(_path2.default.dirname(require.resolve('bunyan')), '..', 'bin', 'bunyan');
  var stream = (0, _through2.default)(function write(data) {
    this.queue(data);
  }, function end() {
    this.queue(null);
  });

  if (bin && _fs2.default.existsSync(bin)) {
    var formatter = (0, _child_process.spawn)(bin, ['-o', 'short'], {
      stdio: [null, process.stdout, process.stderr]
    });
    stream.pipe(formatter.stdin);
  }

  return stream;
};

var amp_log = {
  init: function init(options) {
    var log = _bunyan2.default.createLogger({
      name: options.name,
      level: options.level || process.env.AMP_LOG_LEVEL || "debug",
      stream: process.env.AMP_LOG_FORMAT !== null && process.stdout.isTTY || process.env.AMP_LOG_FORMAT == "pretty" ? prettyStream() : process.stdout
    });
    amp_log.trace = log.trace;
    amp_log.debug = log.debug;
    amp_log.info = log.info;
    amp_log.warn = log.warn;
    amp_log.error = log.error;
    amp_log.fatal = log.fatal;
  }
};

exports.default = amp_log;
//# sourceMappingURL=log.js.map