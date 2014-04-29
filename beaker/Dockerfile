FROM debian:wheezy

ADD apt/backports.list /etc/apt/sources.list.d/
ADD apt/jessie.list /etc/apt/sources.list.d/
ADD apt/sid.list /etc/apt/sources.list.d/
ADD apt/preferences /etc/apt/
RUN apt-get update

RUN apt-get install -y -qq --no-install-recommends libc6=2.18-4 libc6-dev=2.18-4 libc-dev-bin=2.18-4 locales=2.18-4 build-essential ruby1.9.1 ruby-dev python libzmq3-dbg libzmq3-dev libzmq3 nginx ipython git nodejs npm julia r-base r-base-dev adduser libfuse-dev fuse-utils libcurl4-openssl-dev libxml2-dev mime-support automake libtool pkg-config libcurl4-openssl-dev wget

RUN gem install iruby --no-ri --no-rdoc

# TODO: when beaker starts get this error:
# nginx-stderr>nginx: [alert] could not open error log file: open() "/var/log/nginx/error.log" failed (13: Permission denied)
# Is there a more elegant way to allow access to nginx?
RUN ln -s /usr/sbin/nginx /usr/bin/nginx

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN julia -e "Pkg.add(\"IJulia\")"
RUN julia -e "Pkg.add(\"Gadfly\")"

RUN R -e "install.packages('Rserve', repos='http://www.rforge.net/')"
RUN R -e "install.packages('ggplot2', repos='http://cran.mirrors.hoobly.com')"

ADD install_oracle_jdk.sh /root/
RUN /root/install_oracle_jdk.sh

ADD install_gradle.sh /root/
RUN /root/install_gradle.sh

ADD install_s3fs.sh /root/
RUN /root/install_s3fs.sh

RUN adduser beaker --disabled-password --gecos ""
ADD beaker-standalone/core/ /home/beaker/core/
ADD beaker-standalone/plugin/ /home/beaker/plugin/
ADD beaker-standalone/shared/ /home/beaker/shared/
RUN chown -R beaker.beaker /home/beaker

RUN su - beaker -c 'gradle -p /home/beaker/core/config/builds/dev/ build'

EXPOSE 8801
USER beaker
WORKDIR /home/beaker
ENV HOME /home/beaker
ENTRYPOINT gradle -p /home/beaker/core/config/builds/dev/ run
