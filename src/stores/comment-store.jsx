// NODE MODULES
var Reflux = require('reflux');

// APPLICATION COMPONENTS
var Api = require('../utils/api');
var Actions = require('../actions');

// refer to topic-store for main store comments

module.exports = Reflux.createStore({
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
