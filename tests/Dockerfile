# DOCKER-VERSION 0.11.1
FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      iceweasel \
      nodejs-legacy \
      g++ \
      make \
      openjdk-7-jre-headless \
      unzip \
      xfonts-100dpi \
      xfonts-75dpi \
      xfonts-cyrillic \
      xfonts-scalable \
      git \
      xvfb && \
    apt-get install -y --no-install-recommends -t jessie \
      npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_PATH /usr/local/lib/node_modules
RUN npm config --global set cache /home/beaker/.npm && \
    npm config --global set registry http://registry.npmjs.org/

ADD . /var/app/test
WORKDIR /var/app/test

RUN npm install

RUN chmod +x main.sh
ENTRYPOINT ./main.sh
