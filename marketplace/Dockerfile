FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
    && apt-get install -y -t local --no-install-recommends \
      heimdal \
      krb5keytab \
      leiningen \
      libkrb5admin-perl \
      libpam-heimdal \
      wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/marketplace

ADD project.clj /opt/marketplace/project.clj
RUN lein deps

ADD . /opt/marketplace

ENV LEIN_ROOT 1
ENV USE_KERBEROS 0

# as an optimization, only re`make` if project.clj or the Makefile changes
ADD Makefile project.clj /opt/marketplace/
RUN make

EXPOSE 8444

ENTRYPOINT ["make"]
CMD ["run"]
