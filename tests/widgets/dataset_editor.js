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
    typeIntoCategories: function(value) {
      return this.fill({
        selector: '.dataset-category-field',
        value: value
      });
    },
    setCategory: function(value) {
      return this.typeIntoCategories(value)
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
