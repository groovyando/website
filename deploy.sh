#!/usr/bin/env bash

rm -rf public && hugo --theme=default --verbose && rsync -avzhe ssh --delete --delete-after ./public deployer@198.58.120.79:/www/hackergarten.mx
