var _ = require("lodash"),
    W = require('when'),
    notebook = require('./notebook');

module.exports = function(Bookshelf) {
  var query   = Bookshelf.knex;
  var Project = Bookshelf.Model.extend({
    tableName: "Projects"
  });

  Project = _.extend(Project, {
    findMatching: function(filters) {
      var queries = [Project.findByUserId(filters.userId)];

      if (filters.filterBy !== void(0) && filters.filterBy.length) {
        queries.push(Project.findBySearchParam(filters.userId, filters.filterBy));
      }

      return W.all(queries)
        .then(function(q) {
          return query.raw(q.join("\nINTERSECT\n"));
        });
    },

    findByUserId: function(userId) {
      return query("Projects")
        .where("ownerId", "=", userId)
        .select().toString();
    },

    findBySearchParam: function(userId, searchTerm) {
      return notebook.matchingProjectIds(userId, searchTerm)
        .then(function(ids) {
          var matchingQuery = query("Projects")
            .where("name", "ILIKE", "%"+searchTerm+"%")
            .orWhere("description", "ILIKE", "%"+searchTerm+"%");
          if (ids.length) {
            matchingQuery.orWhereIn('id', ids);
          }
          return matchingQuery.select().toString();
        });
    },
  });

  return {
    name: "Project",
    model: Project
  }
}
