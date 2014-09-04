FROM mojo/debian:wheezy
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN echo "deb http://apt.withmojo.com/debian vendor main" > /etc/apt/sources.list.d/elasticsearch.list
RUN echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends\
      oracle-java7-installer \
      oracle-java7-set-default

RUN apt-get install -qq -y --no-install-recommends -t vendor elasticsearch

ADD config/elasticsearch.yml /etc/elasticsearch/

ADD main.sh /main.sh
RUN chmod +x /main.sh

EXPOSE 9200

CMD []
ENTRYPOINT ["/main.sh"]
