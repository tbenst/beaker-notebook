'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.integer('role');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('role');
  });
};
