module.exports = function(Bookshelf, app) {

  var BeakerClaim = Bookshelf.Model.extend({
    tableName: "beaker_claims",
    hasTimestamps: true
  });

  return {
    name: "BeakerClaim",
    model: BeakerClaim
  }
}
