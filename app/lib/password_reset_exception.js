function PasswordResetException(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'PasswordResetException';
};

PasswordResetException.prototype = Error.prototype;

module.exports = PasswordResetException;
