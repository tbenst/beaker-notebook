FROM quay.io/mojotech/debian:latest
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends\
      oracle-java7-jdk \
      oracle-java7-jre

RUN apt-get install -y --no-install-recommends -t vendor elasticsearch

ADD config/elasticsearch.yml /etc/elasticsearch/

ADD main.sh /main.sh
RUN chmod +x /main.sh

EXPOSE 9200

CMD []
ENTRYPOINT ["/main.sh"]
