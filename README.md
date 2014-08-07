bunsen
======

Big data for fun and profit.

## Setting up Vagrant with Virtual Box
To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="docs/virtual-box-network.png" width="400px">

## To run the application locally
  * Ensure that your vagrant is running and provisioned.
  * To set up your development database, run "fig run db -c -f --database=bunsenDevelopment"
  * To start Bunsen, run "fig up" in a terminal.  Keep this open to observe the output of various services.
  * Browse to http://localhost:7777/
