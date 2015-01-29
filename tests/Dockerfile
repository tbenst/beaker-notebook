FROM quay.io/mojotech/debian:latest
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
    && apt-get install -y --no-install-recommends -t wheezy-backports \
      curl \
      firefox-mozilla-build \
      fluxbox \
      g++ \
      git \
      make \
      nodejs-legacy \
      npm \
      openjdk-7-jre-headless \
      unzip \
      x11vnc \
      xfonts-100dpi \
      xfonts-75dpi \
      xfonts-cyrillic \
      xfonts-scalable \
      xvfb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_PATH /usr/local/lib/node_modules

EXPOSE 5900

ADD . /var/app/test
WORKDIR /var/app/test

RUN npm install

ENTRYPOINT ./main.sh
