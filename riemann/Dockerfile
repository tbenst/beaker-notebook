FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y --no-install-recommends -t local riemann

WORKDIR /opt/riemann
ADD . /opt/riemann

ENTRYPOINT ["make"]
CMD ["run"]
