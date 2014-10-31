FROM mojo/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t local nginx && \
    apt-get clean

ADD . /var/www

RUN cp /var/www/default.nginx.site /etc/nginx/sites-available/default && \
    echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["/var/www/main.sh"]
