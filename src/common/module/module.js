import React from 'react';
import style from './module.css';

const Module = props => {

    return (
        <div className={style.container}>
            <img src={props.image} alt=""/>
            <div className={style.content}>
                <div className={props.image ? style.titleImgBack : style.titleBlankBack}>{props.title}</div>
                <div className={props.image ? style.subtitleImgBack : style.subtitleBlankBack}>{props.subtitle}</div>
                <div className={style.children}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Module;