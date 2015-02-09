FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/provisioner

# as an optimization, only re`make` if project.clj or the Makefile changes
ADD Makefile project.clj /opt/provisioner/
RUN make

ADD . /opt/provisioner

EXPOSE 3001

ENTRYPOINT ["make"]
CMD ["run"]
