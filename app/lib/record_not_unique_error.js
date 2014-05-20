function RecordNotUniqueError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'RecordNotUniqueError';
};

RecordNotUniqueError.prototype = Error.prototype;

module.exports = RecordNotUniqueError;
