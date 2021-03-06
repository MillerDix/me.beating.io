// basic
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// page
import Home from './views/home/home.js';
import ArtcDetail from './views/articles/detail';
import MusicVisualizer from './views/music_visualizer/music_visualizer.js';
import Test from './views/test/test.js';

// component
import {Minimal} from './common/button/button.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderOn: 'display-none',
      showScrollToTop: false,
      contentMinHeight: document.documentElement.clientHeight - (document.documentElement.clientWidth < 1025 ? 56 : 90)
    };

    this.toggle = this.toggle.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.showScroll = this.showScroll.bind(this);
    window.addEventListener('scroll', this.showScroll, false);
  }

  componentDidMount() {
    window._app_loaded();
    var self = this;
    window.onresize = function() {
      self.setState({ contentMinHeight: document.documentElement.clientHeight - (document.documentElement.clientWidth < 1025 ? 56 : 90) });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showScroll, false);
  }

  showScroll() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 500) {
      this.setState({showScrollToTop: true});
    }else{
      this.setState({showScrollToTop: false});
    }
  }

  toggle() {
    if (this.state.folderOn === 'display-flex') {this.setState({folderOn: 'display-none'});}
    else {this.setState({folderOn: 'display-flex'});}
  }

  scrollToTop() {
    window.scrollTo(0, 0);
    // let timer = null, currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    // // console.log(currentPosition);
    // let thisStep = 0;
    // // let st = Math.ceil((2*currentPosition/500)/499);
    // const sc = () => {
    //   currentPosition -= thisStep;
    //   if (currentPosition > 0) {window.scrollTo(0, currentPosition);}
    //   else {window.scrollTo(0, 0);clearInterval(timer);}
    //   thisStep += 10;
    // }
    // timer = setInterval(sc, 1);
  }

  jump(location) {
    const {history} = this.props;
    history.push(location);
  }

  render() {
    return (
      <div>
        <div className="home_header">
          <div className="navlogo">Beating</div>
          <div className={`navbar ${this.state.folderOn}`}>
            <Minimal onClick={() => {this.jump("/"); this.toggle();}}>HOME</Minimal>
            <Minimal onClick={() => {this.jump("/music_visualizer"); this.toggle();}}>MUSIC</Minimal>
            <Minimal href="http://map.beating.io">MAP</Minimal>
            <Minimal href="http://tv.beating.io">TV</Minimal>
            <Minimal href="http://admin.beating.io">ADMIN</Minimal>
            <Minimal onClick={() => {this.jump("/test"); this.toggle();}}>ABOUT ME</Minimal>
          </div>
          <div className="navToggle" onClick={() => this.toggle()}><div className="bar"></div></div>
        </div>
        <div className="container" style={{minHeight: this.state.contentMinHeight}}>
          <Route exact path="/" component={Home} />
          <Route path="/articles/detail/:id" component={ArtcDetail} />
          <Route path="/music_visualizer" component={MusicVisualizer} />
          <Route path="/test" component={Test} />
        </div>
        {this.state.showScrollToTop ? 
          <i className="fas fa-angle-up" onClick={() => this.scrollToTop()}
            style={{
              fontSize: '46px',
              color: 'white',
              position: 'fixed',
              right: '20px',
              bottom: '20px',
              backgroundColor: 'black',
              width: '46px',
              textAlign: 'center',
              borderRadius: '23px',
              cursor: 'pointer'
            }}
          ></i> : null}
        <div className="footer">
          <div className="copyright">© 2017 MillerD. All rights are not reserved.Developed by MillerD</div>
        </div>
      </div>
    );
  }
}
export default App;