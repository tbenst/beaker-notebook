FROM debian
MAINTAINER mojotech <ops+docker@mojotech.com>

ENV DEBIAN_FRONTEND noninteractive

ADD apt /etc/apt
RUN apt-key add /etc/apt/keys/*

ENV HTTP_PROXY "http://HOST_IP:3128"
ENV HTTPS_PROXY "http://HOST_IP:3128"
ENV http_proxy "http://HOST_IP:3128"
ENV https_proxy "http://HOST_IP:3128"

CMD []

ENTRYPOINT ["/bin/bash"]
