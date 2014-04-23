module.exports = function(app) {
  var OpenNotebooksController = app.Controllers.OpenNotebooksController;

  app.get("/api/open_notebooks", OpenNotebooksController.index);
  app.post("/api/open_notebooks", OpenNotebooksController.add);
  app.del("/api/open_notebooks", OpenNotebooksController.close);
};
