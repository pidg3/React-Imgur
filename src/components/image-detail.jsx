// NODE MODULES
import React from 'react';

// APPLICATION COMPONENTS
import ImageStore from '../stores/image-store';
import CommentStore from '../stores/comment-store';
import Actions from '../actions';
import CommentBox from './comment-box';

class ImageDetail extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      // object vs array is just due to way Imgur API works
      image: {},
      comments: []
    };
  }
  componentWillMount () {
    Actions.getSingleImage(this.props.params.id);
  }
  componentDidMount () {
    this.unsubscribeImage = ImageStore.listen(this.onChange);
    this.unsubscribeComment = CommentStore.listen(this.onChange);
  }
  componentWillUnmount() {
    this.unsubscribeImage();
    this.unsubscribeComment();
  }
  render() {
    return <div className="image-detail">
      {this.state.image ? this.renderContent() : null}
    </div>;
  }
  renderContent() {
    return <div className="panel panel-default">
      <div className="panel-heading">
        <h4>{this.state.image.title}</h4>
      </div>
      <div className="panel-body">
        {this.renderImage()}
      </div>
      <div className="panel-footer">
        <h5>{this.state.image.description}</h5>
      </div>
      <h3>Comments</h3>
        {this.renderComments()}
    </div>;
  }
  renderComments() {
    if (!this.state.comments) {
      return null;
    }
    return <CommentBox comments={this.state.comments} />;
  }
  renderImage() {
    if (this.state.image.animated) {
      return <video
        preload="auto"
        autoPlay="autplay"
        loop="loop"
        webkit-playsinline
        >
        <source src={this.state.image.mp4} type="video/mp4" />
      </video>;
    }
    else {
      return <img src={this.state.image.link} />;
    }
  }
  onChange() {
    this.setState({
      image: ImageStore.find(this.props.params.id),
      comments: CommentStore.comments
    });
  }
}

// add properties
ImageDetail.displayName = 'ImageDetail';
ImageDetail.propTypes = {
  params: React.PropTypes.object.isRequired
};

// export

module.exports = ImageDetail;
