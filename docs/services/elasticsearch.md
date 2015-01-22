Elasticsearch Service
======

Elasticsearch is responsible for storing __Categories__ and __DataSets__.

__DataSets__ belong to __Categories__.
__Categories__ belong to other __Categories__.
The top most __Category__ is known as a __Catalog__


###  Dependent services

Currently, two Bunsen services connect to Elasticsearch.

* In "app" the Node code connects via
[elasticsearch-js](https://github.com/elasticsearch/elasticsearch-js).
* In "data\_catalog\_indexer", the Clojure code connects via [elastisch](https://github.com/clojurewerkz/elastisch)

Both of these are simple wrappers around Elasticsearch's REST API.


### Ad-hoc queries and Troubleshooting

While you are working on debugging and constructing elasticsearch queries your best option is to use a combination of `curl` and `jq` within vagrant.

> You will need to install jq via `apt-get install jq` inside of vagrant

For example:

To look up all records with an index of `catalog_0.2`

`$ curl 0.0.0.0:9200/catalog_0.2/_search/ | jq .`

You can further contruct your query via a request body.

`$ curl 0.0.0.0:9200/catalog_0.2/_search/ -d '{"query":{"term": {"path": "0.2.2"}}}' | jq .`

For more documentation checkout http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/search-request-body.html

