var _         = require('lodash'),
when          = require('when'),
sequence      = require('when/sequence'),
util          = require('util'),
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
      // first save the model so we have an ID
      // then loop over the associations
      // then save the model once more
      return models[d.model].forge(d.data)
              .save()
              .then(function(model) {
                return setAssociations(model, d.model, d.associations, models);
              })
              .then(function(model) {
                return model.save();
              });
      }, d);
  }).value()).then(function() {
    // after we are done return the models array
    // to allow people to do things after the seed is done
    return models;
  });
}

module.exports.dropAll = function(configPath) {
  app         = app || (require('./models').init({}, configPath));
  var models  = app.Models;

  // we need to sequence the truncations
  // to prevent too many open connections to the
  // database at once, otherwise knex complains and
  // bombs out.
  return sequence(_(models).map(function(model) {
    return _.partial(function(tableName) {
      return app.DB.knex(inflection.pluralize(tableName)).truncate();
    }, model.prototype.tableName)
  }).value());
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
