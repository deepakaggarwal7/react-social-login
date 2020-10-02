#!/usr/bin/env bash

if ! git diff-index --quiet HEAD --; then
  echo "Git tree not clean"
  exit 1
fi

export FB_APP_ID=657319568198782
export INSTAGRAM_REDIRECT=https://deepakaggarwal7.github.io/react-social-login

npm run lint
lint=$?

if [ $lint -ne 0 ]; then
  exit 1
fi

cd demo && .././node_modules/.bin/webpack -p; cd -; 
build=$?

if [ $build -ne 0 ]; then
  exit 1
fi

git add demo/public
add=$?

if [ $add -ne 0 ]; then
  exit 1
fi

git stash
stash=$?

if [ $stash -ne 0 ]; then
  exit 1
fi

git checkout gh-pages
checkout=$?

if [ $checkout -ne 0 ]; then
  exit 1
fi

git pull
pull=$?

if [ $pull -ne 0 ]; then
  exit 1
fi

git stash pop
pop=$?

if [ $pop -ne 0 ]; then
  exit 1
fi

mv demo/public/* .
mv=$?

if [ $mv -ne 0 ]; then
  exit 1
fi

git reset HEAD demo/public/*
reset=$?

if [ $reset -ne 0 ]; then
  exit 1
fi

git add index.html main.js
add=$?

if [ $add -ne 0 ]; then
  exit 1
fi

git commit -m "Update gh-pages"
commit=$?

if [ $commit -ne 0 ]; then
  exit 1
fi
