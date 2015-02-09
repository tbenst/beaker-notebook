var _ = require('lodash');

module.exports = function(Bookshelf, app) {
  var Rating = Bookshelf.Model.extend({
    tableName: "ratings",
    hasTimestamps: true,
  });

  Rating.getAverage = function(params) {
    var query = "select avg(score) from ratings where rateable_id = ?";
    return Bookshelf.knex.raw(query, [params.rateableId])
    .then(function(result) {
      return _.first(result.rows).avg ? parseFloat(_.first(result.rows).avg) : 0;
    });
  };

  return {
    name: "Rating",
    model: Rating
  }
}
