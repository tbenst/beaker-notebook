FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      ca-certificates \
      python \
      lsof \
      npm \
      node-bcryptjs \
      node-bluebird \
      node-bookshelf \
      node-checkit \
      node-crypto \
      node-express \
      node-glob \
      node-inflection \
      node-istanbul \
      node-istanbul-middleware \
      node-jade \
      node-knex \
      node-lodash \
      node-lodash-contrib \
      node-minimist \
      node-mkdirp \
      node-moment \
      node-nodegit \
      node-mailer \
      node-pg \
      node-pm2 \
      node-qs \
      node-when \
      node-restler \
      node-elasticsearch \
      nodejs-legacy && \
    apt-get clean

ADD . /var/app

ENV NODE_ENV production
ENV NODE_PATH /usr/local/lib/node_modules

RUN npm install -g node-inspector

EXPOSE 8080
EXPOSE 3000

ENTRYPOINT ["/var/app/main.sh"]
