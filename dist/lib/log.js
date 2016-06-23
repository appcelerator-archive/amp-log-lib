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

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prettyStream = function (args) {
  args = args || ['-o', 'short'];
  const bin = _path2.default.resolve(_path2.default.dirname(require.resolve('bunyan')), '..', 'bin', 'bunyan');
  const stream = (0, _through2.default)(function write(data) {
    this.queue(data);
  }, function end() {
    this.queue(null);
  });

  if (bin && _fs2.default.existsSync(bin)) {
    const formatter = (0, _child_process.spawn)(bin, ['-o', 'short'], {
      stdio: [null, process.stdout, process.stderr]
    });
    stream.pipe(formatter.stdin);
  }

  return stream;
};

const amp_log = {
  init(pkg, options) {
    const log = _bunyan2.default.createLogger({
      name: pkg.name,
      level: options && options.level || process.env.AMP_LOG_LEVEL || "debug",
      stream: process.env.AMP_LOG_FORMAT !== null && process.stdout.isTTY || process.env.AMP_LOG_FORMAT == "pretty" ? prettyStream() : process.stdout
    });
    amp_log.trace = log.trace.bind(log);
    amp_log.debug = log.debug.bind(log);
    amp_log.info = log.info.bind(log);
    amp_log.warn = log.warn.bind(log);
    amp_log.error = log.error.bind(log);
    amp_log.fatal = log.fatal.bind(log);
    amp_log.init = null;
    amp_log.info("starting", pkg.name, pkg.version);
    amp_log.info("using amp-log-lib", _package2.default.name, _package2.default.version);
  }
};

exports.default = amp_log;
//# sourceMappingURL=log.js.map