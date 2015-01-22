{
  "jobs": [
    {
      "id": "test",
      "ports": [
        "\($VNC_PORT):5900"
      ],
      "container": {
        "image": "tests:\($TAG)"
      },
      "env": {
        "BUNSEN_HOSTNAME": "\($HOST)"
      }
    },
    {
      "id": "seed",
      "container": {
        "image": "api:\($TAG)"
      },
      "args": [
        "--migrate",
        "--seed"
      ],
      "env": {
        "ALLOW_SEED": true,
        "NODE_ENV": "development",
        "DB_PORT_5432_TCP_ADDR": "172.17.42.1",
        "DB_PORT_5432_TCP_PORT": "\($POSTGRES_PORT)",
        "ELASTICSEARCH_PORT_9200_TCP_ADDR": "172.17.42.1",
        "ELASTICSEARCH_PORT_9200_TCP_PORT": "\($ELASTICSEARCH_PORT)",
        "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
        "PROVISIONER_PORT_3001_TCP_PORT": "\($PROVISIONER_PORT)",
        "EXTERNAL_DB_NAME": "bunsen_dev"
      }
    },
    {
      "id": "index",
      "container": {
        "image": "api:\($TAG)"
      },
      "args": [
        "--index"
      ],
      "env": {
        "ALLOW_SEED": true,
        "NODE_ENV": "development",
        "DB_PORT_5432_TCP_ADDR": "172.17.42.1",
        "DB_PORT_5432_TCP_PORT": "\($POSTGRES_PORT)",
        "ELASTICSEARCH_PORT_9200_TCP_ADDR": "172.17.42.1",
        "ELASTICSEARCH_PORT_9200_TCP_PORT": "\($ELASTICSEARCH_PORT)",
        "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
        "PROVISIONER_PORT_3001_TCP_PORT": "\($PROVISIONER_PORT)",
        "EXTERNAL_DB_NAME": "bunsen_dev"
      }
    }
  ],
  "services": [
    {
      "id": "/\($HOST)/web",
      "acl": "{ hdr_dom(host) -i \($HOST) } !{ path_beg -i /api } !{ path_beg -i /beaker }"
    },
    {
      "id": "/\($HOST)/api",
      "acl": "{ hdr_dom(host) -i \($HOST) } { path_beg -i /api }"
    },
    {
      "id": "/\($HOST)/riemann",
      "acl": "{ hdr_dom(host) -i \($HOST) } { path_beg -i /events }"
    }
  ],
  "group": {
    "id": "/\($HOST)",
    "apps": [
      {
        "id": "/\($HOST)/postgres",
        "args": [
          "--database=bunsen_dev"
        ],
        "cpus": 0.1,
        "mem": 100,
        "ports": [
          "\($POSTGRES_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "postgres:\($TAG)",
            "portMappings": [
              {
                "containerPort": 5432,
                "servicePort": "\($POSTGRES_PORT)",
                "protocol": "tcp"
              }
            ]
          },
          "volumes": [
            {
              "hostPath": "/var/bunsen/postgres",
              "containerPath": "/var/lib/postgresql/9.3/main",
              "mode": "RW"
            }
          ]
        },
        "healthChecks": [
          {
            "protocol": "TCP",
            "path": ".",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        }
      },
      {
        "id": "/\($HOST)/elasticsearch",
        "cmd": "",
        "cpus": 0.1,
        "mem": 100,
        "ports": [
          "\($ELASTICSEARCH_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "elasticsearch:\($TAG)" ,
            "portMappings": [
              {
                "containerPort": 9200,
                "servicePort": "\($ELASTICSEARCH_PORT)",
                "protocol": "tcp"
              }
            ]
          },
          "volumes": [
            {
              "hostPath": "/var/bunsen/elasticsearch",
              "containerPath": "/var/elasticsearch/data",
              "mode": "RW"
            }
          ]
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/_status",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        }
      },
      {
        "id": "/\($HOST)/provisioner",
        "cmd": "",
        "cpus": 0.1,
        "mem": 100,
        "ports": [
          "\($PROVISIONER_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "provisioner:\($TAG)",
            "portMappings": [
              {
                "containerPort": 3001,
                "servicePort": "\($PROVISIONER_PORT)",
                "protocol": "tcp"
              }
            ]
          },
          "volumes": [
            {
              "hostPath": "/vagrant/provisioner",
              "containerPath": "/opt/provisioner",
              "mode": "RW"
            }
          ]
        },
        "env": {
          "SERVER_PORT": 3001,
          "BAMBOO_URL": "http://172.17.42.1:8000",
          "MARATHON_URL": "http://172.17.42.1:8080",
          "APP_GROUP": "/\($HOST)/beaker",
          "APP_TEMPLATE": {
            "container": {
              "type": "DOCKER",
              "docker": {
                "image": "beaker:\($TAG)",
                "network": "BRIDGE",
                "portMappings": [
                  {
                    "containerPort": 8801
                  }
                ]
              }
            },
            "cpus": 0.1,
            "mem": 100,
            "instances": 1
          } | tojson,
          "SERVICE_HOST": "\($HOST)",
          "SERVICE_PATH": "/beaker"
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/api/v1/status",
            "gracePeriodSeconds": 60,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 5
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        }
      },
      {
        "id": "/\($HOST)/api",
        "args": [
          "--migrate",
          "--watch"
        ],
        "cpus": 0.1,
        "mem": 100,
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "api:\($TAG)",
            "portMappings": [
              {
                "containerPort": 3000,
                "protocol": "tcp"
              },
              {
                "containerPort": 8080
              }
            ]
          },
          "volumes": [
            {
              "hostPath": "/vagrant/app",
              "containerPath": "/var/app",
              "mode": "RW"
            },
            {
              "hostPath": "/mnt/lustre/bunsen-dev/beaker",
              "containerPath": "/mnt/scratch",
              "mode": "RW"
            }
          ]
        },
        "env": {
          "NODE_ENV": "development",
          "ALLOW_SEED": true,
          "ALLOW_CROSS_ORIGIN": true,
          "DB_PORT_5432_TCP_ADDR": "172.17.42.1",
          "DB_PORT_5432_TCP_PORT": "\($POSTGRES_PORT)",
          "MANDRILL_PASSWORD":"-QG6MBSWNPR7sPwRali8Jg",
          "MANDRILL_USER":"ops+mandrill@mojotech.com",
          "MAIL_FROM": "ops+bunsen@mojotech.com",
          "EXTERNAL_DB_NAME": "bunsen_dev",
          "HOSTNAME": "\($HOST)",
          "ELASTICSEARCH_PORT_9200_TCP_ADDR": "172.17.42.1",
          "ELASTICSEARCH_PORT_9200_TCP_PORT": "\($ELASTICSEARCH_PORT)",
          "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
          "PROVISIONER_PORT_3001_TCP_PORT": "\($PROVISIONER_PORT)",
          "SCRATCH_SPACE_ROOT": "/mnt/lustre/bunsen-dev/beaker"
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/api/status",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 10
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        },
        "dependencies": [
          "../postgres",
          "../provisioner",
          "../elasticsearch"
        ]
      },
      {
        "id": "/\($HOST)/web",
        "args": [
          "--watch"
        ],
        "cpus": 0.1,
        "mem": 100,
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "web:\($TAG)",
            "portMappings": [
              {
                "containerPort": 8080,
                "protocol": "tcp"
              }
            ]
          },
          "volumes": [
            {
              "hostPath": "/vagrant/front_end",
              "containerPath": "/var/www",
              "mode": "RW"
            }
          ]
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        }
      },
      {
        "id": "/\($HOST)/riemann",
        "cmd": "",
        "cpus": 0.1,
        "mem": 100,
        "ports": [
          "\($RIEMANN_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "riemann:\($TAG)",
            "portMappings": [
              {
                "containerPort": 5556,
                "servicePort": 5556
              }
            ]
          }
        },
        "env": {
          "LIBRATO_USER": "chris@mojotech.com",
          "LIBRATO_TOKEN": "f7dbfefb544dbe35dc0812590ff6eaeb0d8eda87c53e707b3d60a68f7f0f451b"
        },
        "healthChecks": [
          {
            "protocol": "TCP",
            "path": ".",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0.5
        }
      }
    ]
  }
}
