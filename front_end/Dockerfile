FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      nodejs-legacy \
      node-istanbul \
      nginx \
      roots && \
    apt-get clean

ENV NODE_PATH /usr/local/lib/node_modules

ADD . /var/www
WORKDIR /var/www

RUN umask 0755
RUN roots compile --no-compress

RUN mv config/default /etc/nginx/sites-available/ && \
    echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT ["/var/www/main.sh"]
