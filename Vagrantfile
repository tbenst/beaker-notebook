# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box     = "mojo-debian-7.5-3.14-0.5"
  config.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-7.5-3.14-0.5-virtualbox.box"

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-7.5-3.14-0.5-vmware.box"
  end

  config.vm.network "private_network", ip: "10.10.10.10"

  config.vm.define "dev", primary: true do |d|
    d.vm.hostname = "dev.local.withmojo.com"

    d.vm.network :forwarded_port, guest: 4243, host: 4243, auto_correct: true # docker
    d.vm.network :forwarded_port, guest: 7777, host: 7777, auto_correct: true # dev gateway proxy
    d.vm.network :forwarded_port, guest: 7778, host: 7778, auto_correct: true # test gateway proxy

    d.vm.provision :ansible do |a|
      a.playbook   = "ansible/dev.yml"
      a.extra_vars = {
        docker_options: "--restart=false -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243"
      }
    end
  end
end
