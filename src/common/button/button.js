import React from 'react';
import style from './button.css';

const Minimal = (props) => {
  
  const jump = url => {
    window.location.href = url;
  }

  return (
    <div className={style.minimal} onClick={() => {jump(props.href)}}>
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

const Drawer = props => {
  return (
    <div className={style.drawer}>
      <div className={style.info}>{props.info}</div>
      <div className={style.icon} style={{backgroundImage: "url(" + props.image + ")"}}></div>
    </div>
  )
}

export {Minimal, Rounded, ArticleImg, Drawer};