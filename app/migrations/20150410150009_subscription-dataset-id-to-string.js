'use strict';

exports.up = function(knex, Promise) {
  return knex.raw('alter table data_sets_users alter column data_set_id type text');
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table data_sets_users alter column data_set_id type integer using data_set_id::numeric');
};
