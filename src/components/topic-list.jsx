// NODE MODULES
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Reflux = require('reflux');

// APPLICATION COMPONENTS
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

// This components operataion is analogous to header.jsx
// TODO - consider opportunities to refactor

module.exports = React.createClass({
  displayName: 'TopicList',
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: []
    };
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return <div className="list-group">
      <h4>Topic List</h4>
      {this.renderTopics()}
    </div>;
  },
  renderTopics: function() {
    return this.state.topics.slice(0,4).map(function(topic) {
      return <Link to={'topics/' + topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>;
    });
  },
  onChange: function(event, topics) {
    // setting state triggers re-render
    this.setState({
      topics: topics
    });
  }
});
