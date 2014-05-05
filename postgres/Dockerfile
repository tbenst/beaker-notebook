FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends postgresql postgresql-contrib && \
    apt-get clean

ADD config /tmp/config

RUN chown postgres:postgres /tmp/config/* && mv /tmp/config/* /etc/postgresql/9.1/main/

USER postgres
RUN /etc/init.d/postgresql start && \
    createdb "bunsenProduction" && \
    createdb "bunsenTesting" && \
    createdb "bunsenDevelopment" && \
    /etc/init.d/postgresql stop

EXPOSE 5432

ENTRYPOINT ["/usr/lib/postgresql/9.1/bin/postgres", "-D", "/etc/postgresql/9.1/main"]
