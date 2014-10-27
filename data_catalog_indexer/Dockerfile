FROM mojo/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update -qq \
    && apt-get install -qq -y --no-install-recommends \
      heimdal \
      krb5keytab \
      libkrb5admin-perl \
      libpam-heimdal \
      oracle-java7-jdk \
      wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ADD lein /usr/bin/lein
RUN /usr/bin/lein

ADD . /opt/indexer

# find out where maven is caching things and use a volume?
# create a user account with a specific uid?
# bind mount the role account's keytab?

ENV LEIN_ROOT 1
ENV USE_KERBEROS 1
WORKDIR /opt/indexer

RUN lein deps

ENTRYPOINT ["/usr/bin/lein"]
