'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('job_title');
    table.string('company');
    table.text('bio');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('job_title');
    table.dropColumn('company');
    table.dropColumn('bio');
  });
};
