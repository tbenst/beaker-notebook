var _     = require('lodash');

module.exports = function(Bookshelf, app) {
  var query   = Bookshelf.knex;
  var DataTag = Bookshelf.Model.extend({
    tableName: 'data_tags',

    idAttrs: ["name"]
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
