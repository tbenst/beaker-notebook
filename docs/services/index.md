# Application-level Bunsen Services

* api
* beaker
* data\_catalog\_indexer
* elasticsearch
* postgres
* provisioner
* reimann
* tests
* web

## Dependencies

You can learn which services depend on which other service by examining the
environment configuration files in Bunsen's top-level "config/" directory.
Marathon needs to know these dependencies in order to decide which ones to
launch first.  Thus, the Marathon payload described in these config files
includes a "dependencies" array for each service that has dependencies.
