var crypto     = require('crypto');
var _          = require('lodash');
if(!process.env.CIPHER_KEY) { throw new Error('CIPHER_KEY env variable is not set') }
var cipherKey  = process.env.CIPHER_KEY;

module.exports = {

  encrypt: function(data) {
    var cipher    = crypto.createCipher('blowfish', cipherKey);
    return cipher.update(data, 'utf-8', 'hex') + cipher.final('hex');
  },

  decrypt: function(data) {
    var decipher  = crypto.createDecipher('blowfish', cipherKey);
    return decipher.update(data, 'hex', 'utf-8') + decipher.final('utf-8');
  },

  createHash: function(email) {
    return crypto.createHash('md5').update(email).digest('hex');
  }
}
