var _         = require('lodash'),
when          = require('when'),
sequence      = require('when/sequence'),
inflection    = require('inflection'),
app           = undefined;

module.exports = function(data, configPath) {
  // load the app models
  // with an optional config path
  app         = app || (require('./models').init({}, configPath));
  var models  = app.Models;

  // fixtures need to happen in order
  // so we have to use sequence here
  return sequence(_(data).flatten().map(function(d) {
    return _.partial(function(d) {
      function fetchModel() {
        var attrs = _.pick(d.data, models[d.model].prototype.idAttrs)
        if (!_.isEmpty(attrs)) {
          return models[d.model].forge(_.pick(d.data, models[d.model].prototype.idAttrs))
          .fetch();
        } else {
          return when(null);
        }
      }

      // first save the model so we have an ID
      // then loop over the associations
      // then save the model once more
      return fetchModel()
        .then(function (m) {
          return {fields: d, model: m};
        })
        .then (function (obj) {
          if (obj.model === null){
            return models[obj.fields.model].forge(obj.fields.data)
              .save()
              .then(function(model) {
                return setAssociations(model, obj.fields.model, obj.fields.associations, models);
              })
              .then(function(model) {
                return model.save();
              });
          }
          else {
            if ( isEqual( _.omit(obj.model.attributes, ['id', 'created_at', 'updated_at']), obj.fields.data) ) return;
            return obj.model.set(obj.fields.data).save();
          }
        })
      }, d);
  }).value()).then(function(models) {
    // after we are done return the models array
    // to allow people to do things after the seed is done
    return models;
  });
}

module.exports.dropAll = function(configPath) {
  app         = app || (require('./models').init({}, configPath));
  var models  = app.Models;

  function findAllTables() {
    return app.DB.knex('information_schema.tables')
      .select('table_name')
      .where('table_schema', '=', 'public')
      .andWhere('table_name', '<>', 'knex_migrations');
  }

  return findAllTables()
    .then(function(names) {
      truncateAll = _.map(names, function(n) {
        return "TRUNCATE \"" + n.table_name + "\""
      }).join(";");
      return app.DB.knex.raw(truncateAll)
    }).then(function() {
      return models;
    });
}

function setAssociations(model, modelName, associations, models) {
  var args = Array.prototype.slice.call(arguments, 0);

  if (associations === void(0)) {
    return when.resolve(model);
  }

  return when.map(associations, function(association) {
    return setAssociation.apply(this, args.concat(association))
  })
  .then(function() {
    return model;
  });
}

function setAssociation(model, modelName, associations, models, assoc) {
  var lookupModelKey = _.keys(assoc['lookup'])[0];

  // lookup data can be an array or single value
  // normalize to an array to map over it
  var lookupData = Array.prototype.concat(assoc['lookup'][lookupModelKey]);

  return when.all(_.map(lookupData, function(data) {
    return models[lookupModelKey]
    .forge(data)
    .fetch()
    .then(function(lookupModel) {
      if (lookupModel == null) {
        throw(new Error("Association Model "+ lookupModelKey +" Lookup not found with attributes " + JSON.stringify(data, null, 4)))
      } else {
        return setRelationshipStore(assoc['joinTable'], lookupModelKey,
                                    lookupModel, modelName, model, assoc)
      }
    });
  }));
}

function setRelationshipStore(joinTable, lookupModelKey, lookupModel, modelName, model, assoc) {
  // this is a many to many relationship
  if (joinTable !== void(0)) {
    return createRelationRecord(
      lookupModelKey,     modelName,
      lookupModel.id,     model.id,
      joinTable
    );
  } else {
    // if it is a many to one relationship
    return model.set(assoc.foreignKey, lookupModel.id)
    .save();
  }
}

function createRelationRecord(modelName, modelName2, id, id2, joinTable) {
  var cm    = inflection.camelize;
  var attrs = {};
  attrs[cm(modelName, true)+"Id"]  = id;
  attrs[cm(modelName2, true)+"Id"] = id2;

  return setJoinedRelationship(joinTable, attrs);
}

function setJoinedRelationship(joinTable, attrs) {
  var JoinModel = app.DB.Model.extend({
    tableName: joinTable
  });

  return (new JoinModel(attrs)).save()
}

//Similar to _.isEqual but also accounts for the case when a model has a null value
function isEqual (model, seedData) {
  var truthyArr = _.map(Object.keys(model), function (attr) {
    if (model[attr] === null) return true;
    if (model[attr] === seedData[attr]) return true;
  })
  return _.every(truthyArr);
}
