'use strict';

exports.up = function(knex, Promise) {
  return knex.raw("update categories set metadata = '{\"title\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"description\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"remoteFile\": { \"type\": \"string\"}, \"rows\": {\"type\": \"integer\"}, \"format\": {\"type\": \"string\", \"indexes\": [\"filter\"]}, \"updateFrequency\": {\"type\": \"string\"}, \"startDate\": {\"type\": \"date\"}, \"numColumns\": {\"type\": \"integer\"}, \"csvPreview\": { \"type\": \"string\"}, \"vendor\": { \"type\": \"string\", \"indexes\": [\"filter\"]}, \"tags\": { \"type\": \"string\", \"indexes\": [\"filter\"]}, \"released\": {\"type\": \"date\"}, \"lastUpdated\": {\"type\": \"date\"}}'::json where path in ('0.1', '0.2')");
};

exports.down = function(knex, Promise) {
  return knex.raw("update categories set metadata = '{\"title\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"description\": {\"type\": \"string\", \"indexes\": [\"text\"]}, \"remoteFile\": { \"type\": \"string\"}, \"rows\": {\"type\": \"integer\"}, \"format\": {\"type\": \"string\", \"indexes\": [\"filter\"]}, \"updateFrequency\": {\"type\": \"string\"}, \"startDate\": {\"type\": \"date\"}, \"numColumns\": {\"type\": \"integer\"}, \"csvPreview\": { \"type\": \"string\"}, \"vendor\": { \"type\": \"string\", \"indexes\": [\"filter\"]}, \"tags\": { \"type\": \"string\", \"indexes\": [\"filter\"]}}'::json where path in ('0.1', '0.2')");
};
