'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function(table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('score');
    table.string('rateable_id');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
