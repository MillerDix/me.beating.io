import React from 'react';
import ReactDOM from 'react-dom'

const Loading = {
  start: function(time) {
    let loadingDOM = (
      <div className="haha">
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'red',
          textAlign: 'center',
          fontSize: '50px',
          zIndex: '9999',
          color: 'white'
        }}>LOADING</div>
      </div>
    );
    let body = document.getElementById('global');

    // 禁止滚动
    window.scrollTo(0, 0);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    ReactDOM.render(loadingDOM, body);
    let self = this;
    if(time && typeof time === Number) { // means 0 or null or undefined;
      setTimeout(function() {
        // TODO: who are you?
        self.end();
      }, time);
    }
  },
  end: function() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    let haha = document.getElementById('global');
    ReactDOM.unmountComponentAtNode(haha);
  }
}

export default Loading;