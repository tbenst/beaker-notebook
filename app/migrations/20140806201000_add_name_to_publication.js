'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('publications', function(table) {
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('publications', function(table) {
    table.dropColumn('name');
  });
};
