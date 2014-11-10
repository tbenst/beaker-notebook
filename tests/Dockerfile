FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      nodejs-legacy \
      fluxbox \
      x11vnc \
      g++ \
      make \
      openjdk-7-jre-headless \
      unzip \
      xfonts-100dpi \
      xfonts-75dpi \
      xfonts-cyrillic \
      xfonts-scalable \
      git \
      firefox-mozilla-build \
      curl \
      xvfb && \
    apt-get install -y --no-install-recommends -t jessie \
      npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_PATH /usr/local/lib/node_modules
RUN npm config --global set cache /home/beaker/.npm && \
    npm config --global set registry http://registry.npmjs.org/

EXPOSE 5900

ADD . /var/app/test
WORKDIR /var/app/test

RUN npm install --production

RUN chmod +x main.sh
ENTRYPOINT ./main.sh
