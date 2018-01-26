import React, {Component} from 'react';

class SliderDot extends Component {

  render() {
    const {onshow, item_length, speed} = this.props;
    let dots = [];
    for(let i = 0; i < item_length; i++) {
      if(i === onshow) {dots.push(<li className="slider-dot dot-onshow" key={`dot:${i}`} style={{transitionDuration: `${speed}s`}}></li>);}
      else {dots.push(<li className="slider-dot" key={`dot:${i}`} style={{transitionDuration: `${speed}s`}}></li>);}
    }
    return (
      <ul className="slider-dots">
        {dots}
      </ul>
    );
  }
}

export default SliderDot;