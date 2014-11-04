module.exports = function() {
  return this.Widgets.LandingPage = this.Widget.extend({
    root: '.landing',

    welcomeMessage: function() {
      return this.find('.welcome');
    }
  })
}
