import React from 'react';
import ReactDOM from 'react-dom'
import style from './loading.css';

const Loading = {
  start: function(time) {
    if(!time) {time = 15}
    let loadingDOM = (
      <div className={style.loading}>
        <div className={style.spin}></div>
      </div>
    );
    let body = document.getElementById('global');

    // 禁止滚动
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    ReactDOM.render(loadingDOM, body);
    let self = this;
    if(time && typeof time === Number) { // means 0 or null or undefined;
      setTimeout(function() {
        // TODO: who are you?
        self.end();
      }, time*1000);
    }
  },
  end: function() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    let global = document.getElementById('global');
    ReactDOM.unmountComponentAtNode(global);
  }
}

export default Loading;