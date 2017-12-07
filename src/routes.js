// basic
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// page
import Home from './views/home/home.js';
import ArtcDetail from './views/articles/detail';

// style
import style from './index.css'

// component
import {Minimal} from './common/button/button.js';

const history = createBrowserHistory();

const Routes = () => (
  <div>
    <div className={style.home_header}>
      <div className={style.navlogo}>Beating</div>
      <div className={style.navbar}>
        <Minimal >HOME</Minimal>
        <Minimal href="http://music.beating.io">MUSIC.BEATING</Minimal>
        <Minimal href="http://map.beating.io">MAP.BEATING</Minimal>
        <Minimal href="http://tv.beating.io">TV.BEATING</Minimal>
        <Minimal href="http://admin.beating.io">ADMIN.BEATING</Minimal>
        <Minimal href="http://me.beating.io">ABOUT ME</Minimal>
      </div>
    </div>
    <div className={style.container}>
      <Router history={history} >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles/detail" component={ArtcDetail} />
        </Switch>
      </Router>
    </div>
  </div>
)

export default Routes;