// NODE MODULES
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';


// APPLICATION COMPONENTS
import Main from './components/main';
import Topic from './components/topic';
import ImageDetail from './components/image-detail';

module.exports = (
  // has history required due to use of react-router 2.0
  // URL history no longer specific by defauly, so has to be explicitly defined

  <Router history={hashHistory}>
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
