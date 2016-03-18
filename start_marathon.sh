#!/bin/bash
echo 1
set -e
echo 2

if [ -z "$NODE_ENV" ]; then
  echo "NODE_ENV variable must be specified"
  exit 1
fi

echo 3

. /.nvm/nvm.sh
echo 4
nvm use 5.0.0

echo 5
# start the app.
npm start
echo 6
