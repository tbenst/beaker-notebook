var _     = require('lodash');

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var DataTag = Bookshelf.Model.extend({
    tableName: 'DataTags'
  });

  DataTag = _.extend(DataTag, {
    findAll: function() {
      return DataTag.collection()
      .query()
      .orderBy('name', 'ASC')
    }
  });

  return {
    name: "DataTag",
    model: DataTag
  };
};
