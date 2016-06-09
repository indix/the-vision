#The Vision
####The front end framework for an Indix experience

All Indix apps need to provide consistent experience for users from a branding, look and feel. To accomplish this, developers need a framework that can be used across the company.

##Style Guide
This is the visual guide to all experiences.

##Using components from The Vision project
Visit [oss.indix.com/the-vision](http://oss.indix.com/the-vision/) for documentation on how to use the components in the framework.

##Dev setup to run the project locally

####Basic Setup
1. Checkout the code.
2. Run `sh boostrap.sh`
  - Sets up git hooks
    - `pre-commit` runs the build and adds it before/for every commit
  - Runs `nvm use` to switch to the right node version.
  - Runs `npm install` to install all the dependencies. This may take a while.
3. Run `bundle install` to install a few dev-dependencies ([Middleman](https://middlemanapp.com/)).
<br/>If the previous step fails, install the correct version of ruby. We suggest using [rvm](https://rvm.io/) gemsets.

####Starting Development
1. Fire up using `middleman server`.
2. Open [localhost:4561](http://localhost:4561/) to view the app.
3. Changes to the source code auto-refreshes the browser.
4. In a parallel window, run `npm run develop` to run webpack in watch mode. This bundles the js file.

####Publish a new component
- [x] Add tests
- [x] Add docs
- [x] Update version
- [ ] Send a PR

####Update the webpage
Run `npm run publish-page -- "<commit msg>"` to push the static files to `gh-pages` branch.
