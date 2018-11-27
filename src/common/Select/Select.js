import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import styles from './Select.css';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.bi_bordered_box}>
        <span className={styles.title}>select component</span>
        <span className={styles.icon}>icon</span>
      </div>
    );
  }
}

export default Select;