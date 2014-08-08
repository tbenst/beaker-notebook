function NoSuchInstance(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'NoSuchInstance';
};

NoSuchInstance.prototype = Error.prototype;

module.exports = NoSuchInstance;
