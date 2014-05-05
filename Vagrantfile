# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box     = "mojo-debian"
  config.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-vagrant-virtualbox-1399125106.box"

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-vagrant-vmware-1399125106.box"
  end

  config.vm.define "dev", primary: true do |d|
    d.vm.hostname = "dev.local.withmojo.com"

    d.vm.network :forwarded_port, guest: 4243, host: 4243, auto_correct: true # docker

    d.vm.provision :ansible do |a|
      a.playbook   = "ansible/dev.yml"
    end
  end
end
