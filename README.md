#The Vision
####The front end framework for an Indix experience

All Indix apps need to provide consistent experience for users from a branding, look and feel. To accomplish this, developers need a framework that can be used across the company.

##Style Guide
This is the visual guide to all experiences.

##Using components from The Vision project
Visit [oss.indix.com/the-vision](http://oss.indix.com/the-vision/) for documentation on how to use the components in the framework.

##Dev setup to run the project locally

####Basic Setup
1. Checkout the code to the `project folder`.
2. Run `nvm use v.5.7.1` to switch to the right node version.
3. Run `npm install` to install all the dependencies. This may take a while.

####Starting Development
1. Refer to [Middleman docs](https://middlemanapp.com/) to install it.
2. After installing, fire it up using `middleman server`.
2. Open [localhost:4561](http://localhost:4561/) to view the app.
3. Changes to the source code auto-refreshes the browser.
4. In a parallel window, run `npm develop` to run webpack in watch mode. This bundles all static assets.
