// NODE MODULES
import React from 'react';
import { Link } from 'react-router'; // not importing default so {} required

// APPLICATION COMPONENTS
import Actions from '../actions';
import TopicStore from '../stores/topic-store';

// This components operataion is analogous to header.jsx
// TODO - consider opportunities to refactor

class TopicList extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      topics: []
    };
  }
  componentWillMount() {
    Actions.getTopics();
  }
  componentDidMount () {
    this.unsubscribe = TopicStore.listen(this.onChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return <div className="list-group">
      <h4>Topic List</h4>
      {this.renderTopics()}
    </div>;
  }
  renderTopics() {
    return this.state.topics.slice(0,4).map(function(topic) {
      return <Link to={'topics/' + topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>;
    });
  }
  onChange(event, topics) {
    // setting state triggers re-render
    this.setState({
      topics: topics
    });
  }
}

// add properties
TopicList.displayName = 'TopicList';

// export

module.exports = TopicList;
