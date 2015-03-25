FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/provisioner

ADD . /opt/provisioner

EXPOSE 3001

ENTRYPOINT ["make"]
CMD ["run"]
