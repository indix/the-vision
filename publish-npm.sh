#!/bin/bash
set -e

rm -rf node_modules

source ~/.nvm/nvm.sh
set -x
nvm use
# npm version "0.8.$GO_PIPELINE_LABEL"
npm version $(node -e "console.log(require('./package.json').version)")".$GO_PIPELINE_LABEL"

npm publish
