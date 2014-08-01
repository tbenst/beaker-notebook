module.exports = function() {
  return this.Widgets.MarketItem = this.Widget.extend({
    root: '.marketplace',

    title: function() {
      return this.read('h1');
    },

    description: function() {
      return this.read('.description');
    },

    vendors: function() {
      return this.read('.vendor').then(function(format){
        return format.toLowerCase();
      });
    },

    clickVendor: function() {
      return this.click(".vendor")
    },

    frequency: function() {
      return this.read('.update-frequency');
    },

    tags: function() {
      return this.read('.tags');
    },

    format: function() {
      return this.read('.format');
    },

    categories: function() {
      return this.read('.categories');
    },

    goBackToSearch: function() {
      return this.click(".return-to-market-search")
    },

    subscribe: function() {
      return this.click(".subscribe")
    },

    filePath: function() {
      return this.read('.file-path');
    },

    activeTab: function() {
      return this.find('.tab.active').then(function (elm) {
        return elm.getText();
      });
    },

    startDate: function () {
      return this.read('.start-date');
    }
  });
};
