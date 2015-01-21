FROM quay.io/mojotech/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      ca-certificates \
      git \
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

RUN npm install -g 3y3/node-inspector#7a1f3e625ed14477f23cd741a46624d3c8787a86
RUN npm install fs-extra@0.14.0 \
                walkdir@0.0.7
EXPOSE 8080
EXPOSE 3000

ENTRYPOINT ["/var/app/main.sh"]
