# React Imgur Browser

This was my 'leaning React' project, with thanks to [Stephen Grider](https://github.com/StephenGrider). I highly recommend his React courses on Udemy. 

Current commit is ES6 refactor. Previous commit is ES5 version.

This has been extensively commented and might serve as a useful reference for someone in how to build a basic React/Reflux/React-Router app including async API Calls.

## The app

Allows the user to navigate through Imgur images/videos from the main categories

#### Features:

* Single page app with dynamic URLs (via React Router) allowing easy link sharing
* HTML5 videos, including autoplay on mouseover
* Dynamic updates via Imgur API, called via Fetch (no jQuery) with ES6 polyfill
* Bootstrap components / SCSS for additional styles
* Modern build tools, including live reload and error handling

## Build instructions

* Clone repo
* `npm install` (several components so could take some time)
* `gulp` - default task will build and start live reload server
* If browser not launched automatically, navigate to localhost:8000
* Browserify/live reload will automatically rebuild and reload when changes made
