# amp-log-lib

The `amp-log-lib` is library to "standardize" AMP logs.

## Usage

from main module: `app.js`
```js
import pkg from '../package.json'
import log from 'amp-log-lib'
log.init(pkg)
```

from other file: `lib/foo.js`
```js
import log from 'amp-log-lib'
log.trace("...")
log.debug("...")
log.info("...")
log.warn("...")
log.error("...")
log.fatal("...")
```
## Environment

```sh
AMP_LOG_LEVEL="debug"   # Set log level
AMP_LOG_FORMAT="pretty" # Force pretty printing
AMP_LOG_FORMAT="json"   # Force json output

```
The default is "pretty" when on a TTY, "json" otherwise

## To generate

`atomiq make build`
`npm make test`
