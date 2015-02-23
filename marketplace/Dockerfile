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

# as an optimization, only re`make` if project.clj or the Makefile changes
ADD Makefile project.clj /opt/marketplace/
RUN make

ADD . /opt/marketplace

ENV LEIN_ROOT 1
ENV USE_KERBEROS 0

EXPOSE 8444

ENTRYPOINT ["make"]
CMD ["run"]
