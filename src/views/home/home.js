import React, { Component } from 'react';
import logo from '../../assets/svg/logo.svg';
import style from './home.css';
import {Minimal} from '../../common/button/button.js';

class Home extends Component {
  render() {
    return (
      <div className={style.home}>
        <div className={style.home_header}>
          <img src={logo} className={style.home_logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={style.home_intro}>
          To get started, edit <code>src/home.js</code> and save to reload.
        </p>
        <Minimal>FEATURES</Minimal>
      </div>
    );
  }
}

export default Home;
