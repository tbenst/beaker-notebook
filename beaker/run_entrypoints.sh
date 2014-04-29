#!/bin/bash

LOG=/var/log/entrypoints

touch $LOG

for a in /opt/entrypoints/*
do
    $a >> $LOG &
done

tail -f $LOG
