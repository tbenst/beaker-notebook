FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends -t wheezy-backports nodejs-legacy nginx roots && \
    apt-get clean

ADD . /var/www
WORKDIR /var/www

RUN roots compile --no-compress

RUN mv config/default /etc/nginx/sites-available/ && \
    echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT ["/var/www/main.sh"]
