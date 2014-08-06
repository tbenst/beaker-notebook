FROM mojo/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends \
      node-express \
      node-lodash \
      node-bluebird \
      node-dockerode \
      nodejs-legacy && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD . /opt/provisioner

ENV NODE_PATH /usr/local/lib/node_modules

EXPOSE 3001

ENTRYPOINT ["/opt/provisioner/main.sh"]
