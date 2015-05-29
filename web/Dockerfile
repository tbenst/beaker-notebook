FROM quay.io/mojotech/node:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y --no-install-recommends -t local \
    nginx \
    unzip

WORKDIR /var/www

# as an optimization, only re`make` if package.json, bower.json, or the Makefile changes
ADD Makefile package.json bower.json /var/www/
RUN make

ADD . /var/www
RUN make compile

EXPOSE 8081

ENTRYPOINT ["make"]
CMD ["instrument", "run"]
