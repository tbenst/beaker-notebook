FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/api

ADD . /opt/api

RUN lein uberjar

EXPOSE 3000

ENTRYPOINT ["make"]
CMD ["run"]
