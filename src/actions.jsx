// NODE MODULES
var Reflux = require('reflux');

// actions are needed in Reflux architecture to access stores
// single action can access multiple stores e.g. getSingleImage accesses ...
// ... comment-store and image-store
// https://github.com/reflux/refluxjs
module.exports = Reflux.createActions([
  'getTopics',
  'getImages',
  'getSingleImage'
]);
