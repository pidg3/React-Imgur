// NODE MODULES
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var HashHistory = ReactRouter.hashHistory;

// APPLICATION COMPONENTS
var Main = require('./components/main');
var Topic = require('./components/topic');
var ImageDetail = require('./components/image-detail');

module.exports = (
  // has history required due to use of react-router 2.0
  // URL history no longer specific by defauly, so has to be explicitly defined

  <Router history={HashHistory}>
    {/* always defined: header */}
    <Route path="/" component={Main}>
      {/* only displays if /topics in URL */}
      {/* id provided by url, and is available in {Topic} as a prop via params */}
      <Route path="topics/:id" component={Topic}></Route>
      {/* only displays if /images in URL */}
      <Route path="images/:id" component={ImageDetail}></Route>
    </Route>
  </Router>
);
