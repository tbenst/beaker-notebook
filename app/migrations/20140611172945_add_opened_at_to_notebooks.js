module.exports = {
  up: function(knex, Promise) {
    return knex.schema.table('Notebooks', function (table) {
      table.dateTime("openedAt");
    });
  },

  down: function(knex, Promise) {
    return knex.schema.table('Notebooks', function (table) {
      table.dropColumn("openedAt");
    });
  }
};
