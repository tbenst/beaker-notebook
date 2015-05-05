FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/user

ADD . /opt/user

EXPOSE 3004

ENTRYPOINT ["make"]
CMD ["run"]
