// NODE MODULES
// what-wg fetch is polyfill for ES6 fetch
import Fetch from 'whatwg-fetch';

var rootUrl = 'https://api.imgur.com/3/';
var apiKey = 'bbbdda339b27603';

module.exports = {
  // calls Imgur API and returns a promise
  get: function(url) {
    return fetch(rootUrl + url, {
      headers: {
        'Authorization': 'Client-ID ' + apiKey
      }
    })
    .then(function(response){
      return response.json();
    });
  }
};
