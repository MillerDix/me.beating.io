import React from 'react';
import style from './button.css';

const Minimal = (props) => {
  console.log(props);
  return (
    <div className={style.minimal}>
      {props.children}
      <div className={style.underline}></div>
    </div>
  );
}

const Rounded = (props) => {
  return (
    <div className={style.rounded}>
      {props.children}
      <div className={style.leftLine}></div>
    </div>
  );
}

const ArticleImg = props => {
  return (
    <div className={style.articleImg}>
      <img src={props.src} alt="header"></img>
      <div className={style.hoverMask}></div>
      <div className={style.topLayer}>
        <div className={style.vLine} style={{left: '0'}}></div>
        <div className={style.vLine} style={{right: '0'}}></div>
        <div className={style.hLine} style={{top: '0'}}></div>
        <div className={style.hLine} style={{bottom: '0'}}></div>
        <div className={style.cLine}></div>
        {props.children}
      </div>
    </div>
  );
}

export {Minimal, Rounded, ArticleImg};