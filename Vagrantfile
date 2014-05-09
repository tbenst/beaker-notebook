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
    d.vm.network :forwarded_port, guest: 5432, host: 5432, auto_correct: true # postgres
    d.vm.network :forwarded_port, guest: 3000, host: 3000, auto_correct: true # app
    d.vm.network :forwarded_port, guest: 8080, host: 8080, auto_correct: true # web
    d.vm.network :forwarded_port, guest: 8801, host: 8801, auto_correct: true # beaker

    d.vm.provision :ansible do |a|
      a.playbook   = "ansible/dev.yml"
      a.extra_vars = {
        squid_blocked_websites: ".github.com",
        docker_options: "--restart=false -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243",
        docker_environment: "http_proxy=http://localhost:3128 https_proxy=http://localhost:3128"
      }
    end
  end
end
