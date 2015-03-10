module.exports = function (object, key) {
  var keys = Object.keys(object[key]);
  for(var i = 0; i < keys.length; i++) {
    object[keys[i]] = object[key][keys[i]];
  }
  delete object[key];
};
