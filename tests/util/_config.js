module.exports = function() {
  var appHost = process.env.APP_PORT_3000_TCP_ADDR || 'localhost';
  var appPort = process.env.APP_PORT_3000_TCP_PORT || '3000';
  var frontEndHost = process.env.WEB_PORT_8080_TCP_ADDR || 'localhost';
  var frontEndPort = process.env.WEB_PORT_8080_TCP_PORT || '8080';

  this.config = {
    appServer: {
      url:  "http://" + appHost + ":" + appPort + "/"
    },
    frontend: {
      url:  "http://" + frontEndHost + ":" + frontEndPort + "/"
    }
  }
  return this.config;
}
