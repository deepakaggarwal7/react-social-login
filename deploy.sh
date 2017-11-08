#!/usr/bin/env bash

export FB_APP_ID=530411637301990
export INSTAGRAM_REDIRECT=https://nicolas-goudry.github.io/react-social-login

npm run lint
lint=$?

if [ $lint -ne 0 ]; then
  exit 1
fi

cd demo && { webpack -p; cd -; }
build=$?

if [ $build -ne 0 ]; then
  exit 1
fi


