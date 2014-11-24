FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      nodejs-legacy \
      node-express \
      node-istanbul-middleware \
      nginx \
      roots && \
    apt-get clean

ENV NODE_PATH /usr/local/lib/node_modules

ADD . /var/www
WORKDIR /var/www

RUN roots compile --no-compress

RUN mv config/default /etc/nginx/sites-available/ && \
    echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 7777

ENTRYPOINT ["/var/www/main.sh"]
