FROM mojo/debian:wheezy
MAINTAINER mojotech <ops@mojotech.com>

ADD apt/jessie.pref /etc/apt/preferences.d/
ADD apt/jessie.list /etc/apt/sources.list.d/

RUN echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections

RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends -t wheezy-backports \
      build-essential \
      fuse \
      fuse-utils \
      git \
      gradle \
      locales \
      mime-support \
      nginx \
      nodejs-legacy \
      npm \
      oracle-java7-installer \
      oracle-java7-set-default \
      oracle-jdk7-installer \
      python \
      python-dev \
      python-pip \
      s3fs-fuse && \
    apt-get clean

RUN pip install ipython jinja2 tornado && \
    pip install pyzmq --install-option="--zmq=bundled"

# TODO: when beaker starts get this error:
# nginx-stderr>nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)

RUN update-alternatives --install /usr/bin/nginx nginx /usr/sbin/nginx 1

ENV NODE_PATH /usr/local/lib/node_modules
RUN npm config --global set cache /home/beaker/.npm && \
    npm config --global set registry http://registry.npmjs.org/

RUN useradd beaker --create-home
ADD main.sh /home/beaker/
ADD beaker-notebook/core/ /home/beaker/core/
ADD beaker-notebook/plugin/ /home/beaker/plugin/
ADD beaker-notebook/shared/ /home/beaker/shared/
RUN chown -R beaker:beaker /home/beaker

VOLUME ["/var/s3"]
RUN chmod 777 /var/s3

USER beaker
RUN gradle --project-dir /home/beaker/core/config/builds/dev/ build

EXPOSE 8801

CMD []
ENTRYPOINT ["/home/beaker/main.sh"]
