// NODE MODULES
import React from 'react';

class CommentBox extends React.Component {
  render() {
    return <ul className="list-group">
      {this.renderComments()}
    </ul>;
  }
  renderComments() {
    return this.props.comments.slice(0, 20).map(function(comment) {
      return <li className="list-group-item comment-box" key={comment.id}>
        <span className="badge">{comment.ups}</span>
        <h5>{comment.author}</h5>
        {comment.comment}
      </li>;
    });
  }
}

// add properties
CommentBox.displayName = 'CommentBox';
CommentBox.propTypes = {
  comments: React.PropTypes.array.isRequired
};

// export
module.exports = CommentBox;
