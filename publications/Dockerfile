FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

WORKDIR /opt/publications

# as an optimization, only re`make` if project.clj or the Makefile changes
ADD Makefile project.clj /opt/publications/
RUN make

ADD . /opt/publications

EXPOSE 3003

ENTRYPOINT ["make"]
CMD ["run"]
