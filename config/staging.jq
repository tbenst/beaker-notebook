{
  "jobs": [
    {
      "id": "index",
      "container": {
        "image": "api:\($TAG)"
      },
      "args": [
        "--index"
      ],
      "env": {
        "NODE_ENV": "staging",
        "ALLOW_CROSS_ORIGIN": true,
        "CIPHER_KEY": "Auj/QL_WU[xX64p+1TB81m6AD6wSCl",
        "EXTERNAL_DB_HOST": "bunsen-staging-db.cyuqbkun2hqi.us-east-1.rds.amazonaws.com",
        "EXTERNAL_DB_USER": "bunsen",
        "EXTERNAL_DB_PASS": "FSoq93X8KuyQN6333EV3411zf",
        "EXTERNAL_DB_NAME": "bunsen_staging",
        "HOSTNAME": "bunsen-staging.withmojo.com",
        "MANDRILL_PASSWORD":"-QG6MBSWNPR7sPwRali8Jg",
        "MANDRILL_USER":"ops+mandrill@mojotech.com",
        "MAIL_FROM": "ops+bunsen@mojotech.com",
        "ELASTICSEARCH_PORT_9200_TCP_ADDR": "bunsen:s6nFTwtbZP3wHh@172.17.42.1",
        "ELASTICSEARCH_PORT_9200_TCP_PORT": 9200,
        "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
        "PROVISIONER_PORT_3001_TCP_PORT": 3001,
        "SCRATCH_SPACE_ROOT": "/mnt/lustre/bunsen-staging/beaker"
      }
    }
  ],
  "services": [
    {
      "id": "/bunsen-staging/web",
      "acl": "{ hdr(host) -i bunsen-staging.withmojo.com } !{ path_beg -i /api } !{ path_beg -i /beaker }"
    },
    {
      "id": "/bunsen-staging/api",
      "acl": "{ hdr(host) -i bunsen-staging.withmojo.com } { path_beg -i /api }"
    }
  ],
  "group": {
    "id": "/bunsen-staging",
    "apps": [
      {
        "id": "/bunsen-staging/web",
        "cmd": "",
        "cpus": 1,
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
                "hostPort": 0,
                "servicePort": 8080,
                "protocol": "tcp"
              }
            ]
          }
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
          "minimumHealthCapacity": 0.5
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      },
      {
        "id": "/bunsen-staging/api",
        "args": ["--migrate"],
        "cpus": 1,
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
          },
          "volumes": [
            {
              "hostPath": "/mnt/lustre/bunsen/repos",
              "containerPath": "/var/app/.repos",
              "mode": "RW"
            }
          ]
        },
        "env": {
          "NODE_ENV": "staging",
          "ALLOW_CROSS_ORIGIN": true,
          "EXTERNAL_DB_HOST": "bunsen-staging-db.cyuqbkun2hqi.us-east-1.rds.amazonaws.com",
          "EXTERNAL_DB_USER": "bunsen",
          "EXTERNAL_DB_PASS": "FSoq93X8KuyQN6333EV3411zf",
          "EXTERNAL_DB_NAME": "bunsen_staging",
          "HOSTNAME": "bunsen-staging.withmojo.com",
          "MANDRILL_PASSWORD":"-QG6MBSWNPR7sPwRali8Jg",
          "MANDRILL_USER":"ops+mandrill@mojotech.com",
          "MAIL_FROM": "ops+bunsen@mojotech.com",
          "ELASTICSEARCH_PORT_9200_TCP_ADDR": "bunsen:s6nFTwtbZP3wHh@172.17.42.1",
          "ELASTICSEARCH_PORT_9200_TCP_PORT": 9200,
          "PROVISIONER_PORT_3001_TCP_ADDR": "172.17.42.1",
          "PROVISIONER_PORT_3001_TCP_PORT": 3001,
          "SCRATCH_SPACE_ROOT": "/mnt/lustre/bunsen-staging/beaker"
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
        ]
      },
      {
        "id": "/bunsen-staging/provisioner",
        "cmd": "",
        "cpus": 1,
        "mem": 512,
        "instances": 1,
        "container": {
          "type": "DOCKER",
          "docker": {
            "network": "BRIDGE",
            "image": "quay.io/mojotech/bunsen-provisioner:\($TAG)",
            "portMappings": [
              {
                "containerPort": 3001,
                "servicePort": 3001,
                "protocol": "tcp"
              }
            ]
          }
        },
        "ports": [
          3001
        ],
        "env": {
          "SERVER_PORT": 3001,
          "BAMBOO_URL": "http://172.17.42.1:8000",
          "MARATHON_URL": "http://172.17.42.1:8080",
          "APP_GROUP": "/bunsen-staging/beaker",
          "APP_TEMPLATE": {
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
              },
              "volumes": [
                {
                  "hostPath": "/mnt/bunsen",
                  "containerPath": "/var/s3",
                  "mode": "RO"
                },
                {
                  "hostPath": "/mnt/lustre/bunsen/scratch",
                  "containerPath": "/mnt/lustre",
                  "mode": "RW"
                }
              ]
            },
            "uris": [
              "file:///etc/.dockercfg"
            ],
            "cpus": 1,
            "mem": 2048,
            "instances": 1
          } | tojson,
          "SERVICE_HOST": "bunsen-staging.withmojo.com",
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
          "minimumHealthCapacity": 0.5
        },
        "uris": [
          "file:///etc/.dockercfg"
        ]
      }
    ]
  }
}
