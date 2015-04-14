FROM quay.io/mojotech/node:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y --no-install-recommends -t local \
      oracle-java7-jdk

RUN apt-get install -y --no-install-recommends -t wheezy-backports \
      firefox-mozilla-build \
      fluxbox \
      unzip \
      x11vnc \
      xfonts-100dpi \
      xfonts-75dpi \
      xfonts-cyrillic \
      xfonts-scalable \
      xvfb

WORKDIR /var/app/test

# as an optimization, only re`make` if package.json or the Makefile changes
ADD Makefile package.json /var/app/test/
RUN make

ADD . /var/app/test

EXPOSE 5900

ENTRYPOINT ./main.sh
