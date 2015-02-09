module.exports = function() {
  return this.Widgets.UserRating = this.Widget.List.extend({
    itemSelector: 'a',

    clickStar: function(index) {
      return this.clickAt(index - 1);
    },

    currentRating: function() {
      return this.filter(function(item) {
        return item.find()
        .then(function(elm) {
          return elm.getAttribute('class');
        })
        .then(function(className) {
          return className.match('rating-highlight');
        });
      });
    }
  });
}
