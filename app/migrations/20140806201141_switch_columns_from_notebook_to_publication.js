'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('notebooks', function(table) {
      table.dropColumn('description');
      table.dropColumn('category_id');
    }),
    knex.schema.table('publications', function(table) {
      table.text('description');
      table.integer('category_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('notebooks', function(table) {
      table.text('description');
      table.integer('category_id');
    }),
    knex.schema.table('publications', function(table) {
      table.dropColumn('description');
      table.dropColumn('category_id');
    })
  ]);
};
