import React from 'react';
import './index.css';

const SliderArrow = props => {
  const {next, previous} = props;
  return (
    <div className="slider-arrow">
      <span className="slider-left-area" onClick={previous}>
        <i className="fas fa-angle-left np-arrow"></i>
      </span>
      <span className="slider-right-area" onClick={next}>
        <i className="fas fa-angle-right np-arrow"></i>
      </span>
    </div>
  );
}

export default SliderArrow;