#!/usr/bin/env bash

rm -rf software
mkdir software
rm -rf public && hugo --verbose && mv public/* software && mv software public/ && cp foo/* public
