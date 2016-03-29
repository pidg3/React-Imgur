// NODE MODULES
var React = require('react');
var Header = require('./header');

// APPLICATION COMPONENTS
var TopicList = require('./topic-list');

module.exports = React.createClass({
  // displayName required to produce better error messages
  // produces linter error message if not defined
  displayName: 'Main',

  // prop validation - seen as a good practice and avoids linter warning
  // will produce error message is incorrect type supplied
  // .isRequired NOT specified here as
  propTypes: {
    children: React.PropTypes.object
  },
  render: function() {
    // returns Header as defined separately and content in separate function
    return <div>
      <Header />
      {this.content()}
    </div>;
  },
  content: function() {
    // we can use props.children as this is a react-router property
    // topics/images are defined as children of / rather than separate routes
    // EXAMPLE: url /images/2 would return {ImageDetail}
    // could build more detailed nesting structure but not needed here
    if (this.props.children) {
      return this.props.children;
    }
    else {
      // only use of TopicList - only displayed if no children i.e. home page
      return <TopicList />;
    }
  }
});
