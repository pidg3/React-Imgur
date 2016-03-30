# React Imgur Browser

This was my 'leaning React' project, with thanks to [Stephen Grider](https://github.com/StephenGrider). I highly recommend his React courses on Udemy.

Current commit is ES6 refactor. Previous commit is ES5 version.

This has been extensively commented and might serve as a useful reference for someone in how to build a basic React/Reflux/React-Router app including async API Calls.

## The app

Allows the user to navigate through Imgur images/videos from the main categories.

#### Features:

* Single page app with dynamic URLs (via React Router) allowing easy link sharing
* HTML5 videos, including autoplay on mouseover
* Dynamic updates via Imgur API, called via Fetch (no jQuery) with polyfill
* Bootstrap components / SCSS for additional styles
* Modern build tools, including live reload and error handling

## Build instructions

* Clone repo
* `npm install` (several components so could take some time)
* `gulp` - default task will build and start live reload server
* If browser not launched automatically, navigate to localhost:8000
* Browserify/live reload will automatically rebuild and reload when changes made

## Steps to refactor to ES6

Steps 3/4 are  based on Kris Jordan's [excellent tutorial](http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes) on the same subject.

1. Update to more modern build tools. ES5 version used reactify as part of build process, which is no longer considered good practice and does not consistently support ES6. Instead, reactify is used, with required presets for react/es6. Following three packages require installation:  `babelify babel-preset-react babel-preset-es2015`. reactify can be uninstalled.  Gulpfile needs updating as follows.

	ES5 (gulpfile.js):
	```javascript
	var bundler = watchify(browserify({
	...
	transform: [reactify],
	...
	```

	ES6 (gulpfile.js):
	```javascript
	var bundler = watchify(browserify({
	...
	transform: [[babelify, {presets: ['es2015', 'react']}]],
	...
	```

2. Change `require` external modules at top of files to `import foo from bar`, using ES6 import functionality.

	ES5 (app.jsx):
	```javascript
  // NODE MODULES
  var ReactDOM = require('react-dom');

  // APPLICATION COMPONENTS
  var Routes = require('./routes');
	```

	ES6 (app.jx):
	```javascript
	// NODE MODULES
  import React from 'react';

  // APPLICATION COMPONENTS
  import Routes from './routes';
	```

	**Gotcha I**: normally we are just importing the module default, e.g. `import React from 'react';`. However we sometimes need to import specific components, e.g. `import { Router, Route, hashHistory } from 'react-router';` (routes.jsx). See [MDN docs](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import) for further info.

3.Extract properties from class definitions. You cannot define properties using ES6 class definitions; only methods can be added via the definition itself. Instead, the properties have to be added separately.

	ES5 (comment-box.jsx)
	```javascript
	var CommentBox = React.createClass({
		displayName: 'CommentBox',
		propTypes: {
	    comments: React.PropTypes.array.isRequired
		},
	  render: function() {
			...
	```

	ES6 (comment-box.jsx)
	```javascript
	var CommentBox = React.createClass({
		...
	});

	// add properties
	CommentBox.displayName = 'CommentBox';
	CommentBox.propTypes = {
	  comments: React.PropTypes.array.isRequired
	};

	// export
	module.exports = CommentBox;
	```

	**Gotcha II**: Mixins aren't part of ES6. This creates an issue, as in the ES5 version of this app mixins were used to include Reflux components for event listeners. There is the usual plethora of npm workarounds, however a better approach is to avoid mixins altogether. This is achieved as follows, see comments for further detail:

	```javascript
	// listen to changes in TopicStore
  componentDidMount: function () {
    // listen is a reflux method - can include even though Reflux not included in this component ...
    // ... as has been included in TopicStore
    // this.onChange is calledback with change detected
    // returns a function to remove event listener
    this.unsubscribe = TopicStore.listen(this.onChange);
  },

  // remove TopicStore event listener using function returned in componentDidMount
  componentWillUnmount: function() {
    this.unsubscribe();
  },
	```

	**Gotcha III**: For some reason, defining propTypes outside the class definition plays havoc with ESLint's react extensions. I just turned the rule off by adding `"react/prop-types": 0` to the rules section of .eslintrc.json.

	**Not a gotcha: I spent a good half hour attempting to refacor the reflux stores, before realising they are defined as `var fooStore = Reflux.createStore({` - so, not a class at all. Thererfore no point trying to refactor to an ES6 class, doh.

4. Now properties have been extracted, we can properly refactor createClass to an ES6 class.

	ES5 (comment-box.jsx)
	```javascript
	var CommentBox = React.createClass({
	  render: function() {
	    return <ul className="list-group">
	      {this.renderComments()}
	    </ul>;
	  },
	  renderComments: function() {
	    return this.props.comments.slice(0, 20).map(function(comment) {
	      return <li className="list-group-item comment-box" key={comment.id}>
	        <span className="badge">{comment.ups}</span>
	        <h5>{comment.author}</h5>
	        {comment.comment}
	      </li>;
	    });
	  }
	});
	```

	ES6 (comment-box.jsx)
	```javascript
	class CommentBox extends React.Component {
	  render() {
	    return <ul className="list-group">
	      {this.renderComments()}
	    </ul>;
	  }
	  renderComments() {
	    return this.props.comments.slice(0, 20).map(function(comment) {
	      return <li className="list-group-item comment-box" key={comment.id}>
	        <span className="badge">{comment.ups}</span>
	        <h5>{comment.author}</h5>
	        {comment.comment}
	      </li>;
	    });
	  }
	}
	```

	**Gotcha IV**: Value of keyword `this` is defined differently in ES6 classes. React automatically bound **all** methods to the component instance, even if they were called by stores or other external components. This is not the case by default for ES6 classes, so has to be manually defined in the constructor function. Example: in header.jsx, onChange() is called by TopicStore, so by default its keyword `this` will be bound to this store. This is overriden as follows:

	```javascript
	constructor() {
    super();
    this. onChange = this. onChange.bind(this);
	```

	**Gotcha V**: React allows you to set up state in the constructor. Example: header.jsx

	```javascript
	constructor() {
		super();

		...

		this.state = {
			// initialise array container for topics
			topics: []
		};
	}
	```

5. All done.
