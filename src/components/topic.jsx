// NODE MODULES
import React from 'react';

// APPLICATION COMPONENTS
import Actions from '../actions';
import ImageStore from '../stores/image-store';
import ImagePreview from './image-preview';

class Topic extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      images: []
    };
  }
  componentWillMount() {
    Actions.getImages(this.props.params.id);
  }
  componentDidMount () {
    this.unsubscribe = ImageStore.listen(this.onChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  // triggered by change of props (componentWillReceiveProps name is confusing)
  // in practice, triggered by user navigating to different topic from first topic
  // not triggered on initial load (componentWillMount handles this instead)
  componentWillReceiveProps(nextProps) {
    Actions.getImages(nextProps.params.id);
  }
  render() {
    return <div className="topic">
      {this.renderImages()}
    </div>;
  }
  renderImages() {
    return this.state.images.slice(0, 20).map(function(image) {
      // '...' assigns ALL image props to new components' props
      // so can be referred to later
      // in this case, means all image data returned by Imgur API
      return <ImagePreview key={image.id} {...image} />;
    });
  }
  onChange(event, images) {
    this.setState({
      images: images
    });
  }
}

// add properties
Topic.displayName = 'Topic';
Topic.propTypes = {
  // params is provided by react router, gives variables specified in url string with colon
  // e.g. topics/:id --> params.id
  // isRequired used as params should always be provided, ...
  // ... it should not be possible to navigate to this section without passing ID in URL
  params: React.PropTypes.object.isRequired
};

// export

module.exports = Topic;
