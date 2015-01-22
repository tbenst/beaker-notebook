# Bunsen Services

* Bamboo
* Docker
* [API](api.md)
* [Beaker](beaker.md)
* [Data Catalog Indexer](data\_catalog\_indexer.md)
* [Elasticsearch](elasticsearch.md)
* Marathon
* Mesos
* [Postgres](postgres.md)
* [Provisioner](provisioner.md)
* Reimann
* [Tests](tests.md)
* Web

## Dependencies

You can get some information about which application-level services depend on
which other service by examining the environment configuration files in Bunsen's
top-level "config/" directory.  Marathon needs to know these dependencies in
order to decide which ones to launch first.  Thus, the Marathon payload
described in these config files includes a "dependencies" array for each service
that has dependencies.

There are other important dependencies (sometimes conceptual) that aren't
specified there though; a brief explanation of the nature of dependencies and
dependent services should be available in each services' page (linked to
above).
