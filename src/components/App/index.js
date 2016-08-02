if (__DEV__ && process.env.BROWSER) {
  module.exports = require('./App.dev');
} else {
  module.exports = require('./App.prod');
}
