// NODE MODULES
import React from 'react';
import { Link } from 'react-router'; // not importing default so {} required

// no application components as this is at the bottom of the chain

class ImagePreview extends React.Component {
  constructor() {
    super();
    
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      // used to control mouse events to trigger video autoplay
      hovering: false
    };

  }
  render() {
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
  }
  // stats inset for both videos and images
  inset() {
    return <div className="inset">
      Views: {this.props.views}
      <br />
      Upvotes: {this.props.ups}
    </div>;
  }
  // simple img src for images
  image() {
    var link = 'http://i.imgur.com/' + this.props.id + 'h.jpg';
    return <img src={link} />;
  }
  // videos autoplay
  video() {
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
  }
  // to indicate which are videos
  icon() {
    return <span className="glyphicon glyphicon-play" />;
  }
  handleMouseEnter() {
    this.setState({
      hovering: true
    });
  }
  handleMouseLeave() {
    this.setState({
      hovering: false
    });
  }
}

// add properties
ImagePreview.displayName = 'ImagePreview';
ImagePreview.propTypes = {
    // all these props are provided, althogh not individually defined ...
    // ... due to using {...image} when returning ImagePreview in topic.jsx
  id: React.PropTypes.string.isRequired,
  views: React.PropTypes.number.isRequired,
  ups: React.PropTypes.number.isRequired,
  animated: React.PropTypes.bool.isRequired,
  // mp4 not always provided (depends whether animated) so not set to isRequired
  mp4: React.PropTypes.string
};

// export
module.exports = ImagePreview;
