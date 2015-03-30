'use strict';

exports.up = function(knex, Promise) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS citext')
    .then(function() {
      return knex.raw('alter table users alter column email type citext');
    })
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table users alter column email type varchar(255)');
};

