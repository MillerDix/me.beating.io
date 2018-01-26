import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderItem from './SliderItem.js';
import SliderArrow from './SliderArrow.js';
import SliderDot from './SliderDot.js';

import './index.css';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {onShow: 0};
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.autoplay = this.autoplay.bind(this);

    // autoplay?
    if(props.autoplay) {this.autoplay();}
  }

  autoplay() {
    this.iv = setInterval(() => {
      this.next();
    }, this.props.delay * 1000);
  }

  previous() {
    // reset timer
    clearInterval(this.iv);
    this.autoplay();
    
    if(this.state.onShow > 0) {
      this.setState(prevstate => {prevstate.onShow--; return prevstate});
    }
  }

  next() {
    clearInterval(this.iv);
    this.autoplay();

    if(this.props.items.length - 2 >= this.state.onShow) {
      this.setState(prevstate => {prevstate.onShow++; return prevstate;});
    }else{
      this.setState({onShow: 0});
    }
  }

  render() {
    const {items, arrow, indexed, speed} = this.props;
    return (
      <div className="slider">
        <ul className="slider-container" style={{left: `${-100 * this.state.onShow}%`, transitionDuration: `${this.props.speed}s`}}>
          {items.map((value, index) => {
            return <SliderItem url={value} key={`item:${index}`} />;
          })}
        </ul>
        {arrow ? <SliderArrow next={this.next} previous={this.previous}/> : null}
        {indexed ? <SliderDot onshow={this.state.onShow} item_length={items.length} speed={speed} /> : null}
      </div>
    );
  }
}

Slider.PropTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  arrow: false,
  indexed: false,
  autoplay: false,
  speed: 1,
  delay: 2,
}

export default Slider;