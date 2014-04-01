module.exports = {
  up: function(knex) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS ltree')
            .then(function() {
              return knex.schema.createTable("Categories", function(table) {
                table.increments('id').primary();
                table.string("name");
                table.timestamps();
              });
            })
            .then(function() {
              return knex.raw('ALTER TABLE "Categories" ADD path LTREE')
            })
            .then(function() {
              return knex.raw("CREATE INDEX \"CategoriesPathIndex\" ON \"Categories\" USING gist (path);")
            });
  },

  down: function(knex) {
    return knex.schema.dropTable('Categories');
  }
};
