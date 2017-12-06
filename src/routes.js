// basic
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// page
import Home from './views/home/home.js';
import ArtcDetail from './views/articles/detail';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history} >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles/detail" component={ArtcDetail} />
    </Switch>
  </Router>
)

export default Routes;