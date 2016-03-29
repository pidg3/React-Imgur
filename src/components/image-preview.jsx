// NODE MODULES
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// no application components as this is at the bottom of the chain

module.exports = React.createClass({
  displayName: 'ImagePreview',
  propTypes: {
    // all these props are provided, althogh not individually defined ...
    // ... due to using {...image} when returning ImagePreview in topic.jsx
    id: React.PropTypes.string.isRequired,
    views: React.PropTypes.number.isRequired,
    ups: React.PropTypes.number.isRequired,
    animated: React.PropTypes.bool.isRequired,
    // mp4 not always provided (depends whether animated) so not set to isRequired
    mp4: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      // used to control mouse events to trigger video autoplay
      hovering: false
    };
  },
  render: function() {
    return <Link
      to={'images/' + this.props.id}
      className="image-preview"
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
      {/* video/image autoplay and stats insets */}
      {this.props.animated && this.state.hovering ? this.video() : this.image()}
      {this.props.animated && !this.state.hovering ? this.icon() : null}
      {this.state.hovering ? this.inset() : null}

    </Link>;
  },
  // stats inset for both videos and images
  inset: function() {
    return <div className="inset">
      Views: {this.props.views}
      <br />
      Upvotes: {this.props.ups}
    </div>;
  },
  // simple img src for images
  image: function() {
    var link = 'http://i.imgur.com/' + this.props.id + 'h.jpg';
    return <img src={link} />;
  },
  // videos autoplay
  video: function() {
    return <div>
      <video
        preload="auto"
        autoPlay="autoplay"
        loop="loop"
        webkit-playsinline
        >
        <source src={this.props.mp4} />
      </video>
    </div>;
  },
  // to indicate which are videos
  icon: function() {
    return <span className="glyphicon glyphicon-play" />;
  },
  handleMouseEnter: function() {
    this.setState({
      hovering: true
    });
  },
  handleMouseLeave: function() {
    this.setState({
      hovering: false
    });
  }
});
