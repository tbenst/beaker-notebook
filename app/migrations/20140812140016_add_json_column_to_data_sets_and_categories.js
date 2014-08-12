'use strict';

exports.up = function(knex, Promise) {
  return knex.raw('alter table data_sets add column metadata JSON').then(function () {
    return knex.raw('alter table categories add column metadata JSON')
  });
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table data_sets drop column metadata').then(function () {
    return knex.raw('alter table categories drop column metadata')
  });
};
