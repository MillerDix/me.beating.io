import React from 'react';
import style from './module.css';

const Module = props => {

    return (
        <div className={style.container} style={{backgroundImage: "url("+ props.image +")"}}>
            <div className={props.image ? style.mask : ''}>
                <div className={props.image ? style.titleImgBack : style.titleBlankBack}>{props.title}</div>
                <div className={props.image ? style.subtitleImgBack : style.subtitleBlankBack}>{props.subtitle}</div>
                <div className={props.image ? style.childrenImgBack : style.childrenBlankBack}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Module;