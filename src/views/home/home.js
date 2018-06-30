import React, { Component } from 'react';

// utils
import {Drawer} from '../../common/button/button.js';
import Article from '../../common/article/article.js';
import Module from '../../common/module/module.js';
import Progress from '../../common/progress/progress.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';
import Slider from '../../common/Slider/Slider.js';

// styles
import style from './home.css';

// assets
const { images } = api.assets;
const POSTER_ITEMS = [
  images.curiosity_new_selfie,
  images.dawn,
  images.cosmic_exploration,
  images.astronaut_aldylu,
  images.sunrise_spacewalk
];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      posterHeight: document.documentElement.clientHeight - (document.documentElement.clientWidth < 1025 ? 56 : 90)
    };

    this.onclick = this.onclick.bind(this);
    this._resizePosterHeight = this._resizePosterHeight.bind(this);
    window.addEventListener('resize', this._resizePosterHeight, false);
  }

  componentDidMount() {
    request({
      url: api.article.listall,
      method: 'post'
    }).then(res => {
      this.setState({articles: res || []});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizePosterHeight, false);
  }

  _resizePosterHeight() {
    this.setState({posterHeight: document.documentElement.clientHeight - (document.documentElement.clientWidth < 1025 ? 56 : 90)});
  }

  onclick(Id) {
    const {history} = this.props;
    history.push(`/articles/detail/${Id}`);
  }

  render() {
    const {articles} = this.state;
    // TODO: THIS IS UGLY
    return (
      <div className={style.home}>
        <div style={{height: this.state.posterHeight}}>
          <Slider items={POSTER_ITEMS} indexed={true} arrow={true} speed={1} delay={5} autoplay={true} />
        </div>
        <div className={style.home_body}>
          <div className={style.content}>
            {articles.map((item, index) => {
              return (
                <Article
                  onClick={() => this.onclick(item.Id)}
                  key={index}
                  image={item.Poster}
                  title={item.Title}
                  subtitle={item.Subtitle}
                  content={item.Summary}
                />
              );
            })}
          </div>
          <Module
            image={images.dawn}
            title="Check My Skills"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          >
            <div className={style.skillmap}>
              <Progress title="HTML" percent="60%" explain="heard of it"></Progress>
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
            subtitle="open for new opportunity"
          >
          </Module>
          <Module
            image={images.sunrise_spacewalk}
            title="Contact Me"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          >
            <div className={style.contacts}>
              <Drawer info="https://github.com/MillerDix"><i className="fab fa-github"></i></Drawer>
              <Drawer info="zlw2579@gmail.com"><i className="far fa-envelope"></i></Drawer>
            </div>
          </Module>
        </div>
      </div>
    );
  }
}

export default Home;
