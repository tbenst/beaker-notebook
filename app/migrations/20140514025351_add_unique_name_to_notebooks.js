module.exports = {
  up: function(knex) {
    return knex.raw('ALTER TABLE "Notebooks" ADD CONSTRAINT unique_name UNIQUE ("projectId", name)');
  },

  down: function(knex) {
    return knex.raw('ALTER TABLE "Notebooks" REMOVE CONSTRAINT unique_name');
  }
};
