ln -sf "${PWD}/bin/pre-commit" "${PWD}/.git/hooks"

git config --local push.default simple
git config --local pull.rebase true
git config --local rebase.autoStash true

nvm use

npm install
