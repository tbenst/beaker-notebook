module.exports = function() {
  return this.Widgets.TabList = this.Widget.List.extend({
    root: '.tabs',

    clickTab: function(tab) {
      return this.driver.findElement(Driver.By.xpath('//*[normalize-space(text())=normalize-space("' + tab + '")]')).then(function(li) {
        return li.click();
      });
    }
  });
}
