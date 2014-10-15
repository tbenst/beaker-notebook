FROM mojo/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update -qq \
    && apt-get install -qq -y --no-install-recommends \
      haproxy \
      jq \
      lxc-docker && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD . /opt/gateway
ADD haproxy.default /etc/default/haproxy
RUN mkdir -p /etc/gateway/routes.d
RUN mkdir -p /var/opt/gateway/

ENTRYPOINT ["/opt/gateway/main.sh"]
