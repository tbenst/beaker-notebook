'use strict';

exports.up = function(knex, Promise) {
  return knex("data_sets_users").truncate().then(function() {
    return knex.schema.table('data_sets_users', function(table) {
      table.string('index_name');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('data_sets_users', function(table) {
    table.dropColumn('index_name');
  });
};
