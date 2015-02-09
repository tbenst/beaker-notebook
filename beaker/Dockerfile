FROM quay.io/mojotech/groovy:c5c4097
MAINTAINER mojotech <ops+docker@mojotech.com>

# setup node.js
#   - set NODE_PATH so `require` works with npm modules installed via apt
ENV NODE_PATH /usr/local/lib/node_modules
RUN apt-get install -y --no-install-recommends -t local \
      nodejs-legacy \
      npm

# setup python
RUN apt-get install -y --no-install-recommends -t local \
      python \
      python-dev \
      python-pip \
      python-virtualenv

# setup nginx
#   - allow beaker (any) user to set the nginx basic auth password at runtime
RUN apt-get install -y --no-install-recommends -t local \
      mime-support \
      nginx \
      apache2-utils
RUN touch /etc/nginx/.htpasswd && chmod 777 /etc/nginx/.htpasswd

# setup beaker python plugin dependencies
#   - installing these packages here is an *optimization only*
#   - compiling scipy requires a ton of dependencies, including fortran
#   - they would also get installed by the call to `make deps` belowe
#   - *new* python dependencies should be added to requirements.txt instead
RUN apt-get install -y --no-install-recommends -t local \
      python-ipython \
      python-jinja2 \
      python-matplotlib \
      python-numpy \
      python-pandas \
      python-pyzmq \
      python-scipy \
      python-yaml

RUN useradd beaker -d /opt/beaker --create-home
ADD . /opt/beaker/

# gradle build fails if we don't fix these permissions
RUN chown -R beaker:beaker /opt/beaker/

USER beaker

# beaker tries to run nginx, so it needs to be on the path
ENV PATH /usr/sbin:$PATH

WORKDIR /opt/beaker
RUN make

EXPOSE 8801

# volume for data sets
VOLUME ["/mnt/data"]

# volume  for scratch space
VOLUME ["/mnt/scratch"]

ENTRYPOINT ["make"]
CMD ["password", "run"]
