FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      nodejs \
      node-pg \
      node-nodegit \
      node-jade \
      node-express \
      node-lodash \
      node-mkdirp \
      node-when \
      node-glob \
      node-inflection \
      node-knex \
      node-bookshelf && \
    apt-get clean

RUN update-alternatives --install /usr/bin/node nodejs /usr/bin/nodejs 100
ADD . /var/app

RUN cp /var/app/config.sample.js /var/app/config.js

ENV NODE_ENV production
ENV NODE_PATH /usr/local/lib/node_modules

EXPOSE 3000

ENTRYPOINT ["/var/app/main.sh"]
