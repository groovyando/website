#!/usr/bin/env bash

VER=$(grep "version" website.properties|cut -d'=' -f2)  && \
  docker build -t groovyando/website:$VER \
    -t registry.circulosiete.com/library/groovyando/website:$VER . && \
  git release $VER && \
  docker push groovyando/website:$VER && \
  docker push registry.circulosiete.com/library/groovyando/website:$VER && \
  echo "Done"