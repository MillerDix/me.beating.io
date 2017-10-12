import React, { Component } from 'react';
import {Minimal, Rounded, ArticleImg} from '../../common/button/button.js';
import Article from '../../common/article/article.js';

import style from './home.css';

import Cassini from '../../assets/images/CASSINI_THE_GRAND_FINALE.jpg';
import Dawn from '../../assets/images/dawn.jpg';
import Astronaut from '../../assets/images/astronaut.jpg';
import Curiosity from '../../assets/images/curiosity.jpg';
import Space from '../../assets/images/space.jpg';

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
          <div className={style.footer}>
            <div className={style.copyright}>© 2017 MillerD. All rights reserved(just kidding).Developed by MillerD</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
