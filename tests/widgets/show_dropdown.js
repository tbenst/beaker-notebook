module.exports = function() {
  return this.Widgets.ShowDropdown = this.Widget.extend({
    show: function(parentElement) {
      dropdownSelectorShow = "document.querySelector('"+parentElement+" .drop-down-child').style.display='block'";
      return this.driver.executeScript(dropdownSelectorShow);
    }
  });
}
