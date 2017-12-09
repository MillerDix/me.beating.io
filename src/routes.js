// basic
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// page
import Home from './views/home/home.js';
import ArtcDetail from './views/articles/detail';

// component
import {Minimal} from './common/button/button.js';

const history = createBrowserHistory();

const Routes = () => (
  <div>
    <div className="home_header">
      <div className="navlogo">Beating</div>
      <div className="navbar">
        <Minimal >HOME</Minimal>
        <Minimal href="http://music.beating.io">MUSIC.BEATING</Minimal>
        <Minimal href="http://map.beating.io">MAP.BEATING</Minimal>
        <Minimal href="http://tv.beating.io">TV.BEATING</Minimal>
        <Minimal href="http://admin.beating.io">ADMIN.BEATING</Minimal>
        <Minimal href="http://me.beating.io">ABOUT ME</Minimal>
      </div>
    </div>
    <div className="container">
      <Router history={history} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles/detail" component={ArtcDetail} />
        </Switch>
      </Router>
    </div>
    <div className="footer">
      <div className="copyright">© 2017 MillerD. All rights are not reserved.Developed by MillerD</div>
    </div>
  </div>
)

export default Routes;