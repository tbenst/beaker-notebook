FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
    && apt-get install -y -t local --no-install-recommends \
      heimdal \
      krb5keytab \
      libkrb5admin-perl \
      libpam-heimdal \
      wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/marketplace

ADD . /opt/marketplace

EXPOSE 8444

ENTRYPOINT ["make"]
CMD ["run"]
