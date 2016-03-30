// NODE MODULES
import Reflux from 'reflux';
import _ from 'lodash';

// APPLICATION COMPONENTS
import Api from '../utils/api';
import Actions from '../actions';

// refer to topic-store for main store comments

var ImageStore = Reflux.createStore({
  listenables: [Actions],
  getImages: function(topicID) {
    return Api.get('topics/' + topicID)
    .then(function(json) {
      this.images = _.reject(json.data, function(image) {
        return image.is_album;
      });
      this.triggerChange();
    }.bind(this));
  },
  getSingleImage: function(id) {
    return Api.get('gallery/image/' + id)
    .then(function(json) {
      if (this.images) {
        this.images.push(json.data);
      }
      else {
        this.images = [json.data];
      }
      this.triggerChange();
    }.bind(this));
  },
  find: function(id) {
    // find is lodash util to match parameters and return new array
    var image = _.find(this.images, {id: id});
    if (image) {
      return image;
    }
    else {
      this.getSingleImage(id);
      return null;
    }

  },
  triggerChange: function() {
    this.trigger('change', this.images);
  }
});

// export
module.exports = ImageStore;
