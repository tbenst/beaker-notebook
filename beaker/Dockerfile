FROM mojo/debian
MAINTAINER mojotech <ops+docker@mojotech.com>

RUN apt-get update && \
    apt-get install -y --no-install-recommends -t wheezy-backports \
      build-essential \
      fuse \
      fuse-utils \
      git \
      gradle \
      libcurl3 \
      libxml2 \
      libzmq3/local \
      locales \
      mime-support \
      nginx \
      nodejs-legacy \
      oracle-java7-jdk \
      oracle-java7-jre \
      python \
      python-certifi \
      python-dev \
      python-ipython \
      python-jinja2 \
      python-matplotlib \
      python-numpy \
      python-pandas \
      python-pyzmq \
      python-scipy \
      python-tornado \
      python-yaml \
      s3fs-fuse \
      && \
    apt-get install -y --no-install-recommends -t jessie \
      npm \
      && \
    apt-get clean

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

RUN su -m beaker -c "gradle --project-dir /home/beaker/core/config/builds/dev/ build"

EXPOSE 8801
CMD []
ENTRYPOINT ["/home/beaker/main.sh"]
