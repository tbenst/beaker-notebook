
exports.up = function(knex, Promise) {
  return knex.schema.table("DataSets", function(table) {
    table.dropColumn('lastUpdated');
  })
  .then(function() {
    return knex.raw('ALTER TABLE "DataSets" ADD COLUMN "lastUpdated" TIMESTAMP WITH TIME ZONE DEFAULT now();')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("DataSets", function(table) {
    table.dropColumn('lastUpdated');
    table.dateTime("lastUpdated");
  })
};
