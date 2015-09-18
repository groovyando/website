#!/usr/bin/env bash

./build.sh && rsync -avzhe ssh --delete --delete-after ./public deployer@198.58.120.79:/www/groovyando.org
