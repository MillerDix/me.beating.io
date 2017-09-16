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
    <div>Rounded</div>
  );
}

export {Minimal, Rounded};