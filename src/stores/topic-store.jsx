// NODE MODULES
import Reflux from 'reflux';

// APPLICATION COMPONENTS
import Api from '../utils/api';
import Actions from '../actions';

var TopicStore = Reflux.createStore({
  listenables: [Actions],
  getTopics: function() {
    // call Imgur API and process returned promise
    return Api.get('topics/defaults')
    .then(function(json) {
      this.topics = json.data;
      this.triggerChange();
    }.bind(this));
  },
  // providers starting point for Reflux.listenTo in topic.jsx to update render ...
  // ... when promise returned
  triggerChange: function() {
    this.trigger('change', this.topics);
  }
});

// export
module.exports = TopicStore;
