# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box     = "mojo-debian-7.5-3.14-0.5.3"
  config.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-7.5-3.14-0.5.3-virtualbox.box"

  config.vm.provider :vmware_fusion do |v, override|
    override.vm.box_url = "http://mojo-boxes.s3.amazonaws.com/mojo-debian-7.5-3.14-0.5.3-vmware.box"
  end

  config.vm.network "private_network", ip: "10.10.10.10"

  config.vm.define "dev", primary: true do |d|
    d.vm.hostname = "dev.local.withmojo.com"

    d.vm.network :forwarded_port, guest: 80, host: 8888, auto_correct: true
    d.vm.network :forwarded_port, guest: 4243, host: 4243, auto_correct: true # docker
    d.vm.network :forwarded_port, guest: 7777, host: 7777, auto_correct: true # dev gateway proxy
    d.vm.network :forwarded_port, guest: 7778, host: 7778, auto_correct: true # test gateway proxy

    d.vm.provision :ansible do |a|
      a.playbook   = "ansible/dev.yml"
      a.extra_vars = {
        apt_config_files: [
          "config/apt/preferences",
          "config/apt/sources.list"
        ],
        sudoers_config_file: "config/sudoers",
        docker_release: "local",
        docker_options: "--restart=false -H unix:///var/run/docker.sock -H tcp://0.0.0.0:4243 --bip=172.17.42.1/16",
        zookeeper_config_files: [
          "config/zookeeper/myid",
          "config/zookeeper/zoo.cfg"
        ],
        mesos_common_services: [
          "marathon",
          "mesos-slave",
          "mesos-master"
        ],
        mesos_common_config: {
          zk: "zk://localhost:2181/mesos"
        },
        mesos_master_config: {
          work_dir: "/var/lib/mesos",
          quorum: 1
        },
        mesos_slave_config: {
          containerizers: "docker,mesos",
          executor_registration_timeout: "5mins"
        },
        marathon_config: {
          event_subscriber: "http_callback",
          task_launch_timeout: 360000
        },
        bamboo_config_files: [
          "config/bamboo/bamboo.json",
          "config/bamboo/haproxy_template.cfg.j2"
        ]
      }
    end
  end
end
