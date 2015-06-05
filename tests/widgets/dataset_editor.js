var util = require('util');

module.exports = function() {
  this.Widgets.DatasetEditor = this.Widget.Form.extend({
    root: 'dataset-editor',
    setTitle: function(v) {
      return this.fill({
        selector: '[ng-model="dataset.title"]',
        value: v
      });
    },
    setCatalog: function(val) {
      return this.select({
        selector: 'select',
        value: val
      });
    },
    typeInto: function(field, value) {
      var fields = {
        'category': '.dataset-category-field'
      };

      if (field in fields) {
        return this.fill({
          selector: fields[field],
          value: value
        });
      } else {
        throw new Error(util.format('FieldType: %s not found', field));
      }
    },
    addTag: function(tag) {
      return this.fill({
        selector: '.dataset-tags-field',
        value: tag
      })
      .then(function() {
        return this.click('.tag-add');
      }.bind(this));
    },
    setCategory: function(value) {
      return this.typeInto('category', value)
      .then(function() {
        return this.click({
          selector: 'strong',
          text: value
        })
        .thenCatch(function() {
          return false;
        });
      }.bind(this));
    },
    save: function() {
      return this.click('.submit-dataset-edit')
      .then(function() {
        // We sleep for 2 seconds to let the network
        // request finish. We have to do this since there is no visible
        // indicator.
        return this.driver.sleep(2000);
      }.bind(this));
    }
  });
};
