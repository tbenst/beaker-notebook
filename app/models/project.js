var _ = require("lodash"),
    bluebird = require('bluebird'),
    notebook = require('./notebook'),
    RecordNotUniqueError = require("../lib/record_not_unique_error");


module.exports = function(Bookshelf, app) {
  var models = app.Models;
  var query   = Bookshelf.knex;

  var Project = Bookshelf.Model.extend({
    tableName: "projects",
    idAttrs: ["name"],

    virtuals: {
      lastUpdatedAt: function() {
        var dates = _.map(this.related('notebooks').models, function(i) {
          return new Date(i.get('updatedAt'));
        });
        dates.push(new Date(this.get('updatedAt')));
        return new Date(Math.max.apply(null, dates));
      }
    },

    initialize: function() {
      this.on("saving", this.validateName);
      this.on("destroying", this.destroyNotebooks);
    },

    validateName: function() {
      if (!this.hasChanged('name')) {
        return bluebird.resolve(true);
      }

      if (!this.get("name")) {
        throw new Error('No name specified for project.');
      }

      return query('projects')
        .where({owner_id: this.get("ownerId"),
                name: this.get("name")})
        .where("id", "!=", this.get("id"))
        .then(function(dupe) {
          if (dupe.length > 0) {
            throw new RecordNotUniqueError(
              'You already have a project named "' + this.get("name") + '"');
          }
        }.bind(this));
    },

    countCommits: function() {
      return bluebird.reduce(this.related('notebooks').models, function(sum, notebook) {
        return notebook.numCommits().then(function(n) {
          return sum + n;
        })
      }, 0);
    },

    withNotebooks: function() {
      return this.load('notebooks')
      .then(function(project) {
        return project.countCommits()
        .then(function(count) {
          project.attributes.numCommits = count;
          return project;
        })
      });
    },

    notebooks: function() {
      return this.hasMany(models.Notebook);
    },

    destroyNotebooks: function() {
      return this.notebooks().fetch()
        .then(function(books) {
          return bluebird.map(books.models, function(book) {
            return book.destroy();
          });
        });
    }

  });

  Project = _.extend(Project, {
    findMatching: function(filters) {
      var queries = [Project.findByUserId(filters.userId)];

      if (filters.filterBy !== void(0) && filters.filterBy.length) {
        queries.push(Project.findBySearchParam(filters.userId, filters.filterBy));
      }

      return bluebird.all(queries)
        .then(function(q) {
          return query.raw(q.join("\nINTERSECT\n"));
        })
        .then(function (result) {
          return bluebird.map(result.rows, function (attr) {
            var project = new Project(attr, {parse: true});
            return project.withNotebooks();
          })
        })
    },

    findByUserId: function(userId) {
      return query("projects")
        .where("owner_id", "=", userId)
        .orderBy("created_at", "ASC")
        .select().toString();
    },

    findBySearchParam: function(userId, searchTerm) {
      return query('notebooks')
             .where('user_id', userId)
             .where('name','ILIKE', "%"+searchTerm+"%")
             .select('id')
             .then(function(ids) {
                var matchingQuery = query("projects")
                  .where("name", "ILIKE", "%"+searchTerm+"%")
                  .orWhere("description", "ILIKE", "%"+searchTerm+"%");
                if (ids.length) {
                  matchingQuery.orWhereIn('id', _.pluck(ids, 'id'));
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
