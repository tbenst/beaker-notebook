#!/bin/bash

chmod 777 /s3

# s3fs expects AWSACCESSKEYID and AWSSECRETACCESSKEY env variables to be set, we can do that via:
# docker run -e AWSACCESSKEYID=1234 -e AWSSECRETACCESSKEY=4321abcde ...
s3fs bunsen-development /s3
unset AWSSECRETACCESSKEY
