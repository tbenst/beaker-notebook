var _ = require("lodash"),
    W = require('when'),
    notebook = require('./notebook');

module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query   = Bookshelf.knex;

  function notebooks(userId, projectId) {
    return models.Notebook.list({userId: userId, projectId: projectId})
      .then(function(notebooks) {
        var updates = _.map(notebooks, function(notebook) {
          return new Date(notebook.lastModified);
        });

        var numCommits = _.reduce(notebooks, function(sum, notebook) {
          return sum + notebook.numCommits;
        }, 0);

        return {
          notebooks: notebooks,
          numCommits: numCommits,
          lastUpdated: Math.max.apply(null, updates)
        };
      });
  }

  function maxDate(a, b) {
    return new Date(Math.max(a, b));
  }

  var Project = Bookshelf.Model.extend({
    tableName: "Projects",

    withNotebooks: function() {
      var _this = this;
      return notebooks(this.get('ownerId'), this.id)
        .then(function(n) {
          _this.attributes.lastUpdatedAt = maxDate(new Date(_this.get('updated_at')), n.lastUpdated);
          return _.extend(_this.attributes, n);
        });
    },
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
        })
        .then(function(result) {
          return W.map(result.rows, function(row) {
            return notebooks(row.ownerId, row.id)
              .then(function(n) {
                row.lastUpdatedAt = maxDate(new Date(row.updated_at), n.lastUpdated);
                return _.extend(row, n);
              })
          });
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
