#!/bin/bash
message=$1
if [ -z  "$1" ]; then
  message="updating pages"
fi

set -e

if [ ! -d ./public/.git ]
  then
  echo -e "\n[task] Public folder doesn't seem to be setup. Setting up..."
  rm -rf public
  git clone git@github.com:ind9/the-vision.git public
  cd public
  git checkout origin/gh-pages -b gh-pages
  git branch -d master
  cd ..
fi

echo -e "\n[task] Running webpack"
./node_modules/.bin/webpack
echo -e "\n[task] Running middleman"
middleman build
cd public
echo -e "\n[task] Committing all changes with message \"$message\" and pushing it"
git add -A
git commit -m "$message"
git pull --rebase
git push origin gh-pages
