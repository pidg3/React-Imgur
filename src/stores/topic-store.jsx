// NODE MODULES
var Reflux = require('reflux');

// APPLICATION COMPONENTS
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  // listenables allow actions to trigger functions in stores
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
