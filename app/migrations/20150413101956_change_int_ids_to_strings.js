'use strict';

exports.up = function(knex, Promise) {
  return knex.raw('alter table data_sets_users alter column user_id type varchar(255)')
  .then(function() {
    return knex.raw('alter table notebooks alter column user_id type varchar(255)');
  })
  .then(function() {
    return knex.raw('alter table projects alter column owner_id type varchar(255)');
  })
  .then(function() {
    return knex.raw('alter table publications alter column user_id type varchar(255)');
  })
  .then(function() {
    return knex.raw('alter table ratings alter column user_id type varchar(255)');
  });
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table data_sets_users alter column user_id type integer')
  .then(function() {
    return knex.raw('alter table notebooks alter column user_id type integer');
  })
  .then(function() {
    return knex.raw('alter table projects alter column owner_id type integer');
  })
  .then(function() {
    return knex.raw('alter table publications alter column user_id type integer');
  })
  .then(function() {
    return knex.raw('alter table ratings alter column user_id type integer');
  });
};
