import React, { Component } from 'react';
import style from './home.css';
import {Minimal, Rounded, ArticleImg} from '../../common/button/button.js';
import Cassini from '../../assets/images/CASSINI_THE_GRAND_FINALE.jpg';
import Dawn from '../../assets/images/dawn.jpg';

class Home extends Component {
  render() {
    return (
      <div className={style.home}>
        <div className={style.home_header}>
          <div className={style.navlogo}>Beating</div>
          <div className={style.navbar}>
            <Minimal>HOME</Minimal>
            <Minimal>MUSIC.BEATING</Minimal>
            <Minimal>API.BEATING</Minimal>
            <Minimal>ADMIN.BEATING</Minimal>
            <Minimal>ABOUT ME</Minimal>
          </div>
        </div>
        <div className={style.home_body}>
          <div className={style.post}>
            <img src={Cassini} alt="poster" />
            <div className={style.mask}></div>
          </div>
          <div className={style.content}>
            <Rounded>READ MORE</Rounded>
            <Rounded>ANOTHER FUCKING TEST</Rounded>
            <ArticleImg src={Dawn}>READ MORE</ArticleImg>
          </div>
        </div>
        <div className={style.footer}></div>
      </div>
    );
  }
}

export default Home;
