exports.up = function(knex, Promise) {
  return knex.raw('alter table projects alter column description type text');
};

exports.down = function(knex, Promise) {
  return knex.raw('alter table projects alter column description type varchar(255)');
};

