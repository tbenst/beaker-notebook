# Provisioner Service

A clojure web service that starts beaker instances using Mesos (via Marathon).

## Dependencies

* [Beaker] Provisioner is responsible for instantiating Beakers.
* Marathon is what provisioner talks to in order to provide a Beaker.

## Dependent services

* API contacts the Provisioner when it knows an end-user needs a Beaker.

## Technical tips

See [here](../../provisioner/README.md)

