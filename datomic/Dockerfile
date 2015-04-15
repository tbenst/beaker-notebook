FROM quay.io/mojotech/clojure:1e055ab
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get install -y datomic-pro

ADD . /root/

EXPOSE 4334

ENTRYPOINT ["/root/run.sh"]
