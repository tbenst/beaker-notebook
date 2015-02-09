FROM quay.io/mojotech/node:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y --no-install-recommends -t vendor \
      # to build libgit
      cmake \
      # to build pg
      libpq-dev

WORKDIR /var/app

# as an optimization, only re`make` if package.json or the Makefile changes
ADD Makefile package.json /var/app/
RUN make

ADD . /var/app

EXPOSE 3000

# volume for *ROOT* of scratch space (may actually be mounted elsewhere at runtime)
VOLUME ["/mnt/scratch"]

ENTRYPOINT ["make"]
CMD ["migrate", "run"]
