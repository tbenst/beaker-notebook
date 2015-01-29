FROM quay.io/mojotech/debian:latest
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
    && apt-get install -y -t local --no-install-recommends \
      leiningen \
      oracle-java7-jdk \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV LEIN_ROOT 1

ADD . /opt/provisioner
WORKDIR /opt/provisioner
RUN lein deps

EXPOSE 3001

ENTRYPOINT ["lein"]
CMD ["run"]
