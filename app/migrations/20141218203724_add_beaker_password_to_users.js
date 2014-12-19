'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('beaker_password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('beaker_password');
  });
};
