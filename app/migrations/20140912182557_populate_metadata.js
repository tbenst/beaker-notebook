'use strict';

exports.up = function(knex, Promise) {
  return knex.raw("update data_sets set metadata=(select row_to_json(json_i_want) from (select d.title, d.description, d.format, d.rows, d.update_frequency as \"updateFrequency\", d.start_date as \"startDate\", d.remote_file as \"remoteFile\", d.num_columns as \"numColumns\", d.csv_preview as \"csvPreview\", (select vendors.name as vendor from vendors where vendors.id = data_sets.vendor_id ), (select array_agg(dts.name) as tags  from (select * from data_tags where data_tags.id in (select data_tag_id  from data_sets_data_tags dsdt where dsdt.data_set_id = data_sets.id)) as dts) from data_sets d where d.id = data_sets.id) json_i_want)")
  .then(function () {
    return knex.raw("update categories set path = ('0.2' || trim(leading '0' from (select path::text from categories c where c.id = categories.id)))::ltree where categories.path::text not in ('0','0.1','0.2','0.2.1','0.2.2','0.3','0.3.1','0.3.2','0.3.2.1','0.3.2.2','0.3.2.2.1','0.3.2.2.1.1','0.3.2.2.1.1.1','0.3.2.2.1.1.2')")
  })
  .then(function () {
    return knex.raw("update categories set path = ('0.1' || trim(leading '0' from (select path::text from categories c where c.id = categories.id)))::ltree where categories.path::text in ('0.1', '0.2', '0.2.1', '0.2.2', '0.3', '0.3.1', '0.3.2', '0.3.2.1', '0.3.2.2', '0.3.2.2.1','0.3.2.2.1.1','0.3.2.2.1.1.1','0.3.2.2.1.1.2')")
  })
  .then(function () {
    return knex.raw("insert into categories (name, path, metadata, created_at) values ('Quandl', '0.2', '{\"title\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"description\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"remoteFile\": { \"type\": \"string\"}, \"rows\": {\"type\": \"integer\"}, \"format\": {\"type\": \"string\", \"indexes\": [\"filter\"]}, \"updateFrequency\": {\"type\": \"string\"}, \"startDate\": {\"type\": \"date\"}, \"numColumns\": {\"type\": \"integer\"}, \"csvPreview\": { \"type\": \"string\"}, \"vendor\": { \"type\": \"string\", \"indexes\": [\"filter\"]}, \"tags\": { \"type\": \"string\", \"indexes\": [\"filter\"]}}'::json, current_timestamp)")
  })
  .then(function () {
    return knex.raw("insert into categories (name, path, metadata, created_at) values ('Misc', '0.1', '{\"title\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"description\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"remoteFile\": { \"type\": \"string\"}, \"rows\": {\"type\": \"integer\"}, \"format\": {\"type\": \"string\", \"indexes\": [\"filter\"]}, \"updateFrequency\": {\"type\": \"string\"}, \"startDate\": {\"type\": \"date\"}, \"numColumns\": {\"type\": \"integer\"}, \"csvPreview\": { \"type\": \"string\"}, \"vendor\": { \"type\": \"string\", \"indexes\": [\"filter\"]}, \"tags\": { \"type\": \"string\", \"indexes\": [\"filter\"]}}'::json, current_timestamp)")
  })
};

exports.down = function(knex, Promise) {
  return knex.raw("delete from categories where categories.name in ('Quandl', 'Misc')")
  .then(function () {
    return knex.raw("update categories set path = ('0' || trim(leading '0.1' from (select path::text from categories c where c.id = categories.id)))::ltree where categories.path::text in ('0.1.1','0.1.2','0.1.2.1','0.1.2.2','0.1.3','0.1.3.1','0.1.3.2','0.1.3.2.1','0.1.3.2.2','0.1.3.2.2.1','0.1.3.2.2.1.1','0.1.3.2.2.1.1.1','0.1.3.2.2.1.1.2')")
  })
  .then(function () {
    return knex.raw("update categories set path = ('0' || trim(leading '0.2' from (select path::text from categories c where c.id = categories.id)))::ltree where categories.path::text not in ('0', 0.2.1', '0.2.2', '0.2.2.1', '0.2.2.2', '0.2.3', '0.2.3.1', '0.2.3.2', '0.2.3.2.1', '0.2.3.2.2', '0.2.3.2.2.1','0.2.3.2.2.1.1','0.2.3.2.2.1.1.1','0.2.3.2.2.1.1.2')")
  })
};
