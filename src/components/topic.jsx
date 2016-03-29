// NODE MODULES
var React = require('react');
var Reflux = require('reflux');

// APPLICATION COMPONENTS
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var ImagePreview = require ('./image-preview');

module.exports = React.createClass({
  displayName: 'Topic',
  propTypes: {
    // params is provided by react router, gives variables specified in url string with colon
    // e.g. topics/:id --> params.id
    // isRequired used as params should always be provided, ...
    // ... it should not be possible to navigate to this section without passing ID in URL
    params: React.PropTypes.object.isRequired
  },

  // trigger/listener behaviour for images same as for topics
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      images: []
    };
  },
  componentWillMount: function() {
    Actions.getImages(this.props.params.id);
  },

  // triggered by change of props (componentWillReceiveProps name is confusing)
  // in practice, triggered by user navigating to different topic from first topic
  // not triggered on initial load (componentWillMount handles this instead)
  componentWillReceiveProps: function(nextProps) {
    Actions.getImages(nextProps.params.id);
  },
  render: function() {
    return <div className="topic">
      {this.renderImages()}
    </div>;
  },
  renderImages: function() {
    return this.state.images.slice(0, 20).map(function(image) {
      // '...' assigns ALL image props to new components' props
      // so can be referred to later
      // in this case, means all image data returned by Imgur API
      return <ImagePreview key={image.id} {...image} />;
    });
  },
  onChange: function(event, images) {
    this.setState({
      images: images
    });
  }
});
