module.exports = function() {
  return this.Widgets.Dropdown = this.Widget.extend({
    show: function(parentElement) {
      dropdownSelectorShow = "document.querySelector('"+parentElement+" .dropdown').style.display='block'";
      return this.driver.executeScript(dropdownSelectorShow);
    }
  });
}
