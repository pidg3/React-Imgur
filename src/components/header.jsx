// NODE MODULES
import React from 'react';
import { Link } from 'react-router'; // not importing default so {} required
// import Reflux from 'reflux';

// APPLICATION COMPONENTS
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

class Header extends React.Component {

  // constructor - required for state initialisation and this binding, see README
  constructor() {
    super();

    // override value of keyword this for onChange to be bound to Header
    // without this, will be bound to TopicStore (where it is called from)
    this.onChange = this.onChange.bind(this);

    // set initial state of component - NOT same as props
    // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state
    // State: data that may change (via event handlers/Ajax calls) to trigger UI update
    // NOT State: computed data, React components (should be in render() based on underlying props and state)
    // Props: immutable data from parents
    this.state = {
      // initialise array container for topics
      topics: []
    };
  }

  // componentWillMount is run before render, also impacts server side
  componentWillMount() {
    // calls Imgur API to get list of topics. Processed as follows:
    // 1) actions.jsx passes action to topicStore.jsx
    // 2) topicStore.jsx makes async API call and returns a promise, triggerChange() run
    // 3) this triggers onChange() (via Reflux listenTo() mixin defined above)
    // 4) onChange() updates state of topics
    // 5) updating state triggers re-render so updates DOM (via virtual DOM)
    // nb refer to individual components for further detail
    Actions.getTopics();
  }

  // listen to changes in TopicStore
  componentDidMount() {
    // listen is a reflux method - can include even though Reflux not included in this component ...
    // ... as has been included in TopicStore
    // this.onChange is calledback with change detected
    // returns a function to remove event listener
    this.unsubscribe = TopicStore.listen(this.onChange);
  }

  // remove TopicStore event listener using function returned in componentDidMount
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <nav className="navbar navbar-default header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Imgur Browser
        </Link>
        <ul className="nav navbar-nav navbar-right">
          {this.renderTopics()}
        </ul>
      </div>
    </nav>;
  }

  // triggered by Reflux.listenTo() mixin
  onChange(event, topics) {
    this.setState({
      topics: topics
    });
  }

  renderTopics() {
    // only display first four topics
    // map() runs function on each array item in state and returns the result in a new array
    return this.state.topics.slice(0, 4).map(function(topic) {
      {/* unique key must be defined in all React lists, otherwise warning shown in browser */}
      return <li key={topic.id}>
        {/* Link requires Router.link (included above)
            topic.id is used by ReactRouter to pass value to topic.jsx */}
        <Link activeClassName="active" to={'topics/' + topic.id}>
          {topic.name}
        </Link>
      </li>;
    });
  }
}

// add properties
Header.displayName = 'Header';

// export
module.exports = Header;
