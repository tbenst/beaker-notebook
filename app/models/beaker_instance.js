module.exports = function(Bookshelf, app) {

  var BeakerClaim = Bookshelf.Model.extend({
    tableName: "beaker_claims"
  });

  return {
    name: "BeakerClaim",
    model: BeakerClaim
  }
}
