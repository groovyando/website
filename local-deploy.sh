#!/usr/bin/env bash

./build.sh && rsync -avzhe ssh --delete --delete-after ./public /www/grails.org.mx
