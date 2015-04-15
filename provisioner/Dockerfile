FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/provisioner

ADD . /opt/provisioner

EXPOSE 3001

ENTRYPOINT ["make"]
CMD ["run"]
