import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';
import style from './test.css';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: ""
        }

        this.onQueryInputChange = this.onQueryInputChange.bind(this);
        this.onClickQuery = this.onClickQuery.bind(this);
    }

    onQueryInputChange(event) {
        event.preventDefault();
        this.setState({ imageUrl: event.target.value });
    }

    onClickQuery() {
        if (this.state.imageUrl == null) { return; }
        console.log(this.state.imageUrl);
        request({
            url: api.vision.web,
            method: 'post',
            data: { imageUrl: this.state.imageUrl },   // need int
        })
            .then(resp => {
                console.log(resp);
            });
    }

    render() {
        return(
            <div>
                <input value={this.state.imageUrl} onChange={this.onQueryInputChange} />
                <Rounded onClick={this.onClickQuery}>查询</Rounded>
            </div>
        );
    }
}

export default Test;