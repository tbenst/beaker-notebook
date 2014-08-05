module.exports = function() {
  return this.Widgets.Dropdown = this.Widget.extend({
    show: function(el) {
      var dropdownSelectorShow = "arguments[0].classList.add('expanded')";
      return this.driver.executeScript(dropdownSelectorShow, el);
    }
  });
}
