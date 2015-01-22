#### Bunsen Project Dependencies

Listed Below Are the requirements to run the bunsen project on your system.

* [Vagrant](https://www.vagrantup.com/)
* [Ansible](http://docs.ansible.com/intro_installation.html)
* [Virtual Box](https://www.virtualbox.org/)

After done installing, ensure you configure your local ssh to enable To enable
GSSAPI (Kerberos)

* https://github.com/mojotech/cloud#configuring-local-ssh

## Setting up Vagrant with Virtual Box

To prevent slow uploading when building images you must enable a `virtio-net` adapter for your given VM.

<img src="virtual-box-network.png" width="400px">
