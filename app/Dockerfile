FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends \
      node-bluebird \
      node-bookshelf \
      node-express \
      node-glob \
      node-inflection \
      node-jade \
      node-knex \
      node-lodash \
      node-lodash-contrib \
      node-minimist \
      node-mkdirp \
      node-nodegit \
      node-pg \
      node-pm2 \
      node-when \
      node-restler \
      node-elasticsearch \
      nodejs-legacy && \
    apt-get clean

ADD . /var/app

ENV NODE_ENV production
ENV NODE_PATH /usr/local/lib/node_modules

EXPOSE 3000

ENTRYPOINT ["/var/app/main.sh"]
