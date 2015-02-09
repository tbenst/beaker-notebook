FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      heimdal \
      krb5keytab \
      libkrb5admin-perl \
      libpam-heimdal \
      wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/indexer

ADD project.clj /opt/indexer/project.clj
RUN lein deps

ADD . /opt/indexer

# find out where maven is caching things and use a volume?
# create a user account with a specific uid?
# bind mount the role account's keytab?
ENV USE_KERBEROS 1

ENTRYPOINT ["/usr/bin/lein"]
