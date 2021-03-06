import React from 'react';

import style from './progress.css';

const Progress = props => {

    return (
        <div className={style.container}>
            <div className={style.fullbar}></div>
            <div className={style.percentage} style={{'width': props.percent}}>
                <div className={style.title}>{props.title}</div>
                <div className={style.bar}></div>
            </div>
            <div className={style.value} style={{'left': props.percent}}>{props.explain}</div>
        </div>
    );
}

export default Progress;