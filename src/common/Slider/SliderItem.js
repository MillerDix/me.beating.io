import React from 'react';
import './index.css';

const SliderItem = props => {

  const {url} = props;
  return (
    <li className="slider-item"
      style={{
        background: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center' 
      }}
    >
    </li>
  );
}

export default SliderItem;