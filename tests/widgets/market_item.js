module.exports = function() {
  return this.Widgets.MarketItem = this.Widget.extend({
    root: '.marketplace',

    description: function() {
      return this.read('.market-description');
    },

    vendors: function() {
      return this.read('.vendor').then(function(format){
        return format.toLowerCase();
      });
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

    goBackToSearch: function() {
      return this.click(".return-to-market-search")
    },

    subscribe: function() {
      return this.click(".subscribe")
    },

    filePath: function() {
      return this.read('.file-path');
    }
  });
};
