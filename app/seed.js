express       = require('express'),
app           = express(),
models        = require('./models'),
_             = require('lodash'),
when          = require('when'),
sequence      = require('when/sequence'),
util          = require('util'),
inflection    = require('inflection'),
notebook      = require('./lib/notebook'),
notebookData  = require('./seed_files/notebooks.json');

var data = Array.prototype.concat(
  require('./seed_files/users'),
  require('./seed_files/projects'),
  require('./seed_files/vendors'),
  require('./seed_files/data_previews'),
  require('./seed_files/data_tags'),
  require('./seed_files/categories'),
  require('./seed_files/data_sets')
);

models.init(app);

loadFixtures(data, app.Models).then(function() {
  return createNotebooks(app.Models);
})
.done(function() {
  console.log("DB seeded.")
  process.exit();
});

function loadFixtures(data, models) {
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
  }).value());
}

function setAssociations(model, modelName, associations, models) {
  var args = Array.prototype.slice.call(arguments, 0);

  if (associations === void(0)) {
    return when.resolve(model);
  }

  return when.map(associations, function(association) {
    setAssociation.apply(this, args.concat(association))
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
      return setRelationshipStore(assoc['joinTable'], lookupModelKey,
                                  lookupModel, modelName, model, assoc)
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

function createRelationRecord(modelName, modelName2, id, id2,  joinTable) {
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

function createNotebooks(models) {
  return new models.User({email: 'dummy@example.com'}).fetch()
    .then(function(user) {
      return user.projects().fetch()
        .then(function(projects) {
          return when.map(notebookData, function(n) {
            return notebook.create({userId: user.id,
              projectId: projects.models[0].id,
              name: n.name,
              data: n.data
            });
          });
        });
    });
}
