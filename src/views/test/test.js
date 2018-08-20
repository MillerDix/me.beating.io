import React, { Component } from 'react';
import {Rounded} from '../../common/button/button.js';
import request from '../../common/utils/request.js';
import api from '../../common/utils/api.js';
import styles from './test.css';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            fullMatchPic: [],
            partialMatchPic: []
        }

        this.onQueryInputChange = this.onQueryInputChange.bind(this);
        this.onClickQuery = this.onClickQuery.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
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
                if(resp.full_matching_images) {  // TODO: global alert
                    this.setState({ fullMatchPic: resp.full_matching_images, partialMatchPic: resp.partial_matching_images });
                }
            });
    }

    inputOnChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            request({
                url: api.vision.web,
                method: 'post',
                data: { image: reader.result.replace(/.*base64,/, '') },   // need int
            })
                .then(resp => {
                    if(resp.full_matching_images) {  // TODO: global alert
                        this.setState({ fullMatchPic: resp.full_matching_images, partialMatchPic: resp.partial_matching_images });
                    }
                });
        }
        reader.onerror = err => {
            console.log("Error: ", err);
        }
    }

    render() {
        const { imageUrl, fullMatchPic } = this.state;
        return(
            <div>
                <input value={imageUrl} onChange={this.onQueryInputChange} />
                <Rounded onClick={this.onClickQuery}>查询</Rounded>
                {fullMatchPic.map((src, index) => (
                    <img key={index} src={src.url} className={styles.image} alt="fucked" width={200} height={200} />
                ))}
                <input type="file" onChange={this.inputOnChange} />
                {/* <img src="https://mmbiz.qpic.cn/mmbiz_gif/PWokHSrIciapBApt7TOyUicbdJnfl5TdnW1CGGO1T9WiaficYM45VLhMQBaOeSfiae6SbmxQJbiaYYCMkmVkjWIK3UMQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1" alt="fuck" /> */}
            </div>
        );
    }
}

export default Test;