module.exports = function() {
  this.Widgets.Subscription = this.Widget.List.extend({
    root: '.subscription-list-item',

    purchaseDate: function() {
      return this.read('.purchase-date .value');
    }
  });

  this.Widgets.SubscriptionList = this.Widget.List.extend({
    root: '.subscription-list',
    itemSelector: '.subscription-list-item',
    itemClass: this.Widgets.Subscription,
    linkSelector: 'h2 a',

    findDataset: function(title) {
      return this.filter(function(item) {
        return item.find().then(function(elm) {
          return elm.getText().then(function(text) {
            return text.match(title);
          });
        });
      })
      .then(function(filtered) {
        return filtered[0];
      });
    },

    hasDataset: function(title) {
      return this.findDataset(title)
      .then(function(dataset) {
        return !!dataset;
      });
    },

    titles: function() {
      return this._readAll(this.linkSelector);
    },

    descriptions: function() {
      return this._readAll('.description');
    },

    locations: function() {
      return this._readAll('.location .value');
    },

    clickOn: function(title) {
      return this.findDataset(title)
      .then(function(dataset) {
        return dataset.click(this.linkSelector);
      }.bind(this));
    },

    _readAll: function(selector) {
      return this.map(function(item) {
        return item.read(selector);
      });
    }
  });

  this.Widgets.SubscriptionSidebar = this.Widget.extend({
    root: '.subscriptions-sidebar',

    search: function(query) {
      return this.fill('.search', query);
    },

    toggleSortBySubscriptionDate: function() {
      return this.click('.sort-by.subscription-date');
    }
  });
};
