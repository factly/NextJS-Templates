<h1 align="center">
  @factly/NextJS-theme-petal
</h1>


Site link:([https://stag-petal.netlify.app])


Nextjs theme for DegaCMS. Built with [DegaCMS] and [Theme UI](https://theme-ui.com/).


Read the [Source Code](https://github.com/factly/nextjs-templates).


## Prerequisites

Before installing and using themes based on the Dega CMS, you need to make sure that your system meets the following requirements:

* Node.js Version 18 or Higher

The Dega CMS requires Node.js version 18 or higher to be installed on your system. If you don't have Node.js installed, you can download it from the [official Node.js website](https://nodejs.org/en/).


* we are using NX workspace and we need to install it. [https://nx.dev/packages/next]

* Package Manager (npm or yarn)

You also need to have a package manager installed to install the required dependencies. The recommended package managers are either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

To check if Node.js and the package manager are installed on your system, you can run the following commands in your terminal:

```
node -v

```

This will display the version of Node.js installed on your system. If you see a version number that is less than 18, you need to update your version of Node.js.

```
npm -v

```

or

```
yarn -v

```


These commands will display the version of npm or yarn installed on your system. If you don't have either of these package managers installed, you can download and install them from the [official npm website](https://www.npmjs.com/) or [yarn website](https://yarnpkg.com/).

Once you have Node.js and the package manager installed, you can proceed to install and use themes based on the Dega CMS.


### Configuration

Once you have installed a Dega theme, you may want to configure it to fit your specific needs. Most Dega themes come with configuration options that can be modified to change the look and feel of your website.

1. SPACE ID: This is the ID of the content space that you want to use with your Dega CMS project.
2. ACCESS TOKEN: This is the access token that allows your Dega CMS project to access the content in your space.
3. URI: This is the URI endpoint of your Dega CMS API.


## To Run site

```
nx run [theme name]:serve

or

yarn nx run [theme name]:serve

```

Example -

nx run petal:serve

## To Build site

```
nx run [theme name]:build

or 

yarn nx run [theme name]:build

```
Example -

nx run petal:build
