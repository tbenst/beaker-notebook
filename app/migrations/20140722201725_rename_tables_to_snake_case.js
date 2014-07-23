module.exports = {
  up: function(knex, Promise) {
    return Promise.all([
      knex.schema.renameTable("Categories", "categories"),
      knex.schema.renameTable("DataPreviews", "data_previews"),
      knex.schema.renameTable("DataSets", "data_sets"),
      knex.schema.renameTable("DataSetsCategories", "data_sets_categories"),
      knex.schema.renameTable("DataSetsDataPreviews", "data_sets_data_previews"),
      knex.schema.renameTable("DataSetsDataTags", "data_sets_data_tags"),
      knex.schema.renameTable("DataSetsUsers", "data_sets_users"),
      knex.schema.renameTable("DataTags", "data_tags"),
      knex.schema.renameTable("Notebooks", "notebooks"),
      knex.schema.renameTable("Projects", "projects"),
      knex.schema.renameTable("Users", "users"),
      knex.schema.renameTable("Vendors", "vendors")
    ]);
  },

  down: function(knex, Promise) {
    return Promise.all([
      knex.schema.renameTable("categories", "Categories"),
      knex.schema.renameTable("data_previews", "DataPreviews"),
      knex.schema.renameTable("data_sets", "DataSets"),
      knex.schema.renameTable("data_sets_categories", "DataSetsCategories"),
      knex.schema.renameTable("data_sets_data_previews","DataSetsDataPreviews"),
      knex.schema.renameTable("data_sets_data_tags", "DataSetsDataTags"),
      knex.schema.renameTable("data_sets_users", "DataSetsUsers"),
      knex.schema.renameTable("data_tags", "DataTags"),
      knex.schema.renameTable("notebooks", "Notebooks"),
      knex.schema.renameTable("projects", "Projects"),
      knex.schema.renameTable("users", "Users"),
      knex.schema.renameTable("vendors", "Vendors")
    ]);
  }
}
