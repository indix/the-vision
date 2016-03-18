#!/bin/bash
set -e

rm -rf node_modules
rm -rf dist && mkdir -p dist

source ~/.nvm/nvm.sh
set -x
nvm use 5.0.0
npm version "$GO_PIPELINE_LABEL"

npm install --production

tar --exclude=test --exclude=.git --exclude=dist --exclude=node_modules -czf dist/the-vision.tgz .
