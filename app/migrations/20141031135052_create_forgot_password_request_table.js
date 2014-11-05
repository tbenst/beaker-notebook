'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('forgot_password_requests', function(table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.string('request_id');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('forgot_password_requests');
};
