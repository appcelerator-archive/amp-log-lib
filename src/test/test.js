import 'source-map-support/register';

import assert from 'assert';
import log from '..';

describe('amp-log-lib', function() {
  it('first direct call without init should fail', () => {
    let ok = false
    try {
      log.info("info level")
    } catch (e) {
      ok = true
    }
    assert(ok)
  })

  it('should output some log', () => {
    log.init({ name: "module-name" })
    log.trace("trace level")
    log.debug("debug level")
    log.info("info level")
    log.warn("warn level")
    log.error("error level")
    log.fatal("fatal level")
  })

  it('second call to init should fail', () => {
    let ok = false
    try {
      log.init({ name: "module-name2" })
    } catch (e) {
      ok = true
    }
    assert(ok)
  })

});
