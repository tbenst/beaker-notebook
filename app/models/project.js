var _ = require("lodash");

module.exports = function(Bookshelf) {
  var query   = Bookshelf.knex;
  var Project = Bookshelf.Model.extend({
    tableName: "Projects",
    hasTimestamp: true
  });

  Project = _.extend(Project, {
    findMatching: function(filters) {
      var queries = [Project.findByUserId(filters.userId).toString()];

      if (filters.filterBy !== void(0) && filters.filterBy.length) {
        queries.push(Project.findBySearchParam(filters.filterBy).toString());
      }

      return query.raw(queries.join("\nINTERSECT\n"));
    },

    findByUserId: function(userId) {
      return query("Projects")
      .where("ownerId", "=", userId)
      .select();
    },

    findBySearchParam: function(searchTerm) {
      return query("Projects")
      .where("name", "ILIKE", "%"+searchTerm+"%")
      .select();
    },
  });

  return {
    name: "Project",
    model: Project
  }
}
