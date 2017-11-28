import React, { Component } from 'react';
import {Minimal, Rounded, ArticleImg} from '../../common/button/button.js';
import Article from '../../common/article/article.js';
import Module from '../../common/module/module.js';
import Progress from '../../common/progress/progress.js';

import style from './home.css';

import Cassini from '../../assets/images/CASSINI_THE_GRAND_FINALE.jpg';
import Dawn from '../../assets/images/dawn.jpg';
import Astronaut from '../../assets/images/astronaut.jpg';
import Curiosity from '../../assets/images/curiosity.jpg';
import Space from '../../assets/images/space.jpg';
import Code from '../../assets/images/code.jpg';

// article
const TDATA = [
  {
    title: '5 GREAT LESSONS YOU CAN LEARN FROM MUSIC',
    subtitle: 'AUGUST 11, 2016',
    content: 'Omnes enim iucundum motum, quo sensus hilaretur. Ego vero isti, inquam, permitto. Qui est in parvis malis. Quid turpius quam sapientis',
    image: Cassini
  },
  {
    title: '5 GREAT LESSONS YOU CAN LEARN FROM MUSIC',
    subtitle: 'AUGUST 11, 2016',
    content: 'Omnes enim iucundum motum, quo sensus hilaretur. Ego vero isti, inquam, permitto. Qui est in parvis malis. Quid turpius quam sapientis',
    image: Dawn
  },
  {
    title: '5 GREAT LESSONS YOU CAN LEARN FROM MUSIC',
    subtitle: 'AUGUST 11, 2016',
    content: 'Omnes enim iucundum motum, quo sensus hilaretur. Ego vero isti, inquam, permitto. Qui est in parvis malis. Quid turpius quam sapientis',
    image: Curiosity
  },
  {
    title: '5 GREAT LESSONS YOU CAN LEARN FROM MUSIC',
    subtitle: 'AUGUST 11, 2016',
    content: 'Omnes enim iucundum motum, quo sensus hilaretur. Ego vero isti, inquam, permitto. Qui est in parvis malis. Quid turpius quam sapientis',
    image: Space
  }
]

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={style.home}>
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
        <div className={style.poster}>
          <img src={Astronaut} alt="poster" />
          <div className={style.mask}></div>
        </div>
        <div className={style.home_body}>
          <div className={style.content}>
            {TDATA.map((item, index) => {
              return (
                <Article onClick={this.onclick} key={index} image={item.image} title={item.title} subtitle={item.subtitle} content={item.content}></Article>
              );
            })}
          </div>
          <Module
            image={Code}
            title="Check My Skills"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          >
            <div className={style.skillmap}>
              <Progress title="HTML" percent="60%" explain="heard it"></Progress>
              <Progress title="JavaScript" percent="80%" explain="did ring a bell"></Progress>
              <Progress title="CSS" percent="40%" explain="yeah yeah i know that"></Progress>
              <Progress title="React Native" percent="50%" explain=" had a try and failed"></Progress>
              <Progress title="Python" percent="40%" explain=" wrote some porn site crawlers with it"></Progress>
              <Progress title="Java" percent="30%" explain="wrote some shit with it"></Progress>
              <Progress title="React" percent="70%" explain="read the docs then quit"></Progress>
              <Progress title="Angular" percent="60%" explain="fail to migrate to Angular2 and quit"></Progress>
              <Progress title="iOS" percent="40%" explain="apis too long, quit"></Progress>
              <Progress title="Algorithm" percent="20%" explain="huh??"></Progress>
            </div>
          </Module>
          <Module
            title="Contact Me"
            subtitle=""
          >
            
          </Module>
          <div className={style.footer}>
            <div className={style.socialContact}>
              {/* <i className="fa fa-address-book" aria-hidden="true"></i> */}
            </div>
            <div className={style.copyright}>© 2017 MillerD. All rights are not reserved.Developed by MillerD</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
