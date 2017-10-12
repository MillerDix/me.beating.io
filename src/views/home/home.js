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
    image: Astronaut
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
        <div className={style.poster}>
          <img src={Dawn} alt="poster" />
          <div className={style.mask}></div>
        </div>
        <div className={style.home_body}>
          <div className={style.content}>
            {TDATA.map((item, index) => {
              return (
                <Article key={index} image={item.image} title={item.title} subtitle={item.subtitle} content={item.content}></Article>
              );
            })}
          </div>
          <Module
            image={Code}
            title="Check My Skills"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          >
            <Progress title="HTML" percent="60%" explain="听过 heard it"></Progress>
            <Progress title="JavaScript" percent="80%" explain="有点印象 did ring a bell"></Progress>
            <Progress title="CSS" percent="40%" explain="知道一点 yeah yeah i know that"></Progress>
            <Progress title="React Native" percent="50%" explain="用过几次 had a try and failed"></Progress>
            <Progress title="Python" percent="40%" explain="写过黄色网站爬虫 wrote some porn site crawlers with it"></Progress>
            <Progress title="Java" percent="30%" explain="用来写过一些屎 wrote some shit with it"></Progress>
            <Progress title="React" percent="70%" explain="看了下文档放弃了 read the docs then quit"></Progress>
            <Progress title="Angular" percent="60%" explain="迁移到2失败放弃了 fail to migrate to Angular2 and quit"></Progress>
            <Progress title="iOS" percent="40%" explain="api名字太长放弃了 api too long, quit"></Progress>
            <Progress title="Math、Algorithm" percent="20%" explain="蛤?？ huh??"></Progress>
          </Module>
          <div className={style.footer}>
            <div className={style.copyright}>© 2017 MillerD. All rights reserved(just kidding).Developed by MillerD</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
