FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends postgresql postgresql-contrib && \
    apt-get clean

ADD config /tmp/config

RUN chown postgres:postgres /tmp/config/* && mv /tmp/config/* /etc/postgresql/9.1/main/

ADD main.sh /main.sh
RUN chmod +x /main.sh

EXPOSE 5432

VOLUME /var/lib/postgresql/9.1/main

CMD []
ENTRYPOINT ["/main.sh"]

