import React from 'react';
import ReactDOM from 'react-dom'
import style from './loading.css';

const Loading = {
  start: function(time) {
    let loadingDOM = (
      <div className={style.loading}>
        <div className={style.spin}></div>
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