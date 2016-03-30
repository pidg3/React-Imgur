// NODE MODULES
import Reflux from 'reflux';

// APPLICATION COMPONENTS
import Api from '../utils/api';
import Actions from '../actions';

// refer to topic-store for main store comments

var CommentStore = Reflux.createStore({
  listenables: [Actions],
  getSingleImage: function(id) {
    return Api.get('gallery/' + id + '/comments')
    .then(function(json) {
      this.comments = json.data;
      this.triggerChange();
    }.bind(this));
  },
  triggerChange: function() {
    this.trigger('change', this.comments);
  }
});

// add properties
CommentStore.listenables = [Actions];

// export
module.exports = CommentStore;
