;(function(app) {
  var containerClass = 'bunsen-dropdown-toggle';
  var containerSelector = '.' + containerClass;

  app.directive('toggleMenu', function() {
    angular.element('html').on('click.hideMenus', function(e) {
      if (!angular.element(containerSelector).length) {
        return;
      }

      if (!angular.element(e.target).hasClass(containerClass) &&
          angular.element(e.target).parents(containerSelector).length < 1) {
        angular.element(containerSelector).removeClass('active');
      }
    });

    return function(scope, element) {
      element.on('click',  function() {
        if (element.hasClass(containerClass)) {
          element.toggleClass('active');
        }
      });
    };
  });
})(window.bunsen);
