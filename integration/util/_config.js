module.exports = function() {
  try {
    this.config = require('../config.json');
  } catch(e) {
    throw Error('Error reading test config from /config.json');
  }
}
