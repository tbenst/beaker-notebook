FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/user

ADD Makefile project.clj /opt/user/
RUN make

ADD . /opt/user

ENTRYPOINT ["make"]
CMD ["run"]

