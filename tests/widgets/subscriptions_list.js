module.exports = function() {
  this.Widgets.Subscription = this.Widget.List.extend({
    root: '.subscription-list-item',

    purchaseDate: function() {
      return this.read('.purchase-date .value');
    }
  });

  this.Widgets.SubscriptionList = this.Widget.List.extend({
    root: '.subscription-list',
    itemSelector: '.bunsen-list-item',
    itemClass: this.Widgets.Subscription,
    linkSelector: 'h2 a',

    findDataset: function(title) {
      return this.filter(function(item) {
        return item.read().then(function(text) {
          return text.match(title);
        });
      })
      .then(function(filtered) {
        return filtered[0];
      });
    },

    hasDataset: function(title) {
      return this.findDataset(title).then(function(dataset) {
        return dataset.isPresent();
      });
    },

    titles: function() {
      return this.invoke({ method: 'read', arguments: [this.linkSelector] });
    },

    descriptions: function() {
      return this.invoke({ method: 'read', arguments: ['.description'] });
    },

    locations: function() {
      return this.invoke({ method: 'read', arguments: ['.location .value'] });
    },

    clickOn: function(title) {
      return this.findDataset(title)
      .then(function(dataset) {
        return dataset.click(this.linkSelector);
      }.bind(this));
    },
  });

  this.Widgets.SubscriptionSidebar = this.Widget.extend({
    root: '.subscriptions-sidebar',

    search: function(query) {
      return this.fill({ selector: '.search', value: query });
    },

    toggleSortBySubscriptionDate: function() {
      return this.click('.sort-by.subscription-date');
    }
  });

  this.Widgets.SubscriptionOverview = this.Widget.extend({
    root: '.overview',

    numberOfDataSets: function() {
      return this.read('.sets .value');
    },

    totalCost: function() {
      return this.read('.cost .value');
    },

    recentlyUsedTitles: function() {
      return this.findAll('.recently-used li').then(function(recentlyUsed) {
        return recentlyUsed.invoke('read');
      });
    }
  });
};
