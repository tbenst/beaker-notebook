'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('categories', function(table) {
    table.string('base_path');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('categories', function(table) {
    table.dropColumn('base_path');
  });
};
