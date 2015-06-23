;(function(app) {
  app.service('NotebookMenuService', [
    'RenameNotebook',
    'bkMenuPluginManager',
    'bkHelper',
    'Notebooks',
    function(RenameNotebook, bkMenuPluginManager, bkHelper, Notebooks) {

      function menuContents($scope) {
        return [
          {
            parent: "Bunsen",
            id: "bunsen-menu",
            items: [
              {
                name: "Save",
                sortorder: 40,
                action: $scope.save,
                tooltip: "Save notebook",
                id: "save-menuitem"
              },
              {
                name: "Save as...",
                sortorder: 50,
                action: $scope.saveAs,
                tooltip: "Copy notebook to another name",
                id: "save-as-menuitem"
              },
              {
                name: "Rename...",
                sortorder: 60,
                action: function () {
                  RenameNotebook.openModal($scope, $scope.notebook.current);
                },
                tooltip: "Rename notebook",
                id: "rename-menuitem"
              },
              {
                name: "Close",
                sortorder: 70,
                action: function () {
                  Notebooks.closeNotebook($scope.notebook.current);
                },
                tooltip: "Close notebook",
                id: "close-menuitem"
              },
              {
                name: "Export",
                sortorder: 75,
                action: function() {
                  Notebooks.export($scope.notebook.current['public-id']);
                },
                tooltip: "Export notebook as file",
                id: "export-menuitem"
              },
              {
                name: function() {
                  return $scope.published ? "Update published" : "Publish";
                },
                sortorder: 77,
                action: function() {
                  $scope.openPublishModal();
                },
                tooltip: "Publish notebook",
                id: "publish-menuitem"
              },
              {
                name: 'Divider',
                sortorder: 80,
                action: function() {},
                tooltip: '',
                id: 'file-functions-divider',
                type: 'divider'
              },
              {
                name: "Edit mode",
                sortorder: 90,
                id: "edit-mode-menuitem"
              },
              {
                name: "View",
                sortorder: 100,
                id: "view-menuitem"
              },
              {
                name: "Run",
                sortorder: 110,
                id: "run-menuitem"
              }
            ]
          },
          {
            parent: "Bunsen",
            submenu: "Edit mode",
            id: "edit-mode-menuitem",
            items: [
              {
                name: "Normal",
                sortorder: 100,
                id: "normal-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "default";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("default");
                }
              },
              {
                name: "Vim",
                sortorder: 120,
                id: "vim-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "vim";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("vim");
                }
              },
              {
                name: "Emacs",
                sortorder: 110,
                id: "emacs-edit-mode-menuitem",
                isChecked: function () {
                  return bkHelper.getInputCellKeyMapMode() === "emacs";
                },
                action: function () {
                  bkHelper.setInputCellKeyMapMode("emacs");
                }
              }
            ]
          },
          {
            parent: "Bunsen",
            submenu: "View",
            id: "view-menuitem",
            items: [
              {
                name: "Show stdout/stderr",
                sortorder: 10,
                action: function () {
                  bkHelper.getBkNotebookViewModel().toggleShowOutput();
                },
                tooltip: "Show or hide the stdout and stderr.",
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  if (notebookViewModel) {
                    return notebookViewModel.isShowingOutput();
                  }
                },
                id: "stdout-stderr-menuitem"
              },
              {
                name: 'Collapse All Sections',
                sortorder: 20,
                action: bkHelper.collapseAllSections,
                id: "collapse-all-menuitem"
              },
              {
                name: 'Show Hierarchy',
                sortorder: 30,
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  return notebookViewModel.isHierarchyEnabled();
                },
                action: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  notebookViewModel.toggleHierarchyEnabled();
                },
                id: "show-hierarchy-menuitem"
              },
              {
                name: 'Advanced Mode',
                sortorder: 40,
                isChecked: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  return notebookViewModel.isAdvancedMode();
                },
                action: function() {
                  var notebookViewModel = bkHelper.getBkNotebookViewModel();
                  notebookViewModel.toggleAdvancedMode();
                  bkHelper.httpPost(bkHelper.serverUrl("beaker/rest/util/setUseAdvancedMode"), {
                    advancedmode: notebookViewModel.isAdvancedMode()
                  });
                },
                id: "advanced-mode-menuitem"
              },
              {
                name: "Lock",
                sortorder: 50,
                action: function () {
                  bkHelper.toggleNotebookLocked();
                },
                tooltip: "Lock notebook from further editing",
                isChecked: function () {
                  return bkHelper.isNotebookLocked();
                },
                id: "lock-menuitem"
              }
            ]
          },
          {
            parent: "Bunsen",
            submenu: "Run",
            id: "run-menuitem",
            items: [
              {
                name: "Language manager...",
                sortorder: 10,
                action: function () {
                  bkHelper.showLanguageManager();
                },
                tooltip: "Show available languages and edit their settings",
                id: "language-manager-menuitem"
              },
              {
                name: 'Delete all output cells',
                sortorder: 20,
                action: function () {
                  bkHelper.deleteAllOutputCells();
                },
                tooltip: 'Deletes all of the output cells.',
                id: "delete-all-menuitem"
              },
              {
                name: "Run all cells",
                sortorder: 30,
                action: function() {
                  bkHelper.evaluateRoot("root");
                },
                tooltip: "Run all cells",
                id: "run-all-cells-menuitem"
              }
            ]
          }
        ]
      }

      function existingBunsenMenu() {
        return _.chain(bkMenuPluginManager.getMenus()).values().findWhere(
          {classNames: 'bunsen-menu'}).value();
      }


      return {
        menuItems: function($scope) {
          if (existingBunsenMenu() === void(0)) {
            bkMenuPluginManager.attachMenus(menuContents($scope));
          }
          return existingBunsenMenu().items;
        }
      };
    }]);
})(window.bunsen);
