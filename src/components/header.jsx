// NODE MODULES
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Reflux = require('reflux');

// APPLICATION COMPONENTS
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

module.exports = React.createClass({
  displayName: 'Header',

  // mixins are defined in traditional sense
  // i.e. allow external functions to be accessed by this class
  // normal use case is for cross-cutting concerns, which is the case here
  mixins: [
    // listens to trigger() functions in TopicStore, triggers this.onChange() is one received
    Reflux.listenTo(TopicStore, 'onChange')
  ],

  // set initial state of component - NOT same as props
  // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-should-go-in-state
  // State: data that may change (via event handlers/Ajax calls) to trigger UI update
  // NOT State: computed data, React components (should be in render() based on underlying props and state)
  // Props: immutable data from parents
  getInitialState: function() {
    // initiaise array container for topics
    return {
      topics: []
    };
  },

  // componentWillMount is run before render, also impacts server side
  componentWillMount: function() {
    // calls Imgur API to get list of topics. Processed as follows:
    // 1) actions.jsx passes action to topicStore.jsx
    // 2) topicStore.jsx makes async API call and returns a promise, triggerChange() run
    // 3) this triggers onChange() (via Reflux listenTo() mixin defined above)
    // 4) onChange() updates state of topics
    // 5) updating state triggers re-render so updates DOM (via virtual DOM)
    // nb refer to individual components for further detail
    Actions.getTopics();
  },

  render: function() {
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
  },

  // triggered by Reflux.listenTo() mixin
  onChange: function(event, topics) {
    this.setState({
      topics: topics
    });
  },

  renderTopics: function() {
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
});
