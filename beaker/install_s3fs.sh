#!/bin/bash

# Install Fuse
cd /root
wget  http://downloads.sourceforge.net/project/fuse/fuse-2.X/2.9.3/fuse-2.9.3.tar.gz
tar xvzf fuse-2.9.3.tar.gz
cd fuse-2.9.3/
./configure
make
make install

# Install s3fs
cd /root
wget https://github.com/s3fs-fuse/s3fs-fuse/archive/v1.77.tar.gz
tar xvzf v1.77.tar.gz
cd s3fs-fuse-1.77/
autoreconf --install
./configure
make
make install
