module.exports = {
  up: function(knex, Promise) {
    return knex.schema.table('Users', function (table) {
      table.text("recentNotebooks").defaultTo("[]")
    });
  },

  down: function(knex, Promise) {
    return knex.schema.table('Users', function (table) {
      table.dropColumn("recentNotebooks");
    });
  }
}
