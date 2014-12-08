Elastic Search and Bunsen
======

Elastic search is responsible for storing __Categories__ and __DataSets__.

For us

__DataSets__ belong to __Categories__.
__Categories__ belong to other __Categories__.
The top most __Category__ is known as a __Catalog__


To interface with elastic search we use [https://github.com/elasticsearch/elasticsearch-js](https://github.com/elasticsearch/elasticsearch-js), which is just a wrapper that sits on top of their restful api.

### Dev Flow

While you are working on debugging and constructing elasticsearch queries your best option is to use a combination of `curl` and `jq` within vagrant.

> You will need to install jq via `apt-get install jq` inside of vagrant

For example:

To look up all records with an index of `catalog_0.2`

`$ curl 0.0.0.0:9200/catalog_0.2/_search/ | jq .`

You can further contruct your query via a request body.

`$ curl 0.0.0.0:9200/catalog_0.2/_search/ -d '{"query":{"term": {"path": "0.2.2"}}}' | jq .`

For more documentation checkout http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-request-body.html

