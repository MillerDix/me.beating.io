import React from 'react';
import style from './article.css';
import {Rounded, ArticleImg} from '../button/button.js';

const Article = props => {
  return (
    <div className={style.container}>
      <ArticleImg src={props.image}>READ MORE</ArticleImg>
      <div className={style.body}>
        <a className={style.title}>{props.title}</a>
        <div className={style.subtitle}>{props.subtitle}</div>
        <div className={style.content}>{props.content}</div>
      </div>
      <div className={style.handle}>
        <Rounded>READ MORE</Rounded>
      </div>
    </div>
  );
}

export default Article;