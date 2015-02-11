var path = require('path');

module.exports = function() {
  this.When(/^I view my files$/, function() {
    return new this.Widgets.FileListLauncher().open()
  });

  this.Then(/^I should see my file list$/, function() {
    return new this.Widgets.FileList().isPresent();
  });

  this.Given(/^my scratchspace is empty$/, function() {
    return this.driver.executeScript(
      'return angular.element(document).injector().get("$http").delete("/api/auth-seed/empty-scratchspace");'
    )
  });

  this.When(/^I upload a file$/, function() {
    return new this.Widgets.FileUploader()
    .upload(path.resolve("fixtures/", "doge.jpg"));
  });

  this.Then(/^I should see (\d+) uploaded file(s*)$/, function(fileCount) {
    return new this.Widgets.FileList().length()
    .should.eventually.eql(parseInt(fileCount));
  });

  this.Then(/^I should see the uploaded file is (.*)$/, function (size) {
    var fileList = new this.Widgets.FileList();
    return fileList.readAt({index: 0, selector: ".size"}).should.eventually.eql(size);
  });
}
