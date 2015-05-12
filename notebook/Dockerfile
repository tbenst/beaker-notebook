FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/notebook

ADD . /opt/notebook

EXPOSE 3003

ENTRYPOINT ["make"]
CMD ["run"]
