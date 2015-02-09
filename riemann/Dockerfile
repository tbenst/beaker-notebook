FROM quay.io/mojotech/clojure:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y --no-install-recommends -t local riemann

WORKDIR /opt/riemann
ADD . /opt/riemann

ENTRYPOINT ["make"]
CMD ["run"]
