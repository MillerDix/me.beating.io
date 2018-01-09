// basic
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// page
import Home from './views/home/home.js';
import ArtcDetail from './views/articles/detail';

// component
import {Minimal} from './common/button/button.js';

// const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderOn: 'display-none',
      showScrollToTop: false
    };

    this.toggle = this.toggle.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.showScroll = this.showScroll.bind(this);
    window.addEventListener('scroll', this.showScroll, false);
    window._page_loaded();
  }

  componentWillUnmount() {
    console.log('routes quit');
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
    // let avStep = currentPosition / 50;
    // const sc = () => {
    //   currentPosition -= avStep;
    //   if (currentPosition > 0) {window.scrollTo(0, currentPosition);}
    //   else {window.scrollTo(0, 0);clearInterval(timer);}
    // }
    // timer = setInterval(sc, 1);
  }

  render() {
    return (
      <div>
        <div className="home_header">
          <div className="navlogo">Beating</div>
          <div className={`navbar ${this.state.folderOn}`}>
            <Minimal href="http://beating.io">HOME</Minimal>
            <Minimal href="http://music.beating.io">MUSIC</Minimal>
            <Minimal href="http://map.beating.io">MAP</Minimal>
            <Minimal href="http://tv.beating.io">TV</Minimal>
            <Minimal href="http://admin.beating.io">ADMIN</Minimal>
            <Minimal href="http://me.beating.io">ABOUT ME</Minimal>
          </div>
          <div className="navToggle" onClick={() => this.toggle()}><div className="bar"></div></div>
        </div>
        <div className="container">
          <Router>
            <div>
              <Route exact path="/" component={Home} />
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <Route path="/articles/detail/:id" component={ArtcDetail} />
              </ReactCSSTransitionGroup>
            </div>
          </Router>
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