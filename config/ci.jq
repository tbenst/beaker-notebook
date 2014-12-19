{
  "jobs": [
    {
      "id": "test",
      "ports": [
        "\($VNC_PORT):5900"
      ],
      "container": {
        "image": "quay.io/mojotech/bunsen-tests:\($TAG)"
      },
      "env": {
        "ENABLE_COVERAGE": true,
        "BUNSEN_HOSTNAME": "\($HOST)"
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
    }
  ],
  "group": {
    "id": "/\($HOST)",
    "apps": [
      {
        "id": "/\($HOST)/postgres",
        "args": [
          "--database=bunsen_test"
        ],
        "cpus": 0.5,
        "mem": 512,
        "ports": [
          "\($POSTGRES_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-postgres:\($TAG)",
            "portMappings": [
              {
                "containerPort": 5432,
                "servicePort": "\($POSTGRES_PORT)",
                "protocol": "tcp"
              }
            ]
          }
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
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      },
      {
        "id": "/\($HOST)/elasticsearch",
        "cmd": "",
        "cpus":0.5,
        "mem": 512,
        "ports": [
          "\($ELASTICSEARCH_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-elasticsearch:\($TAG)" ,
            "portMappings": [
              {
                "containerPort": 9200,
                "servicePort": "\($ELASTICSEARCH_PORT)",
                "protocol": "tcp"
              }
            ]
          }
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
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      },
      {
        "id": "/\($HOST)/provisioner",
        "cmd": "",
        "cpus": 0.5,
        "mem": 512,
        "ports": [
          "\($PROVISIONER_PORT)"
        ],
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-provisioner:\($TAG)",
            "portMappings": [
              {
                "containerPort": 3001,
                "servicePort": "\($PROVISIONER_PORT)",
                "protocol": "tcp"
              }
            ]
          }
        },
        "env": {
          "SERVER_PORT": 3001,
          "BAMBOO_URL": "http://172.17.42.1:8000",
          "MARATHON_URL": "http://172.17.42.1:8080",
          "APP_GROUP": "/\($HOST)/beaker",
          "APP_TEMPLATE": {
            "cpus": 1,
            "mem": 1024,
            "instances": 1,
            "container": {
              "type": "DOCKER",
              "docker": {
                "image": "quay.io/mojotech/bunsen-beaker:\($TAG)",
                "network": "BRIDGE",
                "portMappings": [
                  {
                    "containerPort": 8801
                  }
                ]
              }
            },
            "uris": [
              "file:///etc/.dockercfg"
            ]
          } | tojson,
          "SERVICE_HOST": "\($HOST)",
          "SERVICE_PATH": "/beaker"
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/api/v1/status",
            "gracePeriodSeconds": 10,
            "intervalSeconds": 10,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      },
      {
        "id": "/\($HOST)/api",
        "args": [
          "--migrate"
        ],
        "cpus": 0.5,
        "mem": 512,
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-api:\($TAG)",
            "portMappings": [
              {
                "containerPort": 3000,
                "protocol": "tcp"
              }
            ]
          }
        },
        "env": {
          "NODE_ENV": "test",
          "ALLOW_SEED": true,
          "ALLOW_CROSS_ORIGIN": true,
          "ENABLE_COVERAGE": true,
          "DB_PORT_5432_TCP_ADDR": "172.17.42.1",
          "DB_PORT_5432_TCP_PORT": "\($POSTGRES_PORT)",
          "EXTERNAL_DB_NAME": "bunsen_test",
          "HOSTNAME": "\($HOST)",
          "ELASTICSEARCH_PORT_9200_TCP_ADDR": "172.17.42.1",
          "ELASTICSEARCH_PORT_9200_TCP_PORT": "\($ELASTICSEARCH_PORT)",
          "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
          "PROVISIONER_PORT_3001_TCP_PORT": "\($PROVISIONER_PORT)",
          "SCRATCH_SPACE_ROOT": "/mnt/lustre/bunsen-ci/beaker"
        },
        "healthChecks": [
          {
            "protocol": "HTTP",
            "path": "/api/status",
            "gracePeriodSeconds": 60,
            "intervalSeconds": 30,
            "portIndex": 0,
            "timeoutSeconds": 5,
            "maxConsecutiveFailures": 3
          }
        ],
        "upgradeStrategy": {
          "minimumHealthCapacity": 0
        },
        "uris": [
          "file:///etc/.dockercfg"
        ],
        "dependencies": [
          "../postgres",
          "../provisioner",
          "../elasticsearch"
        ]
      },
      {
        "id": "/\($HOST)/web",
        "cpus": 0.5,
        "mem": 512,
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-web:\($TAG)",
            "portMappings": [
              {
                "containerPort": 8080,
                "protocol": "tcp"
              }
            ]
          }
        },
        "env": {
          "ENABLE_COVERAGE": true
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
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      }
    ]
  }
}
