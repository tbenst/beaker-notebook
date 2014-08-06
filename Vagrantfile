# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box     = "mojo-debian"
  config.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-vagrant-virtualbox-1400543559.box"

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-vagrant-vmware-1400544616.box"
  end

  config.vm.provider :virtualbox do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end


  config.vm.define "dev", primary: true do |d|
    d.vm.hostname = "dev.local.withmojo.com"

    d.vm.network :forwarded_port, guest: 4243, host: 4243, auto_correct: true # docker
    d.vm.network :forwarded_port, guest: 5432, host: 5432, auto_correct: true # postgres
    d.vm.network :forwarded_port, guest: 5431, host: 5431, auto_correct: true # postgres for tests
    d.vm.network :forwarded_port, guest: 3000, host: 3000, auto_correct: true # app
    d.vm.network :forwarded_port, guest: 2999, host: 2999, auto_correct: true # app for tests
    d.vm.network :forwarded_port, guest: 8080, host: 8080, auto_correct: true # web
    d.vm.network :forwarded_port, guest: 8079, host: 8079, auto_correct: true # web for tests
    d.vm.network :forwarded_port, guest: 8801, host: 8801, auto_correct: true # beaker
    d.vm.network :forwarded_port, guest: 8800, host: 8800, auto_correct: true # test beaker
    d.vm.network :forwarded_port, guest: 3001, host: 3001, auto_correct: true # provisioner

    d.vm.provision :ansible do |a|
      a.playbook   = "ansible/dev.yml"
      a.extra_vars = {
        docker_options: "--restart=false -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243"
      }
    end
  end
end
