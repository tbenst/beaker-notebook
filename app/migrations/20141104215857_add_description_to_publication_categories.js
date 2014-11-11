'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('publication_categories', function(table) {
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('publication_categories', function(table) {
    table.dropColumn('description');
  });
};
