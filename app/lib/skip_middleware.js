var _ = require('lodash');

module.exports.init = function(app) {

  _.extend(app, {
    useMiddleware: function(context, middleware, options) {
      var _this = this;
      this.use(context[middleware]);
      _(options.except).each(function(e) {
        _this.skip(e, middleware)
      })
    },

    shouldSkip: function(route, middleware) {
      var key = _(this.skipMiddleware).keys().find(function(k) {
        var filter = new RegExp("^" + k + "(.*)")
        return route.match(k);
      })
      if (key) {
        return _.contains(this.skipMiddleware[key], middleware);
      }
    },

    skip: function(prefix, middleware) {
      this.skipMiddleware = this.skipMiddleware || {};
      this.skipMiddleware[prefix] = this.skipMiddleware[prefix] || [];
      this.skipMiddleware[prefix].push(middleware);
    }
  });

  return app;
};
