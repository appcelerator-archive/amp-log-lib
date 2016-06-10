import bunyan from 'bunyan'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs'
import through from 'through'

const prettyStream = function(args) {
  args = args || ['-o', 'short']
  const bin = path.resolve(path.dirname(require.resolve('bunyan')), '..', 'bin', 'bunyan');
  const stream = through(function write(data) {
    this.queue(data)
  }, function end () {
    this.queue(null);
  });

  if (bin && fs.existsSync(bin)) {
    const formatter = spawn(bin, ['-o', 'short'], {
      stdio: [null, process.stdout, process.stderr]
    })
    stream.pipe(formatter.stdin)
  }

  return stream
};

const amp_log = {
  init(options) {
    const log = bunyan.createLogger({
      name: options.name,
      level: options.level || process.env.AMP_LOG_LEVEL || "debug",
      stream: process.env.AMP_LOG_FORMAT !== null && process.stdout.isTTY || process.env.AMP_LOG_FORMAT == "pretty" ? prettyStream() : process.stdout,
    })
    amp_log.trace = log.trace.bind(log)
    amp_log.debug = log.debug.bind(log)
    amp_log.info = log.info.bind(log)
    amp_log.warn = log.warn.bind(log)
    amp_log.error = log.error.bind(log)
    amp_log.fatal = log.fatal.bind(log)
    amp_log.init = null
  }
}

export default amp_log;
