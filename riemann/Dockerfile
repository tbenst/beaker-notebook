FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
      && apt-get install -y --no-install-recommends -t local riemann oracle-java7-jre \
      && apt-get clean

ADD riemann.config /etc/riemann/riemann.config

ENTRYPOINT ["riemann"]
