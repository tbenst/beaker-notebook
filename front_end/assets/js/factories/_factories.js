;(function(angular, app) {

  var factories = [
    'CategoriesFactory',
    'PublicationCategoriesFactory',
    'DataSetsFactory',
    'SubscriptionsFactory',
    'PublicationsFactory',
    'NotebooksFactory',
    'ProjectsFactory',
  ]

  // Build a function defining the master factory:
  // function (NotebooksFactory, ProjectsFactory, ...) {
  //   this.Notebooks = NotebooksFactory;
  //   this.Projects = ProjectsFactory;
  //   // ...
  //   return this;
  // }
  var src = _.map(factories, function(f) {
    return 'this.' + f.replace(/Factory$/, '') + ' = ' + f + ';';
  }).join('\n') + '\nreturn this;'
  var AllFactories = new Function(factories.join(','), src);

  // Inject all factories
  AllFactories.$inject = factories;

  // Create the master factory
  app.factory('Factories', AllFactories);
})(angular, window.bunsen);
